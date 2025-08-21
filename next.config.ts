import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  // Remove the basePath for custom domain
  // basePath: '/landing-page',
  // Remove the assetPrefix for custom domain
  // assetPrefix: '/landing-page',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;