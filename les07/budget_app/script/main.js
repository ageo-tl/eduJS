// Получить кнопку "Рассчитать" через id
const btnStartCalc = document.getElementById("start");
console.log('btnStartCalc: ', btnStartCalc);

// Получить кнопки “+” (плюс) через Tag, каждую в своей переменной.
// const btnPlus = document.querySelectorAll("button.btn_plus");
const btnPlus1 = document.getElementsByTagName("button")[0];
const btnPlus2 = document.getElementsByTagName("button")[1];
console.log('btnPlus1: ', btnPlus1);
console.log('btnPlus2: ', btnPlus2);

// получить чекбокс по id через querySelector
const chkDeposit = document.querySelector("#deposit-check");
console.log('chkDeposit: ', chkDeposit);

// Получить поля для ввода возможных доходов (additional_income-item)
// при помощи querySelectorAll
const inputAddIncome = document.querySelectorAll(".additional_income-item");
console.log('inputAddIncome: ', inputAddIncome);

// Получить все блоки в правой части программы через классы
// (которые имеют класс название-value, начиная с class="budget_day-value" и
// заканчивая class="target_month-value">)
const divBudgetMonth = document.querySelector(".budget_month-value").parentNode;
console.log('divBudgetMonth: ', divBudgetMonth);
const divBudgetDay = document.querySelector(".budget_day-value").parentNode;
console.log('divBudgetDay: ', divBudgetDay);
const divExpensesMonth = document.querySelector(".expenses_month-value").parentNode;
console.log('divExpensesMonth: ', divExpensesMonth);
const divAddIncome = document.querySelector(".additional_income-value").parentNode;
console.log('divAddIncome: ', divAddIncome);
const divAddExpenses = document.querySelector(".additional_expenses-value").parentNode;
console.log('divAddExpenses: ', divAddExpenses);
const divIncomePeriod = document.querySelector(".income_period-value").parentNode;
console.log('divIncomePeriod: ', divIncomePeriod);
const divTargetMonth = document.querySelector(".target_month-value").parentNode;
console.log('divTargetMonth: ', divTargetMonth);

// Получить оставшиеся поля через querySelector каждый в отдельную переменную
// (Инпуты с левой стороны не забудьте про range)
const inputSalaryAmount = document.querySelector("input.salary-amount");
console.log('inputSalaryAmount: ', inputSalaryAmount);
const inputIncomeTitle = document.querySelector("input.income-title");
console.log('inputIncomeTitle: ', inputIncomeTitle);
const inputIncomeAmount = document.querySelector("input.income-amount");
console.log('inputIncomeAmount: ', inputIncomeAmount);
const inputExpensesTitle = document.querySelector("input.expenses-title");
console.log('inputExpensesTitle: ', inputExpensesTitle);
const inputExpensesAmount = document.querySelector("input.expenses-amount");
console.log('inputExpensesAmount: ', inputExpensesAmount);
const inputAddExpensesItem = document.querySelector("input.additional_expenses-item");
console.log('inputAddExpensesItem: ', inputAddExpensesItem);
const inputTargetAmount = document.querySelector("input.target-amount");
console.log('inputTargetAmount: ', inputTargetAmount);
const inputPeriodSelect = document.querySelector("input.period-select");
console.log('inputPeriodSelect: ', inputPeriodSelect);
