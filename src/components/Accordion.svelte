<script>
  import Handorgel from "handorgel";
  import { onMount, tick } from "svelte";

  let hand_accordion;

  export let text,
    theme = undefined;

  onMount(async () => {
    console.log(text);
    await tick();
    visible = true;
    await tick();
    //2nd tick for waiting the accordion element to be visible. Unless does not work
    var accordion = new Handorgel(hand_accordion, {
      initialOpenTransitionDelay: 0,
    });
  });
</script>

<style type="text/scss">
  @import "../scss/variables";
  @import "../scss/mixins";

  .handorgel {
    border: none;
    margin-bottom: 0; //2rem;
  }
  .handorgel__header {
    border: none;
    color: #ffffff;
    position: relative;

    &.handorgel__header--opened {
      .chevron {
        &:before {
          transform: translateY(-50%) scale(1);
        }
        &:after {
          transform: translateY(calc(-50% + 2px)) rotate(225deg) scale(1);
        }
      }
    }
  }
  .handorgel__header--focus .handorgel__header__button,
  .handorgel__header--open .handorgel__header__button {
    background-color: transparent;
  }
  .handorgel__header__button {
    background-color: transparent;
    border-top: none;
    padding: 1rem 1rem 1rem 2.5rem;
    font-family: $nespressoFont;
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: 1px;
    line-height: 1.5rem;
    display: flex;
    align-items: center;
    &:not(:disabled):active {
      background-color: transparent;
    }

    .chevron {
      &:before {
        content: "";
        position: absolute;
        border: 1px solid white;
        border-radius: 100%;
        width: 22px;
        height: 22px;
        // top: 50%;
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
        // top: calc(50% - 1px);
        left: 8px;
        transform: translateY(-50%) rotate(225deg) scale(-1);
        transition: 0.25s ease;
      }
    }
  }

  .handorgel__content {
    color: white;
    border-top: none;
    background-color: transparent;
  }
  .handorgel__content__inner {
    font-family: $nespressoFont;
    font-weight: 300;
    font-size: 1rem;
    letter-spacing: 1px;
    line-height: 1.5rem;
    padding: 0 1rem 0.5rem 2.5rem;
  }
  .darkRightChevron {
    .handorgel__header,
    .handorgel__content {
      color: black;
      font-family: $nespressoFont;
      text-align: left;
    }
    .handorgel__header {
      span {
        text-transform: uppercase;
        font-size: 1.125rem;
        letter-spacing: 0.1875rem;
        line-height: 1.5rem;
      }
      .handorgel__header__button {
        padding-left: 1.25rem;
        padding-right: 1.25rem;
        // padding: 0.75rem 1.25rem;
        .chevron-right {
          margin-left: 0.875rem;
          &:before {
            display: none;
          }
          &:after {
            left: unset;
            border-color: black;
            top: calc(50% - 2px);
          }
        }
        // &.handorgel__header--opened {
        // }
      }
    }
    .handorgel__content__inner {
      padding-left: 1.25rem;
      padding-right: 1.25rem;
      //   padding: 0.5rem 1.25rem 0.5rem;
    }
  }
  @include mq("tablet") {
    .handorgel {
      padding-left: 16px;
    }
    .handorgel__content__inner {
      width: 74%;
    }
  }
</style>

<div class="handorgel {theme ? theme : ''}" bind:this={hand_accordion}>
  {#each text as copy}
    <h4 class="handorgel__header">
      <button class="handorgel__header__button">
        {#if theme !== 'darkRightChevron'}
          <span class="chevron chevron-left" />
        {/if}
        <span>{@html copy.question}</span>
        {#if theme === 'darkRightChevron'}
          <span class="chevron chevron-right" />
        {/if}
      </button>
    </h4>
    <div class="handorgel__content">
      <div class="handorgel__content__inner">
        {@html copy.answer}
      </div>
    </div>
  {/each}
</div>
