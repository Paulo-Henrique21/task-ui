import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.platform === 'win32' ? undefined : 'standalone',
  /* config options here */
};

export default nextConfig;
