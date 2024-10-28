let cart = []; // Ostukorv kui tühi massiiv

export function addToCart(product) {
  const cartItem = cart.find((item) => item.id === product.id);

  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
}

// Eemaldab toote ostukorvist
export function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCartUI();
}

// Muudab toote kogust
export function changeQuantity(productId, newQuantity) {
  const cartItem = cart.find((item) => item.id === productId);

  if (cartItem) {
    cartItem.quantity = newQuantity;
    if (cartItem.quantity <= 0) {
      removeFromCart(productId);
    }
  }

  updateCartUI();
}

// Tühjendab ostukorvi
export function clearCart() {
  cart = []; // Tühjendame ostukorvi
  updateCartUI(); // Uuendame kasutajaliidese
}

export function updateCartUI() {
  const cartContainer = document.getElementById("cart-items");
  const totalPriceSpan = document.getElementById("total-price");

  cartContainer.innerHTML = ""; // Tühjendame vana sisu
  let total = 0;

  cart.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `
              <span>${item.name}</span>
              <span>${item.price.toFixed(2)} € x ${item.quantity}</span>
              <button class="remove-from-cart">Eemalda</button>
              <input type="number" min="1" value="${item.quantity}">
          `;

    const removeButton = itemDiv.querySelector(".remove-from-cart");
    removeButton.addEventListener("click", () => {
      removeFromCart(item.id); // Kutsume removeFromCart
    });

    const quantityInput = itemDiv.querySelector('input[type="number"]');
    quantityInput.addEventListener("change", (event) => {
      const newQuantity = parseInt(event.target.value);
      changeQuantity(item.id, newQuantity);
    });

    cartContainer.appendChild(itemDiv);
    total += item.price * item.quantity;
  });

  totalPriceSpan.textContent = `${total.toFixed(2)} €`;
}

// Seadistab algse ostukorvi funktsionaalsuse
export function initializeCart() {
  updateCartUI();
}
