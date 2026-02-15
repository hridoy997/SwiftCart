window.onload = () => {
  loadCart();
  updateCartCount();
};

function loadCart() {

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const container = document.getElementById("cartContainer");

  let total = 0;

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12">
        <p class="text-gray-500 text-lg">Your cart is empty</p>
        <a href="products.html" class="btn btn-primary btn-sm mt-4">Continue Shopping</a>
      </div>
    `;
    document.getElementById("totalPrice").innerText = "Total: $0.00";
    return;
  }

  cart.forEach((item, index) => {

    total += item.price;

    container.innerHTML += `
      <div class="flex justify-between items-center bg-base-100 p-4 rounded-xl shadow-sm border">

        <div class="flex gap-4 items-center">
          <img src="${item.image}" class="h-16 object-contain"/>
          <div>
            <h3 class="font-semibold text-sm">${item.title}</h3>
            <p class="font-bold text-primary">$${item.price}</p>
          </div>
        </div>

        <button onclick="removeItem(${index})"
          class="btn btn-error btn-sm">
          Remove
        </button>

      </div>
    `;
  });

  document.getElementById("totalPrice").innerText =
    `Total: $${total.toFixed(2)}`;
}

function removeItem(index) {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  loadCart();
  updateCartCount();
}

function clearCart() {
  localStorage.removeItem("cart");
  loadCart();
  updateCartCount();
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const badge = document.querySelector(".indicator .badge");
  if (badge) badge.innerText = cart.length;
}