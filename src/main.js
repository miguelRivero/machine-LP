import App from "./App.svelte";

const tampermonkey = true;

const replaceContainer = function (Component, options) {
  const frag = document.createDocumentFragment();
  const component = new Component(Object.assign({}, options, { target: frag }));

  options.target.replaceWith(frag);

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
