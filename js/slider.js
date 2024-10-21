import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

let swiper; // Dastlab null bo'lib tursin

// Swiperni yaratish funksiyasi
function initSwiper(effect) {
    swiper = new Swiper(".swiper", {
        loop: true,
        effect: effect, // Effektni dinamik belgilash
        slidesPerView: 1,
        spaceBetween: 5,

        breakpoints: {
            320: {
                slidesPerView: 1, // Mobil ekran uchun 1 ta slayd
                spaceBetween: 0, // Slaydlar orasida 10px bo'sh joy
            },
            480: {
                slidesPerView: 2, // 480px va undan katta ekranlar uchun 2 ta slayd
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 3, // 768px va undan katta ekranlar uchun 3 ta slayd
                spaceBetween: 15,
            },
        },

        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        autoplay: {
            delay: 1700, // Slide o'tish vaqti (millisekundlarda)
            disableOnInteraction: false, // Interaktsiya qilganda autoplay to‘xtamasligi uchun
          },
          loop: true, // Cheksiz aylanish
          speed: 1000, // Silliq o'tish tezligi (1000ms = 1 soniya)
    });
}

// Swiperni o'chirish va qayta ishga tushirish
function updateSwiperEffect() {
    if (swiper) {
        swiper.destroy(true, true); // Swiper instance ni o'chiradi
    }
    
    const effect = window.innerWidth <= 768 ? 'cube' : 'slide'; // Ekran o'lchamiga qarab effekt tanlash
    initSwiper(effect); // Yangi parametrlar bilan qayta yaratadi
}

// Dastlab hodisani ishga tushirish
updateSwiperEffect();

// Har gal ekran o'lchami o'zgarganda ishga tushadi
window.addEventListener('resize', updateSwiperEffect);

// API dan mahsulotlarni olish va slayderga qo'shish
fetch("https://66eabcde55ad32cda47a3262.mockapi.io/api/v1/products")
    .then(response => response.json())
    .then(products => {
        const elWrapperProducts = document.querySelector(".swiper-wrapper");

        // Sarlavhani qisqartirish funksiyasi
        function shortenTitle(title) {
            return title.length > 30 ? title.slice(0, 50) + '...' : title;
        }

        // Har bir mahsulotni slayderga joylash
        products.forEach(product => {
            const slide = document.createElement('div');
            slide.classList.add('swiper-slide');
            
            slide.innerHTML = `
            <img class="list__content_img_slide" src="${product.imageSrc}" alt="${product.title}"/>
            <div class="project-overlay">
              <p class="slider__product_title">${shortenTitle(product.title)}</p> <!-- Qisqartirilgan sarlavha -->
            </div>
            `;
           
            elWrapperProducts.appendChild(slide);
        });

        // Swiper ni yangilash
        swiper.update();
    })
    .catch(error => console.error("Xato:", error));
