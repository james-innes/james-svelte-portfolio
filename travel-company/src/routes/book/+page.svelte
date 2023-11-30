<script lang="ts">
  import TourDate from "./TourDate.svelte";
  import Guest from "./Guest.svelte";
  import Invoice from "./Invoice.svelte";
  import { goto } from "$app/navigation";
  import type { TourDateOption } from "$lib/types";
  import type { PageData } from "./$types";
  import { locale } from "$lib/localise";

  $locale = "en";

  export let data: PageData;

  let passcode: string;

  let selectedTourDateOption: TourDateOption;
  let invoiceTotal = 0;
  let process: boolean = false;

  const newGuest = () => ({
    guestName: null,
    drivingChoice: null,
    isVegetarian: false,
    hasGivenPassport: false,
    whatsApp: null,
    addedOnWhatsApp: false,
    email: null,
    wixBookingId: null,
  });

  $: newGuests = [newGuest()];

  let form: HTMLFormElement;

  async function book() {
    if (!form.checkValidity()) {
      form.preventDefault();
      form.stopPropagation();
    }

    process = true;
    let res = await fetch("/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tourDateOption: selectedTourDateOption,
        newGuests,
      }),
    });

    let paymentUrl = await res.json().then((d) => d.paymentUrl);
    goto(paymentUrl);
  }
</script>

<TourDate tourDateOptions={data.tourDateOptions} bind:selectedTourDateOption />

{#if selectedTourDateOption}
  <form
    bind:this={form}
    on:submit|preventDefault={book}
    class="col"
    data-testid="booking-form"
    autocomplete="off"
  >
    <hr class="my-4" />
    {#each newGuests as guest, index}
      <div data-testid="guest-element-{index}">
        <Guest bind:guest />
      </div>
      {#if index > 0}
        <button
          on:click={() => {
            newGuests.splice(index, 1), (newGuests = newGuests);
          }}
          type="button"
          data-testid="remove-guest-button-{index}"
        >
          Remove
        </button>
      {/if}

      <hr />
    {/each}
    <div class="row" style="justify-content: center;">
      <button
        type="button"
        class="bold"
        on:click={() => (newGuests = [...newGuests, newGuest()])}
        data-testid="add-guest-button"
      >
        <i class="fa-solid fa-user-plus" />
        Add another guest
      </button>
    </div>

    <label>
      Passcode
      <input
        data-testid="passcode"
        style="max-width: 10rem"
        bind:value={passcode}
      />
    </label>

    {#if passcode == "123"}
      <Invoice bind:newGuests bind:invoiceTotal />

      <div class="row" style="justify-content: center;">
        <button
          disabled={invoiceTotal == 0 || process}
          class="bold"
          style="width: 80%"
          type="submit"
          data-testid="submit-button"
        >
          {#if process}
            <i class="fa fa-spinner fa-spin" />
            <span role="status">Loading...</span>
          {:else}
            <i class="fa-solid fa-credit-card" />
            Checkout
          {/if}
        </button>
      </div>
    {/if}
  </form>
{/if}
