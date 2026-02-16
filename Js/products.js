const API = "https://fakestoreapi.com";

/* ---------------- INIT ---------------- */
window.onload = () => {
  loadCategories();
  loadProducts();
  updateCartCount();
};

/* ---------------- CATEGORIES ---------------- */
async function loadCategories() {

  const res = await fetch(`${API}/products/categories`);
  const categories = await res.json();

  const container = document.getElementById("categoryContainer");
  container.innerHTML = "";

  createCategoryBtn("All", () => loadProducts());

  categories.forEach(cat => {
    createCategoryBtn(cat, () => loadProducts(cat));
  });
}

function createCategoryBtn(name, fn) {

  const btn = document.createElement("button");

  btn.className = "btn btn-sm btn-outline capitalize";
  btn.innerText = name;

  btn.onclick = () => {

    document.querySelectorAll("#categoryContainer button")
      .forEach(b => b.classList.remove("btn-primary"));

    btn.classList.add("btn-primary");

    fn();
  };

  document.getElementById("categoryContainer").appendChild(btn);
}

/* ---------------- PRODUCTS ---------------- */
async function loadProducts(category) {

  showLoader(true);

  let url = `${API}/products`;

  if (category && category !== "All") {
    url = `${API}/products/category/${category}`;
  }

  const res = await fetch(url);
  const products = await res.json();

  showLoader(false);
  renderProducts(products);
}

function renderProducts(products) {

  const container = document.getElementById("productContainer");
  container.innerHTML = "";

  products.forEach(p => {

    container.innerHTML += `
      <div class="bg-base-100 rounded-xl shadow-sm border">

        <div class="bg-gray-100 p-8 flex justify-center">
          <img src="${p.image}" class="h-44 object-contain"/>
        </div>

        <div class="p-5">

          <div class="flex justify-between mb-2">
            <span class="badge badge-outline text-xs capitalize">
              ${p.category}
            </span>

            <span class="text-sm text-gray-500">
              ⭐ ${p.rating.rate}
            </span>
          </div>

          <h3 class="text-sm font-semibold mb-2" title="${p.title}">
            ${truncate(p.title, 25)}
          </h3>

          <p class="font-bold mb-4">$${p.price}</p>

          <div class="flex gap-2">
            <button class="btn btn-outline btn-sm flex-1"
              onclick="showDetails(${p.id})">
              Details
            </button>

            <button class="btn btn-primary btn-sm flex-1"
              onclick="addToCart(${p.id})">
              Add
            </button>
          </div>

        </div>
      </div>
    `;
  });
}

/* ---------------- DETAILS MODAL ---------------- */
async function showDetails(id) {

  const res = await fetch(`${API}/products/${id}`);
  const p = await res.json();

  document.getElementById("modalContent").innerHTML = `
    <img src="${p.image}" class="h-40 mx-auto mb-4"/>

    <h2 class="font-bold text-lg">${p.title}</h2>
    <p class="text-sm my-2">${p.description}</p>

    <p class="font-bold">$${p.price}</p>
    <p>⭐ ${p.rating.rate}</p>

    <button class="btn btn-primary w-full mt-3"
      onclick="addToCart(${p.id})">
      Add To Cart
    </button>
  `;

  document.getElementById("productModal").showModal();
}

/* ---------------- CART ---------------- */
function addToCart(id) {

  fetch(`${API}/products/${id}`)
    .then(res => res.json())
    .then(product => {

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);

      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartCount();
    });
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const badge = document.querySelector(".indicator .badge");
  if (badge) badge.innerText = cart.length;
}

/* ---------------- LOADER ---------------- */
function showLoader(show) {
  document.getElementById("loader")
    .classList.toggle("hidden", !show);
}

/* ---------------- UTIL ---------------- */
function truncate(text, len) {
  return text.length > len ? text.substring(0, len) + "..." : text;
}