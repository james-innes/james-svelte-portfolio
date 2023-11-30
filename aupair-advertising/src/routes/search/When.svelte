<script lang="ts">
	import { q } from "$lib/store";
</script>

<div class="row">
	<label>
		<input bind:group={$q.availableToday} value={true} type="radio" />
		<span class="rounded">
			<i class="fa-solid fa-bolt" style="color: var(--green)" />
			Today
		</span>
	</label>
	<label>
		<input bind:group={$q.availableToday} value={false} type="radio" />
		<span class="rounded">
			<i class="fa-regular fa-calendar-days" />
			Anytime
		</span>
	</label>
</div>

<style>
	.row {
		justify-content: center;
		column-gap: 2rem;
	}
</style>
