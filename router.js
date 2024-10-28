// router.js
import { renderHome } from "./categoryView.js";
import { renderCart } from "./cartView.js";
import { displayProductDetail } from "./productView.js";

export function navigate(view, id) {
  console.log("Navigating to view:", view, "with ID:", id); // Logi vaade ja ID
  render(view, id);
}

export async function render(view, id) {
  const app = document.getElementById("app"); // Kontrollige, et element on olemas
  app.innerHTML = ""; // Tühjendame olemasoleva sisu

  switch (view) {
    case "home":
      await renderHome(); // Ootan, kuni kodu vaade on renderdatud
      break;
    case "cart":
      await renderCart(); // Ootan, kuni ostukorvi vaade on renderdatud
      break;
    case "product-detail":
      await displayProductDetail(id); // Ootan, kuni toote detailid on renderdatud
      return; // Tagasi, et mitte jätkata
    default:
      app.innerHTML = "<h2>Leht ei leitud</h2>";
  }
}
