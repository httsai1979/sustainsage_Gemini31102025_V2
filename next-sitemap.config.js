const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sustainsage.com';

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapPath: './public/sitemap.xml',
  robotsTxtPath: './public/robots.txt',
  additionalPaths: [],
};
