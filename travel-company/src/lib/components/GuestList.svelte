<script lang="ts">
  import type { Guest } from "$lib/types";
  export let guests: Guest[];
</script>

<div class="table">
  <table>
    <tbody>
      {#each guests as { guestName }, i}
        <tr>
          <td style="width: 2rem">{i}</td>
          <td style="text-transform: uppercase">{guestName}</td>
          <td style="width: 3rem" />
        </tr>
      {/each}
    </tbody>
  </table>
</div>
