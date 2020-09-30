<script>
  import { createEventDispatcher } from "svelte";

  export let text = "";
  export let hiddenText = "";
  export let iconPlus = false;
  export let iconBasket = false;
  export let link = "";
  const dispatch = createEventDispatcher();

  const triggerEvent = () => {
    dispatch("buttonClick");
  };
</script>

<style type="text/scss">
  @import "../scss/mixins";
  @import "../scss/variables";

  .AddToBagButton {
    cursor: pointer;
    outline: none;
    max-width: 17.5rem;
    padding: 0.8em 2.5rem;
    border: 1px solid $greenColor;
    background-color: $greenColor;
    color: #fff;
    text-decoration: none;
    font-size: 0.875rem;
    line-height: 1.2rem;
    letter-spacing: 1px;
    position: relative;
    display: inline-block;
    text-align: center;
    border-radius: 3px;
    transition: all 0.3s;
    &:not(:disabled) {
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.3);
    }
  }
  .AddToBagButtonLarge__label {
    width: 100%;
    text-align: center;
    font-family: $lucasBold;
    @include truncate(unset);
  }
  .AddToBagButtonLarge__plusIcon {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 1.125rem;
  }
  @include mq("tablet") {
    .AddToBagButton {
      width: 19.25rem;
      max-width: none;
    }
  }
</style>

<div class="AddToBagButton__container">
  <a id="AddToBagButton__button-CremaComponentId-1" href={link}>
    <button
      on:click={triggerEvent}
      id="ta-product-details__add-to-bag-button"
      class="AddToBagButton AddToBagButtonLarge"
      data-focus-id="AddToBagButton__button-CremaComponentId-1">
      {#if iconBasket}
        <span class="AddToBagButtonLarge__basketIcon">
          <i aria-hidden="true" class="Glyph Glyph--basket" />
        </span>
      {/if}
      <span class="VisuallyHidden">{hiddenText}</span>
      <span class="AddToBagButtonLarge__label" aria-hidden="true">{text}</span>
      {#if iconPlus}
        <i
          aria-hidden="true"
          class="Glyph Glyph--plus AddToBagButtonLarge__plusIcon" />
      {/if}
    </button>
  </a>
</div>
