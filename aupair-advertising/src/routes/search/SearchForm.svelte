<script lang="ts">
	import Where from "./Where.svelte";
	import Nationality from "./Nationality.svelte";
	import Age from "./Age.svelte";
	import When from "./When.svelte";
	import Rate from "./Rate.svelte";

	export let panel: string | boolean = false;
</script>

{#if panel == "WHERE"}
	<Where />
{:else if panel == "WHO"}
	<div class="col" style="align-items: center">
		<div class="col" style="align-items: flex-start">
			<div class="row spread">
				<Age />
			</div>
			<Nationality />
		</div>
	</div>
{:else if panel == "RATE"}
	<Rate />
{:else if panel == "WHEN"}
	<When />
{/if}
