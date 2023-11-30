import type { Load } from "@sveltejs/kit";
import init from "$lib/db";

export const prerender = true;

const db = await init();

export const load: Load = async ({ params }) => {
	const profile = await db.query(`SELECT * FROM profile WHERE code = $code`, {
		code: params.code,
	});

	console.log(params.code);

	return profile[0].result[0];
};
