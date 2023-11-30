<script lang="ts">
	import t from "$lib/localise";
	import Map from "$lib/Map.svelte";
	import type { Profile } from "$lib/types/Profile";

	export let profile: Profile;

	let map: mapboxgl.Map;
	let modal: HTMLDialogElement;
</script>

<section class="col">
	<p>
		<i class="fa-regular fa-location-dot" style="margin-right: 0.3rem" />
		{profile.address}
		<small style="display: block">{$t.locationMessage}</small>
	</p>

	<div class="row">
		<button on:click={() => modal.showModal()}>
			<i class="fa-regular fa-map" />{$t.map}
		</button>
		<a
			type="button"
			href={"https://www.google.com/maps/search/?api=1&query=" +
				profile.coordinates}
			target="_blank"
			rel="noreferrer"
		>
			<i class="fa-regular fa-location-arrow" />
			{$t.directions}
		</a>
	</div>
</section>

<dialog bind:this={modal} style="min-width: 80%">
	<div class="col">
		<div class="row" style="justify-content: space-between">
			<h3 style="width: fit-content">{$t.location}</h3>
			<button on:click={() => modal.close()} class="icon">
				<i class="fa fa-xmark" />
			</button>
		</div>
		<Map
			bind:map
			center={{ lat: profile.coordinates[1], lng: profile.coordinates[0] }}
		/>
		<p>
			{profile.address}
			<small style="display: block">{$t.locationMessage}</small>
		</p>
	</div>
</dialog>
