<script>
  export let type;
  export let color;
</script>

<style type="text/scss">
  @import "../scss/variables";

  .arrow {
    position: relative;
    display: inline-block;
    width: 9px;
    height: 9px;
    &::before {
      content: "";
      display: block;
      position: absolute;
      top: 50%;
      border: 1px solid black;
      width: 5px;
      height: 5px;
      transform: translateY(-50%) rotate(45deg);
    }
    &--left::before {
      border-right: 0;
      border-top: 0;
    }
    &--right::before {
      border-left: 1px;
      border-bottom: 1px;
    }
    &.brown {
      &:before {
        border-color: $brownColor;
      }
    }
  }
</style>

<div class="arrow arrow--{type} {color}" />
