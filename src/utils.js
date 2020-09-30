function checkNapiAvailable() {
  if (!window.napi) {
    return new Promise((resolve, reject) => {
      reject(new Error("napi not available")).then(
        () => {},
        (error) => {
          console.log(error);
        }
      );
    });
  } else {
    return true;
  }
}

export function visibleY(el, offset) {
  let rect = el.getBoundingClientRect(),
    elemTop = rect.top,
    elemBottom = rect.bottom,
    margin = offset ? offset : 0;
  console.log(margin);
  // Only completely visible elements return true:
  let isVisible = elemTop >= margin && elemBottom <= window.innerHeight;
  // Partially visible elements return true:
  //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
}

export async function getProduct(sku) {
  return napi.catalog().getProduct(sku);
}
