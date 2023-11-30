<script lang="ts">
  import { isPast, isToday, parseISO, compareAsc } from "date-fns";
  import { formatDate } from "$lib/utils";
  import type { TourDateOption } from "$lib/types";

  export let tourDateOptions: TourDateOption[];
  export let selectedTourDateOption: TourDateOption;

  const sortedUpcomingTourDateOptions = tourDateOptions
    .filter(
      (tour) =>
        !isPast(parseISO(tour.tourDate)) || isToday(parseISO(tour.tourDate))
    )
    .sort((a, b) => compareAsc(parseISO(a.tourDate), parseISO(b.tourDate)));
</script>

{#if sortedUpcomingTourDateOptions.length === 0}
  <div class="message">📅 There are no available tour dates</div>
{:else}
  <div>
    <label>
      Start Date
      <select
        bind:value={selectedTourDateOption}
        required
        data-testid="tour-date-select"
      >
        {#each sortedUpcomingTourDateOptions as tourDateOption}
          <option value={tourDateOption}>
            {formatDate(tourDateOption.tourDate)} -
            {formatDate(tourDateOption.tourDate, "English")}
          </option>
        {/each}
      </select>
    </label>
  </div>
{/if}
