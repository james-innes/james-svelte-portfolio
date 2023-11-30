import { error } from "@sveltejs/kit";
import type { RequestEvent } from "@sveltejs/kit";
import { Client, Environment } from "square";
import { v4 as uuidv4 } from "uuid";
import { SQUARE_ENV, SQUARE_KEY } from "$env/static/private";
import init from "$lib/db";

const db = await init();

const paymentsApi = new Client({
	environment: Environment[SQUARE_ENV as keyof typeof Environment],
	accessToken: SQUARE_KEY,
}).paymentsApi;

export async function POST({ request }: RequestEvent) {
	const { token, total, req } = await request.json();

	await paymentsApi
		.createPayment({
			sourceId: token,
			amountMoney: {
				amount: total,
				currency: "GBP",
			},
			idempotencyKey: uuidv4(),
		})
		.catch(e => {
			throw error(500, e);
		});

	const response = {};

	return new Response(JSON.stringify(response), { status: 201 });
}
