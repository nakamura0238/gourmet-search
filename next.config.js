/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['imgfp.hotp.jp'],
  },
};

module.exports = nextConfig;
