<script lang="ts">
	import t from "$lib/localise";
	import type { Profile } from "$lib/types/Profile";

	import Booking from "./Booking.svelte";
	import Description from "./Description.svelte";
	import Location from "./Location.svelte";
	import Nav from "./Nav.svelte";
	import Rate from "./Rate.svelte";
	import Service from "./Service.svelte";
	import Available from "./Available.svelte";
	import Gallery from "./Gallery.svelte";
	import Verification from "./Verification.svelte";

	export let data: Profile;
</script>

<div id="split" class="col">
	<div id="right" class="col">
		<Nav />
		<hr />
		<button class="bold" disabled style="width: 100%">
			<i class="fa-solid fa-file-arrow-up" />
			Save
		</button>
		<Available />
		<hr />
		<p>
			<b>1 Minute</b> until changes become live.
		</p>
	</div>

	<form id="left" class="col">
		<h2 class="row">Edit Profile</h2>
		<Rate {data} />
		<hr />
		<Booking {data} />
		<hr />
		<Location {data} />
		<hr />
		<Gallery {data} />
		<hr />
		<Description {data} />
		<hr />
		<Service {data} />
		<hr />
		<Verification {data} />
	</form>
</div>

<style>
	@media only screen and (min-width: 45rem) {
		#split {
			align-items: flex-start;
			column-gap: 4rem;
			flex-wrap: nowrap;
			flex-direction: row-reverse;
		}
	}

	#left {
		row-gap: 2rem;
		width: 100%;
	}

	#right {
		position: sticky;
		margin-top: 2.5rem;
		top: 4rem;
		width: 15rem;
	}
</style>
