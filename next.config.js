const { i18n } = require('./next-i18next.config.js');
const { redirectMap } = require('./lib/redirectMap');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.ctfassets.net' }],
    dangerouslyAllowSVG: true,
  },
  async redirects() {
    return redirectMap;
  },
  webpack(config) {
    config.resolve = config.resolve || {};
    config.resolve.fallback = { ...(config.resolve.fallback ?? {}), fs: false, path: false };
    return config;
  },
};

module.exports = nextConfig;
