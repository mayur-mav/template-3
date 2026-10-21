import { createReadStream, existsSync, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const projectDir = fileURLToPath(new URL('.', import.meta.url));
const distDir = resolve(projectDir, 'dist');
const port = Number(process.env.PORT || 5509);
const types = { '.css':'text/css; charset=utf-8', '.html':'text/html; charset=utf-8', '.ico':'image/x-icon', '.js':'text/javascript; charset=utf-8', '.json':'application/json; charset=utf-8', '.png':'image/png', '.svg':'image/svg+xml', '.webp':'image/webp' };
if (!existsSync(join(distDir, 'index.html'))) { console.error('Build Mana first: node build.mjs /'); process.exit(1); }
createServer((request, response) => {
 let pathname; try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); } catch { response.writeHead(400).end('Bad request'); return; }
 const relative = normalize(pathname).replace(/^([/\\])+/, ''); const clean = relative.replace(/\/$/, '');
 let file = resolve(distDir, clean === 'privacy-policy' ? 'privacy-policy.html' : (relative || 'index.html'));
 if (file !== distDir && !file.startsWith(`${distDir}${sep}`)) { response.writeHead(403).end('Forbidden'); return; }
 if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
 if (!existsSync(file) || !statSync(file).isFile()) { response.writeHead(404).end('Not found'); return; }
 response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' }); createReadStream(file).pipe(response);
}).listen(port, () => console.log(`BHARTIYA preview running at http://localhost:${port}/`));