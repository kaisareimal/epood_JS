import { fetchCategories, fetchProductsByCategory } from "./api.js";
import { addToCart } from "./cart.js";
import { navigate } from "./router.js";

export async function renderHome() {
  // Laadime kategooriad ja kuvame need
  await renderCategoryMenu();
  // Sa võid siin ka teisi tegevusi teha, näiteks tooteid kuvada
}

// Kategooriate kuvamine
export async function renderCategoryMenu() {
  const categoryMenu = document.getElementById("category-menu");
  const categories = await fetchCategories();

  categoryMenu.innerHTML = ""; // Tühjendame menüü enne uute kategooriate lisamist

  categories.forEach((category) => {
    const categoryItem = document.createElement("button");
    categoryItem.className = "category-item";
    categoryItem.textContent = category;
    categoryItem.addEventListener("click", () => {
      displayProductsByCategory(category); // Toote kuvamine valitud kategoorias
    });
    categoryMenu.appendChild(categoryItem);
  });
}

// Toodete kuvamine vastavalt kategooriale
export async function displayProductsByCategory(category) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = ""; // Tühjenda olemasolevad tooted

  const products = await fetchProductsByCategory(category);

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
      <img src="${product.image}" alt="${
      product.title
    }" style="cursor:pointer;">
      <h4>${product.title}</h4>
      <p>Hind: ${product.price.toFixed(2)} €</p>
      <button id="add-to-cart-${
        product.id
      }" class="add-to-cart">Lisa ostukorvi</button>
    `;
    productList.appendChild(productDiv);

    // Lisa sündmuse kuulaja toote pildi ja pealkirja klikiks
    productDiv.querySelector("img").addEventListener("click", () => {
      navigate("product-detail", product.id); // Liigu toote detailvaatesse
    });
    productDiv.querySelector("h4").addEventListener("click", () => {
      navigate("product-detail", product.id); // Liigu toote detailvaatesse
    });

    // Lisa sündmuse kuulaja ostukorvi nupule
    const addToCartButton = document.getElementById(
      `add-to-cart-${product.id}`
    );
    addToCartButton.addEventListener("click", () => {
      addToCart(product); // Lisa toode ostukorvi
    });
  });
}
