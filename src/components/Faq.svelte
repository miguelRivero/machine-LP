<script>
  import Handorgel from "handorgel";
  import { onMount, onDestroy, tick } from "svelte";
  import { imagesGitStorage } from "../store.js";
  import { market, lang } from "../store.js";
  import SectionTitle from "./SectionTitle.svelte";
  import Accordion from "./Accordion.svelte";

  let hand_accordion,
    _market,
    _language,
    contentCopy,
    visible = false;

  const unsubscribeMarket = market.subscribe((value) => (_market = value));
  const unsubscribeLang = lang.subscribe((value) => (_language = value));

  const top_image = `${imagesGitStorage}machine_faq.png`;

  onMount(async () => {
    await tick();
    visible = true;
    contentCopy = window.SubscriptionMachineLP[_market]["faq"];
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
    padding: 0;
    // max-width: 31.25em;
    margin: 0 auto;
    text-align: left;
  }

  .subscriptionFaq__container {
    text-align: center;
    margin: 0 auto;
    position: relative;
    padding: 1.875rem 1.25rem;
  }
  .subscriptionFaq__visual {
    width: 100%;
    max-width: 21.4375rem;
    margin-bottom: 1.5rem;
  }
</style>

<section id="faq" data-label="FAQ" class="subscriptionFaq">
  <div
    class="subscriptionFaq__bg"
    style="background-image: url({imagesGitStorage}bg_faq.jpg);" />

  <div class="subscriptionFaq__container">
    <div class="subscriptionFaq__content restrict">
      {#if visible}
        <SectionTitle text={contentCopy['heading'][_language]} color="white" />
        <Accordion text={contentCopy['list'][_language]} />
      {/if}
    </div>
  </div>
</section>
