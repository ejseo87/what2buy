import type { Config } from "@react-router/dev/config";
import { config } from "dotenv";
import { vercelPreset } from "@vercel/react-router/vite";

// Load environment variables from .env file with override
config({ override: true });

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
} satisfies Config;
