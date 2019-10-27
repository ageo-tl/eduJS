"use strict";

let money;

// Функция start c циклом do while
let start = function() {
  do {
    money = prompt("Ваш месячный доход?", 50000);
  } while (isNaN(money) || money === "" || money === null);
};
start();


let appData = {
  budget: money,
  income: {},           // Дополнительные(?) доходы
  addIncome: [],        // Список дополнительных доходов
  expenses: {},         // Дополнительные(?) расходы
  addExpenses: [],      // Список дополнительных расходов
  deposit: false,       // Наличие депозита
  mission: 50000,       // Цель по накоплению
  period: 3,            // Временной отрезок
  asking: function() {
    appData.addExpenses = requestValue("Перечислите возможные расходы за рассчитываемый период через запятую.");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
  },
};

// let income = "завод",
//     addExpenses = "водяра, дефки, патефон",
//     deposit = false,
//     mission = 45678,
//     period = 2;




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

function requestValue(q, d) {
  // запрашивает у пользователя значение (строку)
  let res = "";
  let tmp = "";
  if (d === undefined) { d = ""; }
  while (true) {
    res = prompt(q + tmp, d);

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


// Валидация данных, которые мы получаем на вопрос 'Во сколько это обойдется?’, в функции getExpensesMonth
let requiredName1,
    requiredName2;

let getExpensesMonth = function() {
  let sum = 0;

  for (let i = 0; i < 2; i++) {
    if (!i) {
      requiredName1 = requestValue("Какие обязательные ежемесячные расходы у вас есть?", "Квартплата");
    } else {
      requiredName2 = requestValue("Какие обязательные ежемесячные расходы у вас есть?", "Бензин");
    }
    sum += requestNumber("Во сколько это обойдется?");
  }
  return sum;
};
let expenseAmount = getExpensesMonth();

/* Вычислить доход за месяц, учитывая обязательные расходы,
сохранить в переменную budgetMonth и вывести результат в консоль*/
let budgetMonth = money - expenseAmount;

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
     — getAccumulatedMonth. Функция возвращает Накопления за месяц
     (Доходы минус расходы). Результат сохранить в переменную accumulatedMonth
     — getTargetMonth. Подсчитывает за какой период будет достигнута цель,
     зная результат месячного накопления и возвращает результат
*/
let getAccumulatedMonth = function(money, expenses) {
  // возвращает Накопления за месяц
  return money + expenses;
};
let accumulatedMonth = getAccumulatedMonth(
                          money,
                          expenseAmount
                        );
console.log('accumulatedMonth: ', accumulatedMonth);      // Отладочное

let getTargetMonth = function() {
  // Возвращает период (количество месяцев), за который будет достигнута
  // цель по накоплению
  // return Math.ceil(mission / budgetMonth);
  return Math.ceil(appData.mission / accumulatedMonth);
};


// Все консоль логи которые были до этого почистить и вывести в консоль:
// — Оставить функции showTypeof и getStatusIncome, которые написали в уроке
// — Накопления за период
// — Cрок достижения цели в месяцах (значение округлить в меньшую сторону)
if (getTargetMonth() >= 0) {
console.log("Cрок (период) достижения цели в месяцах:");
console.log('Math.floor(getTargetMonth()): ', Math.floor(getTargetMonth()));
} else {
  console.log("Цель не будет достигнута");
}
console.log();
console.log("Накопления за период:");
console.log('period * accumulatedMonth: ', appData.period * accumulatedMonth);
