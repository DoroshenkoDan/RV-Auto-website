import { withPayload } from "@payloadcms/next/withPayload";
import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const lowMemoryBuild = process.env.LOW_MEMORY_BUILD === "true";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [60, 75],
  },
  experimental: {
    globalNotFound: true,
    ...(lowMemoryBuild && {
      cpus: 1,
      webpackBuildWorker: true,
      webpackMemoryOptimizations: true,
      serverSourceMaps: false,
    }),
  },
  ...(lowMemoryBuild && {
    typescript: {
      tsconfigPath: "tsconfig.build.json",
    },
    webpack: (config, { dev }) => {
      if (!dev) {
        config.cache = false;
      }

      return config;
    },
  }),
};

export default withPayload(withNextIntl(nextConfig));
