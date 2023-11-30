<script lang="ts">
	import { theme } from "$lib/store";
	import { user } from "$lib/store.js";
	import t, { locale, displayCurrency } from "$lib/localise.js";
	import Localise from "$lib/Localise.svelte";
	import Auth from "$lib/Auth.svelte";
	import Like from "$lib/Like.svelte";

	let menu = false;
	let profile = false;

	let localiseModal: HTMLDialogElement;
	let authModal: HTMLDialogElement;
	let likeModal: HTMLDialogElement;
	let pb: any;

	function toggle() {
		menu = !menu;
		menu
			? document.addEventListener("click", () => (menu = false))
			: document.removeEventListener("click", () => (menu = false));
	}
</script>

<div class="container" on:click|stopPropagation>
	<button on:click={toggle} class="bold icon umami--click--search">
		{#if menu}
			<i class="fa-solid fa-times" />
		{:else}
			<i class="fa-solid fa-bars" />
		{/if}
	</button>

	{#if menu}
		<div id="menu" on:click={() => (menu = false)}>
			{#if !$user.id}
				<button on:click={() => authModal.showModal()}>
					<i class="fa-regular fa-user umami--click--auth" />
					{$t.login}
				</button>
			{:else}
				<button
					on:click={() => {
						pb.authStore.clear(), ($user.id = null);
					}}
				>
					<i class="fa-regular fa-person-running" />
					{$t.logout}
				</button>
			{/if}
			{#if $user.id}
				{#if profile}
					<a href="edit/" type="button">
						<i class="fa-regular fa-money-check-pen" />
						Profile
					</a>
				{/if}
				<button disabled>
					<i class="fa-regular fa-message" />
					Bookings
				</button>
				<button on:click={() => likeModal.showModal()}>
					<i class="fa-regular fa-heart" />
					Likes
				</button>
			{:else}
				<button disabled>
					<i class="fa-regular fa-message" />
					Bookings
				</button>
				<button disabled>
					<i class="fa-regular fa-heart" />
					Likes
				</button>
				<hr />
				<a href="/edit" type="button">
					<i class="fa-regular fa-rectangle-ad" />
					Advertise
				</a>
			{/if}
			<hr />
			<button
				on:click={() => theme.choose($theme == "dark" ? "light" : "dark")}
				class="umami--click--theme"
			>
				{#if $theme == "dark"}
					<i class="fa-regular fa-sun-bright" />
					Light
				{:else}
					<i class="fa-regular fa-moon" />
					Dark
				{/if}
			</button>
			<button
				on:click={() => localiseModal.showModal()}
				style="text-transform: uppercase"
				class="umami--click--localise"
			>
				<i class="fa-regular fa-globe" />
				{$locale} - {$displayCurrency}
			</button>
		</div>
	{/if}
</div>

<Localise bind:modal={localiseModal} />
<Auth bind:modal={authModal} bind:pb />
<Like bind:modal={likeModal} />

<style>
	.container {
		position: relative;
	}

	#menu {
		display: flex;
		flex-direction: column;
		z-index: 1;
		box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
		position: absolute;
		top: 2.5rem;
		right: 0;
		padding: 0.5rem;
		row-gap: 0rem;
		width: max-content;
		border-radius: var(--radius);
		background: var(--background);
		border: var(--thick) solid var(--grey);
		animation: enter 0.2s;
	}

	#menu > :where(button, a) {
		justify-content: start;
		width: auto;
	}

	hr {
		margin: 0.5rem 0;
	}

	@keyframes enter {
		from {
			opacity: 0;
			transform: translateY(-1rem);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
