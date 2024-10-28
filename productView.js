import { fetchProductById } from "./api.js";
import { addToCart } from "./cart.js";
import { navigate } from "./router.js";

export async function displayProductDetail(productId) {
  console.log("Selected Product ID:", productId);
  const product = await fetchProductById(productId); // Saame toote ID järgi

  if (!product) {
    console.error("Toode ei leitud.");
    return; // Välju funktsioonist, kui toode ei leitud
  }

  const productDetailElement = document.createElement("div");
  productDetailElement.innerHTML = `
        <h2>${product.title}</h2>
        <img src="${product.image}" alt="${product.title}">
        <p>Hind: ${product.price.toFixed(2)} €</p>
        <p>${product.description}</p>
        <button id="add-to-cart-${
          product.id
        }" class="add-to-cart">Lisa ostukorvi</button>
        <button id="back-button">Tagasi</button>
      `;

  // Tühjenda app element ja lisa toote detailide element
  const app = document.getElementById("app");
  app.innerHTML = ""; // Tühjendame olemasoleva sisu
  app.appendChild(productDetailElement);

  document.getElementById(`add-to-cart-${product.id}`).onclick = () =>
    addToCart(product);

  // Lisa "Back" nupp, mis viib tagasi kategooria vaatesse
  document.getElementById("back-button").onclick = () => navigate("home");
}
