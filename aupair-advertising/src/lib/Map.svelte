<script lang="ts">
	import { onMount } from "svelte";
	import { theme } from "$lib/store";
	import mapboxgl from "mapbox-gl";
	import type { LngLatLike } from "mapbox-gl";

	export let map: mapboxgl.Map, center: LngLatLike;
	let zoom: number = 15;

	$: centerChanged = false;

	mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_PUBLIC;

	onMount(() => {
		map = new mapboxgl.Map({
			container: "map",
			style:
				($theme == "dark"
					? "xxxxxxxxxxx"
					: "xxxxxxxxxxx") +
				(import.meta.env.MODE === "production" ? "" : "/draft"),
			center,
			zoom: 9,
			
		});
		map.on("drag", () => (centerChanged = true));
	});
</script>

<div class="container">
	<div id="map" />
	<div class="controls col">
		<button
			class="icon"
			on:click={() => map.setZoom((map.getZoom() || zoom) + 1)}
		>
			<i class="fa-regular fa-plus" />
		</button>
		<button
			class="icon"
			on:click={() => map.setZoom((map.getZoom() || zoom) - 1)}
		>
			<i class="fa-regular fa-minus" />
		</button>
		{#if centerChanged}
			<button
				on:click={() => {
					map.setCenter(center);
					centerChanged = false;
				}}
				class="icon"
			>
				<i class="fa-regular fa-location-crosshairs" />
			</button>
		{/if}
	</div>
</div>

<style>
	.container {
		position: relative;
		border-radius: var(--radius);
		mask-image: radial-gradient(white, black);
	}

	#map {
		width: 100%;
		height: 18rem;
	}

	.controls {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		row-gap: 0.2rem;
	}

	.controls button {
		box-shadow: var(--image-shadow);
		height: 2.2rem;
	}

	:global([class*="mapboxgl-ctrl"]) {
		min-width: unset;
	}
</style>
