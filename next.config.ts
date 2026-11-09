import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/the-exchange-website",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
