import {addToCart,cart,loadFromStorage} from "../../data/cart.js";

describe('test suite: addToCart',() => {
  it('item already in the cart',() => {

     // cloning the localStorage.setItem.ie(saveToStorage()) so we can ascertain the times it was called.
     spyOn(localStorage,'setItem');

    spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity:1,
        deliveryOptionId: '1'
      }]);
    });    

    loadFromStorage();

      // adding an item to the cart and checking if the cart's quantity increased by one
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);

     // ascertaining if the save to localStorage.setItem has been called after addToCart
     expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('add item to the cart',() => {
    // cloning the localStorage.setItem.ie(saveToStorage()) so we can ascertain the times it was called.
    spyOn(localStorage,'setItem');

    // cloning the localStorage.getItem so it returns an empty array when its called
    spyOn(localStorage,'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    // reloading the cart so it reflects the changes made
    loadFromStorage();

    // adding an item to the cart and checking if the cart's length increased by one
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    // ascertaining if the save to localStorage.setItem has been called after addToCart
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});