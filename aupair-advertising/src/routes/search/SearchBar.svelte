<script lang="ts">
	import SearchForm from "./SearchForm.svelte";
	import SearchOptions from "./SearchOptions.svelte";
	import SearchButton from "./SearchButton.svelte";

	export let handleSearch: any;
	export let loading = false;

	$: panel = false;
</script>

<div class="box col" class:panel>
	<div class="bar" class:panel>
		<SearchOptions bind:panel />
		<SearchButton bind:panel {handleSearch} {loading} />
	</div>
	<div class="content" class:panel>
		<SearchForm bind:panel />
	</div>
</div>

<style>
	.box {
		z-index: 10;
		position: absolute;
		right: 50%;
		transform: translate(50%, 0rem);
		border: var(--thick) solid var(--input-border);
		border-radius: 3rem;
		background: var(--background);
		transition: transform 0.5s, box-shadow ease-out 0.4s;
	}

	.box.panel {
		padding: 1rem 1rem 1.5rem;
		gap: 1.5rem;
		transform: translate(50%, 1rem);
		border-radius: 1.5rem;
		min-width: 60svw;
		border-color: var(--grey);
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
	}

	.content {
		display: none;
	}

	.content.panel {
		display: block;
		animation: enter 0.3s;
	}

	@keyframes enter {
		from {
			opacity: 0;
			transform: translateY(-1rem);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	@media screen and (max-width: 670px) {
		.box.panel {
			transform: translate(50%, -1rem);
			width: 100vw;
			border-radius: 0 0 2rem 2rem;
			border: none;
			border-bottom: var(--thick) solid var(--grey);
		}

		.bar.panel {
			display: flex;
			flex-direction: column-reverse;
			gap: 1rem;
		}
	}
</style>
