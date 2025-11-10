/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    locales: ['en-GB', 'zh-TW', 'zh-CN'],
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
