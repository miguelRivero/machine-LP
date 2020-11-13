import { derived, writable } from "svelte/store";

export const market = writable("");
export const lang = writable("");
export const viewportWidth = writable(0);
export const cartHasSKU = writable(0);
export const desktopView = derived(viewportWidth, ($viewportWidth) => {
  return $viewportWidth > 767;
});
export let imagesGitStorage =
  "https://raw.githubusercontent.com/miguelRivero/machine-plp/master/public/images/";
