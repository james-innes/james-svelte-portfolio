import { defineConfig } from "@playwright/test";

export default defineConfig({
  globalSetup: "./tests/scripts/globalSetup.ts",
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: true,
  },
  testDir: "tests",
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
  use: {
    baseURL: "http://localhost:5173",
  },
});
