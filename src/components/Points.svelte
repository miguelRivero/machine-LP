<script>
  import IconListItem from "./IconListItem.svelte";

  let copyTexts = [
    {
      title: "BUY YOUR MACHINE FOR 1&#163;",
      text:
        "Select your preferred machine, add it to your cart with a Subscription plan and checkout.",
      icon: "machine",
    },
    {
      title: "GET CREDITS EACH MONTH",
      text:
        "Once you receive your machine, the monthly plan starts and credits are added to Your Account.",
      icon: "myaccount",
    },
    {
      title: "SHOP COFFEE & ACCESSORIES",
      text: "Your credit can be spent on the full range of Nespresso products.",
      icon: "cups",
    },
  ];
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

<section id="points" class="subscriptionPoints">
  <h3>HOW DOES IT WORK?</h3>
  <ul class="restrict subscriptionPoints__list">
    {#each copyTexts as copy}
      <IconListItem title={copy.title} text={copy.text} icon={copy.icon} />
    {/each}
  </ul>
</section>
