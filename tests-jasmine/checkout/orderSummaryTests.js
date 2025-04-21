import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage } from "../../data/cart.js";

describe('test suite: renderOrderSummary', () => {
  // the first test for renderOrderSummary is the basic test which tests the what the function actually does
  it('displays cart on page',() => {
    // back in its own file, renderOrderSummary displays the art through the DOM through an element with class "js-order-summary", however, tests doesn't possess such an element so we need to give our test an element with the same class to display the cart in our test

    document.querySelector('.js-test-container').
    innerHTML = '<div class="js-order-summary"></div>';


    // since renderOrderSummary loops through the cart to generate the html for display, and it gets the cart fro localStorage, we can face an issue if we have no control over the items in the localStorage. it could cause FLAKY TESTS. its best for testing purposes if we mock the cart and give it items we'd expect to be displayed accessing renderOrderSummary for testing
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    spyOn(localStorage,'getItem').and.callFake(() => {
          return JSON.stringify([{
            productId: productId1,
            quantity : 2,
            deliveryOptionId : '1'
          },{
            productId: productId2,
            quantity : 1,
            deliveryOptionId : '2'
          }]);
        });    
    
        loadFromStorage();

        renderOrderSummary();
        // in our mocked -cart, we made localStorage return a stringified array of 2 objects. we can check to see if in actuality renderOrderSummary displayed 2 items

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);

       //  we can check each cart product's quantity to see if it matches the quantity being displayed on the page
      // we need to first get each cart item's quantity into javaScript and check if it contains the string "Quantity: 1" or "Quantity: 2" depending on which of the item is being called for testing

      expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');

      expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
  });

  it('removes from cart',() => {
    spyOn(localStorage,'setItem');

    document.querySelector('.js-test-container').
    innerHTML = `
    <div class="js-order-summary"></div>
    <div class="js-payment-summary"></div>`;


    // since renderOrderSummary loops through the cart to generate the html for display, and it gets the cart fro localStorage, we can face an issue if we have no control over the items in the localStorage. it could cause FLAKY TESTS. its best for testing purposes if we mock the cart and give it items we'd expect to be displayed accessing renderOrderSummary for testing
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
    spyOn(localStorage,'getItem').and.callFake(() => {
          return JSON.stringify([{
            productId: productId1,
            quantity : 2,
            deliveryOptionId : '1'
          },{
            productId: productId2,
            quantity : 1,
            deliveryOptionId : '2'
          }]);
        });    
    
        loadFromStorage();

        renderOrderSummary();

        // in code, you can click using .click() on an element and it'll simulate a click event.
        document.querySelector(`.js-delete-link-${productId1}`).click();

        expect(document.querySelectorAll('js-cart-item-container').length).toEqual(0);

        // lets check if the cart item that was removed is no longer displayed on the page
        expect(document.querySelector(`js.cart-item-container-${productId1}`)).toEqual(null);

        expect(document.querySelector(`js.cart-item-container-${productId2}`)).toEqual(null);
  });
});