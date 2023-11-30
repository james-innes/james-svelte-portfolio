import { sentrySvelteKit } from "@sentry/sveltekit";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    sentrySvelteKit({
      sourceMapsUploadOptions: {
        org: "travel-company",
        project: "travel-company",
      },
    }),
    sveltekit(),
  ],
  test: {
    include: ["src/**/*.{test,spec}.{js,ts}"],
  },
});
