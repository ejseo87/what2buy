import { reactRouter } from "@react-router/dev/vite";
import {
  sentryReactRouter,
  type SentryReactRouterBuildOptions,
} from "@sentry/react-router";

import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { config } from "dotenv";

// Load environment variables from .env file with override
config({ override: true });
const sentryConfig: SentryReactRouterBuildOptions = {
  org: "eun-ju-seo",
  project: "javascript-react-router",
  // An auth token is required for uploading source maps;
  // store it in an environment variable to keep it secure.
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // ...
};
export default defineConfig((config) => ({
  plugins: [
    reactRouter(),
    tsconfigPaths(),
    sentryReactRouter(sentryConfig, config),
  ],
  server: {
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "refer-declared-doing-laptops.trycloudflare.com",
      ".trycloudflare.com", // 모든 Cloudflare Tunnel 도메인 허용
    ],
  },
  // 이미지 최적화 설정
  assetsInclude: ["**/*.png", "**/*.jpg", "**/*.jpeg", "**/*.svg"],
}));
