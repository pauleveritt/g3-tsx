import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: ["./setup.vitest.ts"],
    environment: "happy-dom",
    forceRerunTriggers: ["./_layouts/**/*.tsx"],
  },
});
