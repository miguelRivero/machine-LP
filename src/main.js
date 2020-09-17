import App from "./App.svelte";

const replaceContainer = function (Component, options) {
  const frag = document.createDocumentFragment();
  const component = new Component(Object.assign({}, options, { target: frag }));

  options.target.replaceWith(frag);

  return component;
};

//Replacing existing main with our content
const app = replaceContainer(App, {
  target: document.querySelector("main"),
});

// const app = new App({
// 	target: document.body,
// });

export default app;
