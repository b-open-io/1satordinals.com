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
  async redirects() {
    return [
      {
        // Redirect the Vercel preview alias to the canonical domain
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "1satordinals-com.vercel.app",
          },
        ],
        destination: "https://1satordinals.com/:path*",
        permanent: true, // 308
      },
    ];
  },
};

export default nextConfig;
