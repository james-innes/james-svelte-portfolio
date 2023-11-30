import vercel from "@sveltejs/adapter-vercel";
import preprocess from "svelte-preprocess";
import autoprefixer from "autoprefixer";
import Surreal from "surrealdb.js";

import "dotenv/config";

async function getPrerenderProfileIds() {
	const db = new Surreal("database address rpc");

	await db.use("website-name", "website-name");
	const prerender = await db.query(`SELECT code FROM profile`);
	db.close();

	return prerender[0].result.map(record => "/" + record.code);
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: vercel(),
		prerender: {
			concurrency: 10000,
			crawl: false,
			entries: await getPrerenderProfileIds(),
			handleHttpError: "warn",
		},
	},
	preprocess: preprocess({
		preserve: ["ld+json"],
		postcss: {
			plugins: [autoprefixer],
		},
	}),
	onwarn: (warning, handler) => {
		if (warning.code.startsWith("a11y-")) {
			return;
		}
		handler(warning);
	},
};

export default config;
