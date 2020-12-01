<script>
  import { onMount, onDestroy, tick } from "svelte";
  import CtaChevron from "./CtaChevron.svelte";
  import SectionTitle from "./SectionTitle.svelte";
  import { market, lang } from "../store.js";
  import Accordion from "./Accordion.svelte";

  let _market,
    _language,
    contentCopy,
    visible = false;
  const unsubscribeMarket = market.subscribe((value) => (_market = value));
  const unsubscribeLang = lang.subscribe((value) => (_language = value));

  onMount(async () => {
    await tick();
    contentCopy = window.SubscriptionMachineLP[_market]["coffeeExpertise"];
    visible = true;
  });

  onDestroy(unsubscribeMarket, unsubscribeLang);
</script>

<style type="text/scss">
  @import "../scss/variables";
  @import "../scss/mixins";

  .coffeeExpertise {
    padding: 0;
    background-color: white;
    & > p {
      padding: 1.5rem 1.25rem 1rem;
    }
  }

  :global(.coffeeExpertise .cta__chevron) {
    padding: 1.875rem 1.25rem;
  }
  .coffeeExpertise__background {
    background-image: url(#{$assetsUrl}hero-bg_S.jpg);
    width: 100%;
    height: 0;
    padding-top: 100%;
    position: relative;
  }

  :global(.coffeeExpertise__background h3) {
    position: absolute;
    padding: 1.875rem 1.25rem;
    bottom: 0.75rem;
  }
  p {
    color: #000000;
    font-family: $nespressoFont;
    font-size: 1rem;
    letter-spacing: 1px;
    line-height: 1.5rem;
    text-align: left;
  }
  @include mq("tablet-l") {
    .coffeeExpertise {
      padding-top: 4rem;
      padding-bottom: 3.75rem;
    }
  }
</style>

{#if visible}
  <section class="coffeeExpertise">
    <div class="coffeeExpertise__background">
      <SectionTitle text={contentCopy['heading'][_language]} color="white" />
    </div>
    <p>{contentCopy['body'][_language]}</p>
    <Accordion text={contentCopy['list'][_language]} theme="darkRightChevron" />
    <CtaChevron
      text={contentCopy['cta'][_language]}
      link={contentCopy['url']} />
  </section>
{/if}
