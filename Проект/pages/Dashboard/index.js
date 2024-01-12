//index.js

//Local Storage
const Storage = {
  // Получение данных из локального хранилища
  get() {
    return JSON.parse(localStorage.getItem("dev.finances:transaction")) || [];
  },
  // Установка данных в локальное хранилище
  set(transactions) {
    localStorage.setItem(
      "dev.finances:transaction",
      JSON.stringify(transactions)
    );
  },
};

// Объект для работы с транзакциями
const Transaction = {
  all: Storage.get(),

  // Добавление новой транзакции
  add(transaction) {
    //add transaction
    Transaction.all.push(transaction);
    App.reload();
  },

  // Удаление транзакции по индексу
  remove(index) {
    Transaction.all.reverse().splice(index, 1);
    App.reload();
  },

  // Вычисление общего дохода
  incomes() {
    // total incomes
    let income = 0;

    Transaction.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });
    return income;
  },

  // Вычисление общих расходов
  expenses() {
    // total expenses
    let expense = 0;

    Transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    });
    return expense;
  },

  // Вычисление общего баланса
  total() {
    //total incomes + expenses
    return Transaction.incomes() + Transaction.expenses();
  },
};

// Объект для работы с DOM-элементами
const DOM = {
  transactionsContainer: document.querySelector("#data-table tbody"),

  // Добавление транзакции в таблицу
  addTransaction(transaction, index) {
    const tr = document.createElement("tr");
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index);
    tr.dataset.index = index;

    // adding transaction on html using the "DOM.innerHTMLTransaction" function
    DOM.transactionsContainer.appendChild(tr);
  },

  // Генерация HTML-кода для отдельной транзакции
  innerHTMLTransaction(transaction, index) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense";

    const amount = Utils.formatCurrency(transaction.amount);
    var sellscore = document.getElementById("score").value
    const html = `
      <td class="description">${transaction.description}</td>
      <td class="score">${sellscore}</td>
      <td class="${CSSclass}">${amount}</td>
      <td class="date">${transaction.date}</td>
      <td>
          <img onclick="Transaction.remove(${index})" src="./assets/x-circle.svg" class="remove-transaction" alt="Remover transação">
      </td>
      `;
    return html;
  },

  //update balance cards (incomes, expenses and total)
  // Обновление карточек баланса (доходы, расходы и общий баланс)
  updateBalance() {
    document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(
      Transaction.incomes()
    );

    document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(
      Transaction.expenses()
    );

    document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(
      Transaction.total()
    );
  },

  clearTransactions() {
    //clear transactions before update
    // Очистка таблицы транзакций перед обновлением
    DOM.transactionsContainer.innerHTML = "";
  },
};

// Утилиты для форматирования данных
const Utils = {
  //formatting Form values
  // Форматирование суммы транзакции
  formatAmount(value) {
    value = Number(value) * 100;

    //check if user add a - (minus sign) instead select "Income" and "Expense" Buttons
    if (value < 0) {
      value = -value;
    }
    if (Form.incomeOrExpense === "income") {
      value = value;
    } else {
      value = -value;
    }

    return value;
  },

  // Форматирование даты
  formatDate(date) {
    //date to user locale date
    date = date.toLocaleString();
    date = date.replaceAll("-", "/");
    return date;
  },

  // Форматирование суммы в локальную валюту
  formatCurrency(value) {
    //formatting value to user local currency
    value = Number(value) / 100;
    value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return value;
  },
};

