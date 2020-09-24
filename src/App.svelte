<script>
  import Hero from "./components/Hero.svelte";
  import Points from "./components/Points.svelte";
  import Faq from "./components/Faq.svelte";
  import Offer from "./components/Offer.svelte";
</script>

<style type="text/scss">
  @import "./scss/fonts";

  main {
    text-align: center;
    padding: 0;
    margin: 0 auto;
    font-family: "NespressoLucas-normal", Arial, Helvetica, sans-serif !important;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <Hero />
  <Points />
  <Offer />
  <Faq />
</main>
