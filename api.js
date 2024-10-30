// api.js
import { Product } from "./product.js"; // Ensure the correct path

export async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    return data.map(
      (item) =>
        new Product(
          item.id,
          item.title,
          item.price,
          item.image,
          item.category,
          item.description
        )
    ); // Use title for name
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Fetch categories function remains unchanged
export async function fetchCategories() {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const categories = await response.json();
    console.log("Fetched categories:", categories); // Log the fetched categories
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // Return an empty array in case of an error
  }
}
