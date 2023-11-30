<script lang="ts">
  import { page } from "$app/stores";
</script>

<h3>Error {$page.status}</h3>
<p>{$page.error?.message}</p>

<button on:click={() => window.history.back()}>Go Back</button>
