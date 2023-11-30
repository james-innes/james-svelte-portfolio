<script lang="ts">
	import t from "$lib/localise";
	import { user } from "./store.js";
	import PocketBase, { ClientResponseError } from "pocketbase";

	export let modal: HTMLDialogElement;
	export let pb = new PocketBase("https://website-name.fly.dev");

	let email: string, password: string, action: string;

	async function login() {
		try {
			// @ts-ignore
			$user.id = await pb.users
				.authViaEmail(email, password)
				.then(r => r.user.id);
			modal.close();
		} catch (er) {
			alert((er as ClientResponseError).data.message);
		}
	}

	async function signup() {
		try {
			await pb.users.create({
				email,
				password,
				passwordConfirm: password,
			});
			await login();
			modal.close();
		} catch (er) {
			alert((er as ClientResponseError).data.data.email.message);
		}
	}

	$user.id = pb.authStore.model?.id || null;
</script>

<dialog bind:this={modal}>
	<div class="col">
		<div class="row" style="justify-content: space-between">
			<h3 style="width: fit-content">Account</h3>
			<button type="reset" on:click={() => modal.close()} class="icon">
				<i class="fa fa-xmark" />
			</button>
		</div>
		<form
			on:submit={async () =>
				action == "login" ? await login() : await signup()}
			class="col spread"
		>
			<div class="col" style="width: 15rem">
				<label>
					{$t.email}
					<input
						type="email"
						autocomplete="email"
						required
						bind:value={email}
					/>
				</label>
				<label>
					{$t.password}
					<input
						type="password"
						autocomplete="password"
						required
						bind:value={password}
					/>
				</label>
			</div>
			<div class="row">
				<button on:click={() => (action = "login")} class="bold">
					<i class="fa fa-unlock" />
					{$t.login}
				</button>
				<button>
					<i on:click={() => (action = "signup")} class="fa fa-user-plus" />
					{$t.signup}
				</button>
			</div>
		</form>
	</div>
</dialog>
