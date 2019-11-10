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
      inputAddExpensesItem = document.querySelector("input.additional_expenses-item"),
      inputTargetAmount = document.querySelector("input.target-amount"),
      inputPeriodSelect = document.querySelector("input.period-select"),
      divTitlePeriodAmount = document.querySelector("div.title.period-amount"),
      btnReset = document.getElementById("cancel"),
      selectDepositBank = document.querySelector(".deposit-bank"),
      inputDepositAmount = document.querySelector(".deposit-amount"),
      inputDepositPercent = document.querySelector(".deposit-percent"),
      spanCheckDeposit = document.querySelector("span.deposit-checkmark");

let expensesItems = document.querySelectorAll(".expenses-items");
let incomeItems = document.querySelectorAll(".income-items");



class AppData {

  constructor() {
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.income = {};           // Дополнительные(?) доходы
    this.addIncome = [];        // Список дополнительных доходов
    this.expenses = {};         // Дополнительные(?) расходы
    this.addExpenses = [];      // Список дополнительных расходов
    this.deposit = false;       // Наличие депозита
    this.percentDeposit = 0;    // Процент депозита
    this.moneyDeposit = 0;      // Сумма на депозите
  }


  start() {
    // Блокировка полей после нажатия кнопки "Рассчитать"
    const data = document.querySelector(".data");
    (data.querySelectorAll("input[type='text']"))
      .forEach( (elem) => {
        elem.disabled = true;
      });
    selectDepositBank.disabled = true;
    selectDepositBank.style.backgroundColor = "lightgray";
    chkDeposit.disabled = true;
    spanCheckDeposit.style.backgroundColor = "lightgray";
    btnPlus1.disabled = true;
    btnPlus1.style.backgroundColor = "lightgray";
    btnPlus2.disabled = true;
    btnPlus2.style.backgroundColor = "lightgray";

    // Скрытие кнопки "Рассчитать" и отображение "Сбросить"
    btnStartCalc.style.display = "none";
    btnReset.style.display = "block";

    // Рассчеты значений для appData
    this.budget = +inputSalaryAmount.value;
    this.getFunds('expenses');
    this.getFunds('income');
    this.getExpensesMonth();
    this.getAddFunds(inputAddExpensesItem, this.addExpenses);
    this.getAddFunds(inputAddIncomeItem, this.addIncome);
    this.getInfoDeposit();
    this.getBudget();

    // Размещение данных в полях области с результатом
    this.showResult();
  }

  reset() {
    // Удаление "лишних" строк для дополнительного дохода и
    // обязательного расхода
    expensesItems = document.querySelectorAll(".expenses-items");
    for (let i = expensesItems.length - 1; i > 0; i--) {
      expensesItems[i].remove();
    }
    incomeItems = document.querySelectorAll(".income-items");
    for (let i = incomeItems.length - 1; i > 0; i--) {
      incomeItems[i].remove();
    }
    btnPlus1.style.display = "block";
    btnPlus2.style.display = "block";

    // Разблокировка и очистка полей после нажатия кнопки "Сбросить"
    const data = document.querySelector(".data");
    (data.querySelectorAll("input[type='text']"))
      .forEach( (elem) => {
        elem.disabled = false;
        elem.value = "";
      });
    selectDepositBank.disabled = false;
    selectDepositBank.style.backgroundColor = "#ff7f63";
    selectDepositBank.style.display = "none";
    selectDepositBank.value = "0";
    inputDepositAmount.style.display = "none";
    inputDepositPercent.style.display = "none";
    chkDeposit.checked = false;
    chkDeposit.disabled = false;
    spanCheckDeposit.style.backgroundColor = "#ff7f63";
    btnPlus1.disabled = false;
    btnPlus1.style.backgroundColor = "#ff7f63";
    btnPlus2.disabled = false;
    btnPlus2.style.backgroundColor = "#ff7f63";

    // Блокировка кнопки "Рассчитать"
    this.toggleDisableStart(true);

    // Скрытие кнопки "Сбросить" и отображение "Рассчитать"
    btnStartCalc.style.display = "block";
    btnReset.style.display = "none";

    // Обнуление атрибутов appData
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    this.incomeMonth = 0;
    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;

    // Размещение данных в полях области с результатом
    this.showResult(false);
  }

