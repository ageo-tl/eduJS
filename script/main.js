"use strict";

// Получить кнопку "Рассчитать" через id
const btnStartCalc = document.getElementById("start"),
      // Получить кнопки “+” (плюс) через Tag, каждую в своей переменной.
      btnPlus1 = document.getElementsByTagName("button")[0],
      btnPlus2 = document.getElementsByTagName("button")[1],
      // получить чекбокс по id через querySelector
      chkDeposit = document.querySelector("#deposit-check"),
      // Получить поля для ввода возможных доходов (additional_income-item)
      // при помощи querySelectorAll
      inputAddIncomeItem = document.querySelectorAll(".additional_income-item"),
      // Получить все блоки в правой части программы через классы
      // (которые имеют класс название-value, начиная с class="budget_day-value" и
      // заканчивая class="target_month-value">)
      inputBudgetMonth = document.querySelector(".budget_month-value"),
      inputBudgetDay = document.querySelector(".budget_day-value"),
      inputExpensesMonth = document.querySelector(".expenses_month-value"),
      inputAddIncome = document.querySelector(".additional_income-value"),
      inputAddExpenses = document.querySelector(".additional_expenses-value"),
      inputIncomePeriod = document.querySelector(".income_period-value"),
      inputTargetMonth = document.querySelector(".target_month-value"),
      // Получить оставшиеся поля через querySelector каждый в отдельную переменную
      // (Инпуты с левой стороны не забудьте про range)
      inputSalaryAmount = document.querySelector("input.salary-amount"),
      inputExpensesTitle = document.querySelector("input.expenses-title"),
      inputAddExpensesItem = document.querySelector("input.additional_expenses-item"),
      inputTargetAmount = document.querySelector("input.target-amount"),
      inputPeriodSelect = document.querySelector("input.period-select"),
      divTitlePeriodAmount = document.querySelector("div.title.period-amount"),
      btnReset = document.getElementById("cancel");

let expensesItems = document.querySelectorAll(".expenses-items");
let incomeItems = document.querySelectorAll(".income-items");



const USERFRIENDLY = true;


