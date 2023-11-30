<script lang="ts">
	import t from "$lib/localise";
</script>

<footer class="row">
	<nav class="row">
		<a href="/terms.txt" rel="external" target="_blank">{$t.terms}</a>
	</nav>
	<span>© Website Name LLC</span>
	<span>Company Address</span>
</footer>

<style>
	footer {
		justify-content: space-between;
		font-size: smaller;
		color: var(--subtext);
	}

	footer a {
		color: var(--subtext);
		text-decoration: none;
	}

	footer nav *:hover {
		text-decoration: underline;
		cursor: pointer;
	}
</style>
