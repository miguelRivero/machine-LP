<script>
  import Splide from "@splidejs/splide";
  import { onMount } from "svelte";
  export let slides;
  let gliderEl;

  onMount(() => {
    setTimeout(function () {
      new Splide(gliderEl, {
        type: "loop",
        perPage: 3,
      }).mount();
    }, 1000);
  });
</script>

<style type="text/scss" global>
  @import "../../node_modules/@splidejs/splide/dist/css/splide.min";
</style>

<section id="offer">
  <div id="splide" class="splide" bind:this={gliderEl}>
    <div class="splide__track">
      <ul class="splide__list">
        {#each slides as slide}
          <li class="splide__slide">
            <img
              itemprop="image"
              src="{slide.url}?impolicy=productPdpSafeZone&imwidth=1238"
              role="presentation"
              class="ResponsiveImage ProductDetailsImage ResponsiveImage--flexible"
              alt=""
              width="1238"
              height="778" />
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>
