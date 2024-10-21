document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.about-img, .about-img2');

    function handleScrollAnimation() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1; // Ekran pastki qismiga yaqinlashganda animatsiya boshlanadi

            if (elementPosition < screenPosition) {
                element.classList.add('show'); // Element ko'rinishi uchun 'show' klassini qo'shadi
            } else {
                element.classList.remove('show'); // Elementni yashirish uchun 'show' klassini olib tashlaydi
            }
        });
    }

    // Skroll va sahifa yuklanganda animatsiyani boshqarish
    window.addEventListener('scroll', handleScrollAnimation);
    window.addEventListener('load', handleScrollAnimation);
});

document.addEventListener('DOMContentLoaded', function() {
    const elWrapperProducts = document.querySelector('.list__block');
    
    // Mahsulotlar yuklangandan so'ng skroll bo'lganda animatsiyani qo'llash funksiyasi
    function handleScrollAnimation() {
        const productElements = document.querySelectorAll('.list__box'); // Har safar mahsulotlar yangilanadi
        
        productElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3; // Ekran pastki qismiga yaqinlashganda animatsiya boshlanadi
            
            if (elementPosition < screenPosition) {
                element.classList.add('show'); // 'show' klassini qo'shadi
            } else {
                element.classList.remove('show'); // 'show' klassini olib tashlaydi
            }
        });
    }

    // Skroll va sahifa yuklanganda mahsulotlarni animatsiya bilan chiqarish
    window.addEventListener('scroll', handleScrollAnimation);
    window.addEventListener('load', handleScrollAnimation);

    // Mahsulotlar yuklangandan so'ng skroll animatsiyasini chaqiramiz
    function onProductsLoaded() {
        handleScrollAnimation(); // Mahsulotlar yuklanganidan keyin animatsiyani qo'llash
    }

    // MockAPI'dan mahsulotlarni yuklash funksiyasi
    function fetchProducts() {
        fetch('https://66eabcde55ad32cda47a3262.mockapi.io/api/v1/products')
            .then(response => response.json())
            .then(data => {
                elWrapperProducts.innerHTML = ''; // Avvalgi mahsulotlarni tozalash
                data.forEach(product => {
                    const template = document.querySelector('#template').content.cloneNode(true);
                    const elImg = template.querySelector('.list__content_img');
                    elImg.src = product.imageSrc;

                    const elTitle = template.querySelector('.content__list_title');
                    elTitle.textContent = product.title;

                    const elPriceOld = template.querySelector('.price__old');
                    elPriceOld.textContent = product.oldPrice;

                    const elPriceNew = template.querySelector('.price__new');
                    elPriceNew.textContent = product.newPrice;

                    elWrapperProducts.appendChild(template);
                });

                // Mahsulotlar yuklangandan so'ng animatsiyani qo'llash
                onProductsLoaded();
            })
            .catch(error => console.error('Xatolik yuz berdi:', error));
    }

    // Sahifa yuklanayotganda mahsulotlarni olish
    fetchProducts();
});

function toggleMenu() {
    const sideMenu = document.getElementById('side-menu');
    sideMenu.classList.toggle('active');
}




  
  