// Объект для работы с формой добавления транзакций
const Form = {
  description: document.querySelector("input#description"),
  amount: document.querySelector("input#amount"),
  date: document.querySelector("input#date"),
  incomeOrExpense: "",

  // Установка типа дохода
  setIncome() {
    Form.incomeOrExpense = "income";
    document.querySelector("#incomeButton").classList.add("income");
    document.querySelector("#expenseButton").classList.remove("expense");
  },

  // Установка типа расхода
  setExpense() {
    Form.incomeOrExpense = "expense";
    document.querySelector("#expenseButton").classList.add("expense");
    document.querySelector("#incomeButton").classList.remove("income");
  },

  // Получение значений из формы
  getValues() {
    //get input (modal) values
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value,
      incomeOrExpense: Form.incomeOrExpense,
    };
  },

  // Валидация полей формы
  validateField() {
    const { description, score, amount, date, incomeOrExpense } = Form.getValues();

    if (
      description.trim() === "" ||
      amount.trim() === "" ||
      date.trim() === "" ||
      incomeOrExpense === ""
    ) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Por favor, preencha todos os campos!",
      });
      throw new Error("Por favor, preencha todos os campos");
    }
  },

  // Форматирование значений формы перед добавлением транзакции
  formatValues() {
    let { description, score, amount, date, value } = Form.getValues();

    amount = Utils.formatAmount(amount);
    date = Utils.formatDate(date);

    return {
      description,
      score,
      amount,
      date,
    };
  },

  // Очистка полей формы после добавления транзакции
  clearFields() {
    Form.description.value = "";
    Form.amount.value = "";
    Form.score.text = "Не выбран счет"
    Form.date.value = "";
    Form.value = "";
  },

  // Обработка события отправки формы
  submit(event) {
    event.preventDefault();

    try {
      // Проверка полей перед отправкой
      Form.validateField();
      const transaction = Form.formatValues();
      // Сохранение транзакции
      Transaction.add(transaction);
      // Очистка полей формы
      Form.clearFields();
      // Закрытие модального окна
      Modal.close();
    } catch (error) {
      console.log(error.message);
    }
  },
};

// ChartJS - doughnut chart - chart config
// Объект для работы с графиком Doughnut Chart
var ctx = document.getElementById("myChart");
var myDonutChart;



const AddChart = {
  // Уничтожение существующего графика
  Destroy() {
    if (myDonutChart) {
      myDonutChart.destroy();
    }
    this.update();
  },

  // Получение данных для графика
  getData() {
    let data;
    if (
      Transaction.incomes().toString() !== "0" ||
      Transaction.expenses().toString() !== "0"
    ) {
      data = {
        datasets: [
          {
            data: [Transaction.incomes() / 100, Transaction.expenses() / 100],
            backgroundColor: ["#28D39A", "#ff7782", "#7380EC"],
            usePointStyle: true,
          },
        ],
        labels: ["Доходы", "Расходы"],
      };
    } else {
      data = {
        datasets: [
          {
            data: [100],
            backgroundColor: ["#bbb"],
            usePointStyle: true,
          },
        ],
        labels: ["No Transactions"],
      };
    }
    return data;
  },

  // Получение опций для графика
  getOptions() {
    let options;
    if (
      Transaction.incomes().toString() === "0" &&
      Transaction.expenses().toString() === "0"
    ) {
      var style = getComputedStyle(document.body);
      const darkThemeTextColor = style.getPropertyValue("--color-info-dark");

      options = {
        tooltips: { enabled: false },
        hover: { mode: null },
        legend: {
          position: "bottom",
          usePointStyle: true,
          labels: {
            fontSize: 16,
            fontFamily: "Poppins, sans-serif",
            fontStyle: "500",
            fontColor: darkThemeTextColor,
            usePointStyle: true,
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      };
    } else {
      var style = getComputedStyle(document.body);
      const darkThemeTextColor = style.getPropertyValue("--color-info-dark");

      options = {
        legend: {
          position: "bottom",
          usePointStyle: true,
          labels: {
            fontSize: 16,
            fontFamily: "Poppins, sans-serif",
            fontStyle: "500",
            fontColor: darkThemeTextColor,
            usePointStyle: true,
          },
          onHover: function (event, legendItem) {
            // There is only a legendItem when your mouse is positioned over one
            // Курсор только при наведении на элемент легенды
            if (legendItem) {
              event.target.style.cursor = "pointer";
            }
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      };
    }

    return options;
  },

  // Обновление графика
  update() {
    let options = this.getOptions();
    let data = this.getData();

    myDonutChart = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: options,
    });
  },
};

// Объект приложения
const App = {
  // Инициализация приложения
  init() {
    Transaction.all.reverse().forEach(DOM.addTransaction);
    DOM.updateBalance();
    Storage.set(Transaction.all.reverse());
  },

  // Перезагрузка приложения
  reload() {
    myDonutChart.destroy();
    DOM.clearTransactions();
    AddChart.update();
    App.init();
  },
};

// Инициализация приложения и графика
App.init();
AddChart.update();
