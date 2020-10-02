<script>
  import { onMount } from "svelte";
  import Hero from "./components/Hero.svelte";
  import Points from "./components/Points.svelte";
  import Faq from "./components/Faq.svelte";
  import Offer from "./components/Offer.svelte";
  import StickyButton from "./components/StickyButton.svelte";
  import { getProductData, getSubscriptionData, visibleEl } from "./utils.js";
  import { viewportWidth } from "./store.js";
  import throttle from "just-throttle";

  const sku = "BNE800BSSUK";

  let main,
    mainHeader,
    headerTopEl,
    headerNavigationEl,
    headerNavigationElHeight,
    windowWidth,
    desktopView,
    headerTopOffset = -100,
    stickyHidden = true,
    s_btn,
    currentY = 0,
    machineSubscriptionData = getMachineSubscriptionData(),
    lastY = 0;

  $: scrollDir = scrollDirection(currentY);

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

  async function getMachineSubscriptionData() {
    const p = await getProduct(sku);
    const s = await getSubscriptionPlan(sku);
    return {
      machine: p,
      plan: s,
    };
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

  const scrollHandler = (e) => {
    //Check if scroll is up or down
    updateStickyVisibility();
    //    updateMainHeaderVisibility(scrollDir, mainHeader);
  };

  const updateStickyVisibility = () => {
    //Check the offset for the sticky position

    if (desktopView) {
      //Desktop sticky behaviour
      //Check if HeaderNavigationBar is visible in viewport
      headerTopOffset =
        getHeaderHeight(headerTopEl) + headerTopEl.getBoundingClientRect().top;
      console.log(currentY);
      let headerHidden = visibleEl(
        headerNavigationEl,
        headerTopOffset - headerNavigationElHeight
      );
      stickyHidden = currentY === 0 ? true : headerHidden;
      //if (stickyHidden !== stickyHiddenTemp) stickyHidden = stickyHiddenTemp;
    } else {
      headerTopOffset = getHeaderHeight(mainHeader);
      stickyHidden = visibleEl(s_btn, headerTopOffset);
      updateMainHeaderVisibility();
      //Mobile sticky behaviour
      //Check if button of reference inside page is visible in viewport
    }
  };

  const scrollDirection = (y) => {
    const dy = lastY - y;
    lastY = y;
    if (dy < 0) {
      return "down";
    } else {
      return "up";
    }
  };

  const updateMainHeaderVisibility = (dir) => {
    if (stickyHidden) {
      mainHeader.classList.remove("hid");
    } else {
      if (scrollDir === "down") {
        mainHeader.classList.add("hid");
      } else {
        mainHeader.classList.remove("hid");
      }
    }
  };
  const handleResize = (e) => {
    viewportWidth.update((existing) => windowWidth);
    desktopView = windowWidth > 767;
    updateStickyVisibility();
  };

  onMount(() => {
    s_btn = main.querySelector("#Hero__AddToBagButton");
    mainHeader = document.getElementById("top");
    headerTopEl = document.querySelector(".Header__top-wrapper");
    headerNavigationEl = document.querySelector(".HeaderNavigationBar");
    headerNavigationElHeight = headerNavigationEl.getBoundingClientRect()
      .height;
    headerTopEl.classList.add("loaded");
    desktopView = windowWidth > 767;
    viewportWidth.set(windowWidth);
  });
</script>

<style type="text/scss">
  @import "./scss/fonts";
  @import "./scss/mixins";

  main {
    text-align: center;
    padding: 0;
    margin: 0 auto;
    font-family: "NespressoLucas-normal", Arial, Helvetica, sans-serif !important;
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
  :global(#top) {
    :global(.HeaderNavigationBar__switch),
    :global(.Header__top-wrapper.loaded) {
      transition: transform 0.15s ease-out;
      transform: translateY(0px);
    }

    &.hid {
      :global(.HeaderNavigationBar__switch),
      :global(.Header__top-wrapper.loaded) {
        transform: translateY(-55px);
      }
    }
  }
  #stickyButton {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 99;
    transition: transform 0.25s ease-out 0.25s;
    &.hid {
      transform: translateY(-70px) !important;
    }
    &.visibletop {
      //     transition: transform 0.15s ease-out;
      transform: translateY(0px) !important;
    }
  }

  @include mq("tablet-small") {
    main {
      max-width: none;
    }
  }
  @include mq("tablet") {
    #stickyButton {
      transition: transform 0.25s ease-out;
    }
  }
</style>

<svelte:window
  bind:outerWidth={windowWidth}
  on:scroll={throttle(scrollHandler, 300)}
  bind:scrollY={currentY}
  on:resize={handleResize} />

<div
  id="stickyButton"
  class:hid={stickyHidden}
  class:visibletop={!stickyHidden && scrollDir === 'down' && !desktopView}
  class:visibleoffset={(!stickyHidden && scrollDir === 'up') || (!stickyHidden && desktopView)}
  style="transform: translateY({headerTopOffset}px)">
  <StickyButton />
</div>

<main bind:this={main}>
  <Hero />
  <Points />
  {#await machineSubscriptionData then value}
    <Offer data={value} />
  {/await}
  <Faq />
</main>
