import { execSync } from "node:child_process";
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const projectDir = fileURLToPath(new URL(".", import.meta.url));
const distDir = resolve(projectDir, "dist");
const port = Number(process.env.PORT || 5508);
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
};

let lastBuildCheck = 0;
function ensureDistUpToDate() {
  const now = Date.now();
  if (now - lastBuildCheck < 1500) return;
  lastBuildCheck = now;
  const sourceDataFile = resolve(projectDir, "data", "assetz.js");
  const sourceIndexFile = resolve(projectDir, "index.html");
  const sourceJsFile = resolve(projectDir, "js", "main.js");
  const sourceCssFile = resolve(projectDir, "css", "styles.css");
  const distIndexFile = resolve(distDir, "index.html");

  if (!existsSync(distIndexFile)) {
    try {
      execSync(`node "${resolve(projectDir, "build.mjs")}" /`, { cwd: projectDir, stdio: "ignore" });
    } catch {}
    return;
  }

  const distTime = statSync(distIndexFile).mtimeMs;
  const sources = [sourceDataFile, sourceIndexFile, sourceJsFile, sourceCssFile];
  const needsRebuild = sources.some(s => existsSync(s) && statSync(s).mtimeMs > distTime);

  if (needsRebuild) {
    try {
      execSync(`node "${resolve(projectDir, "build.mjs")}" /`, { cwd: projectDir, stdio: "ignore" });
      console.log("[preview] Auto-rebuilt dist to sync source edits.");
    } catch (e) {
      console.error("[preview] Auto-rebuild error:", e.message);
    }
  }
}

ensureDistUpToDate();

createServer((request, response) => {
  ensureDistUpToDate();
  let pathname;
  try {
    pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
  } catch {
    response.writeHead(400).end("Bad request");
    return;
  }
  const relative = normalize(pathname).replace(/^([/\\])+/, "");
  const clean = relative.replace(/\/$/, "");

  // Serve live data or static files directly from source if requested
  const sourceAsset = resolve(projectDir, relative);
  let file;
  if (
    (relative.startsWith("data" + sep) || relative.startsWith("js" + sep) || relative.startsWith("css" + sep)) &&
    existsSync(sourceAsset) &&
    statSync(sourceAsset).isFile()
  ) {
    file = sourceAsset;
  } else {
    file = resolve(
      distDir,
      clean === "privacy-policy"
        ? "privacy-policy.html"
        : relative || "index.html",
    );
  }

  if (file !== distDir && !file.startsWith(`${distDir}${sep}`) && !file.startsWith(`${projectDir}${sep}`)) {
    response.writeHead(403).end("Forbidden");
    return;
  }
  if (existsSync(file) && statSync(file).isDirectory())
    file = join(file, "index.html");
  if (!existsSync(file) || !statSync(file).isFile()) {
    response.writeHead(404).end("Not found");
    return;
  }
  response.writeHead(200, {
    "Content-Type": types[extname(file)] || "application/octet-stream",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    "Pragma": "no-cache",
    "Expires": "0",
  });
  createReadStream(file).pipe(response);
}).listen(port, () =>
  console.log(`ASSETZ preview running at http://localhost:${port}/`),
);
