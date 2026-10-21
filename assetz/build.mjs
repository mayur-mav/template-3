import { cpSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const projectDir = dirname(fileURLToPath(import.meta.url));
const outputDir = join(projectDir, 'dist');
const requestedBasePath = process.argv[2] || '/';
const cleanBase = requestedBasePath.replace(/^\/+|\/+$/g, '');
const basePath = `/${cleanBase}${cleanBase ? '/' : ''}`;
const sourceHtml = readFileSync(join(projectDir, 'index.html'), 'utf8');
const data = readFileSync(join(projectDir, 'data', 'assetz.js'), 'utf8');
const propertyIds = [...data.matchAll(/"id"\s*:\s*"([a-z0-9-]+)"/g)].map(match => match[1]);
const sectionRoutes = ['residences', 'about', 'faq', 'contact'];
const allRoutes = [...sectionRoutes, ...propertyIds];
const siteOrigin = process.env.SITE_ORIGIN?.replace(/\/$/, '');
const apacheRules = ['Options -MultiViews', 'RewriteEngine On', 'RewriteRule ^privacy-policy/?$ privacy-policy.html [L]', ...allRoutes.map(route => `RewriteRule ^${route}/?$ ${route}/index.html [L]`)].join('\n');
function routedHtml(route = '') {
 let html = sourceHtml.replace('<head>', `<head>\n    <base href="${basePath}">`);
 if (propertyIds.includes(route)) html = html.replace('<body ', '<body data-property-route-loading="true" ');
 if (siteOrigin) html = html.replace('</head>', `    <link rel="canonical" href="${siteOrigin}${basePath}${route ? `${route}/` : ''}">\n</head>`);
 return html;
}
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'index.html'), routedHtml());
for (const directory of ['css', 'js', 'data']) cpSync(join(projectDir, directory), join(outputDir, directory), { recursive: true });
cpSync(join(projectDir, 'privacy-policy.html'), join(outputDir, 'privacy-policy.html'));
writeFileSync(join(outputDir, '.htaccess'), `${apacheRules}\n`);
for (const route of allRoutes) { const routeDir = join(outputDir, route); mkdirSync(routeDir, { recursive: true }); writeFileSync(join(routeDir, 'index.html'), routedHtml(route)); }
console.log(`Built ASSETZ home page, ${sectionRoutes.length} section routes, and ${propertyIds.length} property routes in ${resolve(outputDir)} (base: ${basePath}).`);