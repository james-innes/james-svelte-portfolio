<script lang="ts">
  import t from "$lib/localise";
  import type { Vendor } from "$lib/types";

  export let data: Vendor;
</script>

<h2>{$t.vendor}</h2>
<h3>{data.name}</h3>

<table class="table">
  <thead>
    <tr>
      <th>🏦 Bank Account</th>
      <th />
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>{$t.nickname}</th>
      <td>{data.bankAccount.nickname}</td>
    </tr>
    <tr>
      <th>{$t.accountName}</th>
      <td>{data.bankAccount.accountName}</td>
    </tr>
    <tr>
      <th>{$t.accountNumber}</th>
      <td>{data.bankAccount.accountNumber}</td>
    </tr>
    <tr>
      <th>{$t.bankName}</th>
      <td>{data.bankAccount.bankName}</td>
    </tr>
  </tbody>
</table>
