<script lang="ts">
	import t from "$lib/localise";
	import { user } from "$lib/store.js";
	import init from "$lib/db";

	export let profileId: string;
	let list: string;

	async function toggleLike(like: string, list: string, profiles: string[]) {
		const db = await init();

		profiles = profiles.includes(like)
			? profiles.filter((p: string) => p !== like)
			: [...profiles, like];

		await (profiles?.length
			? db.query(
					`UPDATE like SET profiles = $profiles WHERE userId = $userId AND list = $list;`,
					{
						userId: $user.id,
						list,
						profiles,
					}
			  )
			: db.query(`DELETE like WHERE userId = $userId AND list = $list`, {
					userId: $user.id,
					list,
			  })
		).then(() => ($user = $user));
	}

	async function addLikeList(): Promise<void> {
		const db = await init();

		await db
			.create("like", {
				userId: $user.id,
				list,
				profiles: [profileId],
			})
			.then(() => ($user = $user));
		list = "";
	}

	async function getLikes() {
		const db = await init();

		const res = await db.query(`SELECT * FROM like WHERE userId = $userId`, {
			userId: $user.id,
		});

		return res[0].result;
	}
</script>

{#if $user.id}
	{#await getLikes() then likes}
		<div class="row">
			{#each likes as { list, profiles }}
				<button
					on:click={() => toggleLike(profileId, list, profiles)}
					class="button"
					style="text-transform: capitalize;"
				>
					<i
						class="fa-{profiles.includes(profileId)
							? 'solid'
							: 'regular'} fa-heart"
					/>
					{list}
				</button>
			{/each}
			<form on:submit|preventDefault={addLikeList} class="row">
				<input
					bind:value={list}
					required
					type="text"
					style="width: 9rem"
					placeholder="New list name"
				/>
				<button>
					<i class="fa fa-plus" />
					{$t.add}
				</button>
			</form>
		</div>
	{/await}
{:else}
	<p class="message">
		<i class="fa fa-heart-circle-plus" />
		{$t.loginToLike}
	</p>
{/if}
