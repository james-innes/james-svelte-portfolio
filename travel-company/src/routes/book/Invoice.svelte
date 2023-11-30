<script lang="ts">
  import t from "$lib/localise";
  import { currency } from "$lib/utils";
  import { prices } from "$lib/data/constants";
  import type { Guest } from "$lib/types";

  export let newGuests: Guest[] = [];

  $: invoiceItems = [
    {
      itemName: $t.easyRider,
      unitPrice: prices.EASY_RIDER,
      quantity: newGuests.filter((g) => g.drivingChoice === "easyRider").length,
    },
    {
      itemName: $t.selfDrive,
      unitPrice: prices.SELF_DRIVE,
      quantity: newGuests.filter((g) => g.drivingChoice === "selfDrive").length,
    },
  ];

  export let invoiceTotal = 0;

  $: invoiceTotal = invoiceItems.reduce(
    (accumulator, item) => accumulator + item.unitPrice * item.quantity,
    0
  );
</script>

<div style="table-responsive">
  <table>
    <thead>
      <tr>
        <th>{$t.itemName}</th>
        <th>{$t.unitPrice}</th>
        <th>{$t.quantity}</th>
        <th>{$t.totalAmount}</th>
      </tr>
    </thead>
    <tbody>
      {#each invoiceItems as { itemName, unitPrice, quantity }}
        <tr>
          <th>{itemName}</th>
          <td>{currency(unitPrice)}</td>
          <td>{quantity}</td>
          <td>{currency(unitPrice * quantity)}</td>
        </tr>
      {/each}
    </tbody>
    <tfoot>
      <tr>
        <th />
        <th />
        <th>{$t.totalAmount}:</th>
        <th data-testid="invoice-total-amount">
          {currency(invoiceTotal)}
        </th>
      </tr>
    </tfoot>
  </table>
</div>
