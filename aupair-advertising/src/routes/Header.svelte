<script lang="ts">
	import t from "$lib/localise";
	import { page } from "$app/stores";
	import Menu from "./Menu.svelte";
</script>

<header class="row">
	{#if $page.url.pathname != "/"}
		<a href="/" type="button" class="link umami--click-back-to-search">
			<i class="fa-regular fa-chevron-left" />
			{$t.search}
		</a>
	{:else}
		<a id="logo" class="row" href="/" style="text-decoration: none">
			<i class="fa-solid fa-crown" />
			<span>Website</span>
		</a>
	{/if}
	<Menu />
</header>

<style>
	header {
		justify-content: space-between;
		flex-flow: nowrap;
		align-items: center;
	}

	#logo {
		font-size: 1.3rem;
		font-weight: 450;
		align-items: baseline;
		color: var(--label);
	}

	#logo i {
		color: var(--pink);
	}
</style>
