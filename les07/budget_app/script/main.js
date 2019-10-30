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
      inputIncomeTitle = document.querySelector("input.income-title"),
      inputIncomeAmount = document.querySelector("input.income-amount"),
      inputExpensesTitle = document.querySelector("input.expenses-title"),
      inputExpensesAmount = document.querySelector("input.expenses-amount"),
      inputAddExpensesItem = document.querySelector("input.additional_expenses-item"),
      inputTargetAmount = document.querySelector("input.target-amount"),
      inputPeriodSelect = document.querySelector("input.period-select");



console.log('btnStartCalc: ', btnStartCalc);
console.log('btnPlus1: ', btnPlus1);
console.log('btnPlus2: ', btnPlus2);
console.log('chkDeposit: ', chkDeposit);
console.log('inputAddIncomeItem: ', inputAddIncomeItem);
console.log('inputBudgetMonth: ', inputBudgetMonth);
console.log('inputBudgetDay: ', inputBudgetDay);
console.log('inputExpensesMonth: ', inputExpensesMonth);
console.log('inputAddIncome: ', inputAddIncome);
console.log('inputAddExpenses: ', inputAddExpenses);
console.log('inputIncomePeriod: ', inputIncomePeriod);
console.log('inputTargetMonth: ', inputTargetMonth);
console.log('inputSalaryAmount: ', inputSalaryAmount);
console.log('inputIncomeTitle: ', inputIncomeTitle);
console.log('inputIncomeAmount: ', inputIncomeAmount);
console.log('inputExpensesTitle: ', inputExpensesTitle);
console.log('inputExpensesAmount: ', inputExpensesAmount);
console.log('inputAddExpensesItem: ', inputAddExpensesItem);
console.log('inputTargetAmount: ', inputTargetAmount);
console.log('inputPeriodSelect: ', inputPeriodSelect);
