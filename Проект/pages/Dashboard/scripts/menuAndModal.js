// Управление мобильным меню

const MobileMenu = {
  // Открытие мобильного меню
  open() {
    document.querySelector("aside").classList.add("active");
  },

  // Закрытие мобильного меню
  close() {
    document.querySelector("aside").classList.remove("active");
  },
};

// Управление модальным окном
const Modal = {
  // Открытие модального окна
  open() {
    document.getElementById("modalOverlay").classList.add("active");
  },

  // Закрытие модального окна
  close() {
    document.getElementById("modalOverlay").classList.remove("active");
    Form.clearFields();
  },
};

// Отображение текущей даты (Ноябрь, 24)
let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0"); // Январь - 0!
let yyyy = today.getFullYear();
today = dd + "/" + mm + "/" + yyyy;

let myDate;
// Форматирование даты в строке
function formatDate(str) {
  var parts = str.split("/").map(Number);
  myDate = new Date("20" + parts[2], parts[1] - 1, parts[0]);
  return myDate.toLocaleString([], { month: "long" });
}
myDate = today;
const dateDisplay = formatDate(myDate.toString()) + ", " + dd;

// Функция для заглавной буквы
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Вставка отформатированной даты на страницу
document.getElementById("date-display").innerHTML =
  capitalizeFirstLetter(dateDisplay);
