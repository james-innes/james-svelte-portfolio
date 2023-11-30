<script lang="ts">
  import t from "$lib/localise";
  import { formatDate } from "$lib/utils";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h2>{$t.tour}</h2>

<div style="table-responsive">
  <table>
    <thead>
      <tr>
        <th>{$t.date}</th>
        <th>{$t.totalGuests}</th>
        <th>{$t.easyRider}</th>
        <th>{$t.selfDrive}</th>
        <th>{$t.vegetarian}</th>
      </tr>
    </thead>
    <tbody>
      {#each data.tours as { tourDate, totalGuests, easyRider, selfDrive, vegetarian }}
        <tr>
          <td>{formatDate(tourDate, "English")}</td>
          <td>{totalGuests}</td>
          <td>{easyRider}</td>
          <td>{selfDrive}</td>
          <td>{vegetarian}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  td {
    min-width: 5rem;
  }
</style>
