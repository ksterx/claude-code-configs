// Template: Vitest Configuration
// Usage: Copy to project root as vitest.config.ts

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    // Environment
    environment: "jsdom",
    globals: true,

    // Setup files
    setupFiles: ["./tests/setup.ts"],

    // Test patterns
    include: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
    exclude: ["node_modules", ".next", "e2e"],

    // Coverage
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json"],
      exclude: [
        "node_modules/",
        "tests/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/types/**",
      ],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },

    // Performance
    pool: "threads",
    poolOptions: {
      threads: {
        singleThread: false,
      },
    },

    // Timeout
    testTimeout: 10000,
  },

  // Path aliases (match tsconfig.json)
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "@/components": path.resolve(__dirname, "./components"),
      "@/lib": path.resolve(__dirname, "./lib"),
    },
  },
});
