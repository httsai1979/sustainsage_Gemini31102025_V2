module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://sustainsage-group.com',
  generateRobotsTxt: true,
  sitemapPath: './public/sitemap.xml',
  robotsTxtPath: './public/robots.txt',
  alternateRefs: [
    { href: 'https://sustainsage-group.com', hreflang: 'en-GB' },
    { href: 'https://sustainsage-group.com/zh-TW', hreflang: 'zh-TW' },
  ],
};
