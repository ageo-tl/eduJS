"use strict";


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
