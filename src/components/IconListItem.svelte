<script>
  export let title, text, icon;
</script>

<style type="text/scss">
  @import "../scss/variables";
  p {
    text-align: left;
    letter-spacing: 1px;
    line-height: 1.5rem;
  }
  li {
    position: relative;
    padding-left: 4rem;
    margin-bottom: 0.75rem;
    &:after {
      position: absolute;
      top: 0;
      left: 0;
      height: 3rem;
      width: 3rem;
    }
  }
  .machine {
    &:after {
      content: url("#{$imagesGitStorage}/icons/machine_icon.svg");
    }
  }
  .myaccount {
    &:after {
      content: url("#{$imagesGitStorage}/icons/myaccount_icon.svg");
    }
  }
  .cups {
    &:after {
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
