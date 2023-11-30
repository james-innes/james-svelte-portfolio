<script lang="ts">
	import t from "$lib/localise";
	import type { Profile } from "$lib/types/Profile";

	export let profile: Profile;
	export let galleryOpen: boolean;
</script>

<div class="container">
	<div class="row fade-right carousel">
		{#each profile.images as img}
			<img src={img} referrerpolicy="same-origin" />
		{/each}
	</div>
	{#if profile.gallery?.length || profile?.video?.length}
		<button
			id="morePhotos"
			on:click={() => (galleryOpen = true)}
			class="umami--click--photos"
		>
			<i class="fa-solid fa-grid" />
			{$t.photos}
		</button>
	{/if}
</div>

<style>
	.container {
		position: relative;
	}

	.carousel {
		flex-flow: row nowrap;
		overflow-x: auto;
		gap: 0.5rem;
	}

	.carousel > img {
		width: clamp(14rem, 33%, 33%);
		aspect-ratio: 3/4.5;
		object-position: top;
	}

	@media (min-width: 15rem) {
		.carousel::after {
			display: none;
		}
	}

	#morePhotos {
		position: absolute;
		bottom: 1rem;
		left: 1rem;
		box-shadow: var(--image-shadow);
	}
</style>
