const fs = require('fs');
const path = require('path');

/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config.js');

const nextConfig = {
  reactStrictMode: true,
  i18n,
  webpack(config) {
    config.resolve = config.resolve || {};
    config.resolve.fallback = {
      ...(config.resolve.fallback ?? {}),
      fs: false,
      path: false,
    };

    return config;
  },

  async exportPathMap(defaultMap) {
    const map = { ...defaultMap };
    const serviceSlugs = ['career-return', 'immigrant-job', 'graduate-start'];
    const subpages = ['pricing', 'readiness', 'process', 'agreement', 'faq', 'cases'];

    for (const slug of serviceSlugs) {
      map[`/services/${slug}`] = { page: '/services/[slug]', query: { slug } };

      for (const subpage of subpages) {
        map[`/services/${slug}/${subpage}`] = {
          page: `/services/[slug]/${subpage}`,
          query: { slug },
        };
      }

      const baseContentPath = path.join(__dirname, 'content', 'services', `${slug}.json`);

      if (fs.existsSync(baseContentPath)) {
        try {
          const serviceContent = JSON.parse(fs.readFileSync(baseContentPath, 'utf-8'));
          const caseItems = Array.isArray(serviceContent?.cases?.items)
            ? serviceContent.cases.items
            : [];

          for (const item of caseItems) {
            if (item?.slug) {
              map[`/services/${slug}/cases/${item.slug}`] = {
                page: '/services/[slug]/cases/[caseSlug]',
                query: { slug, caseSlug: item.slug },
              };
            }
          }
        } catch (error) {
          console.warn(`Failed to load case paths for service ${slug}:`, error);
        }
      }
    }

    return map;
  },

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

  async redirects() {
    return [
      {
        source: '/service',
        destination: '/services',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
