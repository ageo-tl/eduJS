"use strict";
/*
Задача №3
Написать программу, которая запрашивает у пользователя числа при помощи prompt,
пока он не нажмет «Отмена».
После нажатия «Отмена», программа выводит сумму введенных чисел.
Если пользователь ввел не число (а, например, строку), то это значение
не суммируется с остальными, а программа продолжает работать.
Прерывается только в случае нажатия «Отмена».
*/
const sumUserNumbers = function() {

  const numbers = [];
  let num;

  do {
    num = prompt(`Введите число: `);

    if (num === null) {
      break;
    } else if (isNaN(num) || num.trim().length === 0) {
      // do nothing
    } else {
      numbers.push(+num);
    }
  } while (true);

  const reducer = (a, b) => { return a + b; };
  const sum = numbers.reduce(reducer);

  alert(`Сумма введенных чисел равна ${sum}`);

};
sumUserNumbers();
