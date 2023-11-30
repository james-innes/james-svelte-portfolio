<script lang="ts">
	import t from "$lib/localise";
	import type { Profile } from "$lib/types/Profile";
	import Map from "$lib/Map.svelte";

	export let data: Profile;
	let map: mapboxgl.Map;
</script>

<section id="location" class="col">
	<h3>Location</h3>

	<label style="width: 100%">
		Search
		<input type="text" bind:value={data.address} />
		<small>Full address not required</small>
	</label>

	<p class="frame">{data.address}</p>

	<div class="row">
		<label style="width: 7rem">
			Postcode
			<input type="text" />
		</label>
		<label style="width: 10rem">
			Country
			<select>
				<option value="UK">United Kingdom</option>
			</select>
		</label>
	</div>

	<Map
		bind:map
		center={{ lat: data.coordinates[1], lng: data.coordinates[0] }}
	/>
</section>
