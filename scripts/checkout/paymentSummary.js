import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    const itemPriceCents = product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    const itemsShippingPriceCents = deliveryOption.priceCents;

    productPriceCents += itemPriceCents;
    shippingPriceCents += itemsShippingPriceCents;
  });

  const beforeTaxPriceCents = productPriceCents + shippingPriceCents;
  const taxPriceCents = beforeTaxPriceCents * 0.1;
  const TotalPriceCents = beforeTaxPriceCents + taxPriceCents;

  const paymentSummaryHTML = `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(
              productPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(
              shippingPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              beforeTaxPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              taxPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
              TotalPriceCents
            )}</div>
          </div>

          <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>`;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;

  document
    .querySelector(".js-place-order")
    .addEventListener("click", async () => {
      
      try {
        
          const response = await fetch("https://supersimplebackend.dev/orders", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              cart: cart,
            }),
          });
    
          const orderData = await response.json();
          addOrder(orderData);

      } catch (error) {
        console.log('Unexpected error. Try again later')
      }

        window.location.href = "orders.html";
    });
}
