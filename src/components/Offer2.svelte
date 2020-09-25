<script>
  import { onMount } from "svelte";
  import { Swipe, SwipeItem } from "svelte-swipe"; // gzipped 3.37 KB
  let swipeConfig;
  onMount(() => {
    setTimeout(function () {
      swipeConfig = {
        autoplay: false,
        delay: 2000,
        showIndicators: true,
        transitionDuration: 1000,
        defaultIndex: 0,
      };
    }, 0);
  });
</script>

<style type="text/scss" global>
  .swipe-holder {
    height: 30vh;
    width: 100%;
  }
  img {
    max-width: 100%;
    height: auto;
  }
</style>

<section id="offer">
  <div class="swipe-holder">
    {#if swipeConfig}
      <Swipe {...swipeConfig}>
        <SwipeItem>
          <img src="//placekitten.com/400" alt="Kitten 1" />
        </SwipeItem>

        <SwipeItem>
          <img src="//placekitten.com/401" alt="Kitten 1" />
        </SwipeItem>

        <SwipeItem>
          <img src="//placekitten.com/402" alt="Kitten 1" />
        </SwipeItem>
      </Swipe>
    {/if}
  </div>
</section>
