<script>
  import Handorgel from "handorgel";
  import { onMount } from "svelte";
  import { imagesGitStorage } from "../store.js";

  let hand_accordion;
  const top_image = `${imagesGitStorage}machine_faq.png`,
    faq_text = [
      {
        question: "What&#39s the catch?",
        answer:
          "There is no catch! You pay £1 upfront for the machine and you sign up for a 24 month commitment with a monthly fee. The monthly fee becomes <strong class='v_brand' term='nespresso'>Nespresso</strong> credit, which is yours to spend on any <strong class='v_brand' term='nespresso'>Nespresso</strong> product you want. For your own coffee experience, day after day.",
      },
      {
        question:
          "What&#39s the <strong class='v_brand' term='nespresso'>Nespresso</strong> credit? How is it applied?",
        answer:
          "When you sign up for your Subscription, you also become a <strong class='v_brand' term='nespresso'>Nespresso</strong> member (if you are not one already!). Your credit is applied every month, upon the payment of your monthly fee, directly into your account. Whether you want to spend it every month, or prefer to save up to order more later, the choice is yours. You can check your <strong class='v_brand' term='nespresso'>Nespresso</strong> credit balance at any time by logging in online, calling <strong class='v_brand' term='nespresso'>Nespresso</strong> on 0800 442 442 (Freephone) or visiting your nearest <strong class='v_brand' term='nespresso'>Nespresso</strong> Boutique.",
      },
      {
        question:
          "What if you don&#39t use your <strong class='v_brand' term='nespresso'>Nespresso</strong> credit?",
        answer:
          "When or how you decide to use your credit is up to you. If you don&#39t use it entirely, the credit will accrue on your account every month, and can be spent on any <strong class='v_brand' term='nespresso'>Nespresso</strong> products. Your credit will expire 2 years after the end of your Subscription term, so be sure to use it regularly.",
      },
      {
        question: "What if you change your mind?",
        answer:
          "Should you decide that <strong class='v_brand' term='nespresso'>Nespresso</strong> subscription is not for you anymore, you can cancel it at any time by calling us on 0800 442 442. If you cancel your subscription within the first 14 days and return the machine, there is no charge. If you cancel after this, and within the 24 month minimum term, the relevant termination fee for your chosen plan will be charged. If you choose to cancel after the initial 24 month term, there is no charge to do so, and you can keep your <strong class='v_brand' term='nespresso'>Nespresso</strong> machine.",
      },
      {
        question: "Who qualifies for this offer?",
        answer:
          "Whether you are new to <strong class='v_brand' term='nespresso'>Nespresso</strong> or a long-time <strong class='v_brand' term='nespresso'>Nespresso</strong> coffee lover, you can sign up to  <strong class='v_brand' term='nespresso'>Nespresso</strong> subscription.",
      },
      {
        question: "Am I tied into a contract",
        answer:
          "Your plan has a 24 month minimum term. If you cancel before the end of the minimum term, there is an early termination charge. You can view the full Terms and Conditions <a href='/uk/en/legal'>here</a>",
      },
      {
        question: "What happens to my credit if I cancel my subscription?",
        answer:
          "If you cancel your <strong class='v_brand' term='nespresso'>Nespresso</strong> Subscription, the credit will be available on your account for 2 years. Please check the the Subscription Terms and Conditions for full details.",
      },
      {
        question:
          "Will I own the machine after signing the Subscription contract?",
        answer:
          "Yes, you will own the <strong class='v_brand' term='nespresso'>Nespresso</strong> machine as soon as your order is dispatched. Please refer to your contract, or the Subscription Terms and Conditions for more information.",
      },
      {
        question: "How long will I benefit from free delivery?",
        answer:
          "You will benefit from free delivery on all your capsule orders, up to your final Subscription payment. Please note that there will still be a minimum order quantity of 50 capsules, as this is the minimum size of the packages that we use for shipping (to guarantee that the items arrive to you in good condition). If you cancel your Subscription, you will need to order a minimum of 100 capsules to qualify for free delivery.",
      },
    ];

  onMount(() => {
    var accordion = new Handorgel(hand_accordion);
    // accordion.folds[0].open();
    // console.log(accordion.folds);
  });
</script>

<style type="text/scss" global>
  @import "../scss/variables";
  $handorgel__content--open-transition-height-time: 0.3s;
  $handorgel__content--open-transition-opacity-time: 0.3s;
  $handorgel__content-transition-height-time: 0.5s;
  $handorgel__content-transition-opacity-time: 0.3s;
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
      margin-bottom: 2rem;
    }
    .handorgel__header {
      border: none;
      color: #ffffff;
      font-family: $lucasBold;
      font-size: 1rem;
      font-weight: bold;
      letter-spacing: 1px;
      line-height: 1.5rem;
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
      background-color: transparent;
      border-top: none;
      padding: 1rem 1rem 1rem 2.5rem;
      &:not(:disabled):active {
        background-color: transparent;
      }
    }
    .handorgel__content {
      color: white;
      border-top: none;
      background-color: transparent;
      font-family: $lucasLight;
      font-size: 1rem;
      letter-spacing: 1px;
      line-height: 1.5rem;
    }
    .handorgel__content__inner {
      padding: 0 1rem 0.5rem 2.5rem;
    }
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
</style>

<section id="faq" data-label="FAQ" class="subscriptionFaq">
  <div
    class="subscriptionFaq__bg"
    style="background-image: url({imagesGitStorage}bg_faq.jpg);" />

  <div class="subscriptionFaq__container">
    <img
      class="subscriptionFaq__visual"
      aria-hidden="true"
      src={top_image}
      alt="FAQ Machine Image" />

    <div class="subscriptionFaq__content">
      <h2>STILL HAVE QUESTIONS?</h2>

      <div class="handorgel" bind:this={hand_accordion}>
        {#each faq_text as faq}
          <h3 class="handorgel__header">
            <button
              class="handorgel__header__button">{@html faq.question}</button>
          </h3>
          <div class="handorgel__content">
            <div class="handorgel__content__inner">
              {@html faq.answer}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
