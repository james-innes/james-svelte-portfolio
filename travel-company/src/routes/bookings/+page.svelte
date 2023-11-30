<script lang="ts">
  import t from "$lib/localise";
  import { formatDate } from "$lib/utils";
  import type { PageData } from "./$types";

  export let data: PageData;

  function boolToEmoji(bool: boolean) {
    return bool ? "✅" : "❌";
  }

  function drivingTypeFormat(drivingType: string) {
    return drivingType == "selfDrive" ? "🏍️ Self Drive" : "🛟 Easy Rider";
  }

  let selectedTourDate = "2023-06-09T15:00:00+07:00";

  $: guests =
    data.tours.find((tour) => tour.tourDate == selectedTourDate)?.guests || [];
</script>

<h2>{$t.booking}</h2>

<label>
  {$t.tourDate}
  <select data-testid="tour-select" bind:value={selectedTourDate}>
    {#each data.tours as { tourDate }}
      <option value={tourDate}>{formatDate(tourDate)}</option>
    {/each}
  </select>
</label>

{#if guests.length > 0}
  <div class="table-responsive">
    <table class="table" data-testid="bookings-table">
      <thead>
        <tr>
          <th>{$t.guestName}</th>
          <th>{$t.drivingChoice}</th>
          <th>{$t.hasGivenPassport}</th>
          <th>{$t.whatsApp}</th>
          <th>{$t.addedOnWhatsApp}</th>
          <th>{$t.email}</th>
          <th>{$t.vegetarian}</th>
        </tr>
      </thead>
      <tbody>
        {#each guests as { guestName, drivingChoice, hasGivenPassport, whatsApp, addedOnWhatsApp, email, isVegetarian }}
          <tr data-testid="guest-row">
            <td data-testid="guestName" class="text-nowrap">
              {guestName.toUpperCase()}
            </td>
            <td data-testid="drivingChoice" class="text-nowrap">
              {drivingTypeFormat(drivingChoice)}
            </td>
            <td data-testid="hasGivenPassport">
              {boolToEmoji(hasGivenPassport)}
            </td>
            <td data-testid="whatsApp" class="text-nowrap">
              {whatsApp}
            </td>
            <td data-testid="addedOnWhatsApp">
              {boolToEmoji(addedOnWhatsApp)}
            </td>
            <td data-testid="email" class="text-nowrap">
              <a href={`mailto:${email}`}>{email}</a>
            </td>
            <td data-testid="isVegetarian">
              {boolToEmoji(isVegetarian)}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/if}

<style>
  td {
    min-width: 6rem;
  }
</style>
