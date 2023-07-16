/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@nivo"],
  experimental: { esmExternals: "loose", largePageDataBytes: 128 * 10000 },
};

module.exports = nextConfig;
