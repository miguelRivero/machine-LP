<script>
  import Glide from "@glidejs/glide";
  import { onMount } from "svelte";

  export let slides;
  let gliderEl;

  onMount(() => {
    console.log(slides);
    setTimeout(() => {
      var glide = new Glide(gliderEl, {
        perView: 1,
        type: "carousel",
      });
      glide.mount();
    }, 500);
  });
</script>

<style type="text/scss" global>
  .glide__bullet {
    height: 11px;
    width: 11px;
    border: 1px solid #000000;
    border-radius: 100%;
    margin: 0 10px;
    padding: 0;
  }
  .glide__bullet--active {
    background-color: #000000;
  }
  .glide__slide {
    margin-top: 0;
    width: 100%;
    position: relative;
  }
</style>

<div class="perfectMatch__machineSlider glide" bind:this={gliderEl}>
  <div data-glide-el="track" class="glide__track">
    <ul class="glide__slides">
      {#each slides as slide}
        <li class="glide__slide">
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
  <div class="glide__bullets" data-glide-el="controls[nav]">
    {#each slides as slide, i}
      <button class="glide__bullet" data-glide-dir="={i}" />
    {/each}
  </div>
</div>
