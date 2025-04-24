// this is us using a function to generate objects
// here, we created the the OOP and saved it as cart. we then placed it in a function Cart() so we could use it to call out multiple objects

function Cart (localStorageKey){
  const cart = {
    cartItems : undefined,
 
     loadFromStorage(){
     this.cartItems = JSON.parse(localStorage.getItem(localStorageKey)) || [{
       productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
       quantity : 2,
       deliveryOptionId : '1'
     },{
       productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
       quantity : 1,
       deliveryOptionId : '2'
     }]
   },
 
   saveToStorage(){
     localStorage.setItem(localStorageKey,JSON.stringify(cart));
   },
 
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
   },
 
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
   },
 
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
 
 };
 return cart;
}

// We've been able to convert the OOP into a function which makes it easy for us to create as many objects as possible.


const cart = Cart('cart-oop');
const businessCart = Cart('business-cart');

cart.loadFromStorage();
businessCart.loadFromStorage();


console.log(cart);
console.log(businessCart);
