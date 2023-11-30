<script lang="ts">
	import t from "$lib/localise";
	import { onMount } from "svelte";
	import { q, theme } from "$lib/store";
	import Map from "$lib/Map.svelte";
	import geocodingClient from "@mapbox/mapbox-sdk/services/geocoding";
	import * as turf from "@turf/turf";

	let map: mapboxgl.Map, where: string, circle: any;

	function circleData() {
		return turf.circle(
			[$q.location.coordinates.lng, $q.location.coordinates.lat],
			$q.location.distance,
			{
				steps: 80,
				units: "kilometers",
			}
		);
	}

	function updateCircle() {
		map.getSource("circle").setData(circleData());
		const bbox = turf.bbox(circleData());
		map.fitBounds(
			[
				[bbox[0], bbox[1]],
				[bbox[2], bbox[3]],
			],
			{ padding: 16 }
		);
	}

	const geocoder = geocodingClient({
		accessToken: import.meta.env.VITE_MAPBOX_PUBLIC,
	});

	async function setLocation(address: string) {
		await geocoder
			.forwardGeocode({
				query: address,
				countries: [$q.country],
			})
			.send()
			.then(res => {
				let coordinates = res.body.features[0].center;
				$q.location.coordinates = { lat: coordinates[1], lng: coordinates[0] };
				updateCircle();
			});
	}

	onMount(() => {
		map.on("load", () => {
			circle = circleData();

			map.addSource("circle", {
				type: "geojson",
				data: circle,
			});

			map.addLayer({
				id: "circle",
				type: "line",
				source: "circle",
				paint: {
					"line-color": $theme == "dark" ? "white" : "black",
					"line-width": 2,
				},
			});
		});
	});
</script>

<div class="container col">
	<div class="row" style="align-items: flex-start">
		<input
			type="text"
			on:change={async e => await setLocation(where)}
			bind:value={where}
			placeholder="Search Location"
			autocorrect="off"
			autocapitalize="off"
			style="flex: 1; min-width: 10rem"
		/>

		<label style="width: 6rem">
			<input
				type="number"
				bind:value={$q.location.distance}
				on:input={e => e.target.value > 0 && updateCircle()}
			/>
			<small class="suffix">kms</small>
		</label>

		<select bind:value={$q.rate.where}>
			{#each ["in", "out"] as where}
				<option value={where}>
					{where == "in" ? $t.theirs : $t.yours}
				</option>
			{/each}
		</select>
	</div>

	<Map bind:map center={$q.location.coordinates} />
</div>

<style>
	.container {
		min-width: 50vw;
	}
</style>
