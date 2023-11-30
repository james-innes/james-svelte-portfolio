<script lang="ts">
  import t from "$lib/localise";
  import { page } from "$app/stores";
  import vendors from "$lib/data/vendors";

  let vendorId = $page.route.id.split("/")[2];

  let vendor = vendors.find((vendor) => vendor.vendorId == vendorId);
</script>

<a type="button" style="width: 100%" href="/serviceSummary/{vendorId}">
  <i class="fa-solid fa-chevron-left" />
  {$t.serviceSummary}
</a>

<h3>{$t.serviceDescription}</h3>
<h4>{vendor?.name}</h4>

<slot />
