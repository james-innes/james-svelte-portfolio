<script lang="ts">
	import t from "$lib/localise";
	import type { Profile } from "$lib/types/Profile";

	export let profile: Profile;

	let faqInterview = ["faq", "interview"] as (keyof Pick<
		Profile,
		"faq" | "interview"
	>)[];
</script>

{#each faqInterview as field}
	{#if profile[field]?.length > 0}
		<section class="col">
			<h3>{$t[field]}</h3>
			<div
				class="tiles col fade-right"
				style="height: {field == 'faq' ? '12' : '8'}rem"
			>
				{#each profile[field] as { question, answer }}
					<div class="tile col frame">
						<p>{question}</p>
						<hr />
						<p class="answer">{answer}</p>
					</div>
				{/each}
			</div>
		</section>
	{/if}
{/each}

<style>
	.tiles {
		overflow-y: auto;
		flex-wrap: wrap;
		scroll-snap-type: x mandatory;
	}

	.tile {
		width: 20rem;
		height: 100%;
		scroll-snap-align: start;
		scroll-snap-stop: mandatory;
	}

	.answer {
		max-height: 6.8rem;
		overflow-y: scroll;
	}
</style>
