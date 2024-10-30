// router.js
import { renderCategoryView } from "./categoryView.js";
import { renderCartView } from "./cartView.js";
import { renderProductView } from "./productView.js";
import { allProducts } from "./app.js"; // Import the products

let currentView = "home";

export function navigateTo(view, param) {
  currentView = view;
  const appDiv = document.getElementById("app");

  switch (view) {
    case "home":
      renderHomeView(); // Call the home view function
      break;
    case "category":
      renderCategoryView(param); // Pass the selected category
      break;
    case "product":
      renderProductView(param); // Pass the product ID for the detail view
      break;
    case "cart":
      renderCartView(); // Call the cart view function
      break;
    default:
      appDiv.innerHTML = "<p>Page not found.</p>";
  }
}

export function renderHomeView() {
  const appDiv = document.getElementById("app");

  // Select 3 random products
  const randomProducts = getRandomProducts(allProducts, 3);

  appDiv.innerHTML = `
        <header>
            <h1>Welcome to Our E-Store</h1>
        </header>
        <div class="home-buttons">
            <button id="category-button">View Categories</button>
            <button id="cart-button">View Cart</button>
        </div>
        <section class="random-products">
            <h2>Featured Products</h2>
            <div class="product-list" id="random-product-list">
                ${randomProducts
                  .map(
                    (product) => `
                    <div class="product-card">
                        <img src="${product.image}" alt="${product.name}" />
                        <h3>${product.name}</h3>
                        <p>Price: $${product.price.toFixed(2)}</p>
                        <button class="view-details" data-id="${
                          product.id
                        }">View Details</button>
                    </div>
                `
                  )
                  .join("")}
            </div>
        </section>
    `;

  // Set up event listeners for the buttons
  document.getElementById("category-button").addEventListener("click", () => {
    navigateTo("category"); // Navigate to category view
  });

  document.getElementById("cart-button").addEventListener("click", () => {
    navigateTo("cart"); // Navigate to cart view
  });

  // Add event listeners for the "View Details" buttons
  const detailButtons = document.querySelectorAll(".view-details");
  detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.dataset.id);
      navigateTo("product", productId); // Navigate to product detail view
    });
  });
}

// Function to get random products
function getRandomProducts(products, count) {
  const shuffled = products.sort(() => 0.5 - Math.random()); // Shuffle products
  return shuffled.slice(0, count); // Get the first 'count' products
}

// Event listener for URL changes
window.onpopstate = () => {
  navigateTo(currentView);
};
