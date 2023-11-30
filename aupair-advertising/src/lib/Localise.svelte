<script lang="ts">
	import t from "$lib/localise.js";
	import LanguageSelection from "./LanguageSelection.svelte";
	import CurrencySelection from "./CurrencySelection.svelte";

	export let modal: HTMLDialogElement;
</script>

<dialog bind:this={modal}>
	<div class="col">
		<div class="row" style="justify-content: space-between">
			<h3 style="width: fit-content">International</h3>
			<button on:click={() => modal.close()} class="icon">
				<i class="fa fa-xmark" />
			</button>
		</div>
		<LanguageSelection />
		<div class="col" style="width: 20rem">
			<CurrencySelection />
			<hr />
			<p>{$t.currencyMessage}</p>
		</div>
	</div>
</dialog>
