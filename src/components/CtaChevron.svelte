<script>
  export let text, link;
</script>

<style type="text/scss">
  @import "../scss/variables";

  .cta__chevron {
    display: flex;
    align-items: center;
    padding-top: 0.5rem;
    color: #8f7247;
    font-family: $nespressoFont;
    font-size: 1.125rem;
    font-weight: 700;
    line-height: 1.5rem;
    letter-spacing: 1px;
  }

  .gg-chevron-right {
    box-sizing: border-box;
    position: relative;
    display: block;
    transform: scale(var(--ggs, 1));
    width: 18px;
    height: 18px;
    border: 2px solid transparent;
    border-radius: 100px;
    &:after {
      content: "";
      display: block;
      box-sizing: border-box;
      position: absolute;
      width: 8px;
      height: 8px;
      border-bottom: 2px solid;
      border-right: 2px solid;
      transform: rotate(-45deg);
      right: 4px;
      top: 3px;
    }
  }

  @media screen and (max-width: 768px) {
    .cta__chevron {
      padding-top: 1rem;
    }
  }
</style>

<a class="cta__chevron" href={link} target="_blank">
  {text}
  <i class="gg-chevron-right" />
</a>
