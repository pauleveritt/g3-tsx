import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // setupFiles: ["./setup.vitest.js"],
    environment: "happy-dom",
    forceRerunTriggers: ["./_layouts/**/*.tsx"],
  },
});
