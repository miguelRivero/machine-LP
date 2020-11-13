<script>
  import { onMount, onDestroy } from "svelte";
  import Arrow from "./Arrow.svelte";
  import { market, lang, desktopView, viewportWidth } from "../store.js";
  import { getPriceFormatted } from "../utils.js";

  import getSymbolFromCurrency from "currency-symbol-map";

  import Carousel from "@beyonk/svelte-carousel";

  export let slidesData, desktop, addingToCart;

  const unsubscribeDesktop = desktopView.subscribe(
    (value) => (desktop = value)
  );
  // const unsubscribeCartHasSKU = cartHasSKU.subscribe(
  //   (value) => (skuInCart = value)
  // );
  const unsubscribeMarket = market.subscribe((value) => (_market = value));
  const unsubscribeLang = lang.subscribe((value) => (_language = value));
  const unsubscribeViewportWidth = viewportWidth.subscribe(
    (value) => (_viewWidth = value)
  );
  onDestroy(
    unsubscribeDesktop,
    // unsubscribeCartHasSKU,
    unsubscribeMarket,
    unsubscribeLang,
    unsubscribeViewportWidth
  );

  let swipeConfig,
    slider,
    slideItems,
    dots,
    _market,
    _language,
    _viewWidth,
    currSymbol,
    slidesCopy = window.SubscriptionMachineLP[_market]["slider"]["slides"];
  $: imgWidth = desktop ? 1568 : 1238;
  $: imgHeight = desktop ? 608 : 778;
  // $: console.log(`${desktop}`);

  onMount(() => {
    // setTimeout(function () {
    swipeConfig = {
      autoplay: false,
      delay: 2000,
      showIndicators: true,
      transitionDuration: 1000,
      defaultIndex: 0,
    };

    setCurrencySymbol();

    setTimeout(function () {
      slider = document.getElementById("offer");
      dots = slider.querySelectorAll(".swipe-indicator > .dot");
      // slideItems = slider.querySelectorAll(".swipeable-item");
      slideItems = slider.querySelectorAll(".slides > div > div");
      for (const slide of slideItems) {
        slide.classList.add("slideItem");
      }
      addCustomClickEvent();
    }, 100);

    // }, 0);
  });

  const addCustomClickEvent = () => {
    dots.forEach((element, i) => {
      element.addEventListener("click", function (event) {
        setCustomActiveSlide(i);
      });
    });
  };

  const setCustomActiveSlide = (index) => {
    slideItems.forEach((element, i) => {
      if (index === i) {
        element.classList.add("is-active");
      } else {
        element.classList.remove("is-active");
      }
    });
  };

  async function setCurrencySymbol() {
    const symbol = await getPriceFormatted(1);
    currSymbol = symbol.charAt(0);
  }

  // const clickHandler = (e) => {
  //   e.preventDefault();
  //   addingToCart = true;
  //   window.CartManager.addSubscription(
  //     slidesData.plan.id,
  //     slidesData.machine.legacyId
  //   )
  //     .then(() => {
  //       addingToCart = false;
  //     })
  //     .catch(() => {
  //       addingToCart = false;
  //       console.log("Error adding the subscription");
  //     });
  // };
</script>

<style type="text/scss">
  @import "../scss/mixins";
  @import "../scss/variables";
  @import "../scss/fonts";

  #offer {
    margin-top: 1.5rem;
  }

  :global(.swipe-holder) {
    height: 29rem;
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
    &.active {
      background-color: black !important;
    }
  }

  :global(.slides) {
    overflow: visible !important;
  }
  :global(.slides > div) {
    display: flex;
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

  :global(.slideItem) {
    background-color: #f6f4f6;
    padding: 0 0.5rem;
    flex: 1 0 auto;
  }

  :global(.slide-content) {
    background-color: white;
    color: black;
    height: 100%;
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
    margin-top: 0.75rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }
  .perfectMatch__machineInfo {
    padding: 0 0.5rem 3rem;
    max-width: 13.25rem;
    margin: 0 auto;
    position: relative;
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
    }
  }
  .perfectMatch__priceCta {
    position: absolute;
    width: 100%;
    bottom: 1.375rem;
  }
  .perfectMatch__moreAbout {
    text-align: center;
    margin-top: 0.75rem;
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
    :global(.slideItem) {
      max-width: 19.5rem;
    }

    :global(.slides) {
      overflow: hidden !important;
    }
    :global(.carousel > ul li) {
      display: none;
    }
  }
</style>

<section id="offer">
  <div class="swipe-holder">
    <Carousel
      perPage={{ 768: 3 }}
      controls={false}
      dots={_viewWidth < 768}
      draggable={_viewWidth < 768}>
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
                {currSymbol}{slide.plan.periodicFee.toFixed(2)}
                {slidesCopy['month'][_language]}
              </p>
              <p class="perfectMatch__price__original">
                {slidesCopy['rrp'][_language]}
                {currSymbol}{slide.machine.price}
              </p>
            </div>
            <ul class="perfectMatch__description">
              <li>{slide.machine.headline}</li>
              <li>{slidesCopy['delivery'][_language]}</li>
              <li>
                {slide.plan.monthsDuration}
                {slidesCopy['periodic'][_language]}
              </li>
            </ul>
            <div class="perfectMatch__priceCta">
              <!-- <div class="perfectMatch__price perfectMatch__price--d" /> -->
              <div class="perfectMatch__cta" class:disabled={addingToCart}>
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
        </div>
      {/each}
    </Carousel>
  </div>
</section>
