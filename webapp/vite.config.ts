import { defineConfig } from "vitest/config";

export default defineConfig({
  base: "/app/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  test: {
    environment: "node",
  },
});
