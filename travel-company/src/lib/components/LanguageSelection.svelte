<script lang="ts">
  import { locales, locale } from "$lib/localise.js";
</script>

<select bind:value={$locale}>
  {#each locales as { isoLanguageCode, name, emoji }}
    <option value={isoLanguageCode}>
      {name}
      {emoji}
    </option>
  {/each}
</select>
