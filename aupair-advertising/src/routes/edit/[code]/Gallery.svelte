<script lang="ts">
	import type { Profile } from "$lib/types/Profile";
	import Upload from "./Upload.svelte";

	export let data: Profile;
</script>

<section id="gallery" class="col">
	<h3>Gallery</h3>

	<Upload />
	{#if data.gallery.length}
		<div class="gallery">
			{#each data.gallery as img}
				<div class="card">
					<img
						src={img}
						referrerpolicy="same-origin"
					/>
					<button id="delete"><i class="fa-regular fa-trash" /></button>
				</div>
			{/each}
		</div>
	{/if}
</section>

<style>
	.gallery {
		grid-template-columns: repeat(6, 1fr);
	}

	.card {
		position: relative;
	}

	#delete {
		visibility: hidden;
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		box-shadow: var(--image-shadow);
	}

	.card:hover #delete {
		visibility: unset;
	}
</style>
