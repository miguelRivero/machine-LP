<script>
  import { imagesGitStorage } from "../store.js";
  import Button from "./Button.svelte";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const clickHandler = (e) => {
    console.log("clicked");
  };

  // onMount(() => {
  //   unsubscribe = headerHeight.subscribe((value) => (header_height = value));
  // });

  // onDestroy(() => {
  //   if (unsubscribe) unsubscribe();
  // });
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
    background-image: url(#{$assetsUrl}backgrounds/earth_L.jpg);
    background-color: #851d34;
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    color: white;
  }
  .subscriptionHero__logo {
    width: 14.25rem;
  }
  .subscriptionHero__slogan {
    color: white;
    font-family: $lucasLight;
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
    font-family: $lucasLight;
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

<section
  id="hero"
  data-label="Subscription by Nespresso"
  class="subscriptionHero">
  <img
    class="subscriptionHero__logo"
    aria-hidden="true"
    src="{imagesGitStorage}/logo_subscription.svg"
    alt="Subscription by Nespresso" />
  <h2 class="subscriptionHero__slogan subscriptionHero__slogan--m">
    Never run out of coffee
  </h2>
  <div class="subscriptionHero__content">
    <img
      class="subscriptionHero__machine"
      src="{imagesGitStorage}/machine.png"
      alt="Coffee Machine Set" />
    <div class="subscriptionHero__offer">
      <h2 class="subscriptionHero__slogan subscriptionHero__slogan--d">
        Never run out of coffee
      </h2>

      <ul class="subscriptionHero__points">
        <li>Your machine for <strong>$1</strong></li>
        <li>
          <strong>Monthly credit</strong>
          to spend on all coffees and accesories
        </li>
        <li><strong>Unlimited</strong> free deliveries</li>
      </ul>

      <div id="Hero__AddToBagButton">
        <Button
          text="SEE ALL MACHINES"
          hiddenText=""
          iconPlus={false}
          iconBasket={false}
          on:buttonClick={clickHandler} />
      </div>
    </div>
  </div>
</section>
