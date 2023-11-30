<script lang="ts">
	export let panel: string | boolean;

	function toggle(chosen: string | boolean) {
		panel = panel == chosen ? false : chosen;
	}
</script>

<div class="options" class:panel>
	<button
		on:click={() => toggle("WHERE")}
		class:selected={panel == "WHERE"}
		class="umami--click--search-where"
	>
		<i class="fa-regular fa-location-dot" />
		<span>Where</span>
	</button>
	<div class="divider" />
	<button
		on:click={() => toggle("WHO")}
		class:selected={panel == "WHO"}
		class="umami--click--search-who"
	>
		<i class="fa-regular fa-person-dress-simple" />
		<span>Who</span>
	</button>
	<div class="divider" />
	<button
		on:click={() => toggle("RATE")}
		class:selected={panel == "RATE"}
		class="umami--click--search-rate"
	>
		<i class="fa-regular fa-dollar-sign" />
		<span>Price</span>
	</button>
	<div class="divider" />
	<button
		on:click={() => toggle("WHEN")}
		class:selected={panel == "WHEN"}
		class="umami--click--search-when"
	>
		<i class="fa-regular fa-calendar" />
		<span>When</span>
	</button>
	<button
		on:click={() => toggle("FILTER")}
		class:selected={panel == "FILTER"}
		class="icon umami--click--search-filter"
	>
		<i class="fa-regular fa-sliders-simple" />
	</button>
</div>

<button
	id="placeholder"
	on:click={() => (panel = "WHERE")}
	class:panel
	class="umami--click--search-open"
>
	Search
</button>

<style>
	#placeholder {
		display: none;
	}

	.options {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		font-weight: 450;
		cursor: pointer;
	}

	.options > button {
		margin: unset;
		border-radius: 3rem;
		padding: 0 1rem;
		width: max-content;
		color: var(--label);
		width: 100%;
	}

	.options > button:last-child {
		margin: 0 0.5rem;
	}

	.options > button.selected {
		font-weight: 500;
		color: var(--control-text-highlight);
	}

	.divider {
		height: 1.5rem;
		border-left: 1px solid var(--grey);
	}

	@media screen and (max-width: 670px) {
		.options span {
			display: none;
		}

		.options.panel {
			display: flex;
		}
	}

	@media screen and (max-width: 490px) {
		#placeholder {
			display: unset;
			width: 7rem;
			text-align: center;
			border-radius: 3rem;
		}

		#placeholder.panel {
			display: none;
		}

		.options {
			display: none;
		}
	}
</style>
