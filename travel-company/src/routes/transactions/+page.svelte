<script lang="ts">
  import t from "$lib/localise";
  import { formatDate } from "$lib/utils";
  import { currency } from "$lib/utils";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h2>{$t.transaction}</h2>

<div class="table-responsive">
  <table>
    <thead>
      <tr>
        <th>{$t.tourDate}</th>
        <th>{$t.nickname}</th>
        <th>{$t.totalAmount}</th>
      </tr>
    </thead>

    <tbody>
      {#each data.transactions as { nickname, tourDate, amount }}
        <tr>
          <td style="width: 3rem">{formatDate(tourDate)}</td>
          <td class="text-nowrap">{nickname}</td>
          <th>{currency(amount)}</th>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
