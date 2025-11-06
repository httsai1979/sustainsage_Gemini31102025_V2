const path = require('path');

module.exports = {
  i18n: {
    locales: ['en', 'zh-TW'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
