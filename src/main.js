import App from "./App.svelte";
/*next comment is a compilation directive using jscc npm package
this import polyfills for the legacy build*/
import "core-js/es/array/fill";
import "core-js/es/object";
import "core-js/es/map";

//Promise.resolve();
const tampermonkey = true;

const replaceContainer = function (Component, options) {
  const frag = document.createDocumentFragment();
  const component = new Component(Object.assign({}, options, { target: frag }));
  options.target.parentNode.replaceChild(frag, options.target);

  return component;
};

//Replacing existing main with our content
const app = tampermonkey
  ? replaceContainer(App, {
      target: document.querySelector("main"),
    })
  : new App({
      target: document.body,
    });

// const app = new App({
// 	target: document.body,
// });
export default app;
