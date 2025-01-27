import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/transforms/__tests__/vitest/*.test.ts"],
    globals: true,
  },
});
