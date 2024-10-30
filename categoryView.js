// categoryView.js
import { navigateTo } from "./router.js";
import { fetchProducts, fetchCategories } from "./api.js";

export async function renderCategoryView(selectedCategory) {
  const appDiv = document.getElementById("app");

  // Fetch products and categories
  let products = [];
  let categories = [];

  try {
    products = await fetchProducts();
    categories = await fetchCategories();
    console.log("Fetched products:", products); // Log fetched products
  } catch (error) {
    console.error("Error fetching products or categories:", error);
  }

  // Filter products based on the selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  // Ensure category buttons are displayed correctly
  const categoryButtons = categories
    .map(
      (category) => `
      <button class="category-button" data-category="${category}">${category}</button>
    `
    )
    .join("");

  appDiv.innerHTML = `
        <header>
            <nav>
                <button id="home-button">Home</button>
                <button id="cart-button">Cart</button>
            </nav>
            <h1>Categories</h1>
            <nav>
                ${categoryButtons}
            </nav>
        </header>
        <div class="product-list" id="category-product-list">
            ${filteredProducts
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
    `;

  // Add event listeners for category buttons
  const categoryButtonsElements = document.querySelectorAll(".category-button");
  categoryButtonsElements.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.category;
      navigateTo("category", category); // Navigate to the selected category
    });
  });

  // Add event listeners for "View Details" buttons
  const detailButtons = document.querySelectorAll(".view-details");
  detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = parseInt(button.dataset.id);
      navigateTo("product", productId); // Navigate to product detail view
    });
  });

  // Add event listeners for home and cart buttons
  document.getElementById("home-button").addEventListener("click", () => {
    navigateTo("home"); // Navigate to home view
  });

  document.getElementById("cart-button").addEventListener("click", () => {
    navigateTo("cart"); // Navigate to cart view
  });
}
