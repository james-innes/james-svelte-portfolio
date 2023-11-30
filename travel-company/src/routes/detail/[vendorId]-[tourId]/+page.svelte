<script lang="ts">
  import { formatDate } from "$lib/utils";
  import { goto } from "$app/navigation";
  import t from "$lib/localise";
  import type { PageData } from "./$types";

  import GuestList from "$lib/components/GuestList.svelte";
  import PurchaseOrder from "$lib/components/PurchaseOrder.svelte";

  export let data: PageData;
</script>

<button
  on:click={() => goto(`/serviceSummary/${data.vendorId}`)}
  type="button"
  style="width: 100%"
>
  <i class="fa-solid fa-chevron-left" />
  {$t.back}
</button>

<div class="col spread">
  <h3>{$t.tour}</h3>
  <h4>{formatDate(data.tour?.tourDate)}</h4>

  <h3 id="purchaseOrder">{$t.purchaseOrder}</h3>
  <PurchaseOrder
    purchaseOrder={data.purchaseOrder}
    transactions={data.transactions}
  />

  <hr style="margin: 2rem 0;" />

  <h3 id="guestList">{$t.guestList}</h3>
  <GuestList guests={data.guests} />
</div>
