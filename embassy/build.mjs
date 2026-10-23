import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const seoBySlug = {
  assetz: { name: "Assetz Property Group", title: "Assetz Property Group Bangalore | Assetz Apartments", heading: "Assetz Property Group Bangalore", description: "Explore Assetz Property Group Bangalore and Assetz Property Group projects. Find Assetz apartments, Assetz East Point Bangalore in Bellandur, and Assetz upcoming projects in Bangalore." },
  bhartiya: { name: "Bhartiya Group", title: "Bhartiya Group Bangalore | Bhartiya City", heading: "Bhartiya Group Bangalore", description: "Explore Bhartiya Group Bangalore and Bhartiya real estate, including Bhartiya City Bangalore, Leela Bhartiya City Bangalore, and Bangalore Bhartiya City." },
  "ds-max": { name: "DS-MAX Properties", title: "DS Max Properties Bangalore | DS Max Apartments", heading: "DS Max Properties Bangalore", description: "Explore DS Max Properties Bangalore, DS Max apartments, and DS Max flats for sale in Bangalore, including DS Max Yelahanka, DS Max Sarjapur, DS Max Sky Fields, and DS Max Sky Sisira." },
  embassy: { name: "Embassy Group", title: "Embassy Group Projects in Bangalore", heading: "Embassy Group Projects in Bangalore", description: "Explore Embassy Group Bangalore and Embassy Group real estate, including Embassy developers Bangalore, Embassy group projects, and Embassy group projects in Bangalore." },
  mana: { name: "Mana Projects", title: "Mana Projects Bangalore | Mana Builders", heading: "Mana Projects Bangalore", description: "Explore Mana Projects Bangalore, Mana Builders Bangalore, Mana Properties Bangalore, and Mana Projects Sarjapur Road." },
  sobha: { name: "SOBHA Limited", title: "Sobha Projects in Bangalore | Sobha Realty", heading: "Sobha Projects in Bangalore", description: "Explore Sobha projects in Bangalore, Sobha apartments Bangalore, Sobha Realty, Sobha Dream Acres Bangalore, Sobha City Bangalore, and Sobha upcoming projects in Bangalore." },
};

async function loadBuilderSeo(dataFile, slug) {
  const source = readFileSync(dataFile, "utf8");
  const dataModule = await import(`data:text/javascript;base64,${Buffer.from(source).toString("base64")}`);
  const properties = Object.values(dataModule).find((value) => Array.isArray(value) && value.some((item) => item?.id && (item?.title || item?.name))) || [];
  return { ...seoBySlug[slug], properties };
}

