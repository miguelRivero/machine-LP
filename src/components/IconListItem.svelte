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
  .machine {
    &:after {
      display: flex;
      align-items: center;
      justify-content: center;
      content: "#{$assetsUrl}backgrounds/earth_L.jpg";
      position: absolute;
      top: 0;
      left: 0;
      height: 2.5rem;
      width: 2.5rem;
      border: 2px solid #f9f9f9;
      border-radius: 50%;
      font-weight: 700;
      font-size: 1.71429em;
      line-height: 1.33333;
    }
  }
  .subscriptionHero__pointTitle p {
    color: #8d1f3c;
    font-family: $lucasBold;
    font-size: 1rem;
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
