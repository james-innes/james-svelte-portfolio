<script lang="ts">
	import t from "$lib/localise";
	import type { Profile } from "$lib/types/Profile";

	export let profile: Profile;
	let modal: HTMLDialogElement;
</script>

<button
	on:click={() => modal.showModal()}
	class="bold umami--book"
	style="width: 15rem"
>
	<i class="fa fa-check" />
	{$t.book}
</button>

<dialog bind:this={modal}>
	<div class="col" style="max-width: 23rem">
		<div class="row" style="justify-content: space-between">
			<h3 style="width: fit-content">{$t.book}</h3>
			<button on:click={() => modal.close()} class="icon">
				<i class="fa fa-xmark" />
			</button>
		</div>

		{#if profile.phone}
			<div class="row">
				<a
					href="https://wa.me/{profile.phone}"
					target="_blank"
					rel="noreferrer"
					type="button"
					class="link umami--click--whatsapp"
				>
					<i class="fa fa-comment" />
					WhatsApp
				</a>
				<a
					href="tel:{profile.phone}"
					type="button"
					class="link umami--click--phone"
				>
					<i class="fa fa-phone" />
					{profile.phone}
				</a>
			</div>

			<p>{$t.phoneMessage}</p>
		{/if}

		{#if profile.email}
			<a
				href="mailto:{profile.email}"
				type="button"
				class="link umami--click--email"
			>
				<i class="fa fa-envelope" />
				Email
			</a>
			<p>{$t.emailMessage}</p>
		{/if}
	</div>
</dialog>
