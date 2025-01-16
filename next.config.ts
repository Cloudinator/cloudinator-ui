import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cloudinary.istad.co",
                pathname: "/photo-:id",
            },
            {
                protocol: "https",
                hostname: "example.com",
                pathname: "/image/:id",
            },
        ],
    },
};

export default nextConfig;