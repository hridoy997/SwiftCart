window.onload = loadCart;

function loadCart() {

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const container = document.getElementById("cartContainer");

  let total = 0;

  container.innerHTML = "";

  cart.forEach((item, index) => {

    total += item.price;

    container.innerHTML += `
      <div class="flex justify-between bg-base-100 p-4 rounded shadow">

        <div class="flex gap-4">
          <img src="${item.image}" class="h-16"/>
          <div>
            <h3 class="font-semibold">${item.title}</h3>
            <p>$${item.price}</p>
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
}