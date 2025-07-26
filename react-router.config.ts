import type { Config } from "@react-router/dev/config";
import { config } from "dotenv";
import { vercelPreset } from "@vercel/react-router/vite";
import { sentryOnBuildEnd } from "@sentry/react-router";

// Load environment variables from .env file with override
config({ override: true });

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  presets: [vercelPreset()],
  buildEnd: async ({ viteConfig, reactRouterConfig, buildManifest }) => {
    // ...
    // Call this at the end of the hook
    +(await sentryOnBuildEnd({ viteConfig, reactRouterConfig, buildManifest }));
  },
} satisfies Config;
