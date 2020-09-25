<script>
  import { onMount } from "svelte";
  import Splide from "@splidejs/splide";

  let gliderEl;

  onMount(() => {
    setTimeout(function () {
      new Splide(gliderEl).mount();
    }, 0);
  });
</script>

<style type="text/scss" global>
  @import "../../node_modules/@splidejs/splide/dist/css/splide.min.css";
</style>

<section id="offer">
  <div id="splide" class="splide" bind:this={gliderEl}>
    <div class="splide__track">
      <ul class="splide__list">
        <li class="splide__slide">
          <img src="//placekitten.com/400" alt="Kitten 1" />
        </li>
        <li class="splide__slide">
          <img src="//placekitten.com/400" alt="Kitten 1" />
        </li>
        <li class="splide__slide">
          <img src="//placekitten.com/400" alt="Kitten 1" />
        </li>
      </ul>
    </div>
  </div>
</section>