function seoEscape(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function seoDecode(value = "") {
  return String(value).replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
}

function seoShorten(value, fallback) {
  const text = String(value || fallback || "").replace(/\s+/g, " ").trim();
  if (text.length <= 155) return text;
  const candidate = text.slice(0, 152);
  const boundary = candidate.lastIndexOf(" ");
  return `${candidate.slice(0, boundary > 110 ? boundary : 152).replace(/[,. ]+$/, "")}...`;
}

function seoReplaceId(html, id, content) {
  const pattern = new RegExp(`(<([a-z][a-z0-9]*)\\b[^>]*\\bid="${id}"[^>]*>)[\\s\\S]*?(<\\/\\2>)`, "i");
  return html.replace(pattern, (_match, opening, _tag, closing) => `${opening}${content}${closing}`);
}

function applyBuilderSeo(html, seo, route, basePath, siteOrigin) {
  const property = seo.properties.find((item) => String(item.id) === String(route));
  const sourceTitle = seoDecode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || seo.title);
  const sourceDescription = seoDecode(html.match(/<meta\s+name="description"[^>]*content="([^"]*)"/i)?.[1] || seo.description);
  const projectName = property?.title || property?.name;
  const title = property ? `${projectName} | ${seo.name}` : sourceTitle;
  const description = property ? seoShorten(property.overview, `Explore ${projectName} by ${seo.name}. ${property.location || ""}`) : sourceDescription;

  if (property) {
    html = seoReplaceId(html, "detailTitle", seoEscape(projectName));
    html = seoReplaceId(html, "detailLocation", seoEscape(property.location || ""));
    html = seoReplaceId(html, "detailOverview", seoEscape(property.overview || description));
    html = html.replace("</head>", '<style>body[data-property-route-loading="true"] #catalogView{display:none!important}body[data-property-route-loading="true"] #detailView{display:block!important}</style>\n</head>');
  } else {
    html = html.replace(/(<h1\b[^>]*>)[\s\S]*?(<\/h1>)/i, (_match, opening, closing) => `${opening}${seoEscape(seo.heading)}${closing}`);
    html = html.replace(/(<h1\b[^>]*>[\s\S]*?<\/h1>[\s\S]*?<p\b[^>]*>)[\s\S]*?(<\/p>)/i, (_match, opening, closing) => `${opening}${seoEscape(description)}${closing}`);
  }

  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seoEscape(title)}</title>`);
  html = html.replace(/(<meta\s+name="description"[^>]*content=")[^"]*("[^>]*>)/i, (_match, opening, closing) => `${opening}${seoEscape(description)}${closing}`);
  const ogTitle = `<meta property="og:title" content="${seoEscape(title)}">`;
  const ogDescription = `<meta property="og:description" content="${seoEscape(description)}">`;
  html = /property="og:title"/.test(html) ? html.replace(/<meta\s+property="og:title"[^>]*>/i, ogTitle) : html.replace("</head>", `    ${ogTitle}\n</head>`);
  html = /property="og:description"/.test(html) ? html.replace(/<meta\s+property="og:description"[^>]*>/i, ogDescription) : html.replace("</head>", `    ${ogDescription}\n</head>`);
  html = html.replace(/\s*<link\b(?=[^>]*rel="canonical")(?=[^>]*yourdomain\.com)[^>]*>/i, "");
  if (siteOrigin) {
    const path = property ? `${encodeURIComponent(route)}/` : "";
    const canonical = `${siteOrigin}${basePath}${path}`;
    html = html.replace(/<link\b(?=[^>]*rel="canonical")[^>]*>/i, "");
    html = html.replace(/<meta\b(?=[^>]*property="og:url")[^>]*>/i, "");
    html = html.replace("</head>", `    <link rel="canonical" href="${seoEscape(canonical)}">\n    <meta property="og:url" content="${seoEscape(canonical)}">\n</head>`);
  }
  return html;
}

const projectDir = dirname(fileURLToPath(import.meta.url));
const outputDir = join(projectDir, "dist");
const requestedBasePath = process.argv[2] || "/";
const cleanBase = requestedBasePath.replace(/^\/+|\/+$/g, "");
const basePath = `/${cleanBase}${cleanBase ? "/" : ""}`;
const sourceHtml = readFileSync(join(projectDir, "index.html"), "utf8");
const data = readFileSync(join(projectDir, "data", "embassy.js"), "utf8");
const seoData = await loadBuilderSeo(join(projectDir, "data", "embassy.js"), "embassy");
const propertyIds = seoData.properties.map(({ id }) => String(id));
const sectionRoutes = ["residences", "about", "faq", "contact"];
const allRoutes = [...sectionRoutes, ...propertyIds];
const siteOrigin = process.env.SITE_ORIGIN?.replace(/\/$/, "");
const apacheRules = [
  "Options -MultiViews",
  "RewriteEngine On",
  "RewriteRule ^privacy-policy/?$ privacy-policy.html [L]",
  ...allRoutes.map(
    (route) => `RewriteRule ^${route}/?$ ${route}/index.html [L]`,
  ),
].join("\n");
function routedHtml(route = "") {
  let html = sourceHtml.replace(
    "<head>",
    `<head>\n    <base href="${basePath}">`,
  );
  if (propertyIds.includes(route))
    html = html.replace("<body ", '<body data-property-route-loading="true" ');
  if (siteOrigin)
    html = html.replace(
      "</head>",
      `    <link rel="canonical" href="${siteOrigin}${basePath}${route ? `${route}/` : ""}">\n</head>`,
    );
  return applyBuilderSeo(html, seoData, route, basePath, siteOrigin);
}
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "index.html"), routedHtml());
for (const directory of ["css", "js", "data"])
  cpSync(join(projectDir, directory), join(outputDir, directory), {
    recursive: true,
  });
cpSync(
  join(projectDir, "privacy-policy.html"),
  join(outputDir, "privacy-policy.html"),
);
writeFileSync(join(outputDir, ".htaccess"), `${apacheRules}\n`);
for (const route of allRoutes) {
  const routeDir = join(outputDir, route);
  mkdirSync(routeDir, { recursive: true });
  writeFileSync(join(routeDir, "index.html"), routedHtml(route));
}
if (siteOrigin) {
  const urls = ["", ...propertyIds].map((route) => {
    const path = route ? `${encodeURIComponent(route)}/` : "";
    return `  <url><loc>${siteOrigin}${basePath}${path}</loc></url>`;
  });
  writeFileSync(join(outputDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`);
}
console.log(
  `Built EMBASSY home page, ${sectionRoutes.length} section routes, and ${propertyIds.length} property routes in ${resolve(outputDir)} (base: ${basePath}).`,
);
