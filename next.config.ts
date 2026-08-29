import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/dnd-name-generator",
        destination: "/fantasy-character-name-generator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
