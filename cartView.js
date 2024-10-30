// cartView.js
import {
  getCartItems,
  removeCartItem,
  updateCartQuantity,
  calculateTotal,
} from "./cart.js";
import { navigateTo } from "./router.js";

export function renderCartView() {
  const appDiv = document.getElementById("app");
  const cart = getCartItems(); // Get the current cart
  const total = calculateTotal();

  appDiv.innerHTML = `
  <header>
      <nav>
          <button id="home-button">Home</button>
          <button id="category-button">Categories</button>
      </nav>
      <h1>Your Cart</h1>
  </header>
  <div class="cart-items">
      ${
        cart.length === 0
          ? "<p>Your cart is empty.</p>"
          : cart
              .map(
                (item) => `
              <div class="cart-item">
                  <h3>${item.name}</h3>
                  <p>Price: $${item.price.toFixed(2)}</p>
                  <input type="number" value="${
                    item.quantity
                  }" min="1" data-id="${item.id}" class="quantity-input" />
                  <button class="remove-button" data-id="${
                    item.id
                  }">Remove</button>
              </div>
          `
              )
              .join("")
      }
  </div>
  <div class="cart-total">
      <h3>Total: $${total.toFixed(2)}</h3>
      <button id="empty-cart-button">Empty Cart</button>
  </div>
`;

  // Add event listeners for home and category buttons
  document.getElementById("home-button").addEventListener("click", () => {
    navigateTo("home"); // Navigate to home view
  });

  document.getElementById("category-button").addEventListener("click", () => {
    navigateTo("category"); // Navigate to category view
  });

  // Add event listeners for remove buttons
  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.dataset.id);
      removeCartItem(productId); // Remove the item from the cart
      renderCartView(); // Re-render the cart view to update the UI
    });
  });

  // Add event listeners for quantity inputs
  const quantityInputs = document.querySelectorAll(".quantity-input");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", () => {
      const productId = parseInt(input.dataset.id);
      const newQuantity = parseInt(input.value);
      updateCartQuantity(productId, newQuantity); // Update the item's quantity
      renderCartView(); // Re-render the cart view to update the UI
    });
  });

  // Add event listener for empty cart button
  document.getElementById("empty-cart-button").addEventListener("click", () => {
    // Clear the cart and re-render
    cart.length = 0; // Clear the cart array
    localStorage.removeItem("cart"); // Remove from local storage
    renderCartView(); // Re-render the cart view to update the UI
  });
}
