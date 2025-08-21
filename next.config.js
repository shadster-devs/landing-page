/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // This is the key part - setting basePath to empty string for custom domain
  basePath: '',
  assetPrefix: '',
  trailingSlash: true,
};

module.exports = nextConfig;
