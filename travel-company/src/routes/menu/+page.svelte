<script lang="ts">
  import t from "$lib/localise";
  import vendors from "$lib/data/vendors";

  let vendorId: string;
</script>

<div class="col spread">
  <div class="col">
    <a href="/tours">{$t.tour}</a>
    <a href="/bookings">{$t.booking}</a>
    <a href="/book">{$t.createBooking}</a>
    <a href="/finance">{$t.finance}</a>
  </div>

  <select bind:value={vendorId}>
    {#each vendors as { vendorId, name }}
      <option value={vendorId}>{name}</option>
    {/each}
  </select>

  <div class="col">
    <a href="/serviceSummary/{vendorId}">{$t.serviceSummary}</a>
    <a href="/vendor/{vendorId}">{$t.vendor}</a>
  </div>
</div>
