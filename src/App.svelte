<script>
  import { onMount } from "svelte";
  import Hero from "./components/Hero.svelte";
  import Points from "./components/Points.svelte";
  import Faq from "./components/Faq.svelte";
  import SubscriptionBox from "./components/SubscriptionBox.svelte";
  import CoffeeExpertise from "./components/CoffeeExpertise.svelte";
  import {
    fetchCart,
    getProductData,
    getSubscriptionData,
    getLang,
    getMarket,
    getPriceFormatted,
    visibleEl,
    watchCart,
  } from "./utils.js";
  import {
    market,
    lang,
    viewportWidth,
    cartHasSKU,
    currencySymbol,
  } from "./store.js";
  import throttle from "just-throttle";

  const sku = "BNE800BSSUK";
  const machines = ["BNE800BSSUK", "GCB2-GB-WH-NE1", "A3NKGCB2-GB-BK"];

  let main,
    mainHeader,
    headerTopEl,
    headerNavigationEl,
    headerNavigationElHeight,
    desktopView,
    headerTopOffset = -100,
    stickyHidden = true,
    s_btn,
    machineSubscriptionData = getMachineSubscriptionData(machines),
    product,
    lastY = 0,
    sliderVersion = true;

  async function getProduct(sku) {
    let item;
    try {
      item = await getProductData(sku);
    } catch (e) {}
    return item;
  }

  async function getSubscriptionPlan(sku) {
    let item;
    try {
      const data = await getSubscriptionData();
      for (const plan of data.subscriptionProfiles) {
        if (plan.productChoices.indexOf(sku) > -1) {
          item = plan;
        }
      }
    } catch (e) {}
    return item;
  }

  async function getMachineSubscriptionData(items) {
    const itemsList = [];
    for (const item of items) {
      const p = await getProduct(item);
      const s = await getSubscriptionPlan(item);
      itemsList.push({
        machine: p,
        plan: s,
      });
    }
    return itemsList;
  }

  async function setCurrencySymbol() {
    const symbol = await getPriceFormatted(1);
    return symbol.charAt(0);
  }

  const handleResize = (e) => {
    viewportWidth.update((existing) => window.outerWidth);
    desktopView = window.outerWidth > 767;
  };

  onMount(async () => {
    mainHeader = document.getElementById("top");
    headerTopEl = document.querySelector(".Header__top-wrapper");
    headerNavigationEl = document.querySelector(".HeaderNavigationBar");
    headerNavigationElHeight = headerNavigationEl.getBoundingClientRect()
      .height;
    headerTopEl.classList.add("loaded");
    desktopView = window.outerWidth > 767;

    // Setting store variables
    market.set(getMarket());
    lang.set(getLang());
    currencySymbol.set(await setCurrencySymbol());
    viewportWidth.set(window.outerWidth);

    product = await getProduct(sku);
    onCartUpdate();
    setTimeout(function () {
      s_btn = document.getElementById("Hero__AddToBagButton");
      //updateStickyVisibility();
    }, 100);
  });

  // Updating the Subscribe btn with cart
  //watchCart(onCartUpdate);
  async function onCartUpdate() {
    const cart = await fetchCart();
    const incart = skuInCart(cart);
    // console.log(cart);
    // console.log(incart);
    cartHasSKU.update((existing) => incart);
  }
  function skuInCart(arr) {
    if (!arr.length) return false;
    return arr.some((item) => item.productId === product.id);
  }
</script>

<style type="text/scss">
  @import "./scss/fonts";
  @import "./scss/mixins";
  @import "./scss/variables";

  main {
    text-align: center;
    padding: 0;
    margin: 0 auto;
    font-family: "NespressoLucas", Helvetica, Arial, sans-serif;
    font-weight: 400;
  }

  :global(.restrict) {
    max-width: 66.25em;
    padding: 0 2em;
    margin: 0 auto;
  }
  :global(#top) {
    background-color: black;
  }
  :global(#top),
  :global(.topDelBan) {
    z-index: 90;
  }

  :global(#top .HeaderNavigationBar__switch),
  :global(#top .Header__top-wrapper.loaded) {
    transition: transform 0.15s ease-out;
    transform: translateY(0px);
  }

  :global(#top.hid .HeaderNavigationBar__switch),
  :global(#top.hid .Header__top-wrapper.loaded) {
    transform: translateY(-55px);
  }

  @include mq("tablet-small") {
    main {
      max-width: none;
    }
  }
  @include mq("tablet") {
    // #stickyButton {
    //   transition: transform 0.25s ease-out;
    // }
    :global(#top) {
      :global(.HeaderNavigationBar__switch),
      :global(.Header__top-wrapper.loaded) {
        transition: none;
        transform: none;
      }

      &.hid {
        :global(.HeaderNavigationBar__switch),
        :global(.Header__top-wrapper.loaded) {
          transform: none;
        }
      }
    }
  }
</style>

<svelte:window on:resize={handleResize} />

<!-- <svelte:window
  bind:scrollY
  on:scroll={throttle(scrollHandler, 300)}
  on:resize={handleResize} /> -->

<!-- <div
  id="stickyButton"
  class:hid={stickyHidden}
  class:visibletop={!stickyHidden && scrollDir === 'down' && !desktopView}
  class:visibleoffset={(!stickyHidden && scrollDir === 'up') || (!stickyHidden && desktopView)}
  style="transform: translateY({headerTopOffset}px)">
  <StickyButton />
</div> -->

<main bind:this={main}>
  <Hero />
  <Points />
  <SubscriptionBox />
  <CoffeeExpertise />
  <Faq />
</main>
