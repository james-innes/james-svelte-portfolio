<script lang="ts">
	import { onMount } from "svelte";
	import { theme } from "./store";

	onMount(() => {
		window
			.matchMedia("(prefers-color-scheme: dark)")
			.addEventListener("change", e =>
				theme.choose(e.matches ? "dark" : "light")
			);
		window.localStorage.getItem("theme") == "dark" && theme.choose("dark");
	});
</script>

<svelte:head>
	<meta name="theme-color" content={$theme == "dark" ? "#000" : "#fff"} />
	<script>
		if (window.localStorage.getItem("theme") == "dark") {
			document.documentElement.setAttribute("data-theme", "dark");
			document
				.querySelector('meta[name="theme-color"]')
				.setAttribute("content", "#000");
		}
	</script>
</svelte:head>


