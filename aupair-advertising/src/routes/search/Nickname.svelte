<script>
	import t from "$lib/localise";
	import { q } from "$lib/store";
</script>

<label style="width: 13rem">
	{$t.searchNickname}
	<input
		bind:value={$q.nickname}
		type="search"
		autocomplete="off"
		autocorrect="off"
		autocapitalize="off"
		spellcheck="false"
	/>
	<small>{$t.ignoresOtherFilters}</small>
</label>
