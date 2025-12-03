const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sustainsage.com';

const locales = ['en-GB', 'en-US', 'zh-TW', 'zh-CN', 'zh-HK', 'ja-JP'];

const alternateRefs = locales.map((locale) => ({
  href: `${siteUrl}${locale === 'en-GB' ? '' : `/${locale}`}`,
  hreflang: locale,
}));

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapPath: './public/sitemap.xml',
  robotsTxtPath: './public/robots.txt',
  additionalPaths: [],
  alternateRefs,
};
