<script lang="ts">
	import t from "$lib/localise";
	import { user } from "$lib/store";
	import init from "$lib/db";

	export let modal: HTMLDialogElement;

	async function getLikes() {
		const db = await init();
		const res = await db.query(`SELECT * FROM like WHERE userId = $userId`, {
			userId: $user.id,
		});

		return res[0].result;
	}
</script>

<dialog bind:this={modal}>
	<div class="col">
		<div class="row" style="justify-content: space-between">
			<h3 style="width: fit-content">{$t.likeLists}</h3>
			<button type="reset" on:click={() => modal.close()} class="icon">
				<i class="fa fa-xmark" />
			</button>
		</div>
		{#await getLikes()}
			<p class="message">{$t.loading}</p>
		{:then likes}
			{#if likes?.length}
				{#each likes as { list, profiles }}
					<details class="button umami--click--like-list">
						<summary style="text-transform: capitalize;">
							{list}
						</summary>
						{#each profiles as code}
							<a href="/{code}" type="button">
								{code}
							</a>
						{/each}
					</details>
				{/each}
			{:else}
				<p class="message">Visit a profile and add it to a like list</p>
			{/if}
		{/await}
	</div>
</dialog>
