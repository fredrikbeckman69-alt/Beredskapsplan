import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.GITHUB_ACTIONS ? "export" : (process.env.DOCKER ? "standalone" : undefined),
  basePath: "/Beredskapsplan",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
