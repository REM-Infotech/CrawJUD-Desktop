// oxlint-disable no-unused-vars
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./app", import.meta.url)),
    },
  },
  build: {
    sourcemap: process.env.NODE_ENV === "development",
  },
});
