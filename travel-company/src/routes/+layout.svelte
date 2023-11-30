<script lang="ts">
  import "../style/index.css";
  import LanguageSelection from "$lib/components/LanguageSelection.svelte";
</script>

<main class="col" style="row-gap: 2rem;">
  <header class="row">
    <img src="/logo.png" id="logo" data-testid="logo" />
  </header>
  <slot />
  <footer class="col">
    <hr />
    <div class="row" style="justify-content: space-between;">
      <LanguageSelection />
      <small>Travel Company</small>
    </div>
  </footer>
</main>

<style>
  main {
    max-width: 70rem;
    margin: 0 auto;
    padding: 1rem 1rem 2rem;
  }

  @media only screen and (min-width: 58rem) {
    :root {
      font-size: 17px;
    }

    main {
      padding: 1rem 4rem 2rem;
    }
  }

  header {
    justify-content: center;
    flex-flow: nowrap;
  }

  #logo {
    object-fit: contain;
    background: none;
    height: 1rem;
  }

  footer {
    margin: 3rem 0 0;
  }
</style>
