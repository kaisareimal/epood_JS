// productView.js
import { fetchProducts } from "./api.js"; // Import fetchProducts
import { navigateTo } from "./router.js"; // Import navigateTo
import { addToCart } from "./cart.js"; // Import addToCart

export async function renderProductView(productId) {
  const appDiv = document.getElementById("app");

  // Fetch all products
  const products = await fetchProducts();

  // Find the product by ID
  const product = products.find((p) => p.id === productId);

  if (!product) {
    appDiv.innerHTML = "<p>Product not found.</p>";
    return;
  }

  appDiv.innerHTML = `
            <nav class="home-buttons">
                <button id="home-button">Home</button>
                <button id="cart-button">Cart</button>
            </nav>
            <h2>${product.name}</h2>
        <div class="product-details">
            <img src="${product.image}" alt="${product.name}" />
            <p class="desc">Description: ${product.description}</p>
            <h3>Price: $${product.price.toFixed(2)}</h3>
            <button id="add-to-cart-button" data-id="${
              product.id
            }">Add to Cart</button>

        </div>
    `;

  // Add event listeners for navigation buttons
  document.getElementById("home-button").addEventListener("click", () => {
    navigateTo("home"); // Navigate to home view
  });

  document.getElementById("cart-button").addEventListener("click", () => {
    navigateTo("cart"); // Navigate to cart view
  });

  // Add event listener for the add to cart button
  document
    .getElementById("add-to-cart-button")
    .addEventListener("click", () => {
      addToCart(product); // Call your addToCart function with the current product
    });
}
