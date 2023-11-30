<script lang="ts">
	import t from "$lib/localise";
	import { q } from "$lib/store";
	import { fuzzySearch } from "$lib/utils";
	import services from "$lib/data/service.json";
	let searchService: string;
</script>

<div role="group">
	{$t.services}
	<div class="checkboxes fade-right" style="height: 13.5rem">
		{#each services.filter( service => fuzzySearch(searchService, service.name) ) as service}
			<label>
				<input bind:group={$q.services} type="checkbox" value={service} />
				<span class="rounded">
					<i class="fa-regular fa-{service.icon}" />
					{service.name}
				</span>
			</label>
		{/each}
	</div>

	<div class="row">
		<input
			bind:value={searchService}
			type="text"
			placeholder={$t.search}
			style="width: 7rem"
		/>
		{#if $q.services.length > 0}
			<button on:click={() => ($q.services = [])}>
				{$t.reset}
			</button>
		{/if}
	</div>
</div>
