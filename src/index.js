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

export async function getProduct(sku) {
  return napi.catalog().getProduct(sku);
}
