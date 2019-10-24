"use strict";
/*
Задача №2
Написать программу, которая спрашивает у пользователя начальный год и конечный,
после выводит в консоль високосные годы.
Алгоритм определения високосного года следует найти в интернете самостоятельно.
Если пользователь ввел первый год больше второго, то тот, который меньше,
принять за начало отчета, а который больше за конечную точку.
*/
const leapYears = function() {

  const years = [];
  const msgs = ["начальный", "конечный"];

  for (let i = 0; i < 2; i++) {
    let num;

    do {
      num = prompt(`Введите ${msgs[i]} год периода: `);
      if (num === null) { break; }
    } while (isNaN(num) || num.trim().length === 0);

    if (num === null) {
      console.log("Прервано пользователем");
      throw "stop";
    } else {
      years.push(+num);
    }
  }

  // Меняем даты местами, если меньшая оказалась последней
  if (years[0] > years[1]) {
    years.reverse();
  }

  // Функция возвращает булево значение, если переданное значение - високосный год
  const isLeapYear = function(year) {
    return year % 4 === 0 && !(year % 100 === 0 && year % 400 !== 0);
  };

  // Генерируем список всех годов в указанном пользователе интервале
  let periodsOfYears = [];
  for (let i = years[0]; i <= years[1]; i++) { periodsOfYears.push(i); }

  // Фильтруем года по признаку високосности
  const leapArr = periodsOfYears.filter( year => isLeapYear(year));
  console.log(`В интервале от ${years[0]} до ${years[1]} года високосными являются: `, leapArr);
  // console.table(leapArr);

};
leapYears();
