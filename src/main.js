import App from "./App.svelte";
/*next comment is a compilation directive using jscc npm package
this import polyfills for the legacy build*/
import "core-js/es/array/fill";
import "core-js/es/object";
import "core-js/es/map";

//Hide smart banner
const toHide = [".smartbanner", "#topDelBan"];
const hideElements = (arr) => {
  for (const item of arr) {
    let smartbanner = document.querySelector(item);
    if (smartbanner) smartbanner.style.display = "none";
  }
};
const mainEl = document.querySelector("main");
const speed = 500;
const seconds = speed / 1000;
mainEl.style.opacity = 1;
main.style.transition = "opacity " + seconds + "s ease-out";
//hideElements(toHide);

const tampermonkey = true;

const replaceContainer = function (Component, options) {
  let component;
  const frag = document.createDocumentFragment();
  options.target.style.opacity = 0;
  setTimeout(function () {
    component = new Component(Object.assign({}, options, { target: frag }));
    options.target.parentNode.replaceChild(frag, options.target);
  }, speed);

  return component;
};

//Replacing existing main with our content
const app = tampermonkey
  ? replaceContainer(App, {
      target: mainEl,
    })
  : new App({
      target: document.body,
    });

// const app = new App({
// 	target: document.body,
// });
export default app;
