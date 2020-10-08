<script>
  import { onMount, onDestroy } from "svelte";
  import Button from "./Button.svelte";
  import Arrow from "./Arrow.svelte";
  import Slider from "./SliderSwipe.svelte";
  import getSymbolFromCurrency from "currency-symbol-map";
  import { desktopView, cartHasSKU } from "../store.js";

  export let data = {},
    desktop,
    addingToCart,
    //buttonText = "SUBSCRIBE",
    skuInCart;

  const unsubscribeDesktop = desktopView.subscribe(
    (value) => (desktop = value)
  );
  const unsubscribeCartHasSKU = cartHasSKU.subscribe(
    (value) => (skuInCart = value)
  );
  onDestroy(unsubscribeDesktop, unsubscribeCartHasSKU);

  const clickHandler = (e) => {
    e.preventDefault();
    addingToCart = true;
    window.CartManager.addSubscription(data.plan.id, data.machine.legacyId)
      .then(() => {
        addingToCart = false;
      })
      .catch(() => {
        addingToCart = false;
        console.log("Error adding the subscription");
      });
  };

  const currSymbol = getSymbolFromCurrency(data.machine.currency);

  onMount(() => {
    console.log("OFFER skuInCart = " + skuInCart);
    //buttonText = skuInCart ? "ADDED" : "SUBSCRIBE";
  });
</script>

<style type="text/scss" global>
  @import "../../node_modules/@glidejs/glide/dist/css/glide.core.min";
  @import "../scss/variables";
  @import "../scss/mixins";

  .perfectMatch__title {
    margin: 0;
    color: black;
    font-family: NespressoLucas !important;
    font-weight: 300;
    font-size: 1.875rem;
    font-weight: 300;
    letter-spacing: 0.375rem;
    line-height: 2.5rem;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
  .perfectMatch__container {
    background: linear-gradient(to bottom, #f6f4f2 50%, white 0);
  }
  .perfectMatch__content {
    padding: 2.5rem 0 2rem;
  }
  .perfectMatch__name {
    color: #000000;
    font-family: NespressoLucas !important;
    font-weight: 700;
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
    font-family: NespressoLucas !important;
    font-weight: 300;
    font-size: 0.875rem;
    letter-spacing: 1px;
    line-height: 1.3125rem;
    text-align: left;
    margin-bottom: 1rem;
    li {
      margin-bottom: 0.5rem;
      padding-left: 1.375rem;
      position: relative;
      @include before-checkmark(6px, $greenColor);
    }
  }
  .perfectMatch__price {
    color: #000000;
    font-family: NespressoLucas !important;
    font-weight: 300;
    font-size: 1rem;
    letter-spacing: 1px;
    line-height: 1.5rem;
    span {
      color: $greenColor;
      font-family: NespressoLucas !important;
      font-weight: 700;
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
      font-family: NespressoLucas !important;
      font-weight: 700;
      font-size: 1.125rem;
      letter-spacing: 1px;
      line-height: 1.5rem;
    }
  }
  .perfectMatch__price__original {
    color: #666666;
    font-family: NespressoLucas !important;
    font-weight: 300;
    font-size: 0.875rem;
    letter-spacing: 1px;
    line-height: 1.3125rem;
  }
  .perfectMatch__machineInfo {
    padding-left: 2.5rem;
    padding-right: 2.5rem;
  }
  @include mq("tablet") {
    .perfectMatch__container {
      background: linear-gradient(to bottom, #f6f4f2 71%, white 0);
    }
    // .perfectMatch__title {
    //   margin-bottom: 64px;
    // }
    .perfectMatch__machine {
      position: relative;
    }
    .perfectMatch__machineInfo {
      position: absolute;
      background-color: white;
      border: 1px solid #dbdbdb;
      padding: 1.75rem 2rem;
      top: 50%;
      transform: translateY(-50%);
      left: 50%;
      max-width: 569px;
      text-align: left;
    }
    .perfectMatch__name {
      text-align: left;
      margin-top: 0;
      margin-bottom: 2rem;
      font-size: 1.5rem;
      letter-spacing: 2px;
      line-height: 2rem;
    }
    .perfectMatch__price {
      &--m {
        display: none;
      }
      &--d {
        display: block;
      }
    }
    .perfectMatch__description {
      margin-bottom: 3rem;
    }

    .perfectMatch__priceCta {
      // display: flex;
      // justify-content: space-between;
      display: block;
      .AddToBagButton {
        max-width: 242px;
        width: 100%;
      }
    }
    .perfectMatch__moreAbout {
      text-align: left;
    }

    .perfectMatch__cta {
      margin-left: 0;
      margin-top: 1rem;
    }
    @include mq("tablet-wide") {
      .perfectMatch__priceCta {
        display: flex;
        justify-content: space-between;
      }
      .perfectMatch__cta {
        margin-left: 2rem;
        margin-top: 0;
        min-width: 14.5rem;
      }
    }
  }
</style>

<section id="offer" class="perfectMatch">
  <div class="perfectMatch__container">
    <div class="perfectMatch__content">
      <h2 class="perfectMatch__title">MIGHT BE YOUR PERFECT MATCH</h2>
      <div class="perfectMatch__machine">
        <Slider slides={data.machine.slides} />
        <div class="perfectMatch__machineInfo">
          <h4 class="perfectMatch__name">{data.machine.category}</h4>
          <div class="perfectMatch__price perfectMatch__price--m">
            <p><span>{currSymbol}1.00</span>+ {currSymbol}55.00 / month</p>
            <p>instead of {currSymbol}{data.machine.price}</p>
          </div>
          <ul class="perfectMatch__description">
            <li>{data.machine.headline}</li>
            <li>Free Delivery</li>
            <li>24 months minimum term</li>
          </ul>
          <div class="perfectMatch__priceCta">
            <div class="perfectMatch__price perfectMatch__price--d">
              <p>
                <span>{currSymbol}{data.plan.promotionalPrice.toFixed(2)}</span>+
                {currSymbol}{data.plan.periodicFee.toFixed(2)}
                / MONTH
              </p>
              <p class="perfectMatch__price__original">
                instead of
                {currSymbol}{data.machine.price}
              </p>
            </div>
            <div class="perfectMatch__cta" class:disabled={addingToCart}>
              <Button
                disabled={addingToCart}
                text={skuInCart ? 'ADDED' : 'SUBSCRIBE'}
                hiddenText=""
                iconPlus={true}
                iconBasket={false}
                on:buttonClick={clickHandler} />
              <div class="perfectMatch__moreAbout">
                <a
                  href={desktop ? data.machine.pdpURLs.desktop : data.machine.pdpURLs.mobile}>
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
