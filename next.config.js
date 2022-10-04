/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
})

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV === 'development',
  skipWaiting: true,
});

module.exports = withBundleAnalyzer(withPWA({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['yt3.ggpht.com'],
  },
}));
