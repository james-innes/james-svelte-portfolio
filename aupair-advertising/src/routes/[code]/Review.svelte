<script lang="ts">
	import t from "$lib/localise";
	import { when } from "$lib/utils.js";
	import type { Rating, Review } from "$lib/types/Profile";

	export let profileId: string;
	export let rating: Rating[];
	export let review: Review[];

	let ratingKey = {
		positive: "thumbs-up",
		neutral: "face-meh",
		negative: "thumbs-down",
	};
</script>

{#if rating?.length}
	{#each rating as rating}
		<section class="col">
			<h3>
				{$t.reviews}
			</h3>
			<div class="row">
				<div class="row pills">
					<div>
						<b>{$t.score}</b>{rating.score}
					</div>
					{#each Object.entries(ratingKey) as [feeling, icon]}
						{#if rating[feeling] > 0}
							<div>
								<i class="fa-regular fa-{icon}" />
								{rating[feeling]}
							</div>
						{/if}
					{/each}
				</div>

				<div class="row pills">
					<div><b>{$t.new}</b>{when(rating?.new)}</div>
					<div><b>{$t.first}</b>{when(rating?.first)}</div>
				</div>
			</div>

			<div class="reviews col fade-right">
				{#each review as r}
					<div class="review col frame">
						<p>{r.comment}</p>
						<div class="row">
							<div>
								<i class="fa-regular fa-{ratingKey[r.feeling]}" />
							</div>
							<div>
								{when(r.when)}
							</div>
						</div>
					</div>
				{/each}
			</div>
		</section>
	{/each}
{/if}

<style>
	.reviews {
		flex-wrap: wrap;
		height: 11rem;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
	}

	.review {
		width: 18rem;
		height: 100%;
		justify-content: space-between;
		scroll-snap-align: start;
		scroll-snap-stop: mandatory;
	}

	p {
		max-height: 6.8rem;
		overflow-y: scroll;
	}
</style>