  showResult(listener = true) {
    inputBudgetMonth.value = this.budgetMonth ? this.budgetMonth: "";
    inputBudgetDay.value = this.budgetDay ? Math.floor(this.budgetDay) : "";
    inputExpensesMonth.value = this.expensesMonth ? this.expensesMonth : "";
    inputAddExpenses.value = this.addExpenses.join(", ");
    inputAddIncome.value = this.addIncome.join(", ");
    inputTargetMonth.value = this.getTargetMonth();
    // Значение поля "Накопление за период" и его динамическое обновление
    inputIncomePeriod.value = this.calcSavedMoney();
    const lstnrForRange = this.listenerForRangePeriod.bind(this);
    if (listener) {
      inputPeriodSelect.addEventListener("input", lstnrForRange);
    } else {
      inputPeriodSelect.removeEventListener("input", lstnrForRange);
    }
  }

  addBlockInputs(blockItems) {
  // Добавление строки для ввода обязательных расходов или доходов
    const btnPlus = blockItems[0].parentNode.querySelector("button");
    const cloneItem = blockItems[0].cloneNode(true);
    const cloneItemInputs = cloneItem.querySelectorAll("input");
    cloneItemInputs.forEach( (elem) => {
      elem.value = "";
      this.addListenerControl(elem);
    });
    blockItems[0].parentNode.insertBefore(cloneItem, btnPlus);

    blockItems = document.querySelectorAll(`.${blockItems[0].classList.value}`);

    // Скрытие кнопки [+] при трех элементах на странице
    if (blockItems.length >= 3) {
      btnPlus.style.display = "none";
    }
  }

  getFunds(nameFund) {
  // Обязательные расходы или доходы
    const inputFunds = document.querySelectorAll(`.${nameFund}-items`);
    inputFunds.forEach( (item) => {
      const itemFund = item.querySelector(`.${nameFund}-title`).value;
      const cashFund = item.querySelector(`.${nameFund}-amount`).value;

      if (itemFund.length !== 0 && cashFund !== 0) {
        this[nameFund][itemFund] = +cashFund;
      }
    });
  }

  getAddFunds(addInputs, addFunds) {
  // Список возможных расходов или доходов
    let addFundItems = [];
    if ("value" in addInputs) {
      // Данные о расходах из одного input'а
      addFundItems = addInputs.value.split(",");
    } else {
      // Данные о доходах из нескольких input'ов
      addInputs.forEach( ({value}) => {
        addFundItems.push(value);
      });
    }
    // Заполняем соответствующее свойство объекта данными
    addFundItems.forEach( (item) => {
      if (item.trim().length !== 0) {
        addFunds.push(item.trim());
      }
    });
  }

  getExpensesMonth() {
  // Расчет расходов за месяц
    for (let exp in this.expenses) {
      this.expensesMonth += this.expenses[exp];
    }
  }

  getBudget() {
  // считает бюджеты за месяц и за день
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
    this.budgetMonth = this.budget + this.incomeMonth -
                      this.expensesMonth +
                      (this.moneyDeposit * this.percentDeposit / 12);
    this.budgetDay = this.budgetMonth / 30;
  }

  getTargetMonth() {
  // Возвращает период (количество месяцев), за который будет достигнута
  // цель по накоплению
    return this.budgetMonth
            ? Math.ceil(+inputTargetAmount.value / this.budgetMonth)
            : "";
  }

  getStatusIncome() {
  // возвращает значение уровня дохода
    switch (true) {
      case (this.budgetDay > 800):
        return "Высокий уровень дохода";
      case (this.budgetDay > 300):
        return "Средний уровень дохода";
      case (this.budgetDay > 0):
        return "Низкий уровень дохода";
      case (this.budgetDay < 0):
        return "Что-то пошло не так";
      case (this.budgetDay === 800):
      case (this.budgetDay === 300):
      case (this.budgetDay === 0):
        return "Вы попали на границы между уровнями дохода. Определитесь уже...";
    }
  }

  getInfoDeposit() {
    if (this.deposit) {
      this.percentDeposit = +inputDepositPercent.value;
      this.moneyDeposit = +inputDepositAmount.value;
    }
  }

  calcSavedMoney() {
    return this.budgetMonth
            ? this.budgetMonth * +inputPeriodSelect.value
            : "";
  }

  listenerForRangePeriod() {
    inputIncomePeriod.value = this.calcSavedMoney();
  }

  toggleDisableStart(off) {
  // Блокировка кнопки "Расчитать" при пустом поле "Месячный доход"
    if (off) {
      btnStartCalc.setAttribute('disabled', 'disabled');
      btnStartCalc.title = "Заполните поле \"Месячный доход\"";
      btnStartCalc.style.opacity = ".5";
    } else {
      btnStartCalc.removeAttribute("disabled");
      btnStartCalc.removeAttribute("title");
      btnStartCalc.style.opacity = "";
    }
  }

