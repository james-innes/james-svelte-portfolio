<script lang="ts">
  import t from "$lib/localise";

  export let guest = {
    guestName: null,
    drivingChoice: null,
    isVegetarian: false,
    hasGivenPassport: false,
    whatsApp: null,
    addedOnWhatsApp: false,
    email: null,
    wixBookingId: null,
  };
</script>

<div class="row" style="row-gap: 1rem;">
  <label>
    Full Name
    <input
      data-testid="name"
      type="text"
      style="max-width: 20rem"
      placeholder="First Last"
      bind:value={guest.guestName}
      required
    />
    <small>As shown on passport</small>
  </label>

  <label>
    WhatsApp
    <input
      data-testid="whatsapp"
      type="tel"
      style="width: 10rem"
      placeholder="+00 0000000000"
      bind:value={guest.whatsApp}
      required
    />
    <small>
      <a href="/static/find-whatsapp-number.jpeg" target="_blank">
        How to find
      </a>
    </small>
  </label>

  <label>
    Email
    <input
      data-testid="email"
      type="email"
      style="width: 15rem"
      placeholder="name@domain.com"
      bind:value={guest.email}
    />
    <small>.</small>
  </label>

  <label>
    Driving Choice
    <select
      data-testid="driving-choice"
      bind:value={guest.drivingChoice}
      required
    >
      <option value="selfDrive">{$t.selfDrive}</option>
      <option value="easyRider">{$t.easyRider}</option>
    </select>
    <small>.</small>
  </label>
  <div class="checkboxes">
    <label>
      <input
        data-testid="vegetarian"
        type="checkbox"
        bind:checked={guest.isVegetarian}
      />
      Vegetarian
    </label>
  </div>
</div>
