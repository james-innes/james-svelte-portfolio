<script lang="ts">
	let files: FileList;
</script>

{#if files}
	<h2>Selected files:</h2>
	{#each Array.from(files) as file}
		<p>{file.name} ({file.size} bytes)</p>
	{/each}
{/if}

<label>
	<input bind:files accept="image/png, image/jpeg" multiple type="file" />
	<button class="subtle"><i class="fa-solid fa-images" />Upload</button>
</label>