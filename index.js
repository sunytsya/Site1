let headerEl = document.getElementById("header") // Зберігає елемент з ID "header" у змінну headerEl

// Додає обробник події "scroll" до вікна браузера
window.addEventListener("scroll", function() {
    const scrollPos = window.scrollY // Зберігає вертикальну позицію прокручування в змінну scrollPos
    if (scrollPos > 1) { // Якщо прокрутка більше 1 пікселя
        headerEl.classList.add("fixed") // Додає клас "fixed" до елемента headerEl
    } else { // Якщо прокрутка менше або дорівнює 1 пікселю
        headerEl.classList.remove("fixed") // Видаляє клас "fixed" з елемента headerEl
    }
})

let navMenu = document.querySelector("nav");
let showMenu = document.querySelector("#show-menu");
let hiddenMenu = document.querySelector("#hidden-menu");
let closeButton = document.querySelector(".close");

function checkWindowSize() {
    let windowWidth = window.innerWidth;

    if (windowWidth <= 992) {
        // Мобільний режим: приховати основне меню і показати кнопку для відкриття прихованого меню
        navMenu.style.display = "none";
        showMenu.style.display = "block";
        hiddenMenu.style.display = "block";
    } else {
        // Десктопний режим: показати основне меню і приховати кнопку
        navMenu.style.display = "flex";
        showMenu.style.display = "none";
        hiddenMenu.style.right = '-300px'; // Закрити приховане меню
    }
}

// Викликаємо функцію при завантаженні сторінки
checkWindowSize();

// Додаємо обробник події для зміни розміру вікна
window.addEventListener("resize", checkWindowSize);

// Додаємо обробник події для кнопки показу меню
showMenu.addEventListener("click", function() {
    hiddenMenu.style.right = '0';
});

// Додаємо обробник події для кнопки закриття меню
closeButton.addEventListener("click", function() {
    hiddenMenu.style.right = '-300px';
});

// Знаходимо елемент кнопки прокрутки до верху
let scrollToTopBtn = document.getElementById("scroll-to-top");

// Показуємо або приховуємо кнопку при прокрутці сторінки
window.addEventListener("scroll", function() {
    const scrollPos = window.scrollY;
    if (scrollPos > 200) { // Кнопка з'являється після 200px прокрутки
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
});

// Додаємо обробник події для кнопки прокрутки до верху
scrollToTopBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // Плавна прокрутка
    });
});


let slideIndex = 1;
showSlides(slideIndex);

function nextSlide() {
    showSlides(slideIndex += 1);
}

function previousSlide() {
    showSlides(slideIndex -= 1);  
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("item");
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
  
    for (let slide of slides) {
        slide.style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";    
}
setInterval(() => {
    nextSlide();
}, 10000);
