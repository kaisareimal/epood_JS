// cart.js
let cart = []; // This will hold the cart items

// Load cart from local storage
export function loadCart() {
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  cart = storedCart ? storedCart : []; // Load cart from storage
}

// Function to get the current cart
export function getCartItems() {
  return cart; // Return the current cart items
}

// Add to cart function
export function addToCart(product) {
  const existingProduct = cart.find((item) => item.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++; // Increase quantity if product already in cart
  } else {
    cart.push({ ...product, quantity: 1 }); // Add product to cart with quantity 1
  }
  saveCart(); // Save cart to localStorage or wherever you manage it
}

// Remove from cart function
export function removeCartItem(productId) {
  cart = cart.filter((item) => item.id !== productId); // Remove the item from the cart
  saveCart(); // Save the updated cart
}

// Update quantity function
export function updateCartQuantity(productId, quantity) {
  const item = cart.find((item) => item.id === productId);
  if (item) {
    item.quantity = quantity; // Update the item's quantity
    if (item.quantity <= 0) {
      removeCartItem(productId); // Remove item if quantity is 0
    }
    saveCart(); // Save the updated cart
  }
}

// Function to calculate total price of the cart
export function calculateTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Function to save cart
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart)); // Example using localStorage
}
