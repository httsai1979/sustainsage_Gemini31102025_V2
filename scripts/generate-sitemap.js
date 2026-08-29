const fs = require('fs');
const path = require('path');
const config = require('../next-sitemap.config.js');

const siteUrl = String(config.siteUrl).replace(/\/$/, '');
const core = ['/', '/coaching', '/for-companies', '/about', '/reflection-tools', '/contact'];
const tools = [
  'change-context-map',
  'stakeholder-resistance-map',
  'change-narrative-builder',
  'role-decision-rights',
  'difficult-conversation-planner',
  'adoption-experiment-ladder',
  'resilience-capacity-check',
  'motivation-commitment-map',
  'emotion-triangle',
  'thought-log',
  'self-talk-reframe',
  'values-map',
  'role-separation',
  'choice-clarifier',
  'behaviour-ladder',
].map((slug) => `/tools/${slug}`);
const legal = ['/legal/privacy', '/legal/cookie-policy', '/legal/coaching-terms', '/legal/coaching-boundaries'];
const routes = [...core, ...tools, ...legal];
const entries = routes.flatMap((route) => {
  const clean = route === '/' ? '' : route;
  return [`${siteUrl}${clean}`, `${siteUrl}/zh-TW${clean}`];
});
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), xml, 'utf8');
fs.writeFileSync(path.join(__dirname, '..', 'public', 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: ${siteUrl}/sitemap.xml\n`, 'utf8');
console.log(`Generated sitemap with ${entries.length} public URLs.`);
