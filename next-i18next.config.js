/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    locales: ['en-GB', 'en-US', 'zh-TW', 'zh-CN', 'zh-HK', 'ja-JP'],
    defaultLocale: 'en-GB',
    localeDetection: false,
  },
  fallbackLng: 'en-GB',
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
