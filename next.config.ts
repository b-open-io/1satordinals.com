import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["@stripe/stripe-js"],
  },
};

export default nextConfig;
