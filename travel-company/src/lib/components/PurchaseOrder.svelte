<script lang="ts">
  import type { PurchaseOrderRow, Transaction } from "$lib/types";
  import t from "$lib/localise";
  import { currency } from "$lib/utils";

  export let purchaseOrder: PurchaseOrderRow[];
  export let transactions: Transaction[];

  const totalCost = purchaseOrder.reduce(
    (accumulator, item) => accumulator + item.unitPrice * item.quantity,
    0
  );

  const totalPaid = transactions.reduce(
    (accumulator, trans) => accumulator + trans.amount,
    0
  );
</script>

<div class="table-responsive">
  <table>
    <thead>
      <tr>
        <th>{$t.itemName}</th>
        <th>{$t.unitType}</th>
        <th>{$t.unitPrice}</th>
        <th>{$t.quantity}</th>
        <th>{$t.totalAmount}</th>
      </tr>
    </thead>
    <tbody>
      {#each purchaseOrder as { itemName, unitType, unitPrice, quantity }}
        {#if unitPrice == 0 && quantity == 0}
          <tr>
            <th colspan="5">{$t[itemName]}</th>
          </tr>
        {:else}
          <tr>
            <td>{$t[itemName]}</td>
            <td>{unitType}</td>
            <td>{currency(unitPrice)}</td>
            <td>{quantity}</td>
            <td>{currency(unitPrice * quantity)}</td>
          </tr>
        {/if}
      {/each}
    </tbody>
    <tfoot>
      <tr>
        <th colspan="4">{$t.totalAmount}:</th>
        <th>{currency(totalCost)}</th>
      </tr>
      <tr>
        <th colspan="4">{$t.amountPaid}:</th>
        <th style="color: var(--green)">
          {currency(totalPaid)}
        </th>
      </tr>
      <tr>
        <th colspan="4">{$t.amountRemaining}:</th>
        <th style="color: var(--red)">
          {currency(totalCost - totalPaid)}
        </th>
      </tr>
    </tfoot>
  </table>
</div>
