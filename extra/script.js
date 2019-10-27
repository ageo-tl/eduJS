"use strict";

// Создать массив week и записать в него дни недели в виде строк
// - Вывести на экран все дни недели
// - Каждый из них с новой строчки
// - Выходные дни - курсивом
// - Текущий день - жирным шрифтом(использовать объект даты)

let week = ["понедельник", "вторник", "среда", "четверг", "пятница", "суббота", "воскресенье"];


let now = new Date();
let getDayOfWeek = function(date) {
  if (date.getDay() === 0) {
    return 6;
  } else {
    return date.getDay() - 1;
  }
};
let dayOfWeek = getDayOfWeek(now);


let div = document.createElement("div");

let head = document.createElement("h1");
head.innerText = "Дни недели:";
div.appendChild(head);

let dayElem;
for (let i in week) {
  dayElem = document.createElement("p");
  dayElem.innerText = week[i];
  dayElem.style.marginLeft = "20px";
  if (+i > 4) {
    dayElem.style.fontStyle = "italic";
  }
  if (+i === dayOfWeek) {
    dayElem.style.fontWeight = "bold";
  }
  div.appendChild(dayElem);
}

document.body.appendChild(div);
