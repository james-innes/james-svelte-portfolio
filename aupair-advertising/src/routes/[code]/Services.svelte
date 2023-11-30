<script lang="ts">
	import { fuzzySearch } from "$lib/utils";
	import t from "$lib/localise";
	import allServices from "$lib/data/service.json";

	export let services: string[];

	type Service = {
		name: string;
		icon: string;
	};

	const icon = (service: string) =>
		// @ts-ignore
		allServices.find((_service: Service) => _service.name == service).icon ||
		"xmark";

	let search: string;
</script>

<section class="col">
	<h3>{$t.services}</h3>
	<div class="services fade-right" style="height: 15rem">
		{#each services.filter(service => fuzzySearch(search, service)) as service}
			<div class="row">
				<i class="fa-regular fa-{icon(service)}" />
				{service}
			</div>
		{/each}
	</div>

	<input
		bind:value={search}
		type="text"
		placeholder={$t.search}
		style="width: 7rem"
	/>
</section>

<style>
	.services {
		display: flex;
		flex-flow: column wrap;
		overflow-x: auto;
		row-gap: 0.5rem;
		column-gap: 1rem;
	}
</style>
