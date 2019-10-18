"use strict";

let money = 123,
    income = "завод",
    addExpenses = "водяра, дефки, патефон",
    deposit = false,
    mission = 456.78,
    period = 2;

// alert("Любой текст");

// console.log("Тоже любой, но уже другой текст");



// - Вывести в консоль тип данных значений переменных money, income, deposit;
console.log("Типы данных значений переменных:");
console.log('typeof money;: ', typeof money);
console.log('typeof income: ', typeof income);
console.log('typeof deposit: ', typeof deposit);
console.log();

// - Вывести в консоль длину строки income
console.log("Длина строки:");
console.log('income.length: ', income.length);
console.log();

// - Вывести в консоль “Период (period) месяцев” и “Цель заработать (mission) рублей/долларов/гривен/юани”
console.log("Вывести в консоль:");
console.log(`Период ${period} месяцев`);
console.log(`Цель заработать ${mission} рублей/долларов/гривен/юани`);
console.log();

// - Привести строку addExpenses к нижнему регистру и разбить строку на массив, вывести массив в консоль
console.log("Строка addExpenses в виде массива строк в нижнем регистре:");
console.log('addExpenses.toLowerCase().split(", "): ', addExpenses.toLowerCase().split(", "));
console.log();

/* - Объявить переменную budgetDay и присвоить дневной бюджет (доход за месяц / 30),
вывести в консоль результат и остаток от деления */
const budgetDay = 100/30;
console.log("Значение переменной budgetDay и остаток от деления чисел, из которых она была получена:");
console.log('budgetDay: ', budgetDay);
console.log('Остаток от деления 100 / 30: ', 100 % 30);
