"use strict";

// Создать переменную num со значением 266219
const num = 266219;

// Вывести в консоль произведение (умножение) цифр этого числа
console.log(`Произведение цифр числа ${num}:`);
const num2 = num.toString().split("").reduce( (a, b) => +a * +b);
console.log('num.toString().split("").reduce( (a, b) => +a * +b): ', num2);



/* Вывести на экран первые 2 цифры от результат возведения в степень
(с использованием только одного оператора) предыдущего числа */
let msg = "";
msg += `Первые две цифры результата возведения предыдущего числа (${num2}) в степень 3: `;
// Ну это же галимые читы из ES7...
msg += (num2 ** 3).toString().slice(0, 2);
alert(msg);

document.body.innerHTML = "На всякий случай...<br><h2>" + msg + "</h2>";