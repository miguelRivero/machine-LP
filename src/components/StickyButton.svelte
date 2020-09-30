<script>
  import Button from "./Button.svelte";
  import { onMount, onDestroy } from "svelte";
  import { headerHeight } from "../store.js";

  let header_height, unsubscribe;

  onMount(() => {
    unsubscribe = headerHeight.subscribe((value) => (header_height = value));
  });

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });

  const clickHandler = (e) => {
    console.log("clicked");
  };
</script>

<style type="text/scss">
  .AddToBagButton--sticky {
    padding: 12px 0;
    margin: 0 auto;
    text-align: center;
    width: 100%;
    background: white;
    //    border: 1px solid #dbdbdb;
    box-shadow: 20px 20px 30px 0 rgba(0, 0, 0, 0.1);
  }
</style>

<section class="AddToBagButton--sticky">
  <Button
    text="SEE ALL MACHINES"
    hiddenText=""
    iconPlus={false}
    iconBasket={false}
    on:buttonClick={clickHandler} />
</section>
