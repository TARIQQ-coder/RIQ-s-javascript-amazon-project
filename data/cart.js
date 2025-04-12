export let cart = JSON.parse(localStorage.getItem('cart')) || [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity : 2,
  deliveryOptionId : '1'
},{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity : 1,
  deliveryOptionId : '2'
}]

function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function addToCart (productId) {
  let matchingItem;
    // looping through the cart to ascertain if the productName matches with any product in the cart. if any we put it in a special cart called matchingItem

    cart.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });

    //  if our matching Item is true then we proceed to increase the matchingItem's quantity by 1. if not we add the product to the cart with a quantity of 1.
    if(matchingItem){
      matchingItem.quantity += 1;
    }else{
      cart.push({
        productId: productId,
        quantity: 1,
        deliveryOptionId: '1'
      });
    }
    saveToStorage();
}

export function removeFromCart(productId){
  const newCart = []

  cart.forEach((cartItem) => {
    if(productId !== cartItem.productId){
      newCart.push(cartItem);
    }
  });
  cart = newCart;
  saveToStorage()
}

export function updateDeliveryOption(productId,deliveryOptionId){
  let matchingItem;
  cart.forEach((cartItem) => {
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}