<script lang="ts">
	import t from "$lib/localise";
	import type { Profile } from "$lib/types/Profile";

	export let data: Profile;
</script>

<section id="booking" class="col">
	<h3>Booking</h3>

	<label style="width: 16rem">
		Email
		<input type="email" bind:value={data.email} />
	</label>

	<div class="row spread" style="align-items: flex-start">
		<label style="width: 9rem">
			Phone
			<input type="tel" bind:value={data.phone} />
		</label>

		<div role="group">
			Apps
			<div class="checkboxes">
				<label>
					<input type="checkbox" />
					WhatsApp
				</label>
				<label>
					<input type="checkbox" />
					Telegram
				</label>
			</div>
		</div>
	</div>
</section>
