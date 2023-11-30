<script lang="ts">
	import t from "$lib/localise";
	import { onMount } from "svelte";
	import { theme } from "$lib/store";
	import cardStyle from "./cardStyle.js";
	import {
		payments,
		type ApplePay,
		type Card,
		type GooglePay,
	} from "@square/web-sdk";

	export let res;
	export let req: any;

	$: total = 100;
	let card: Card, apple: ApplePay, google: GooglePay, process: boolean;
	let buttonColor: "white" | "black" = $theme == "dark" ? "white" : "black";

	onMount(async () => {
		let square = await payments(
			import.meta.env.VITE_SQUARE_APP,
			import.meta.env.VITE_SQUARE_LOCATION
		);

		if (square) {
			let request = square.paymentRequest({
				countryCode: "GB",
				currencyCode: "GBP",
				total: {
					amount: String((total / 100).toFixed(2)),
					label: "Total",
				},
			});

			if (window.ApplePaySession) {
				apple = await square.applePay(request);
			}

			card = await square.card({
				style: cardStyle[$theme ? "dark" : "light"],
			});
			await card.attach("#card");

			google = await square.googlePay(request);
			await google.attach("#google-pay", {
				buttonType: "short",
				buttonColor,
			});
		}
	});

	async function pay(method: Card | ApplePay | GooglePay) {
		process = true;
		let payment = await method.tokenize();

		let r = await fetch("/pay", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token: payment.token,
				total,
				req,
			}),
		});

		if (r.status == 201) {
			res = await r.json();
		} else {
			process = false;
			let m = "Failed to process payment";
			// @ts-ignore
			window.umami(m);
			alert(m);
		}
	}
</script>

<div class="col">
	<div class="row">
		{#if apple}
			<apple-pay-button
				role="button"
				on:click={() => pay(apple)}
				style="-apple-pay-button-style: {buttonColor}"
			/>
		{/if}

		<div
			id="google-pay"
			on:click={() => pay(google)}
			style="width: min-content"
		/>
	</div>
	<hr />
	<form
		on:submit|preventDefault={() => pay(card)}
		style="max-width: 20rem"
		class="col"
	>
		<div id="card" />
		<button style="width: 8rem">
			{#if process}
				<i class="fa fa-spinner fa-spin" />
			{:else}
				{$t.pay} £1
			{/if}
		</button>
	</form>
</div>

<style>
	form {
		max-width: 20rem;
	}

	apple-pay-button {
		-webkit-appearance: -apple-pay-button;
		-apple-pay-button-type: plain;
		border-radius: var(--radius);
		cursor: pointer;
		height: 46px;
		width: 10rem;
	}

	:global(.sq-card-message) {
		display: none;
		margin: 0.4rem 0 0 1rem !important;
	}

	:global(.sq-visible) {
		display: unset;
	}
</style>
