<script lang="ts">
	import t from "$lib/localise";
	import type { Profile } from "$lib/types/Profile";

	export let data: Profile;
</script>

<section id="description" class="col">
	<h3>Description</h3>

	<label style="width: 100%">
		Summary
		<textarea bind:value={data.summary} style="min-height: 10rem" />
	</label>

	<label style="width: 100%">
		Details
		<textarea bind:value={data.details} style="min-height: 30rem" />
	</label>
</section>
