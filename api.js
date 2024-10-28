// Päring kategooriate saamiseks
export async function fetchCategories() {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );
    const categories = await response.json();
    return categories;
  } catch (error) {
    console.error("Kategooriate laadimine ebaõnnestus:", error);
    return [];
  }
}

// Päring toodete saamiseks (kogu tootevalik)
export async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Toodete laadimine ebaõnnestus:", error);
    return [];
  }
}

// Päring toodete saamiseks kindla kategooria järgi
export async function fetchProductsByCategory(category) {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${category}`
    );
    const products = await response.json();
    return products;
  } catch (error) {
    console.error(
      `Toodete laadimine kategooria '${category}' järgi ebaõnnestus:`,
      error
    );
    return [];
  }
}

// Päring toote saamiseks ID järgi
export async function fetchProductById(productId) {
  try {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    );
    if (!response.ok) {
      throw new Error("Viga toote andmete toomisel: " + response.statusText);
    }
    const product = await response.json();
    return product; // Tagasta toode
  } catch (error) {
    console.error("Fetch error:", error);
    return null; // Tagasta null vigade korral
  }
}
