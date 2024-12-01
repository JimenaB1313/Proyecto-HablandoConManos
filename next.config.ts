import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
      return [
        {
          source: "/api/(.*)",
          headers: [
            {
              key: "Acces-Control-Allow-Origin",
              value: "*",
            },
            {
              key: "Acces-Control-Allow-Methods",
              value: "GET, POST, PUT, DELETE, OPTIONS",
            },
            {
              key: "Acces-Control-Allow-Headers",
              value: "Content-Type, Authorization",
            },
            {
              key: "Content-Range",
              value: "bytes: 0-9/*",
            },
          ],
        },
      ];
  },
};

export default nextConfig;
