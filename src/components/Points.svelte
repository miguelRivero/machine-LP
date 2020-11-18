<script>
  import { onMount, onDestroy, tick } from "svelte";
  import IconListItem from "./IconListItem.svelte";
  import { market, lang } from "../store.js";

  let _market,
    _language,
    slidesCopy,
    visible = false;
  const unsubscribeMarket = market.subscribe((value) => (_market = value));
  const unsubscribeLang = lang.subscribe((value) => (_language = value));

  onMount(async () => {
    await tick();
    console.log(_market);
    slidesCopy = window.SubscriptionMachineLP[_market]["points"];
    console.log(slidesCopy);
    visible = true;
  });

  onDestroy(unsubscribeMarket, unsubscribeLang);
</script>

<style type="text/scss">
  @import "../scss/variables";
  @import "../scss/mixins";

  .subscriptionPoints {
    padding: 1.875rem 1.25rem;
    background-color: white;
  }

  h3 {
    color: #000000;
    font-family: NespressoLucas !important;
    font-weight: 300;
    font-size: 1.875rem;
    letter-spacing: 0.375rem;
    line-height: 2.5rem;
  }

  .subscriptionPoints__list {
    list-style: none;
    margin-top: 2rem;
  }

  @include mq("tablet-l") {
    .subscriptionPoints {
      padding-top: 4rem;
      padding-bottom: 3.75rem;
    }
    h3 {
      margin-bottom: 3.25rem;
    }
    .subscriptionPoints__list {
      display: flex;
      padding: 0;
    }
  }
</style>

{#if visible}
  <section id="points" class="subscriptionPoints">
    <h3>{slidesCopy['heading'][_language]}</h3>
    <ul class="restrict subscriptionPoints__list">
      {#each slidesCopy['list'][_language] as copy}
        <IconListItem title={copy.title} text={copy.text} icon={copy.icon} />
      {/each}
    </ul>
  </section>
{/if}
