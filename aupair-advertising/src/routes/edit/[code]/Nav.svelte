<script lang="ts">
	import Case from "case";

	let nav = [
		{
			label: "rates",
			icon: "coins",
		},
		{
			label: "booking",
			icon: "calendar-circle-user",
		},
		{
			label: "gallery",
			icon: "image",
		},
		{
			label: "location",
			icon: "location-dot",
		},
		{
			label: "description",
			icon: "pen-to-square",
		},
		{
			label: "services",
			icon: "list",
		},
		{
			label: "client",
			icon: "user-check",
		},
		{
			label: "verification",
			icon: "badge-check",
		},
	];
</script>

<section class="col">
	<h3>Sections</h3>
	<nav class="col" style="row-gap: 0.5rem">
		{#each nav as section}
			<a href="#{section.label}" type="button" class="subtle">
				<i class={"fa-regular fa-" + section.icon} />
				{Case.capital(section.label)}
			</a>
		{/each}
	</nav>
</section>
