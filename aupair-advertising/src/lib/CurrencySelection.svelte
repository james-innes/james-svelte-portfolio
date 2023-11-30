<script lang="ts">
	import { fuzzySearch } from "$lib/utils";
	import t, { displayCurrency } from "$lib/localise.js";
	import currency from "$lib/data/currency.json";

	let currencySearch = "";
</script>

<label>
	{$t.currency}
	<input
		bind:value={currencySearch}
		type="text"
		style="width: 12rem"
		placeholder={$t.search}
		autocomplete="off"
		autocorrect="off"
		autocapitalize="off"
		spellcheck="false"
	/>
</label>

<div class="col fade-bottom currency">
	{#each currency.filter( currency => fuzzySearch(currencySearch, Object.values(currency).join()) ) as { isoCountryCode, isoCurrencyCode, name, symbol, nativeName }}
		<button
			style="width: 100%"
			on:click={() => {
				$displayCurrency = isoCurrencyCode;
			}}
		>
			<div>
				<div class="row">
					<span
						class="fi fi-{isoCountryCode?.toLowerCase()}"
						style=" border-radius: 0.2rem"
					/>
					<span>
						{isoCurrencyCode}
						{#if isoCurrencyCode != symbol}
							- {symbol}
						{/if}
					</span>
				</div>
				<p>{name}</p>
				{#if name != nativeName}
					<p>{nativeName}</p>
				{/if}
			</div>
		</button>
	{/each}
</div>

<style>
	.bob:after {
		content: "";
		position: sticky;
		right: bottom;
		height: 1.5rem;
		width: inherit;
		background: linear-gradient(to top, red, green 90%);
		pointer-events: none;
	}

	.currency {
		align-items: start;
		height: 10rem;
		overflow-y: auto;
	}

	.currency button {
		width: 100%;
		height: max-content;
		place-content: flex-start;
		text-align: left;
	}
</style>
