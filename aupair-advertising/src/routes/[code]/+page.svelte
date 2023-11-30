<script lang="ts">
	import t from "$lib/localise";
	import { when } from "$lib/utils.js";
	import type { Profile } from "$lib/types/Profile";
	import meta from "./meta";

	import Info from "./Info.svelte";
	import Book from "./Book.svelte";
	import Rate from "./Rate.svelte";
	import Like from "./Like.svelte";
	import Review from "./Review.svelte";
	import Services from "./Services.svelte";
	import FaqInterview from "./FaqInterview.svelte";
	import Location from "./Location.svelte";
	import Carousel from "./Carousel.svelte";
	import Gallery from "./Gallery.svelte";

	export let data: Profile;
	let profile = data;

	let galleryOpen = false;
</script>

<Carousel {profile} bind:galleryOpen />

{#if galleryOpen}
	<Gallery gallery={profile?.gallery} video={profile?.video} bind:galleryOpen />
{/if}

<div class="col">
	<div class="row" style="justify-content: space-between; row-gap: 1.5rem">
		<div class="row">
			<h3>{profile.nickname}</h3>
			{#if profile.verified}
				<i class="fa-solid fa-badge-check" style="color: #1D9BF0" />
			{/if}
		</div>
		<Book {profile} />
	</div>

	<div id="split" class="col">
		<div class="col" id="right">
			<Info {profile} />
			<hr />
			<Location {profile} />
			<hr />
			<Rate rates={profile.rates} />
			<hr />
			<Like profileId={profile.code} />
			<hr />
			<div class="row spread">
				<div><b>{$t.joined}</b>: {when(profile.memberSince)}</div>
				{#if profile?.lastLoggedIn != null}
					<div><b>{$t.login}</b>: {when(profile.lastLoggedIn)}</div>
				{/if}
			</div>
		</div>

		<section class="col spread" style="width: 100%">
			{#if profile.summary}
				<hr />
				<p style="text-transform: capitalize">
					{@html profile.summary}
				</p>
			{/if}
			{#if profile.details}
				<p style="text-transform: lowercase">
					{@html profile.details}
				</p>
				<hr />
			{/if}
			<Services services={profile.services} />
		</section>
	</div>
</div>

<div class="col" style="gap: 2rem; margin: 2rem 0">
	<FaqInterview {profile} />
	<Review
		review={profile.review}
		rating={profile.rating}
		profileId={profile.code}
	/>
</div>

<svelte:head>
	{@html meta(profile)}
	{#if galleryOpen}
		<style>
			body {
				overflow: hidden;
			}
		</style>
	{/if}
</svelte:head>

<style>
	@media only screen and (min-width: 45rem) {
		#split {
			align-items: flex-start;
			column-gap: 3rem;
			flex-wrap: nowrap;
			flex-direction: row-reverse;
		}

		#right {
			width: 20rem;
		}
	}
</style>
