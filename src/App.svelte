<script>
  import Hero from "./components/Hero.svelte";
  import IconList from "./components/IconList.svelte";
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
  <IconList />
</main>
