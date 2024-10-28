// cartView.js
import { updateCartUI, clearCart } from "./cart.js";
import { navigate } from "./router.js"; // Importige navigate siia

export function renderCart() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <h2>Ostukorv</h2>
    <div id="cart-items"></div>
    <p>Kokku: <span id="total-price">0</span> €</p>
    <button id="clear-cart">Tühjenda ostukorv</button>
    <button id="back-to-home">Tagasi</button> <!-- Lisa tagasi nupp -->
  `;

  // Uuendame ostukorvi UI
  updateCartUI();

  // Lisa sündmuse kuulaja tühjendamise nupule
  document.getElementById("clear-cart").addEventListener("click", () => {
    clearCart(); // Tühjendame ostukorvi
  });
}
