// app.js
import { fetchProducts } from "./api.js";
import { navigateTo } from "./router.js";
import { loadCart } from "./cart.js";

let allProducts = []; // Declare a variable to hold all products

document.addEventListener("DOMContentLoaded", async () => {
  loadCart(); // Load the cart on app start
  allProducts = await fetchProducts(); // Fetch products once and store them
  initializeNavigation();
});

function initializeNavigation() {
  const appDiv = document.getElementById("app");
  if (appDiv) {
    navigateTo("home"); // Start with the home view
  } else {
    console.error('Element with id "app" not found.');
  }
}

export { allProducts };
