<script lang="ts">
	import Case from "case";
	import t from "$lib/localise";
	import type { Profile, Rates } from "$lib/types/Profile";

	export let data: Profile;

	let durations = [
		"15 mins",
		"½ Hour",
		"1 Hour",
		"1½ Hours",
		"2 Hours",
		"3 Hours",
		"4 Hours",
	];

	let inOut = ["in", "out"] as (keyof Rates)[];
</script>

<section id="rates" class="col">
	<div style="display: flex; flex-wrap: nowrap">
			<table style="margin-right: 1rem">
				<thead>
					<tr>
						<th>{Case.capital(where)} Call</th>
					</tr>
				</thead>

				<tbody>
					{#each data.rates[where] as { duration, rate }}
						<tr>
							<td>
								<select bind:value={duration} style="width: 6rem">
									{#each durations as duration}
										<option value={duration}>{duration}</option>
									{/each}
								</select>
							</td>
							<td>
								<input bind:value={rate} style="width: 4rem" type="number" />
							</td>
							<td>
								<button><i class="fa-regular fa-trash" /></button>
							</td>
						</tr>
					{/each}
				</tbody>
				<tfoot class="col">
					<hr />
					<button><i class="fa-solid fa-plus" />Add</button>
				</tfoot>
			</table>
	</div>
</section>
