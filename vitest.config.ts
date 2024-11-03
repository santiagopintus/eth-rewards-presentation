import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
  },
  publicDir: "public",
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@comp": path.resolve(__dirname, "./src/components"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@images": path.resolve(__dirname, "./public"),
    },
  },
});
