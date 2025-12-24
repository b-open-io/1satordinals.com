import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@stripe/stripe-js"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.cdn.printful.com",
      },
    ],
  },
};

export default nextConfig;
