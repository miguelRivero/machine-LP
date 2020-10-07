<script>
  import { onMount, onDestroy, tick } from "svelte";
  import { Swipe, SwipeItem } from "svelte-swipe"; // gzipped 3.37 KB
  import { desktopView } from "../store.js";

  const unsubscribe = desktopView.subscribe((value) => (desktop = value));

  let swipeConfig, desktop, slider, slidetems, dots;

  onDestroy(unsubscribe);
  $: imgWidth = desktop ? 1568 : 1238;
  $: imgHeight = desktop ? 608 : 778;
  // $: console.log(`${desktop}`);

  export let slides;

  onMount(() => {
    // setTimeout(function () {
    swipeConfig = {
      autoplay: false,
      delay: 2000,
      showIndicators: true,
      transitionDuration: 1000,
      defaultIndex: 0,
    };
    setTimeout(function () {
      slider = document.getElementById("offer");
      dots = slider.querySelectorAll(".swipe-indicator > .dot");
      slidetems = slider.querySelectorAll(".swipeable-item");
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
    slidetems.forEach((element, i) => {
      if (index === i) {
        element.classList.add("is-active");
      } else {
        element.classList.remove("is-active");
      }
    });
  };
</script>

<style type="text/scss">
  @import "../scss/mixins";

  :global(.swipe-holder) {
    height: 50vh;
    width: 100%;
    padding-top: 0;
    position: relative;
  }

  #offer {
    :global(.swipe-indicator) {
      bottom: 10%;
      :global(.dot) {
        border-color: black;
        margin: 0 10px;
        &.is-active {
          background-color: black;
        }
      }
    }
  }
  .SliderItemImage {
    height: auto;
    max-width: 140%;
    mix-blend-mode: multiply;
    position: absolute;
    // width: 200%;
    // transform: translateX(-25%);
  }

  // :global(.swipeable-items) {
  //   position: absolute !important;
  //   width: 130% !important;
  //   left: 65% !important;
  //   transform: translateX(-65%) !important;
  // }
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
  @include mq("tablet") {
    :global(.swipe-holder) {
      height: 0;
      padding-top: 100%;
    }
    #offer {
      position: relative;
      width: 50%;
      // height: 443px;
      overflow: hidden;
      // padding: 0;
      :global(.swipe-panel) {
        //width: auto;
        position: absolute;
        top: 0;
      }
      :global(.swipe-indicator) {
        bottom: 23%;
      }
    }
    // .swipe-holder {
    //   height: 443px;
    //   position: absolute;
    //   top: 0;
    //   left: 1.5rem;
    //   width: calc(200% - 6rem);
    //   transform: translateX(-25%);
    // }
    :global(.swipeable-slot-wrapper) {
      overflow: hidden;
    }
    :global(.swipeable-item) {
      background: linear-gradient(to bottom, #f6f4f2 65%, white 0);
    }
    // .SliderItemImage {
    //   position: absolute;
    //   left: -10000%;
    //   right: -10000%;
    //   top: -10000%;
    //   bottom: -10000%;
    //   margin: auto;
    //   transform: scale(0.1);
    //   min-width: 1000%;
    //   min-height: 1000%;
    //   max-width: 10000%;
    //   max-height: 10000%;
    // }
  }
</style>

<section id="offer">
  <div class="swipe-holder">
    {#if swipeConfig}
      <Swipe {...swipeConfig}>
        {#each slides as slide}
          <SwipeItem>
            <img
              itemprop="image"
              role="presentation"
              src="{slide.url}?impolicy=productPdpSafeZone&imwidth={imgWidth}"
              class="SliderItemImage"
              alt=""
              width={imgWidth}
              height={imgHeight} />
          </SwipeItem>
        {/each}
      </Swipe>
    {/if}
  </div>
</section>
