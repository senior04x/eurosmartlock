// MockAPI URL
const apiUrl = 'https://66eabcde55ad32cda47a3262.mockapi.io/api/v1/products';

// Elementni olish uchun yordamchi funksiya
function findElement(selector) {
  return document.querySelector(selector);
}

// Mahsulot sahifasini yuklash uchun funksiya
async function loadProductPage() {
  // Sahifada asosiy kontentni olish uchun element
  const mainContent = findElement(".single__product_box");

  // localStorage dan saqlangan mahsulot ID sini olish
  const id = localStorage.getItem("id") ? localStorage.getItem("id") : 1;

  try {
    // MockAPI'dan mahsulot ma'lumotlarini olish
    const response = await fetch(`${apiUrl}/${id}`);
    const product = await response.json();

    // Agar mahsulot topilsa, sahifaga chiqaramiz
    if (product) {
      const mainProducthtml = `
      <div class="single__block">
        <img class="single__img" src="${product.imageSrc}" alt="img">
        <div class="single__content_box">
          <p class="single__product_avaible"><span>В продаже:</span> ${product.available} <span>штук</span></p>  
          <img class="single__img2" src="${product.imageSrc}" alt="">
          <h1 class="single__title">${product.title}</h1>
          <p class="single__text">${product.text}</p>
          <span class="single__span">Цена:</span>
          <div class="single__price_box">
            <h2 class="single__new_price">${product.newPrice}<span>$</span></h2>
            <h2 class="single__old_price">${product.oldPrice}<span>$</span></h2>
          </div>
          <div class="order__box">
          <button type="button" class="single__add_basket" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
          Оформить заказ
        </button>
            <div class="quantity-controls">
              <button class="minus">-</button>
              <input type="tel" id="quantity" value="1" min="1">
              <button class="plus">+</button>
            </div>
          </div>
        </div>
      </div>`;

      // Mahsulot nomini input maydoniga qo'shish
      const productInput = findElement("#product__input_title");
      if (productInput) {
        productInput.value = product.title;
      }

      // Sahifadagi asosiy kontentga mahsulotni HTML kodini qo'shamiz
      mainContent.innerHTML = mainProducthtml;

      // Miqdor boshqaruvini sozlash
      setupQuantityControls();
    } else {
      mainContent.innerHTML = "<p>Mahsulot topilmadi.</p>";
    }
  } catch (error) {
    console.error("Xatolik yuz berdi:", error);
    mainContent.innerHTML = "<p>Mahsulot yuklashda xatolik yuz berdi.</p>";
  }
}

// Miqdor boshqaruvlarini sozlash uchun funksiya
function setupQuantityControls() {
  const plusButton = document.querySelector('.plus');
  const minusButton = document.querySelector('.minus');
  const quantityInput = document.getElementById('quantity');
  const quantityInput2 = document.getElementById('product__order_number');
  quantityInput2.value = 1
  plusButton.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value, 10);
    quantityInput.value = currentValue + 1;
    if (quantityInput2) {
      quantityInput2.value = currentValue + 1;
    }
  });

  minusButton.addEventListener('click', () => {
    let currentValue = parseInt(quantityInput.value, 10);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
      if (quantityInput2) {
        quantityInput2.value = currentValue - 1;
      }
    }
  });
}

// Sahifa to'liq yuklanganidan so'ng mahsulot sahifasini yuklaymiz
window.onload = function() {
  loadProductPage();
};


const phoneInput = document.getElementById('phone');

phoneInput.addEventListener('input', function (e) {
    let input = e.target.value.replace(/\D/g, ''); // Faqat raqamlarni oladi

    // Avtomatik +998 ni qo'shish
    if (!input.startsWith("998")) {
        input = "998" + input;
    }

    // Formatlash qismi: +998 XX-XXX-XX-XX
    let formattedInput = `+${input.slice(0, 3)}`;
    if (input.length > 3) {
        formattedInput += ` ${input.slice(3, 5)}`;
    }
    if (input.length > 5) {
        formattedInput += `-${input.slice(5, 8)}`;
    }
    if (input.length > 8) {
        formattedInput += `-${input.slice(8, 10)}`;
    }
    if (input.length > 10) {
        formattedInput += `-${input.slice(10, 12)}`;
    }

    e.target.value = formattedInput;
});

phoneInput.addEventListener('keydown', function (e) {
    // 998 qismidan pastni o'chirib bo'lmaydi
    if (e.key === 'Backspace' && phoneInput.value.replace(/\D/g, '').length <= 3) {
        e.preventDefault();
    }
});
