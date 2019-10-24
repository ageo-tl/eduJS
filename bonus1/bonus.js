"use strict";
/*
Задача №1
Написать программу, которая последовательно запрашивает два числа, после чего
сравнивает их и выводит сообщение:
«Первое число больше второго», «Второе число больше первого» или «Числа равны».
Необходимо учесть ситуации, когда пользователь ввел строку или вообще не ввел
ничего.
*/
const twoNumbers = function() {

  const numbers = [];
  const msgs = ["первое", "второе"];

  for (let i = 0; i < 2; i++) {
    let num;

    do {
      num = prompt(`Введите ${msgs[i]} число: `);
      if (num === null) { break; }
    } while (isNaN(num) || num.trim().length === 0);

    if (num === null) {
      console.log("Прервано пользователем");
      throw "stop";
    } else {
      numbers.push(+num);
    }
  }

  alert(numbers[0] === numbers[1]
          ? "Числа равны"
          : numbers[0] > numbers[1]
            ? "Первое число больше второго"
            : "Второе число больше первого"
        );

};
twoNumbers();