const appData = {
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  incomeMonth: 0,
  income: {},           // Дополнительные(?) доходы
  addIncome: [],        // Список дополнительных доходов
  expenses: {},         // Дополнительные(?) расходы
  addExpenses: [],      // Список дополнительных расходов
  deposit: false,       // Наличие депозита
  percentDeposit: 0,    // Процент депозита
  moneyDeposit: 0,      // Сумма на депозите
  start: function() {

    // Блокировка полей после нажатия кнопки "Рассчитать"
    const data = document.querySelector(".data");
    (data.querySelectorAll("input[type='text']")).forEach(function(elem) {
      elem.disabled = true;
    });

    // Скрытие кнопки "Рассчитать" и отображение "Сбросить"
    btnStartCalc.style.display = "none";
    btnReset.style.display = "block";

    // Рассчеты значений для appData
    appData.budget = +inputSalaryAmount.value;
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();

    // Размещение данных в полях области с результатом
    appData.showResult();

  },
  showResult: function() {
    inputBudgetMonth.value = appData.budgetMonth;
    inputBudgetDay.value = Math.floor(appData.budgetDay);
    inputExpensesMonth.value =appData.expensesMonth;
    inputAddExpenses.value = appData.addExpenses.join(", ");
    inputAddIncome.value = appData.addIncome.join(", ");
    inputTargetMonth.value = appData.getTargetMonth();
    // Значение поля "Накопление за период" и его динамическое обновление
    inputIncomePeriod.value = appData.calcSavedMoney();
    inputPeriodSelect.addEventListener("input", function() {
      inputIncomePeriod.value = appData.calcSavedMoney();
    });
  },
  addExpensesBlock: function() {
  // Добавление строки для ввода обязательных расходов
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlus2);

    expensesItems = document.querySelectorAll(".expenses-items");

    // Скрытие кнопки [+] при трех элементах на странице
    if (expensesItems.length >= 3) {
      btnPlus2.style.display = "none";
    }
  },
  addIncomeBlock: function() {
    // Добавление строки для ввода дополнительных доходов
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlus1);

      incomeItems = document.querySelectorAll(".income-items");

      // Скрытие кнопки [+] при трех элементах на странице
      if (incomeItems.length >= 3) {
        btnPlus1.style.display = "none";
      }
    },
  getExpenses: function() {
    // Обязательные расходы
    expensesItems.forEach(function(item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;

      if (itemExpenses.length !== 0 && cashExpenses !== 0) {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getIncome: function() {
    // Дополнительные доходы
    incomeItems.forEach(function(item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome.length !== 0 && cashIncome !== 0) {
        appData.income[itemIncome] = +cashIncome;
      }
    });

    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function() {
    // Список возможных расходов
    let addExpenses = inputAddExpensesItem.value.split(",");

    addExpenses.forEach(function(item) {
      item = item.trim();
      if (item.length !== 0) {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function() {
    // Список возможных доходов
    inputAddIncomeItem.forEach(function(item) {
      let itemVal = item.value.trim();
      if (itemVal.length !== 0) {
        appData.addIncome.push(itemVal);
      }
    });
  },
  getExpensesMonth: function() {
    // Расчет расходов за месяц
    for (let exp in appData.expenses) {
      appData.expensesMonth += appData.expenses[exp];
    }
  },
  getBudget: function() {
    // считает бюджеты за месяц и за день
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: function() {
    // Возвращает период (количество месяцев), за который будет достигнута
    // цель по накоплению
    return Math.ceil(+inputTargetAmount.value / appData.budgetMonth);
  },
  getStatusIncome: function() {
    // возвращает значение уровня дохода
    switch (true) {
      case (appData.budgetDay > 800):
        return "Высокий уровень дохода";
      case (appData.budgetDay > 300):
        return "Средний уровень дохода";
      case (appData.budgetDay > 0):
        return "Низкий уровень дохода";
      case (appData.budgetDay < 0):
        return "Что-то пошло не так";
      case (appData.budgetDay === 800):
      case (appData.budgetDay === 300):
      case (appData.budgetDay === 0):
        return "Вы попали на границы между уровнями дохода. Определитесь уже...";
    }
  },
  getInfoDeposit: function() {
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
    if (appData.deposit) {
      appData.percentDeposit = requestNumber("Какой годовой процент у депозита?", 10);
      appData.moneyDeposit = requestNumber("Какая сумма находится на депозите?", 10000);
    }
  },
  calcSavedMoney: function() {
    return appData.budgetMonth * +inputPeriodSelect.value;
  }
};

btnStartCalc.addEventListener("click", appData.start);

btnPlus2.addEventListener("click", appData.addExpensesBlock);
btnPlus1.addEventListener("click", appData.addIncomeBlock);

// Изменение подписи под ползунком
inputPeriodSelect.addEventListener("input", function(event) {
  divTitlePeriodAmount.textContent = event.target.value;
});


// Блокировка кнопки "Расчитать" при пустом поле "Месячный доход"
const toggleDisableStart = function(off) {
  if (off) {
    btnStartCalc.setAttribute('disabled', 'disabled');
    btnStartCalc.title = "Заполните поле \"Месячный доход\"";
    btnStartCalc.style.opacity = ".5";
  } else {
    btnStartCalc.removeAttribute("disabled");
    btnStartCalc.removeAttribute("title");
    btnStartCalc.style.opacity = "";
  }
};

toggleDisableStart(true);
inputSalaryAmount.addEventListener('input', function(event) {
  toggleDisableStart(event.target.value.trim().length === 0);
});



// Вспопомогательные функции
function requestNumber(q, d) {
  // запрашивает у пользователя число
  let res = 0;
  let tmp = "";
  if (d === undefined) { d = ""; }

  while (true) {
    res = prompt(q + tmp, d);
    // Проверка на число
    if (res === null){
      if (USERFRIENDLY) {
        break;
      } else {
        tmp = " Увы! Теперь так просто не отделаешься!..";
        continue;
      }
    }

    res = res.replace(",", ".");

    if (res.length === 0) {
      tmp = " Не скромничайте.";
    } else if (!(!isNaN(parseFloat(res)) && isFinite(res))) {
      tmp = " Это должно быть число!";
    } else if (res < 0) {
      tmp = confirm(`Серьезно??? Вы ввели отрицательное число: ${res}`);
      if (tmp) {
        break;
      } else {
        tmp = "";
      }
    } else {
      break;
    }
  }
  // Проверка на отмену
  if (res === null && USERFRIENDLY) {
    console.log("Действие отменено пользователем");
    throw "stop";
  }
  return +res;
}

function requestValue(q, d) {
  // запрашивает у пользователя значение (строку)
  let res = "";
  let tmp = "";
  if (d === undefined) { d = ""; }
  while (true) {
    res = prompt(q + tmp, d);

    if (res === null) {
      if (USERFRIENDLY) {
        break;
      } else {
        tmp = " Увы! Теперь так просто не отделаешься!..";
        continue;
      }
    }

    if (res.length === 0) {
      tmp = " Не оставляйте поле пустым!";
    } else if (!isNaN(parseFloat(res))) {
      tmp = " Следует ввести наименование, а не число!";
    } else {
      break;
    }
  }

  if (res === null && USERFRIENDLY) {
    console.log("Действие отменено пользователем");
    throw "stop";
  }

  res = res.split(",");
  return res.map(function(item) {
    return item.trim();
  });
}