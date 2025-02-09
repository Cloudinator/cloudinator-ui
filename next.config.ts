import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
                pathname: "/**",
            },
        ],
        domains: ["cloudinator.istad.co"],
    },
    async rewrites() {
        return [
          {
            source: "/uploads/:path*",
            destination: "/uploads/:path*",
          },
        ];
      },
};

export default nextConfig;