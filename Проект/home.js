//home.js

// Обработчик событий для управления мобильным меню
const body = document.querySelector("body");

const Menu = {
  // Метод для открытия мобильного меню
  open() {
    document.querySelector(".mobile-menu").classList.add("active");
    body.style.overflowY = "hidden"; // Запрещаем прокрутку основного контента при открытом меню
  },

  // Метод для закрытия мобильного меню
  close() {
    document.querySelector(".mobile-menu").classList.remove("active");
    body.style.overflowY = "inherit"; // Восстанавливаем возможность прокрутки основного контента
  },
};