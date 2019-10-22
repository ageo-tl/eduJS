"use strict";


/* Создайте функцию, которая принимает 1 аргумент (название произвольное)
   — Если как аргумент передана не строка - функция оповещает
   об этом пользователя
   — В полученной (как аргумент) строке функция должна убрать
   все пробелы в начале и в конце
   — Если строка более 30 знаков - то после 30го символа часть текста
   скрывается и вместо них появляются три точки (...)
*/

let myFunc = function(arg) {
  if (typeof arg !== "string") {
    alert(`В функцию передана не строка: ${typeof arg}, ${arg} `);
    return;
  }
  let res = arg.trim();
  if (res.length > 30) {
    res = res.slice(0, 29) + "...";
  }
  return res;
};

console.log('myFunc("Короткая строка"): ', myFunc("Короткая строка"));
console.log('myFunc("Очень длинная строка, которая больше 30 символов"): ', myFunc("Очень длинная строка, которая больше 30 символов"));
console.log('myFunc(123): ', myFunc(123));
