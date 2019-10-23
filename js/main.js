"use strict";

let money = 123,
    income = "завод",
    addExpenses = "водяра, дефки, патефон",
    deposit = false,
    mission = 45678,
    period = 2;


// Функция start c циклом do while
let start = function() {
  do {
    money = prompt("Ваш месячный доход?", 50000);
  } while (isNaN(money) || money === "" || money === null);
};
start();


/* - Объявить переменную budgetDay и присвоить дневной бюджет (доход за месяц / 30),
вывести в консоль результат и остаток от деления */
let budgetDay = 100/30;


function requestNumber(q) {
  // запрашивает у пользователя число
  let res = 0;
  let tmp = "";

  while (true) {
    res = prompt(q + tmp);
    // Проверка на число
    if (res === null){
      break;
    }

    res = res.replace(",", ".");

    if (res.length === 0) {
      tmp = " Не скромничайте.";
    } else if (!(!isNaN(parseFloat(res)) && isFinite(res))) {
      tmp = " Это должно быть число!";
    } else if (res < 0) {
      tmp = confirm(`Серьезно??? Вы ввели отрицательное число: ${res}`);
      if (tmp) {
        break;
      } else {
        tmp = "";
      }
    } else {
      break;
    }
  }
  // Проверка на отмену
  if (res === null) {
    console.log("Действие отменено пользователем");
    throw "stop";
  }
  return +res;
}

function requestValue(q) {
  // запрашивает у пользователя значение (строку)
  let res = "";
  let tmp = "";
  while (true) {
    res = prompt(q + tmp);

    if (res === null) {
      break;
    }

    if (res.length === 0) {
      tmp = " Не оставляйте поле пустым!";
    } else {
      break;
    }
  }

  if (res === null) {
    console.log("Действие отменено пользователем");
    throw "stop";
  }

  res = res.split(",");
  return res.map(function(item) {
    return item.trim();
  });
}

// Спрашиваем у пользователя “Ваш месячный доход?” и результат сохраняем в переменную money
money = requestNumber("Ваш месячный доход?");

/* Спросить у пользователя “Перечислите возможные расходы за рассчитываемый период через запятую”,
сохранить в переменную addExpenses, вывести в консоль в виде массива*/
addExpenses = requestValue("Перечислите возможные расходы за рассчитываемый период через запятую.");

/* Спросить у пользователя “Есть ли у вас депозит в банке?”
и сохранить данные в переменной deposit (булевое значение true/false) */
deposit = confirm("Есть ли у вас депозит в банке?");

// Вывести в консоль типы данных money, income, deposit
let showTypeOf = function(data) {
  console.log(data, typeof data);
};
console.log("Типы данных значений переменных 'money', 'income' и 'deposit':");
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log();

// Спросить у пользователя по 2 раза каждый вопрос и записать ответы в переменные
//     “Какие обязательные ежемесячные расходы у вас есть?”
//     “Во сколько это обойдется?”
// в итоге 4 вопроса и 4 переменных
let requiredName1,
    requiredSum1,
    requiredName2,
    requiredSum2;

requiredName1 = requestValue("Какие обязательные ежемесячные расходы у вас есть?");
requiredSum1 = requestNumber("Во сколько это обойдется?");
requiredName2 = requestValue("Какие обязательные ежемесячные расходы у вас есть?");
requiredSum2 = requestNumber("Во сколько это обойдется?");

/* Вычислить доход за месяц, учитывая обязательные расходы,
сохранить в переменную budgetMonth и вывести результат в консоль*/
let budgetMonth = money - requiredSum1 - requiredSum2;

/* Поправить budgetDay учитывая бюджет на месяц, а не месячный доход.
Вывести в консоль округлив в меньшую сторону (методы объекта Math в помощь) */
budgetDay = budgetMonth / 30;

let getStatusIncome = function() {
  // возвращает значение уровня дохода
  switch (true) {
    case (budgetDay > 800):
      return "Высокий уровень дохода";
    case (budgetDay > 300):
      return "Средний уровень дохода";
    case (budgetDay > 0):
      return "Низкий уровень дохода";
    case (budgetDay < 0):
      return "Что-то пошло не так";
    case (budgetDay === 800):
    case (budgetDay === 300):
    case (budgetDay === 0):
      return "Вы попали на границы между уровнями дохода. Определитесь уже...";
  }
};
console.log('getStatusIncome(): ', getStatusIncome());
console.log();


/* Создать следующие функции:
     — getExpensesMonth. Функция возвращает сумму всех расходов за месяц
     — getAccumulatedMonth. Функция возвращает Накопления за месяц
     (Доходы минус расходы). Результат сохранить в переменную accumulatedMonth
     — getTargetMonth. Подсчитывает за какой период будет достигнута цель,
     зная результат месячного накопления и возвращает результат
*/
let getExpensesMonth = function(expense1, expense2) {
  // возвращает сумму всех расходов за месяц
  return expense1 + expense2;
};
let getAccumulatedMonth = function(money, expenses) {
  // возвращает Накопления за месяц
  return money + expenses;
};
let accumulatedMonth = getAccumulatedMonth(
                          money,
                          getExpensesMonth(
                            requiredSum1,
                            requiredSum2
                          )
                        );
console.log('accumulatedMonth: ', accumulatedMonth);      // Отладочное

let getTargetMonth = function() {
  // Возвращает период (количество месяцев), за который будет достигнута
  // цель по накоплению
  // return Math.ceil(mission / budgetMonth);
  return Math.ceil(mission / accumulatedMonth);
};


// Все консоль логи которые были до этого почистить и вывести в консоль:
// — Оставить функции showTypeof и getStatusIncome, которые написали в уроке
// — Накопления за период
// — Cрок достижения цели в месяцах (значение округлить в меньшую сторону)
console.log("Cрок (период) достижения цели в месяцах:");
console.log('Math.floor(getTargetMonth()): ', Math.floor(getTargetMonth()));
console.log();
console.log("Накопления за период:");
console.log('period * accumulatedMonth: ', period * accumulatedMonth);
