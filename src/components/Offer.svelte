<script>
  import { onMount } from "svelte";
  import Glide from "@glidejs/glide";

  let gliderEl;

  onMount(() => {
    new Glide(gliderEl).mount();

    console.log(Glide);
  });
</script>

<style type="text/scss" global>
  // @import "../../node_modules/glider-js/glider";
  //  @import "../../node_modules/@glidejs/glide/dist/css/glide.core.min";
  @import "node_modules/@glidejs/glide/src/assets/sass/glide.core";
</style>

<section id="offer">
  <div class="glide" bind:this={gliderEl}>
    <div data-glide-el="track" class="glide__track">
      <ul class="glide__slides">
        <li class="glide__slide">
          <img src="//placekitten.com/400" alt="Kitten 1" />
        </li>
        <li class="glide__slide">
          <img src="//placekitten.com/401" alt="Kitten 2" />
        </li>
        <li class="glide__slide">
          <img src="//placekitten.com/402" alt="Kitten 3" />
        </li>
      </ul>
    </div>
    <div class="glide__bullets" data-glide-el="controls[nav]">
      <button class="glide__bullet" data-glide-dir="=0" />
      <button class="glide__bullet" data-glide-dir="=1" />
      <button class="glide__bullet" data-glide-dir="=2" />
    </div>
  </div>
</section>
<!--<script>
  import { Swipe, SwipeItem } from "svelte-swipe"; // gzipped 3.37 KB

  const swipeConfig = {
    autoplay: false,
    delay: 2000,
    showIndicators: true,
    transitionDuration: 500,
    defaultIndex: 0,
  };
</script><style>
  .swipe-holder {
    height: 30vh;
    width: 100%;
  }
  img {
    max-width: 100%;
    height: auto;
  }
</style><div class="swipe-holder">
  <Swipe {...swipeConfig}>
    <SwipeItem><img src="//placekitten.com/400" alt="Kitten 1" /></SwipeItem>
    <SwipeItem><img src="//placekitten.com/401" alt="Kitten 2" /></SwipeItem>
    <SwipeItem><img src="//placekitten.com/402" alt="Kitten 3" /></SwipeItem>
    <SwipeItem><img src="//placekitten.com/403" alt="Kitten 4" /></SwipeItem>
  </Swipe>
</div> -->
