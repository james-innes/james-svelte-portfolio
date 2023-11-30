<script lang="ts">
	import t, { displayCurrency, locale } from "$lib/localise.js";
	import { convert } from "cashify";
	import type { Rates } from "$lib/types/Profile";
	import exchangeRate from "$lib/data/exchangeRate.json";

	export let rates: Rates;

	let inOut = ["in", "out"] as (keyof Rates)[];
	let durations = [
		"15 mins",
		"½ Hour",
		"1 Hour",
		"1½ Hours",
		"2 Hours",
		"3 Hours",
		"4 Hours",
	];

	function money(amount: number | undefined, from: string, to: string): string {
		if (amount === undefined) {
			return "";
		}

		return new Intl.NumberFormat($locale, {
			style: "currency",
			currency: $displayCurrency,
			maximumFractionDigits: 0,
		}).format(
			convert(amount, {
				from,
				to,
				base: "USD",
				rates: exchangeRate,
			})
		);
	}

	let askingCurrency = "GBP";
</script>

<section class="col">
	<table>
		<th colspan="1" />

		<tbody>
			{#each durations as duration}
				{#if [...rates.in, ...rates.out].find(r => r.duration == duration)}
					<tr>
						<td>{duration}</td>
						{#each inOut as where}
							<td>
								{money(
									rates[where].find(r => r.duration == duration)?.rate,
									askingCurrency,
									$displayCurrency
								)}
							</td>
						{/each}
					</tr>
				{/if}
			{/each}
		</tbody>
	</table>

	{#if $displayCurrency != askingCurrency}
		<div class="row">
			<span class="pill">{$displayCurrency}</span>
			<i class="fa-solid fa-arrow-right" />
			<span class="pill">{askingCurrency}</span>
		</div>
	{/if}
</section>
