<script lang="ts">
	import { q } from "$lib/store";
	import ratesFrequency from "$lib/data/ratesFrequency.json";
</script>

<div class="col" style="row-gap: 2rem">
	<form class="row" style="column-gap: 2rem">
		<select bind:value={$q.rate.duration} style="width: 6rem">
			{#each ["15 Mins", "½ Hour", "¾ Hour", "1 Hour", "1½ Hours", "2 Hours", "3 Hours", "4 Hours"] as duration}
				<option value={duration}>{duration}</option>
			{/each}
		</select>

		<label style="width: 6rem">
			<small class="prefix">£</small>
			<input
				bind:value={$q.rate.max}
				class="inset"
				type="number"
				maxlength="4"
				required
				id="maxRate"
				
			/>
		</label>
	</form>

	<div class="chart">
		{#each ratesFrequency as bin}
			<label
				on:click={() => ($q.rate.max = bin.upperBound)}
				for="maxRate"
				class="bar"
				style="height: {bin.percentage}%;
		{$q.rate.max == bin.upperBound && 'background: var(--bold-background)'}"
			/>
		{/each}
	</div>
</div>

<style>
	form {
		width: 100%;
		justify-content: center;
	}

	.chart {
		height: 4rem;
		display: flex;
		width: 100%;
		gap: var(--thick);
		align-items: flex-end;
	}

	.bar {
		background: var(--grey);
		width: 100%;
		border-radius: 2px 2px 0 0;
	}

	.bar:hover {
		background: var(--control-text) !important;
	}
</style>
