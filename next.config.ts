import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'export',
    distDir: 'out', // GitHub Pages will serve files from this folder
    images: {
        unoptimized: true, // Disable Next.js image optimization (GitHub Pages doesn't support it)
    },
    basePath: "/darts-scorer-app", // Set base path for GitHub Pages
    assetPrefix: "/darts-scorer-app/",
    generateBuildId: async () => {
        return `${new Date().getTime()}`;
    },
};

export default nextConfig;
