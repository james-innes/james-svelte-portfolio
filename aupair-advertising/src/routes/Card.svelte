<script lang="ts">
	import type { Profile } from "$lib/types/Profile";

	$: index = 0;

	export let code: Profile["code"];
	export let images: Profile["images"];

	$: loaded = false;
	$: interacted = false;

	const myImages = images.map(img => ({
		small: img,
		big: img,
	}));

	function handle(code: string) {
		interacted = true;
		const el = document.getElementById(code + index.toString());
		el &&
			el.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "start",
			});
	}
</script>

<div class="container col">
	<div
		class="carousel"
		on:touchmove={() => (interacted = true)}
		on:scroll={() => (interacted = true)}
	>
		<a
			aria-label={"View profile for " + code}
			class="card"
			href="/{code}"
			target="_blank"
			rel="noreferrer"
		>
			{#each myImages as src, i}
				<img
					referrerpolicy="same-origin"
					src={index != 0 && !interacted ? "" : loaded ? src.big : src.small}
					loading="lazy"
					aria-label={code}
					on:load={() => (loaded = true)}
					id={code + i.toString()}
				/>
			{/each}
		</a>
	</div>

	{#if loaded}
		{#if index > 0}
			<button on:click={() => index-- && handle(code)} id="backwards">
				<i class="fa-solid fa-xs fa-chevron-left" />
			</button>
		{/if}
		{#if index < myImages.length - 1}
			<button on:click={() => ++index && handle(code)} id="forwards">
				<i class="fa-solid fa-xs fa-chevron-right" />
			</button>
		{/if}

		<div class="dots row">
			{#each myImages as _, i}
				<div class:active={i === index} class="dot" />
			{/each}
		</div>
	{/if}
</div>

<style>
	.container {
		position: relative;
		display: flex;
		place-content: center;
	}

	.carousel {
		position: relative;
		padding-top: 145%;
	}

	.card {
		position: absolute;
		display: flex;
		flex-wrap: nowrap;
		inset: 0;
		overflow-x: auto;
		scroll-snap-type: x mandatory;
		scroll-behavior: smooth;
		-webkit-overflow-scrolling: touch;
		border-radius: var(--radius);
		touch-action: manipulation;
		cursor: pointer;
	}

	.card::-webkit-scrollbar {
		display: none;
	}

	img {
		flex: 0 0 100%;
		width: 100%;
		border-radius: 0;
		scroll-snap-align: start;
		scroll-snap-stop: mandatory;
	}

	button {
		opacity: 0;
		position: absolute;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		height: 1.7rem;
		width: 1.7rem;
		border-radius: 100%;
		transition: all 0.2s;
	}

	#backwards {
		left: 0.3rem;
	}

	#forwards {
		right: 0.3rem;
	}

	@media (hover: none) {
		#backwards,
		#forwards {
			display: none;
		}
	}

	.container:hover > button {
		opacity: 0.8;
	}

	.container:hover > button:hover {
		opacity: 1;
		scale: 1.05;
	}

	.dots {
		position: absolute;
		width: 100%;
		bottom: 0.5rem;
		place-content: center;
	}

	.dot {
		height: 0.5rem;
		width: 0.5rem;
		background: var(--background);
		border-radius: 50%;
		opacity: 0.8;
	}

	.dot:not(.active) {
		opacity: 0.5;
		scale: 0.9;
	}
</style>
