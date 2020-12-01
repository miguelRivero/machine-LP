<script>
  import Handorgel from "handorgel";
  import { onMount, onDestroy, tick } from "svelte";
  import { imagesStorage } from "../store.js";
  import { market, lang } from "../store.js";

  let hand_accordion,
    _market,
    _language,
    slidesCopy,
    visible = false;

  const unsubscribeMarket = market.subscribe((value) => (_market = value));
  const unsubscribeLang = lang.subscribe((value) => (_language = value));

  const top_image = `${imagesStorage}machine_faq.png`;

  onMount(async () => {
    await tick();
    visible = true;
    slidesCopy = window.SubscriptionMachineLP[_market]["faq"];
    await tick();
    //2nd tick for waiting the accordion element to be visible. Unless does not work
    var accordion = new Handorgel(hand_accordion, {
      initialOpenTransitionDelay: 0,
    });
  });

  onDestroy(unsubscribeMarket, unsubscribeLang);
</script>

<style type="text/scss" global>
  @import "../scss/variables";
  @import "../scss/mixins";
  $handorgel__content--open-transition-height-time: 0.15s;
  $handorgel__content--open-transition-opacity-time: 0.15s;
  $handorgel__content-transition-height-time: 0.3s;
  $handorgel__content-transition-opacity-time: 0.15s;
  @import "../../node_modules/handorgel/src/scss/style";

  .subscriptionFaq {
    background-color: black;
    text-align: center;
    position: relative;
    &__bg {
      background-position: top;
      background-repeat: no-repeat;
      background-size: 100% auto;
      z-index: 0;
      position: absolute;
      width: 100%;
      height: 100%;
    }
  }

  .subscriptionFaq__content {
    display: table;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 1.25em;
    // max-width: 31.25em;
    margin: 0 auto;
    text-align: left;
    & > h3 {
      color: #ffffff;
      font-family: NespressoLucas !important;
      font-weight: 300;
      font-size: 1.875rem;
      font-weight: 300;
      letter-spacing: 0.375rem;
      line-height: 2.5rem;
    }
  }

  .handorgel {
    border: none;
    margin-bottom: 2rem;
  }
  .handorgel__header {
    border: none;
    color: #ffffff;

    position: relative;
    &.handorgel__header--opened {
      .handorgel__header__button {
        &:before {
          transform: translateY(-50%) scale(1);
        }
        &:after {
          top: calc(50% + 1px);
          transform: translateY(-50%) rotate(225deg) scale(1);
        }
      }
    }
  }
  .handorgel__header--focus .handorgel__header__button,
  .handorgel__header--open .handorgel__header__button {
    background-color: transparent;
  }
  .handorgel__header__button {
    background-color: transparent;
    border-top: none;
    padding: 1rem 1rem 1rem 2.5rem;
    font-family: NespressoLucas !important;
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: 1px;
    line-height: 1.5rem;
    &:not(:disabled):active {
      background-color: transparent;
    }
    &:before {
      content: "";
      position: absolute;
      border: 1px solid white;
      border-radius: 100%;
      width: 22px;
      height: 22px;
      top: 50%;
      left: 0;
      transform: translateY(-50%) scale(-1);
      transition: 0.25s ease;
    }
    &:after {
      content: "";
      position: absolute;
      border-right: 2px solid white;
      border-bottom: 2px solid white;
      width: 6px;
      height: 6px;
      top: calc(50% - 1px);
      left: 8px;
      transform: translateY(-50%) rotate(225deg) scale(-1);
      transition: 0.25s ease;
    }
  }

  .handorgel__content {
    color: white;
    border-top: none;
    background-color: transparent;
  }
  .handorgel__content__inner {
    font-family: NespressoLucas !important;
    font-weight: 300;
    font-size: 1rem;
    letter-spacing: 1px;
    line-height: 1.5rem;
    padding: 0 1rem 0.5rem 2.5rem;
  }

  .subscriptionFaq__container {
    text-align: center;
    margin: 0 auto;
    position: relative;
  }
  .subscriptionFaq__visual {
    width: 100%;
    max-width: 21.4375rem;
    margin-bottom: 1.5rem;
  }
  @include mq("tablet") {
    .handorgel {
      padding-left: 16px;
    }
    .handorgel__content__inner {
      width: 74%;
    }
  }
</style>

<section id="faq" data-label="FAQ" class="subscriptionFaq">
  <div
    class="subscriptionFaq__bg"
    style="background-image: url({imagesStorage}bg_faq.jpg);" />

  <div class="subscriptionFaq__container">
    <img
      class="subscriptionFaq__visual"
      aria-hidden="true"
      src={top_image}
      alt="FAQ Machine Image" />

    <div class="subscriptionFaq__content restrict">
      {#if visible}
        <h3>{slidesCopy['heading'][_language]}</h3>

        <div class="handorgel" bind:this={hand_accordion}>
          {#each slidesCopy['list'][_language] as faq}
            <h4 class="handorgel__header">
              <button
                class="handorgel__header__button"><span>{@html faq.question}</span></button>
            </h4>
            <div class="handorgel__content">
              <div class="handorgel__content__inner">
                {@html faq.answer}
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>
