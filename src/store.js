import { readable, writable } from "svelte/store";

export const headerHeight = writable(0);

export let imagesGitStorage =
  "https://raw.githubusercontent.com/miguelRivero/machine-plp/master/public/images/";
