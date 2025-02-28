import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    registry: ["./registry/**/*"],
  },
  images: {
    domains: ["images.unsplash.com"],
  },
  /* config options here */
};

export default nextConfig;
