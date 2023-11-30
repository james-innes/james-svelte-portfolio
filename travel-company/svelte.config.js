import vercel from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/kit/vite";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: vercel(),
  },
  onwarn: (warning, handler) => {
    if (warning.code.startsWith("a11y-")) {
      return;
    }
    handler(warning);
  },
};

export default config;
