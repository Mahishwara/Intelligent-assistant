//theme.js

// Dark and light theme toggler
const themeToggler = document.querySelector(".theme-toggler");
const toggleDark = document.querySelector("#toggle-dark");
const toggleLight = document.querySelector("#toggle-light");

const ThemeToggler = {
  // Установка темной темы
  Dark() {
    localStorage.setItem("theme", JSON.stringify("dark"));
    document.body.classList.add("dark-theme-variables");
    toggleDark.classList.add("active");
    toggleLight.classList.remove("active");
  },

  // Установка светлой темы
  Light() {
    localStorage.setItem("theme", JSON.stringify("light"));
    document.body.classList.remove("dark-theme-variables");
    toggleLight.classList.add("active");
    toggleDark.classList.remove("active");
  },

  // Инициализация темы при загрузке страницы
  Init() {
    if (JSON.parse(localStorage.getItem("theme")) == "dark") {
      document.body.classList.add("dark-theme-variables");
      toggleDark.classList.add("active");
      toggleLight.classList.remove("active");
    }
    if (JSON.parse(localStorage.getItem("theme")) == "light") {
      document.body.classList.remove("dark-theme-variables");
      toggleLight.classList.add("active");
      toggleDark.classList.remove("active");
    }
  },
};

// Инициализация темы при загрузке страницы
ThemeToggler.Init();