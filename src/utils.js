export function checkNapiAvailable() {
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

export function fetchCart() {
  return checkNapiAvailable() && napi.cart().read();
}

export function watchCart(callback) {
  console.log("watch");
  try {
    return napi.data().on("cart.update", callback);
  } catch (e) {
    console.log(e);
  }
}

export async function getCartData() {
  return window.napi.cart().read();
}

export function visibleEl(el, offset) {
  let rect = el.getBoundingClientRect(),
    elemTop = rect.top,
    elemBottom = rect.bottom,
    elemMiddle = (elemBottom - elemTop) * 0.5,
    margin = offset ? offset : 0;
  // console.log(margin);
  // Only completely visible elements return true:
  let isVisible = elemTop >= margin && elemMiddle <= window.innerHeight;
  // Partially visible elements return true:
  //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
  return isVisible;
}

export async function getProductData(sku) {
  return napi.catalog().getProduct(sku);
}

export async function getSubscriptionData() {
  return napi.market().getSubscriptions();
}
