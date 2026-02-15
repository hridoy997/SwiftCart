/* =========================
   API BASE
========================= */
const API = "https://fakestoreapi.com";

/* =========================
   PAGE LOAD
========================= */
document.addEventListener("DOMContentLoaded", () => {
  loadTrending();
  updateCartCount();
});

/* =========================
   LOAD RANDOM TRENDING
========================= */
async function loadTrending() {
  try {
    const res = await fetch(`${API}/products`);
    const products = await res.json();

    // RANDOM 3 PRODUCTS
    const trending = products.sort(() => 0.5 - Math.random()).slice(0, 3);

    renderTrending(trending);
  } catch (err) {
    console.error("Trending Load Error:", err);
  }
}

/* =========================
   RENDER TRENDING
========================= */
function renderTrending(products) {
  const container = document.getElementById("trendingContainer");

  // Safety check (important)
  if (!container) return;

  container.innerHTML = "";

  products.forEach((p) => {
    container.innerHTML += `
    
      <div class="bg-base-100 rounded-xl shadow-sm border">

        <!-- IMAGE -->
        <div class="bg-gray-100 rounded-t-xl p-2.5 flex justify-center">
          <img src="${p.image}" class="h-48 object-contain"/>
        </div>

        <!-- BODY -->
        <div class="p-6">

          <!-- CATEGORY + RATING -->
          <div class="flex justify-between items-center mb-3">
            <span class="badge bg-blue-50 text-primary font-semibold text-xs capitalize">
              ${p.category}
            </span>

            <div class="flex items-center gap-1 text-sm text-gray-500">
              ⭐ ${p.rating.rate}
              <span class="text-xs">(${p.rating.count})</span>
            </div>
          </div>

          <!-- TITLE -->
          <h3 class="font-semibold text-sm mb-2" title="${p.title}">
            ${truncate(p.title, 38)}
          </h3>

          <!-- PRICE -->
          <p class="font-bold mb-4">$${p.price}</p>

          <!-- BUTTONS -->
          <div class="flex gap-3">

            <button class="btn btn-outline btn-sm flex-1">
              Details
            </button>

            <button 
              class="btn btn-primary btn-sm flex-1 flex items-center gap-1"
              onclick="addToCartById(${p.id})">

              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                fill="currentColor" viewBox="0 0 16 16">
                <path d="M0 1.5A.5.5 0 0 1 .5 1H1a.5.5 0 0 1 .49.402L1.89 3H14.5a.5.5 0 0 1 .49.598l-1.5 7A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.49-.402L1.01 2H.5a.5.5 0 0 1-.5-.5z"/>
              </svg>

              Add
            </button>

          </div>

        </div>
      </div>

    `;
  });
}

/* =========================
   CART FUNCTIONS
========================= */

async function addToCartById(id) {
  try {
    const res = await fetch(`${API}/products/${id}`);
    const product = await res.json();

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
  } catch (err) {
    console.error("Cart Add Error:", err);
  }
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const badge = document.querySelector(".indicator .badge");

  if (badge) badge.innerText = cart.length;
}

/* =========================
   UTIL
========================= */
function truncate(text, len) {
  return text.length > len ? text.substring(0, len) + "..." : text;
}
