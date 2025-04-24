// instead of putting the OOP in a function lke we did in cart-oop, we'd use a feature specifically meant to generate objects which is called "class"

class Cart {
  cartItems;

  // here,since localStorageKey doesn't exist anymore, we defined it as a property giving it a value of undefined
  #localStorageKey;

  // a constructor lets us run a setup code. An important feature of a constructor is that it runs automatically whenever a new object is created which makes our code cleaner

  constructor (localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage(){
    // "this.localStorageKey" points to the property localStorageKey and its able to access its value 
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity : 2,
      deliveryOptionId : '1'
    },{
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity : 1,
      deliveryOptionId : '2'
    }]
  }

  saveToStorage(){
    localStorage.setItem(this.localStorageKey,JSON.stringify(cart));
  }

  addToCart(productId) {
    let matchingItem;
      // looping through the cart to ascertain if the productName matches with any product in the cart. if any we put it in a special cart called matchingItem
  
      this.cartItems.forEach((cartItem) => {
        if(productId === cartItem.productId){
          matchingItem = cartItem;
        }
      });
  
      //  if our matching Item is true then we proceed to increase the matchingItem's quantity by 1. if not we add the product to the cart with a quantity of 1.
      if(matchingItem){
        matchingItem.quantity += 1;
      }else{
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: '1'
        });
      }
      this.saveToStorage();
  }

  // for the removeFromCart (), its interpreted as grouping all items in a different cart except the productId of the item we wish we eliminate. its te same as removing a product from the cart
  removeFromCart(productId){
    const newCart = []
  
    this.cartItems.forEach((cartItem) => {
      if(productId !== cartItem.productId){
        newCart.push(cartItem);
      }
    });
    this.cartItems = newCart;
    this.saveToStorage()
    }

    updateDeliveryOption(productId,deliveryOptionId){
      let matchingItem;
      this.cartItems.forEach((cartItem) => {
        if(cartItem.productId === productId){
          matchingItem = cartItem;
        }
      });
    
      matchingItem.deliveryOptionId = deliveryOptionId;
    
      this.saveToStorage();
    }


}



const cart = new Cart('cart-oop');
const businessCart = new Cart('business-cart');

console.log(cart);
console.log(businessCart);

console.log(businessCart instanceof Cart);


