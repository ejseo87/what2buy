import type { Config } from "@react-router/dev/config";
import { config } from "dotenv";

// Load environment variables from .env file
config();

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
} satisfies Config;
