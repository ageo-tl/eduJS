"use strict";

// // Создать переменную num со значением 266219
// const num = 266219;

// // Вывести в консоль произведение (умножение) цифр этого числа
// console.log(`Произведение цифр числа ${num}:`);
// const num2 = num.toString().split("").reduce( (a, b) => +a * +b);
// console.log('num.toString().split("").reduce( (a, b) => +a * +b): ', num2);



// /* Вывести на экран первые 2 цифры от результат возведения в степень
// (с использованием только одного оператора) предыдущего числа */
// let msg = "";
// msg += `Первые две цифры результата возведения предыдущего числа (${num2}) в степень 3: `;
// // Ну это же галимые читы из ES7...
// msg += (num2 ** 3).toString().slice(0, 2);
// alert(msg);

// document.body.innerHTML = "На всякий случай...<br><h2>" + msg + "</h2>";




// Переменная lang может принимать 2 значения: 'ru' 'en'.
/* Написать условия при котором в зависимости от значения lang будут выводится
дни недели на русском или английском языке. */
// Решите задачу
//     через if,
//     через switch-case
//     через многомерный массив без ифов и switch.


const ruweek = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"];
const enweek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

let lang = confirm("Значение переменной 'lang'. Нажмите 'Да/ОК', если 'ru', 'Нет/Отмена', если 'en'") ? "ru" : "en";

let ifweek;
if (lang === "ru") {
  ifweek = ruweek;
} else {
  ifweek = enweek;
}

let swweek;
switch (true) {
  case (lang === "ru"):
    swweek = ruweek;
  case (lang === "en"):
    swweek = enweek;
}

let arr = {
  "ru" : ruweek,
  "en" : enweek,
};
let arweek = arr[lang];

document.body.innerHTML = `
    <h1>IF</h1>
    <h2>${ifweek}</h2>
    <hr>
    <h1>SWITCH</h1>
    <h2>${swweek}</h2>
    <hr>
    <h1>ARRAY</h1>
    <h2>${arweek}</h2>
  `;



/* У нас есть переменная namePerson. Если значение этой переменной “Артем” то вывести в консоль “директор”,
если значение “Максим” то вывести в консоль “преподаватель”, с любым другим значением вывести в консоль “студент” */
// Решить задачу с помощью нескольких тернарных операторов, без использования if или switch

let namePerson = prompt("Введите имя:");
namePerson = namePerson.toLowerCase();
const msg =
  (namePerson === "артем" || namePerson === "артём")
    ? "директор"
    : namePerson === "максим"
      ? "преподаватель"
      : "студент";
console.log(msg);
