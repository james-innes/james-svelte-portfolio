<script lang="ts">
	import { locales, locale } from "$lib/localise.js";
</script>

<label>Language</label>
<form class="row">
	{#each locales as { isoLanguageCode, name, isoCountryCode }}
		<button
			class="subtle"
			on:click={() => {
				$locale = isoLanguageCode;
			}}
		>
			<span
				class="fi fi-{isoCountryCode?.toLowerCase()}"
				style=" border-radius: 0.2rem"
			/>
			{name}
		</button>
	{/each}
</form>
