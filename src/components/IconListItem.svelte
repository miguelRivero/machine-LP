<script>
  export let title, text, icon;
</script>

<style type="text/scss">
  @import "../scss/variables";
  @import "../scss/mixins";
  p {
    text-align: left;
    letter-spacing: 1px;
    line-height: 1.5rem;
    margin: 0;
  }
  li {
    position: relative;
    padding-left: 4rem;
    margin-bottom: 0.75rem;
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      height: 3rem;
      width: 3rem;
    }
  }
  .machine {
    &:before {
      content: url("#{$imagesGitStorage}/icons/machine_icon.svg");
    }
  }
  .myaccount {
    &:before {
      content: url("#{$imagesGitStorage}/icons/myaccount_icon.svg");
    }
  }
  .cups {
    &:before {
      content: url("#{$imagesGitStorage}/icons/cups_icon.svg");
    }
  }
  .subscriptionHero__pointTitle {
    padding-top: 0.75rem;
    p {
      color: #8d1f3c;
      font-family: $lucasBold;
      font-size: 1rem;
    }
  }
  .subscriptionHero__pointText p {
    color: #000000;
    font-family: $lucasLight;
    font-size: 1.125rem;
  }
  @include mq("tablet") {
    li {
      text-align: left;
      padding-left: 2rem;
      &:before {
        position: relative;
      }
      &:first-child {
        padding-left: 0;
      }
    }

    .subscriptionHero__pointTitle {
      padding-top: 0.5rem;
    }
  }
</style>

<li class={icon}>
  <div class="subscriptionHero__pointTitle">
    <p>
      {@html title}
    </p>
  </div>
  <div class="subscriptionHero__pointText">
    <p>
      {@html text}
    </p>
  </div>
</li>
