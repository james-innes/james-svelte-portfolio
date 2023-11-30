<script lang="ts">
	import type { Gallery, Video } from "$lib/types/Profile";

	export let gallery: Gallery[];
	export let video: Video[];

	export let galleryOpen: boolean;
</script>

<div class="overlay">
	<div class="container col">
		<button id="back" class="icon" on:click={() => (galleryOpen = false)}>
			<i class="fa-regular fa-chevron-left" />
		</button>

		{#if gallery?.length}
			<div class="gallery">
				{#each gallery as img}
					<img src={img} loading="lazy" referrerpolicy="same-origin" />
				{/each}
			</div>
		{/if}
	</div>
</div>

<style>
	.overlay {
		position: fixed;
		z-index: 10;
		inset: 0;
		background: var(--background);
	}

	.container {
		position: relative;
		margin: 1rem 1rem;
		height: 100%;
		overflow-y: scroll;
	}

	#back {
		position: fixed;
		z-index: 11;
		top: 2rem;
		left: 2rem;
		box-shadow: var(--image-shadow);
	}
</style>
