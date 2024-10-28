import {
  renderCategoryMenu,
  displayProductsByCategory,
} from "./categoryView.js";
import { initializeCart, clearCart } from "./cart.js";
import { navigate } from "./router.js";

function initApp() {
  // Laadime kategooriamenüü
  renderCategoryMenu();

  // Kuvame esimesena näiteks kategooria "electronics" tooted
  displayProductsByCategory("electronics");

  // Initsialiseerime ostukorvi
  initializeCart();
}

// Funktsioon vahetab vaateid
function navigateToView(view) {
  if (view === "home") {
    document.getElementById("product-list").style.display = "block"; // Kuvame tooted
    document.getElementById("cart").style.display = "none"; // Peida ostukorv
  } else if (view === "cart") {
    document.getElementById("product-list").style.display = "none"; // Peida tooted
    document.getElementById("cart").style.display = "block"; // Kuvame ostukorvi
  }
}

// Kinnitage nuppude sündmused
document.getElementById("home-button").addEventListener("click", () => {
  navigateToView("home");
});

document.getElementById("cart-button").addEventListener("click", () => {
  navigateToView("cart");
});

// Kinnitage tühjenda ostukorv nupp
document.getElementById("clear-cart").addEventListener("click", clearCart);

// Käivitame rakenduse pärast DOM-i täielikku laadimist
document.addEventListener("DOMContentLoaded", initApp);