  // Ограничения ввода в поля только определенных символов
  numControl(event) {
  // Проверяет ввод цифр и добавляет предупреждение
    const curVal = event.target.value;
    if (curVal.match(/[^\.0-9]/g)) {
      event.target.value = curVal.replace(/[^\.0-9]/g, "");
      const oldWarn = event.target.parentNode.querySelector("div#warning");
      if (!oldWarn) {
        const warning = document.createElement("div");
        warning.setAttribute("id", "warning");
        warning.textContent = "Допустимо вводить только цифры!";
        warning.style.color = "red";
        warning.style.fontSize = "0.8rem";
        (event.target.parentNode).appendChild(warning);
      }
    }
  }

  charControl(event) {
  // Проверяет ввод букв и добавляет предупреждение
    const curVal = event.target.value;
    if (curVal.match(/[^А-Яа-яЁё ,\.-]/g)) {
      event.target.value = curVal.replace(/[^А-Яа-яЁё ,\.-]/g, "");
      const oldWarn = event.target.parentNode.querySelector("div#warning");
      if (!oldWarn) {
        const warning = document.createElement("div");
        warning.setAttribute("id", "warning");
        warning.textContent = "Допустимо вводить только буквы русского алфавита!";
        warning.style.color = "red";
        warning.style.fontSize = "0.8rem";
        (event.target.parentNode).appendChild(warning);
      }
    }
  }

  removeWarning(event) {
  // Удаление предупреждениея о допустимости использования
  // только определенных символов
    const oldWarn = event.target.parentNode.querySelector("div#warning");
    if (oldWarn) { oldWarn.remove(); }
  }

  addListenerControl(elems) {
    let it;
    if ("forEach" in elems) {
      it = elems;
    } else {
      it = [elems];
    }
    it.forEach( (item) => {
      if (item.placeholder === "Наименование") {
        item.addEventListener("input", this.charControl);
      } else if (item.placeholder === "Сумма" || item.placeholder === "Процент") {
        item.addEventListener("input", this.numControl);
      }
      item.addEventListener("blur", this.removeWarning);
    });
  }

  listenerDeposit() {
  // Листнер для работы со всеми элементам блока с депозитом
    if (chkDeposit.checked) {
      selectDepositBank.style.display = "inline-block";
      inputDepositAmount.style.display = "inline-block";
      this.deposit = true;
      selectDepositBank.addEventListener("change", function() {
        // Листнер для работы с процентами
        const selIndex = this.options[this.selectedIndex].value;
        if (selIndex === "other") {
          inputDepositPercent.style.display = "inline-block";
          inputDepositPercent.removeAttribute("disabled");
          inputDepositPercent.value = "";
        } else {
          inputDepositPercent.style.display = "none";
          inputDepositPercent.setAttribute("disabled", "disabled");
          inputDepositPercent.value = selIndex;
        }
      });
    } else {
      selectDepositBank.style.display = "none";
      inputDepositAmount.style.display = "none";
      inputDepositAmount.value = "";
      inputDepositPercent.style.display = "none";
      this.deposit = false;
    }
  }

  eventListener() {

    btnStartCalc.addEventListener("click", this.start.bind(this));
    btnReset.addEventListener("click", this.reset.bind(this));

    btnPlus2.addEventListener("click", this.addBlockInputs.bind(this, expensesItems));
    btnPlus1.addEventListener("click", this.addBlockInputs.bind(this, incomeItems));

    // Изменение подписи под ползунком
    inputPeriodSelect.addEventListener("input", (event) => {
      divTitlePeriodAmount.textContent = event.target.value;
    });

    // Активация/Деактивация кнопки "Рассчитать"
    const bindToggleDisableStart = this.toggleDisableStart.bind(this);
    this.toggleDisableStart(true);
    inputSalaryAmount.addEventListener('change', (event) => {
      bindToggleDisableStart(event.target.value.trim().length === 0);
    });

    // Листнеры на поля ввода типа "текст"
    this.addListenerControl(document.querySelectorAll("input[type='text']"));

    chkDeposit.addEventListener("change", this.listenerDeposit.bind(this));
  }

}


// Создание объекта и запуск метода для навешивания слушателей
const appData = new AppData();
appData.eventListener();
