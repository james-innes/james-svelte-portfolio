<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

{#if data.isSuccess}
  <div class="col" data-testid="payment-confirmation-success-alert">
    <h3>Booking Created</h3>
    <p>{data.message}</p>
    <ul>
      <li>Amount: {data.vnp_Amount}</li>
      <li>Bank Code: {data.vnp_BankCode}</li>
      <li>Transaction No: {data.vnp_TransactionNo}</li>
    </ul>
  </div>
{:else}
  <h3>Error</h3>
  <p>There was an error while creating the booking</p>
  <p>{data.message}</p>
{/if}
