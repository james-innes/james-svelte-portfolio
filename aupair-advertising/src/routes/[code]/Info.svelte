<script lang="ts">
	import t, { locale } from "$lib/localise.js";
	import type { Profile } from "$lib/types/Profile";


	export let profile: Profile;
</script>

<section class="row pills">
	{#if profile.nationality}
		<div>
			<span
				class="fi fi-{(profile.nationality == 'UK'
					? 'GB'
					: profile.nationality
				).toLowerCase()}"
				style=" border-radius: 0.2rem"
			/>
			{new Intl.DisplayNames([$locale], { type: "region" }).of(
				profile.nationality
			)}
		</div>
	{/if}
</section>
