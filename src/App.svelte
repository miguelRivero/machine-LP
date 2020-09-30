<script>
  import { onMount } from "svelte";
  import Hero from "./components/Hero.svelte";
  import Points from "./components/Points.svelte";
  import Faq from "./components/Faq.svelte";
  import Offer from "./components/Offer.svelte";
  import StickyButton from "./components/StickyButton.svelte";
  import { getProduct, visibleY } from "./utils.js";
  import { fly } from "svelte/transition";
  import { headerHeight } from "./store.js";
  import throttle from "just-throttle";

  let main,
    headerTopOffset = -100,
    stickyHidden = true,
    direction,
    s_btn,
    offeredMachine = getData();

  async function getData() {
    let item;
    try {
      item = await getProduct("BNE800BSSUK");
    } catch (e) {}
    return item;
  }

  function getDelBanBottom() {
    return document.querySelector("#topDelBan").getBoundingClientRect().bottom;
  }

  function setHeaderHeight(h) {
    headerHeight.set(h);
  }
  const scrollHandler = (e) => {
    let headerTopOffsetTemp = getDelBanBottom();
    if (headerTopOffset !== headerTopOffsetTemp)
      headerTopOffset = headerTopOffsetTemp;
    let stickyHiddenTemp = visibleY(s_btn, headerTopOffset);
    if (stickyHidden !== stickyHiddenTemp) stickyHidden = stickyHiddenTemp;
  };

  onMount(() => {
    s_btn = main.querySelector("#Hero__AddToBagButton");
    setTimeout(() => {
      //headerTopOffset = getDelBanBottom();
      setHeaderHeight(headerTopOffset);
    }, 500);
  });
</script>

<style type="text/scss">
  @import "./scss/fonts";

  main {
    text-align: center;
    padding: 0;
    margin: 0 auto;
    font-family: "NespressoLucas-normal", Arial, Helvetica, sans-serif !important;
  }

  #stickyButton {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 99;
    transition: transform 0.25s ease-out;
    &.hid {
      transform: translateY(-20px) !important;
    }
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<svelte:window on:scroll={throttle(scrollHandler, 500)} />

<div
  id="stickyButton"
  class:hid={stickyHidden}
  style="transform: translateY({headerTopOffset}px)">
  <StickyButton />
</div>

<main bind:this={main}>
  <Hero />
  <Points />
  {#await offeredMachine then value}
    <Offer machine={value} />
  {/await}
  <Faq />
</main>
