const fs = require('fs');
const path = require('path');

const config = require('../next-sitemap.config.js');

const siteUrl = (config.siteUrl || '').replace(/\/$/, '') || 'https://sustainsage.com';
const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');

const STATIC_ROUTES = ['/', '/about', '/services', '/resources', '/blog', '/contact'];

function getBlogRoutes() {
  const dir = path.join(__dirname, '..', 'content', 'blog', 'en');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.md'))
    .map((name) => `/blog/${name.replace(/\.md$/, '')}`);
}

function buildSitemapEntries(routes) {
  const lastmod = new Date().toISOString();
  return routes
    .map((route) => {
      const loc = `${siteUrl}${route}`;
      return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`;
    })
    .join('');
}

function writeSitemap(routes) {
  const body = buildSitemapEntries(routes);
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>\n`;
  fs.writeFileSync(sitemapPath, xml, 'utf8');
}

function writeRobots() {
  if (!config.generateRobotsTxt) return;
  const lines = [`User-agent: *`, `Allow: /`, `Sitemap: ${siteUrl}/sitemap.xml`, ''];
  fs.writeFileSync(robotsPath, lines.join('\n'), 'utf8');
}

function main() {
  const extra = Array.isArray(config.additionalPaths) ? config.additionalPaths : [];
  const routes = Array.from(new Set([...STATIC_ROUTES, ...getBlogRoutes(), ...extra]));
  writeSitemap(routes);
  writeRobots();
}

main();
