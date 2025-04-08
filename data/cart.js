const cart = []

function addToCart (productId) {
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
        quantity: 1
      });
    }
}