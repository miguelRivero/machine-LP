<script>
  import { onDestroy } from "svelte";
  import Slider from "./SliderSwipeV2.svelte";
  import Button from "./Button.svelte";
  import { market, lang } from "../store.js";

  export let data = {};

  const unsubscribeMarket = market.subscribe((value) => (_market = value));
  const unsubscribeLang = lang.subscribe((value) => (_language = value));
  onDestroy(unsubscribeMarket, unsubscribeLang);

  let _market,
    _language,
    slidesCopy = window.SubscriptionMachineLP[_market]["slider"];
</script>

<style type="text/scss" global>
  @import "../../node_modules/@glidejs/glide/dist/css/glide.core.min";
  @import "../scss/mixins";
  @import "../scss/fonts";

  .perfectMatch__title {
    margin: 0;
    color: black;
    font-family: "NespressoLucas", "Trebuchet MS", "Lucida Grande",
      "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif !important;
    font-weight: 300;
    font-size: 1.875rem;
    font-weight: 300;
    letter-spacing: 0.375rem;
    line-height: 2.5rem;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    text-transform: uppercase;
  }
  .perfectMatch__container {
    background-color: #f6f4f6;
  }
  .perfectMatch__content {
    padding: 2.5rem 0 2rem;
  }
  .perfectMatch__machine {
    .AddToBagButton__container {
      margin-top: 1.5rem;
    }
  }

  @include mq("tablet") {
    .perfectMatch__machine {
      position: relative;
    }
  }
</style>

<section id="offer" class="perfectMatch">
  <div class="perfectMatch__container">
    <div class="perfectMatch__content">
      <h2 class="perfectMatch__title">{slidesCopy['heading'][_language]}</h2>
      <div class="perfectMatch__machine">
        <Slider slidesData={data} />
        <Button
          text={slidesCopy['cta'][_language]}
          hiddenText=""
          link="/uk/en/order/machines/original"
          iconPlus={false}
          iconBasket={false} />
      </div>
    </div>
  </div>
</section>
