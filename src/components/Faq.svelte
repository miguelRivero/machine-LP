<script>
  import Handorgel from "handorgel";
  import { onMount } from "svelte";

  let hand_accordion;
  onMount(() => {
    var accordion = new Handorgel(hand_accordion);
    accordion.on("fold:open", (fold) => {
      console.log(fold.content);
      // ...
    });
  });
</script>

<style type="scss" global>
  @import "../scss/variables";
  $handorgel__content--open-transition-height-time: 0.3s;
  $handorgel__content--open-transition-opacity-time: 0.3s;
  $handorgel__content-transition-height-time: 0.5s;
  $handorgel__content-transition-opacity-time: 0.3s;
  @import "../../node_modules/handorgel/src/scss/style";

  .subscriptionFaq__content {
    text-align: left;
    background: url("./images/bg_faq.jpg") top center no-repeat;
    background-size: cover;
    padding: 354px 16px 32px;

    h2 {
      color: #ffffff;
      font-family: $lucasLight;
      font-size: 1.875rem;
      font-weight: 300;
      letter-spacing: 0.375rem;
      line-height: 2.5rem;
    }
    .handorgel {
      border: none;
    }
    .handorgel__header {
      border: none;
      color: #ffffff;
      font-family: $lucasBold;
      font-size: 16px;
      font-weight: bold;
      letter-spacing: 1px;
      line-height: 24px;
      position: relative;

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
      &.handorgel__header--opened {
        &:before {
          transform: translateY(-50%) scale(1);
        }
        &:after {
          top: calc(50% + 1px);
          transform: translateY(-50%) rotate(225deg) scale(1);
        }
      }
    }
    .handorgel__header__button {
      background-color: unset;
      border-top: none;
      padding: 16px 16px 16px 40px;
    }
    .handorgel__content {
      color: white;
      border-top: none;
      background-color: unset;
      font-family: $lucasLight;
      font-size: 1rem;
      letter-spacing: 1px;
      line-height: 1.5rem;
    }
    .handorgel__content__inner {
      padding: 0 16px 8px 40px;
    }
  }
</style>

<div class="subscriptionFaq__content">
  <h2>STILL HAVE QUESTIONS?</h2>

  <div class="handorgel" bind:this={hand_accordion}>
    <h3 class="handorgel__header">
      <button class="handorgel__header__button">What’s the Nespresso credit ?
        How is it applied ?</button>
    </h3>
    <div class="handorgel__content">
      <div class="handorgel__content__inner">
        There is no catch! You pay £1 upfront for the machine and you sign up
        for a 24 month commitment with a monthly fee. The monthly fee becomes
        Nespresso credit, which is yours to spend on any Nespresso product you
        want. For your own coffee experience, day after day.
      </div>
    </div>

    <h3 class="handorgel__header">
      <button class="handorgel__header__button">What’s the catch?</button>
    </h3>
    <div class="handorgel__content">
      <div class="handorgel__content__inner">
        There is no catch! You pay £1 upfront for the machine and you sign up
        for a 24 month commitment with a monthly fee. The monthly fee becomes
        Nespresso credit, which is yours to spend on any Nespresso product you
        want. For your own coffee experience, day after day.
      </div>
    </div>

    <h3 class="handorgel__header">
      <button class="handorgel__header__button">What if you don’t use your
        Nespresso credit?</button>
    </h3>
    <div class="handorgel__content">
      <div class="handorgel__content__inner">
        There is no catch! You pay £1 upfront for the machine and you sign up
        for a 24 month commitment with a monthly fee. The monthly fee becomes
        Nespresso credit, which is yours to spend on any Nespresso product you
        want. For your own coffee experience, day after day.
      </div>
    </div>
  </div>
</div>
