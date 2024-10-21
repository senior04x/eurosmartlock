import { findElement } from "./helper.js";

// MockAPI endpointi
const apiUrl = 'https://66eabcde55ad32cda47a3262.mockapi.io/api/v1/products';

const elWrapperProducts = findElement(".list__block");
const elTemplate = findElement("#template");
const elMoreProductsBtn = findElement("#more-btn");
const elLessProductsBtn = findElement("#less-btn");
const elSearchInput = findElement("#search-input");

let pageCount = 1;
const perPage = 4;
let filteredProducts = [];

// Mahsulotlarni olish
function fetchProducts() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      filteredProducts = data; // Ma'lumotni saqlash
      renderProducts();
    })
    .catch(error => console.error('Xatolik yuz berdi:', error));
}

// Mahsulotlarni ekranga chiqarish
function renderProducts() {
  const start = (pageCount - 1) * perPage;
  const end = start + perPage;
  const visibleProducts = filteredProducts.slice(start, end);

  if (pageCount === 1) {
    elWrapperProducts.innerHTML = "";
  }

  visibleProducts.forEach((product) => {
    const newTemplate = elTemplate.content.cloneNode(true);
    const elImg = findElement(".list__content_img", newTemplate);
    elImg.src = product.imageSrc;
    elImg.dataset.id = product.id;

    const elTitle = findElement(".content__list_title", newTemplate);
    elTitle.textContent = shortenTitle(product.title); // Sarlavhani qisqartirish

    const elPriceOld = findElement(".price__old", newTemplate);
    elPriceOld.textContent = product.oldPrice;

    const elPriceNew = findElement(".price__new", newTemplate);
    elPriceNew.textContent = product.newPrice;
    elWrapperProducts.appendChild(newTemplate);
  });

  elMoreProductsBtn.style.display = pageCount < 2 ? "block" : "none";
  elLessProductsBtn.style.display = pageCount > 1 ? "block" : "none";
}

// Qidiruv funksiyasi
function handleSearch() {
  const searchTerm = elSearchInput.value.toLowerCase();
  filteredProducts = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm)
  );
  pageCount = 1;
  renderProducts();
}

elSearchInput.addEventListener("input", handleSearch);

// Ko'proq mahsulotlarni ko'rsatish
elMoreProductsBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(filteredProducts.length / perPage);
  if (pageCount < totalPages) {
    pageCount++;
    renderProducts();
  }
});

// Dastlabki holatga qaytarish
elLessProductsBtn.addEventListener("click", () => {
  pageCount = 1;
  renderProducts();
});

// Sahifa yuklanayotganda mahsulotlarni olish va ekranga chiqarish
document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

// Mahsulot tasviriga bosilganda uning ID'sini localStorage'ga saqlash
elWrapperProducts.addEventListener("click", (event) => {
  if (event.target.className.includes("list__content_img")) {
    const id = event.target.dataset.id;
    localStorage.setItem("id", id);
  }
});

// Mahsulot sarlavhasini qisqartirish
function shortenTitle(title, maxLength = 50) {
  return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
}
