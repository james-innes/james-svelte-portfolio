<script lang="ts">
  import vendors from "$lib/data/vendors";
  import { currency } from "$lib/utils";
  import type { Tour } from "$lib/types";
  import t from "$lib/localise";

  function createTour(easyRider: number, selfDrive: number) {
    return {
      totalGuests: easyRider + selfDrive,
      easyRider,
      selfDrive,
    };
  }

  function totalCostForTour(tour: Tour) {
    return vendors
      .map((vendor) =>
        vendor
          .purchaseOrder(tour)
          .reduce(
            (accumulator, item) => accumulator + item.unitPrice * item.quantity,
            0
          )
      )
      .reduce((accumulator, item) => accumulator + item, 0);
  }

  $: easyRiderCount = 2;
  $: selfDriveCount = 5;

  $: tour = createTour(easyRiderCount, selfDriveCount);

  $: totalCostForVariableTour = totalCostForTour(tour);

  const fixedGroupLeaderCost = 500000;

  let easyRiderCost = totalCostForTour(createTour(1, 0)) - fixedGroupLeaderCost;
  let selfDriveCost = totalCostForTour(createTour(0, 1)) - fixedGroupLeaderCost;

  const netSalePriceAfterFees = {
    easyRider: 4900000,
    selfDrive: 4100000,
  };
</script>

<h2>{$t.finance}</h2>

<h4>Forecast</h4>

<div class="row">
  <label>
    Self Drive
    <input type="number" bind:value={selfDriveCount} style="max-width: 80px;" />
  </label>
  <label>
    Easy Rider
    <input type="number" bind:value={easyRiderCount} style="max-width: 80px;" />
  </label>
</div>

<dl>
  <dt>Total cost for tour:</dt>
  <dd>{currency(totalCostForVariableTour)}</dd>
</dl>

<hr />

<div class="table-responsive">
  <table>
    <thead>
      <tr>
        <th>{$t.easyRider}</th>
        <th>{$t.selfDrive}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>{currency(easyRiderCost)}</td>
        <td>{currency(selfDriveCost)}</td>
      </tr>
    </tbody>
  </table>
</div>

<p>Base cost price excluding 500.000 group leader bonus.</p>
