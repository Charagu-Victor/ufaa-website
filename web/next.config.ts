import type { NextConfig } from "next";

const strapiUrl =
  process.env.NEXT_PUBLIC_STRAPI_URL ?? process.env.STRAPI_URL ?? "http://localhost:1337";
const strapi = new URL(strapiUrl);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: strapi.protocol.replace(":", "") as "http" | "https",
        hostname: strapi.hostname,
        port: strapi.port,
        pathname: "/uploads/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
