const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['www.datocms-assets.com'],
  },
  i18n,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            titleProp: true,
            svgProps: {
              focusable: true,
            },
          },
        },
      ],
    });

    return config;
  },
}
