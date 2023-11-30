<script lang="ts">
	import t from "$lib/localise.js";

	export let handleSearch: Function;
	export let loading: boolean;
	export let panel: string | boolean;
</script>

<button
	on:click={() => {
		if (panel) {
			panel = false;
			handleSearch();
		} else {
			panel = "WHERE";
		}
	}}
	class:panel
	class="bold umami--click--search"
	id="search"
>
	{#if loading}
		<i class="fa-solid fa-spinner-third fa-spin" />
	{:else}
		<i class="fa fa-magnifying-glass" />
	{/if}
	<span>{$t.search}</span>
</button>

<style>
	#search {
		border-radius: 3rem;
	}

	#search:not(.panel) {
		box-shadow: 0 0 0 1px var(--bold-background);
	}

	#search:hover,
	#search:active {
		box-shadow: 0 0 0 1px var(--pink);
		transform: unset;
	}

	@media screen and (max-width: 725px) {
		#search > span {
			display: none;
		}

		#search.panel {
			width: var(--control-height);
		}

		#search.panel {
			width: 100%;
		}

		#search.panel > span {
			display: flex;
		}
	}

	@media screen and (min-width: 670px) {
		#search.panel {
			width: var(--control-height);
		}

		#search.panel > span {
			display: none;
		}
	}
</style>
