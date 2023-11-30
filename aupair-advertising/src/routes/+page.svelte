<script lang="ts">
	import { onMount } from "svelte";
	import { q } from "$lib/store";
	import t from "$lib/localise";
	import Card from "./Card.svelte";
	import initial from "$lib/data/initial.json";
	import search from "./search/search.js";
	import SearchBar from "./search/SearchBar.svelte";

	let page = 0;
	let sentinel: Element;
	$: results = initial;

	$: profiles = results.slice(0, 50 * (page + 1));
	let loading = false;

	async function handleSearch() {
		console.log("handleSearch");
		loading = true;
		page = 0;

		await search($q).then((res: any) => {
			results = [];
			results = res;
			loading = false;
		});
	}

	onMount(
		() =>
			loading == false &&
			new IntersectionObserver(
				entries => entries.some(entry => entry.intersectionRatio > 0) && page++
			).observe(sentinel)
	);
</script>

<SearchBar {handleSearch} {loading} />

{#if loading}
	<div style="min-height: 80svh;">
		<div class="message" style="padding: 4rem 2rem;">
			{$t.loading}
		</div>
	</div>
{:else if !loading && results.length == 0}
	<p class="message" style="padding: 4rem 2rem;">{$t.changeSearchOptions}</p>
{:else}
	<div class="gallery">
		{#each profiles as { code, images }}
			<Card {code} {images} />
		{/each}
	</div>
{/if}

<div bind:this={sentinel} />

<style>
	@media (max-width: 490px) {
		.gallery {
			margin: 0 -1rem;
			padding: 0;
			gap: 0;
			min-height: 80svh;
		}
	}
</style>
