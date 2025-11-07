/** @type {import('next-i18next').UserConfig} */
module.exports = {
  // 根據你的規劃書 4.C 節
  i18n: {
    // 支援的語言列表
    locales: ['en', 'tc', 'sc'],
    // 預設語言
    defaultLocale: 'en',
    
    // ！！！ 錯誤修正 ！！！
    // 這裡必須是 false，以避免與 next-i18next 套件的
    // 內建偵測機制衝突。
    localeDetection: false, 
  },
  
  // (可選) 在伺服器端載入翻譯檔案的路徑
  localePath:
    typeof window === 'undefined'
      ? require('path').resolve('./public/locales')
      : '/locales',
  
  // (可選) 當切換語言時，是否重新載入頁面
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};