
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.VERCEL ? undefined : "standalone",

  images: {
    qualities: [75, 90],
  },
};

export default nextConfig;
