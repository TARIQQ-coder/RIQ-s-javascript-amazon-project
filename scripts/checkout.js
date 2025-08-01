import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// 
// import '../data/backend-practice.js';


async function loadPage () {
  try {

      // throw 'error1000'

        await loadProductsFetch();
      
        await new Promise((resolve) => {
          throw 'error2000';
      loadCart(() => {
          resolve();
          });
      })
  } catch (error) {
    console.log('error. fetch unsuccessful')
  }

     renderOrderSummary();
      renderPaymentSummary();
 
}

loadPage()



// Promise.all([
//   loadProductsFetch(),

// new Promise((resolve) => {
//   loadCart(() => {
//       resolve();
//     });
// })
// ]).then(() => {
//   console.log('All promises resolved');
//   renderOrderSummary();
//       renderPaymentSummary();
// })

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value 1');
  })
}).then((value) => {
  console.log(value);
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

}).then(() => {
      renderOrderSummary();
      renderPaymentSummary();
});
*/


// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//   })
// })

