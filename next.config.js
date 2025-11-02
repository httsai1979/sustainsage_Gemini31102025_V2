/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config.js');

const nextConfig = {
  reactStrictMode: true,
  i18n,

  images: {
    // **!!! 錯誤修正 !!!**
    // 這是 "images.domains" 的新語法，
    // 用 "remotePatterns" 來取代
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
    
    // 這一行是我們上次加的，保持不變
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;