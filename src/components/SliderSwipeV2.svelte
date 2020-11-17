<script>
  import { onMount, onDestroy } from "svelte";
  import Carousel from "@beyonk/svelte-carousel";
  import Arrow from "./Arrow.svelte";
  import {
    market,
    lang,
    desktopView,
    viewportWidth,
    currencySymbol,
  } from "../store.js";
  import { getPriceFormatted } from "../utils.js";

  export let slidesData;

  const unsubscribeMarket = market.subscribe((value) => (_market = value));
  const unsubscribeLang = lang.subscribe((value) => (_language = value));
  const unsubscribeCurrency = currencySymbol.subscribe(
    (value) => (currSymbol = value)
  );

  let _market,
    carousel,
    desktop,
    sliderEnabled,
    _language,
    currSymbol,
    slidesCopy = window.SubscriptionMachineLP[_market]["slider"]["slides"],
    unique = [{}],
    i = 0;

  const unsubscribeViewportWidth = viewportWidth.subscribe((value) => {
    sliderEnabled = value < 996;
  });

  const unsubscribeDesktop = desktopView.subscribe((value) => {
    if (carousel && value !== desktop) {
      unique = [{}];
      i++;
    }
    desktop = value;
  });
  onDestroy(
    unsubscribeDesktop,
    unsubscribeMarket,
    unsubscribeLang,
    unsubscribeViewportWidth,
    unsubscribeCurrency
  );

  // onMount(() => {
  //   _perpage = desktop ? 3 : 1;
  // });
</script>

<style type="text/scss">
  @import "../scss/mixins";
  @import "../scss/variables";
  @import "../scss/fonts";

  #offer {
    margin-top: 1.5rem;
  }

  :global(.swipe-holder) {
    height: 30.75rem;
    max-width: 16rem;
    margin: 0 auto;
    padding: 0 0.5rem;
    position: relative;
  }

  :global(.carousel) {
    height: 100%;
  }
  :global(.carousel > ul) {
    bottom: 0;
  }
  :global(.carousel > ul li) {
    border: 1px solid black !important;
    margin: 0 10px !important;
    background-color: transparent !important;
    cursor: pointer;
    &.active {
      background-color: black !important;
    }
  }

  :global(.slides) {
    overflow: visible !important;
    height: 100%;
  }
  :global(.slides > div) {
    display: flex;
    height: 31rem;
  }

  :global(.slides > div > div) {
    background-color: #f6f4f6;
    padding: 0 1rem 2rem;
    flex: 1 0 auto;
  }

  .SliderItemImage {
    height: auto;
    max-width: 80%;
    mix-blend-mode: multiply;
    // position: absolute;
  }

  :global(.swipeable-item) {
    background: linear-gradient(to bottom, #f6f4f2 61%, white 0);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    &.is-active {
      z-index: 10;
    }
  }

  :global(.slide-content) {
    background-color: white;
    color: black;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.05);
  }

  //New slide content
  .perfectMatch__name {
    color: #000000;
    font-family: "NespressoLucas", "Trebuchet MS", "Lucida Grande",
      "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif !important;
    font-weight: 700;
    font-size: 1.125rem;
    letter-spacing: 3px;
    line-height: 1.5rem;
    text-align: center;
    margin-top: 0;
    margin-bottom: 0.5rem;
    min-height: 3rem;
    text-transform: uppercase;
  }
  .perfectMatch__machineInfo {
    padding: 0 0.5rem;
    max-width: 13.25rem;
    margin: 0 auto;
    position: relative;
    flex: 1 0 auto;
  }
  .perfectMatch__price {
    color: #000000;
    font-family: "NespressoLucas", "Trebuchet MS", "Lucida Grande",
      "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif !important;
    line-height: 1.5rem;
    &__promotion {
      font-weight: 300;
      font-size: 1rem;
      letter-spacing: 1px;
      span {
        color: $greenColor;
        font-weight: 700;
        font-size: 18px;
        letter-spacing: 3px;
      }
    }
    &__original {
      color: #666666;
      font-size: 0.75rem;
      letter-spacing: normal;
      line-height: 1rem;
    }
  }
  .perfectMatch__description {
    color: #000000;
    font-family: "NespressoLucas", "Trebuchet MS", "Lucida Grande",
      "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif !important;
    font-weight: 300;
    font-size: 0.875rem;
    letter-spacing: 1px;
    line-height: 1.3125rem;
    text-align: left;
    margin: 1rem 0 0;
    li {
      margin-bottom: 0.5rem;
      padding-left: 1.375rem;
      position: relative;
      @include before-checkmark(6px, $greenColor);
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .perfectMatch__priceCta {
    // position: absolute;
    width: 100%;
    padding-bottom: 1rem;
    // bottom: 1.375rem;
  }
  .perfectMatch__moreAbout {
    text-align: center;
    // margin-top: 0.75rem;
    a {
      color: $brownColor;
      font-family: "NespressoLucas", "Trebuchet MS", "Lucida Grande",
        "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif !important;
      font-weight: 700;
      font-size: 1.125rem;
      letter-spacing: 1px;
      line-height: 1.5rem;
    }
  }

  @include mq("tablet") {
    :global(.swipe-holder) {
      max-width: 58.5rem;
    }

    :global(.slides) {
      overflow: hidden !important;
    }

    :global(.slides > div) {
      height: 31rem;
    }

    .slide-content {
      max-width: 19.5rem;
      margin: 0 auto;
    }
    // :global(.carousel > ul li) {
    //   display: none;
    // }
  }
  @include mq("tablet-l") {
    :global(.slides > div > div) {
      max-width: 19.5rem;
      min-width: 17.25rem;
    }
  }
</style>

<section id="offer">
  <!-- must use with div wrapper, not above component itself -->
  {#key unique}
    <div class="swipe-holder">
      <Carousel
        bind:this={carousel}
        perPage={{ 996: 3, 768: 2 }}
        duration={480}
        controls={false}
        dots={sliderEnabled}
        draggable={sliderEnabled}>
        {#each slidesData as slide}
          <div class="slide-content">
            <img
              itemprop="image"
              role="presentation"
              src={slide.machine.images.icon}
              class="SliderItemImage"
              alt="" />

            <div class="perfectMatch__machineInfo">
              <h4 class="perfectMatch__name">{slide.machine.category}</h4>
              <div class="perfectMatch__price">
                <p class="perfectMatch__price__promotion">
                  <span>{currSymbol}{slide.plan.promotionalPrice.toFixed(2)}</span>+
                  ${slidesCopy['month'][_language](slide.plan.periodicFee.toFixed(2))}
                </p>
                <p class="perfectMatch__price__original">
                  {slidesCopy['rrp'][_language]}
                  {currSymbol}{slide.machine.price}
                </p>
              </div>
              <ul class="perfectMatch__description">
                {#if slide.machine.headline}
                  <li>{slide.machine.headline}</li>
                {/if}
                <li>{slidesCopy['delivery'][_language]}</li>
                <li>
                  {slide.plan.monthsDuration}
                  {slidesCopy['periodic'][_language]}
                </li>
              </ul>
            </div>
            <div class="perfectMatch__priceCta">
              <!-- <div class="perfectMatch__price perfectMatch__price--d" /> -->
              <div class="perfectMatch__cta">
                <div class="perfectMatch__moreAbout">
                  <a
                    href={desktop ? slide.machine.pdpURLs.desktop : slide.machine.pdpURLs.mobile}>
                    <span>{slidesCopy['cta'][_language]}</span>
                    <Arrow type="right" color="brown" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </Carousel>
    </div>
  {/key}
</section>
