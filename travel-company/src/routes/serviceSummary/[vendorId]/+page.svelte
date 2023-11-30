<script lang="ts">
  import type { PageData } from "./$types";
  import t from "$lib/localise";
  import { goto } from "$app/navigation";
  import { isToday, isTomorrow, isPast, isYesterday } from "date-fns";

  let showPassedTours = false;

  function dateStyle(tourDate: string) {
    const date = new Date(tourDate);
    if (isToday(date)) return "today";
    if (isTomorrow(date)) return "tomorrow";
    if (isYesterday(date)) return "yesterday";
    if (isPast(date)) return "passed";
    return "future";
  }

  export let data: PageData;
</script>

<h3>{$t.serviceSummary}</h3>

<div class="row">
  <button on:click={() => (showPassedTours = !showPassedTours)}>
    {#if showPassedTours}
      {$t.hidePassed}
    {:else}
      {$t.showPassed}
    {/if}
  </button>
  <a type="button" href="/serviceDescription/{data.vendorId}">
    {$t.serviceDescription}
  </a>
</div>

<div style="table-responsive">
  <table style="width: 100%;">
    <thead>
      <tr>
        {#each data.headers as header}
          <th data-testid="header-{header}">{$t[header]}</th>
        {/each}
        <th />
      </tr>
    </thead>
    <tbody>
      {#each data.rows as { columns, meta }}
        <tr
          class:hidden={!showPassedTours &&
            dateStyle(meta.vendorDate) == "passed"}
          style="cursor: pointer"
          on:click={() => goto(`/detail/${data.vendorId}-${meta.tourId}`)}
        >
          {#each columns as column, i}
            <td
              data-testid="column-{column}"
              class={i == 0 ? dateStyle(meta.vendorDate) : ""}>{column}</td
            >
          {/each}
          <td>
            <i class="fa-solid fa-chevron-right" style="color: var(--anchor)" />
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .today {
    color: #f38068;
  }

  .tomorrow {
    color: #f7c777;
  }

  .passed,
  .yesterday {
    color: #c7c1c1;
  }

  .hidden {
    display: none;
    color: red;
  }
</style>
