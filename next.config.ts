import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Gitpro",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
