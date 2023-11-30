<script lang="ts">
	import t from "$lib/localise";
	import init from "$lib/db";

	export let modal: HTMLDialogElement;
	let message: string;

	async function sendFeedback() {
		const db = await init();
		await db.create("feedback", { message });
	}
</script>

<dialog bind:this={modal}>
	<div class="col">
		<div class="row" style="justify-content: space-between">
			<h3 style="width: fit-content">{$t.contact}</h3>
			<button type="reset" on:click={() => modal.close()} class="icon">
				<i class="fa fa-xmark" />
			</button>
		</div>
		<form on:submit={sendFeedback} class="col">
			<textarea
				bind:value={message}
				placeholder={$t.contactPlaceholder}
				style="max-width: 25rem; height: 7rem"
				name="message"
				required
			/>
			<button class="umami--click--contact">
				<i class="fa-solid fa-user-plus"></i>
				{$t.submit}
			</button>
		</form>
	</div>
</dialog>
