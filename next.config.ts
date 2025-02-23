import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    distDir: 'out',
    images: {
        unoptimized: true,
    },
    basePath: "/darts-games",
    assetPrefix: "/darts-games/",
    generateBuildId: async () => {
        return `${new Date().getTime()}`;
    },
};

export default nextConfig;
