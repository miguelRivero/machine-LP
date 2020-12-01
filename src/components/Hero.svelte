<script>
  import { onMount, onDestroy, tick } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { sineInOut } from "svelte/easing";
  import { market, lang, desktopView, imagesStorage } from "../store.js";
  import Button from "./Button.svelte";

  const unsubscribeDesktop = desktopView.subscribe(
    (value) => (desktop = value)
  );

  let heroElement,
    _market,
    _language,
    desktop,
    slidesCopy,
    visible = false;
  const unsubscribeMarket = market.subscribe((value) => (_market = value));
  const unsubscribeLang = lang.subscribe((value) => (_language = value));

  onMount(async () => {
    await tick();
    visible = true;
    slidesCopy = window.SubscriptionMachineLP[_market]["hero"];
  });
  onDestroy(unsubscribeDesktop, unsubscribeMarket, unsubscribeLang);

  // import { createEventDispatcher } from "svelte";

  // const dispatch = createEventDispatcher();

  // const clickHandler = (e) => {
  //   console.log("clicked");
  // };
</script>

<style type="text/scss">
  @import "../scss/variables";
  @import "../scss/mixins";
  // overrriding styles
  #hero {
    height: unset;
  }
  // custom styles
  .subscriptionHero {
    padding: 2.25rem 2.5rem;
    position: relative;
    color: white;

    &:before {
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: -1;
      background-image: url(#{$assetsUrl}backgrounds/earth_L.jpg);
      background-color: #851d34;
      background-size: cover;
      opacity: 0;
      transition: opacity 1s;
    }
    &.mounted {
      &:before {
        opacity: 1;
      }
    }
  }
  .subscriptionHero__logo {
    width: 14.25rem;
  }
  .subscriptionHero__slogan {
    color: white;
    font-family: NespressoLucas !important;
    font-weight: 300;
    font-weight: normal;
    font-size: 1.125rem;
    letter-spacing: 1.5px;
    line-height: 2rem;
    text-align: center;
    margin: 0.875rem auto 1.375rem;
    &--m {
      display: block;
    }
    &--d {
      display: none;
    }
  }
  .subscriptionHero__machine {
    width: 80%;
    max-width: 20rem;
  }
  .subscriptionHero__points {
    margin: 0 auto;
    display: table;
    list-style: none;
    text-align: left;
    font-family: NespressoLucas !important;
    font-weight: 300;
    font-size: 1.125rem;
    font-weight: normal;
    letter-spacing: 1px;
    line-height: 1.5rem;
    margin-bottom: 1.5rem;
    max-width: 17.5rem;
    li {
      position: relative;
      margin-bottom: 0.5rem;
      padding-left: 1.375rem;
      @include before-checkmark(7px, white);
    }
  }

  @include mq("tablet") {
    .subscriptionHero {
      padding-top: 4rem;
      padding-bottom: 3.75rem;
    }
    .subscriptionHero__logo {
      width: 19.5rem;
      margin-bottom: 3.75rem;
    }
    .subscriptionHero__content {
      display: flex;
      justify-content: center;
    }
    .subscriptionHero__machine {
      margin-right: 1rem;
    }
    .subscriptionHero__points {
      margin-bottom: 1.75rem;
      max-width: none;
    }
    .subscriptionHero__offer {
      margin-left: 1rem;
      text-align: left;
      max-width: 20rem;
    }
    .subscriptionHero__slogan {
      margin: 0 auto 2rem;
      &--m {
        display: none;
      }
      &--d {
        display: block;
        text-align: left;
      }
    }
  }
</style>

{#if visible}
  <section
    bind:this={heroElement}
    id="hero"
    in:fade={{ delay: 0, duration: 500, easing: sineInOut }}
    data-label="Subscription by Nespresso"
    class="subscriptionHero"
    class:mounted={visible}>
    <img
      in:fade={{ delay: 500, duration: 500, easing: sineInOut }}
      class="subscriptionHero__logo"
      aria-hidden="true"
      src="{imagesStorage}/logo_subscription.svg"
      alt="Subscription by Nespresso" />

    <h2 class="subscriptionHero__slogan subscriptionHero__slogan--m">
      {slidesCopy['heading'][_language]}
    </h2>
    <div class="subscriptionHero__content">
      <img
        in:fly={{ delay: 800, x: desktop ? -100 : 0, duration: 1500, easing: sineInOut }}
        class="subscriptionHero__machine"
        src="{imagesStorage}/machine.png"
        alt="Coffee Machine Set" />
      <div class="subscriptionHero__offer">
        <h2
          in:fade={{ delay: 800, duration: 300, easing: sineInOut }}
          class="subscriptionHero__slogan subscriptionHero__slogan--d">
          {slidesCopy['heading'][_language]}
        </h2>

        <ul class="subscriptionHero__points">
          {#each slidesCopy['list'] as item, i}
            <li
              in:fade={{ delay: 1000 + 300 * i, duration: 300, easing: sineInOut }}>
              {@html item[_language]}
            </li>
          {/each}
        </ul>

        <div
          in:fade={{ delay: 1800, duration: 1000, easing: sineInOut }}
          id="Hero__AddToBagButton">
          <Button
            text={slidesCopy['cta'][_language]}
            hiddenText=""
            link={slidesCopy['ctaLink'][_language]}
            iconPlus={false}
            iconBasket={false} />
          <!-- on:buttonClick={clickHandler} -->
        </div>
      </div>
    </div>
  </section>
{/if}
