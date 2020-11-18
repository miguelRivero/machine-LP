<script>
  import { onMount } from "svelte";
  import Hero from "./components/Hero.svelte";
  import Points from "./components/Points.svelte";
  import Faq from "./components/Faq.svelte";
  import OfferMultiple from "./components/OfferMultiple.svelte";
  // import Offer from "./components/Offer.svelte";
  import StickyButton from "./components/StickyButton.svelte";
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

  //AMD SPLIT MODE
  // async function loadFaq() {
  //   return (await import("./components/Faq.svelte")).default;
  // }
  //let FaqComponent = loadFaq();

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

  //$: scrollY = 0;
  //$: scrollDir = scrollDirection(scrollY);

  // (async () => {
  //   console.log(await machineSubscriptionData);
  // })();

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

  const getHeaderHeight = (el) => {
    let header_h = el.getBoundingClientRect().height,
      banner = false, //document.querySelector("#topDelBan"),
      off;
    if (banner) {
      let y = banner.getBoundingClientRect().y;
      let h = banner.getBoundingClientRect().height;
      off = y >= 0 ? y + h : header_h;
    } else {
      off = header_h;
    }
    return off;
  };

  // const scrollHandler = (e) => {
  //   //Check if scroll is up or down
  //   updateStickyVisibility();
  // };

  // const updateStickyVisibility = () => {
  //   let _header = headerTopEl ? headerTopEl : mainHeader;
  //   //Check the offset for the sticky position
  //   if (desktopView) {
  //     //Desktop sticky behaviour
  //     //Check if HeaderNavigationBar is visible in viewport
  //     headerTopOffset =
  //       getHeaderHeight(headerTopEl) + headerTopEl.getBoundingClientRect().top;
  //     let headerHidden = visibleEl(
  //       headerNavigationEl,
  //       headerTopOffset - headerNavigationElHeight
  //     );
  //     stickyHidden = scrollY === 0 ? true : headerHidden;
  //   } else {
  //     headerTopOffset = getHeaderHeight(_header);
  //     stickyHidden = visibleEl(s_btn, headerTopOffset);
  //     updateMainHeaderVisibility();
  //   }
  // };

  // const scrollDirection = (y) => {
  //   const dy = lastY - y;
  //   lastY = y;
  //   if (dy < 0) {
  //     return "down";
  //   } else {
  //     return "up";
  //   }
  // };

  // const updateMainHeaderVisibility = (dir) => {
  //   if (stickyHidden) {
  //     mainHeader.classList.remove("hid");
  //   } else {
  //     if (scrollDir === "down") {
  //       mainHeader.classList.add("hid");
  //     } else {
  //       mainHeader.classList.remove("hid");
  //     }
  //   }
  // };

  const handleResize = (e) => {
    viewportWidth.update((existing) => window.outerWidth);
    desktopView = window.outerWidth > 767;
    //updateStickyVisibility();
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

  // #stickyButton {
  //   position: fixed;
  //   top: 0;
  //   width: 100%;
  //   z-index: 99;
  //   transition: transform 0.25s ease-out 0.25s;
  //   &.hid {
  //     transform: translateY(-70px) !important;
  //   }
  //   &.visibletop {
  //     //     transition: transform 0.15s ease-out;
  //     transform: translateY(0px) !important;
  //   }
  // }

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
  {#if sliderVersion}
    {#await machineSubscriptionData then value}
      <OfferMultiple data={value} />
    {/await}
  {/if}
  <!-- {#await FaqComponent then value}
    <svelte:component this={value} />
  {/await} -->
  <Faq />
</main>
