<script lang="ts">
	import type { Profile } from "$lib/types/Profile";
	export let data: Profile;
</script>

<section id="verification" class="col">
	<h3>Verification</h3>
	<p>{data.verified}</p>
</section>
