<script lang="ts">
	import "../style/index.css";
	import Header from "./Header.svelte";
	import Footer from "./Footer.svelte";
	import Theme from "$lib/Theme.svelte";
</script>

<main class="col">
	<Header />
	<slot />
	<hr />
	<Footer />
</main>

<Theme />

<svelte:head>
	{#if import.meta.env.MODE === "production"}
		<script
			async
			defer
			src="https://umami.website-name.com/umami.js"
		></script>
	{/if}
</svelte:head>

<style>
	main {
		max-width: 70rem;
		margin: 0 auto;
		padding: 1rem 1rem 2rem;
	}

	@media only screen and (min-width: 58rem) {
		:root {
			font-size: 17px;
		}

		main {
			padding: 1rem 4rem 2rem;
		}
	}
</style>
