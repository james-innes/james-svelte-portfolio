import type { Load } from "@sveltejs/kit";
import init from "$lib/db";

export const prerender = false;
const db = await init();

export const load: Load = async ({ params }) => {
	const result = await db.query(`SELECT * FROM profile WHERE code = $code`, {
		code: params.code,
	});

	return result[0].result[0];
};
