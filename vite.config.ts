import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { config } from "dotenv";

// Load environment variables from .env file
config();

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
  server: {
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "refer-declared-doing-laptops.trycloudflare.com",
      ".trycloudflare.com", // 모든 Cloudflare Tunnel 도메인 허용
    ],
  },
});
