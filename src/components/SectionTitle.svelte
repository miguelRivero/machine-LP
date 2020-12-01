<script>
  export let text,
    color = "black";
</script>

<style type="text/scss">
  @import "../scss/variables";

  .section__title {
    font-family: $nespressoFont;
    font-weight: 300;
    font-size: 1.875rem;
    letter-spacing: 0.375rem;
    line-height: 2.5rem;
    text-transform: uppercase;
    text-align: left;
  }
</style>

<h3 class="section__title" style="color: {color}">{text}</h3>
