<script>
  import { onMount } from "svelte";
  import Glide from "@glidejs/glide";
  import { getProduct } from "../index.js";
  import Button from "./Button.svelte";
  import Arrow from "./Arrow.svelte";
  // import { imagesGitStorage } from "../store.js";

  let gliderEl;

  async function getData() {
    let item;
    try {
      item = await getProduct("BNE800BSSUK");
    } catch (e) {}
    return item;
  }

  let offeredMachine = getData();
  const clickHandler = (e) => {
    console.log("clicked");
  };
  onMount(() => {
    setTimeout(function () {
      var glide = new Glide(gliderEl, {
        perView: 1,
        type: "carousel",
      });
      glide.mount();
    }, 0);
  });
</script>

<style type="text/scss" global>
  @import "../../node_modules/@glidejs/glide/dist/css/glide.core.min";
  @import "../scss/variables";
  @import "../scss/mixins";

  .perfectMatch__title {
    margin: 0;
    color: black;
    font-family: $lucasLight;
    font-size: 1.875rem;
    font-weight: 300;
    letter-spacing: 0.375rem;
    line-height: 2.5rem;
  }
  .perfectMatch__container {
    background: linear-gradient(to bottom, #f6f4f2 50%, white 0);
  }
  .perfectMatch__content {
    padding: 2.5rem 2.5rem 2rem;
  }
  .perfectMatch__name {
    color: #000000;
    font-family: $lucasBold;
    font-size: 1.125rem;
    letter-spacing: 3px;
    line-height: 1.5rem;
    text-align: center;
    margin-top: 0.75rem;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }
  .perfectMatch__description {
    color: #000000;
    font-family: $lucasNormal;
    font-size: 0.875rem;
    letter-spacing: 1px;
    line-height: 1.3125rem;
    text-align: left;
    li {
      margin-bottom: 0.5rem;
      padding-left: 0.75rem;
      position: relative;
      @include before-checkmark(6px, $greenColor);
    }
  }
  .perfectMatch__price {
    color: #000000;
    font-family: $lucasLight;
    font-size: 1rem;
    letter-spacing: 1px;
    line-height: 1.5rem;
    span {
      color: $greenColor;
      font-family: $lucasBold;
      font-size: 18px;
      letter-spacing: 3px;
    }
    &--m {
      display: block;
    }
    &--d {
      display: none;
    }
  }
  .perfectMatch__moreAbout {
    text-align: center;
    margin-top: 0.75rem;
    a {
      color: $brownColor;
      font-family: $lucasBold;
      font-size: 1.125rem;
      letter-spacing: 1px;
      line-height: 1.5rem;
    }
  }
  .perfectMatch__price__original {
    color: #666666;
    font-family: $lucasLight;
    font-size: 0.875rem;
    letter-spacing: 1px;
    line-height: 1.3125rem;
  }
  .glide__bullet {
    height: 11px;
    width: 11px;
    border: 1px solid #000000;
    border-radius: 100%;
    margin: 0 10px;
    padding: 0;
  }
  .glide__bullet--active {
    background-color: #000000;
  }
</style>

{#await offeredMachine then machine}
  <section id="offer" class="perfectMatch">
    <div class="perfectMatch__container">
      <div class="perfectMatch__content">
        <h2 class="perfectMatch__title">MIGHT BE YOUR PERFECT MATCH</h2>
        <div class="perfectmatch__machine">
          <div class="perfectMatch__machineSlider glide" bind:this={gliderEl}>
            <div data-glide-el="track" class="glide__track">
              <ul class="glide__slides">
                {#each machine.slides as slide}
                  <li class="glide__slide">
                    <!-- <img itemprop="image" 
                    srcset="{slide.url}?impolicy=productPdpMainDefault&amp;imwidth=1568 1x, {slide.url}?impolicy=productPdpMainDefault&amp;imwidth=3136 2x" 
                    src="{slide.url}?impolicy=productPdpMainDefault&amp;imwidth=1568" 
                    role="presentation" class="ResponsiveImage ResponsiveImage--flexible" alt="" width="1568" height="608"> -->
                    <img
                      itemprop="image"
                      srcset="{slide.url}?impolicy=productPdpSafeZone&imwidth=1238 1x, {slide.url}?impolicy=productPdpSafeZone&imwidth=2476 2x"
                      src="{slide.url}?impolicy=productPdpSafeZone&imwidth=1238"
                      role="presentation"
                      class="ResponsiveImage ProductDetailsImage
                        ResponsiveImage--flexible"
                      alt=""
                      width="1238"
                      height="778" />
                  </li>
                {/each}
              </ul>
            </div>
            <div class="glide__bullets" data-glide-el="controls[nav]">
              {#each machine.slides as slide, i}
                <button class="glide__bullet" data-glide-dir="={i}" />
              {/each}
            </div>
          </div>
          <div class="perfectMatch__machineInfo">
            <h4 class="perfectMatch__name">{machine.category}</h4>
            <div class="perfectMatch__price perfectMatch__price--m">
              <p><span>£1.00</span>+ £55.00 / month</p>
              <p>instead of £{machine.price}</p>
            </div>
            <ul class="perfectMatch__description">
              <li>{machine.headline}</li>
              <li>Free Delivery</li>
              <li>24 months minimum term</li>
            </ul>
            <div class="perfectMatch__priceCta">
              <div class="perfectMatch__price perfectMatch__price--d">
                <p><span>£1.00</span>+ £55.00 / month</p>
                <p class="perfectMatch__price__original">
                  instead of £{machine.price}
                </p>
              </div>
              <div class="perfectMatch__cta">
                <Button
                  text="SUBSCRIBE"
                  hiddenText=""
                  iconPlus={true}
                  iconBasket={false}
                  on:buttonClick={clickHandler} />
                <!-- <a
                  class="track-click"
                  onclick="promoClickNew('machine-pdp-subscription-banner', 'Subscription', 'pdp-banner', 'pdp-banner')"
                  href="../../../machine-subscription"
                  target="_blank">SUBSCRIBE</a> -->
                <div class="perfectMatch__moreAbout">
                  <a href={machine.pdpURLs.desktop}>
                    <span>More about this machine</span>
                    <Arrow type="right" color="brown" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
{/await}
