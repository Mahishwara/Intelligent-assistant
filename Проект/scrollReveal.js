//scrollReveal.js

// Настройки анимации для сдвига влево, вправо, вверх и вниз
const slideLeft = {
  distance: "150px",
  origin: "left",
  opacity: 0,
  delay: 400,
  reset: true,
  duration: 700,
};

const slideRight = {
  distance: "150px",
  origin: "right",
  opacity: null,
  opacity: 0,
  delay: 200,
  duration: 700,
  reset: true,
};

const slideUp = {
  distance: "150px",
  origin: "bottom",
  opacity: 0,
  delay: 400,
  reset: true,
  duration: 700,
};

const slideDown = {
  distance: "150px",
  origin: "top",
  opacity: 0,
  delay: 200,
  duration: 700,
  reset: true,
};

// Анимация содержимого заголовка
//Header Content
ScrollReveal().reveal(".header-content-left", slideLeft);
ScrollReveal().reveal(".header-content-right", slideRight);

// Анимация секции предварительного просмотра приложения
//App preview Section
ScrollReveal().reveal(".app-preview-left", slideDown);
ScrollReveal().reveal(".app-preview-right", slideUp);

// Анимация секции отслеживания расходов
//Track Your Spending Section
ScrollReveal().reveal(".track-your-spending-left", slideLeft);
ScrollReveal().reveal(".track-your-spending-right", slideRight);

// Анимация секции "Свяжитесь с нами"
// Get in touch Section
ScrollReveal().reveal(".get-in-touch", slideUp);

// Анимация подвала
// Footer
ScrollReveal().reveal(".footer-container", slideLeft);
