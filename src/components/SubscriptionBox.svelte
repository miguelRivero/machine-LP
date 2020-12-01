<script>
  import { onMount, onDestroy, tick } from "svelte";
  import CtaChevron from "./CtaChevron.svelte";
  import { market, lang } from "../store.js";
  import SectionTitle from "./SectionTitle.svelte";

  let _market,
    _language,
    contentCopy,
    visible = false;
  const unsubscribeMarket = market.subscribe((value) => (_market = value));
  const unsubscribeLang = lang.subscribe((value) => (_language = value));

  onMount(async () => {
    await tick();
    contentCopy = window.SubscriptionMachineLP[_market]["subscriptionBox"];
    visible = true;
  });

  onDestroy(unsubscribeMarket, unsubscribeLang);
</script>

<style type="text/scss">
  @import "../scss/variables";
  @import "../scss/mixins";

  .subscriptionBox {
    padding: 1.875rem 1.25rem;
    background-color: white;
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
    .subscriptionBox {
      padding-top: 4rem;
      padding-bottom: 3.75rem;
    }
    // .section__title {
    //   margin-bottom: 3.25rem;
    // }
  }
</style>

{#if visible}
  <section class="subscriptionBox">
    <SectionTitle text={contentCopy['heading'][_language]} />
    <p>{contentCopy['body'][_language]}</p>
    <CtaChevron
      text={contentCopy['cta'][_language]}
      link={contentCopy['url']} />
  </section>
{/if}
