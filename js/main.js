"use strict";

let money;

let requiredName1,
    requiredName2;

// Функция start c циклом do while
let start = function() {
  do {
    money = prompt("Ваш месячный доход?", 50000);
  } while (isNaN(money) || money === "" || money === null);
  money = +money;
};
start();


let appData = {
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
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
  getExpensesMonth: function() {
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
  },
  getAccumulatedMonth: function(money, expenses) {
    // возвращает Накопления за месяц
    return money + expenses;
  },
  getTargetMonth: function() {
    // Возвращает период (количество месяцев), за который будет достигнута
    // цель по накоплению
    return Math.ceil(appData.mission / accumulatedMonth);
  },
  getStatusIncome: function() {
    // возвращает значение уровня дохода
    switch (true) {
      case (appData.budgetDay > 800):
        return "Высокий уровень дохода";
      case (appData.budgetDay > 300):
        return "Средний уровень дохода";
      case (appData.budgetDay > 0):
        return "Низкий уровень дохода";
      case (appData.budgetDay < 0):
        return "Что-то пошло не так";
      case (appData.budgetDay === 800):
      case (appData.budgetDay === 300):
      case (appData.budgetDay === 0):
        return "Вы попали на границы между уровнями дохода. Определитесь уже...";
    }
  },
};


/* - Объявить переменную budgetDay и присвоить дневной бюджет (доход за месяц / 30),
вывести в консоль результат и остаток от деления */
// appData.budgetDay = 100/30;


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


// Сумма расходов
let expenseAmount = appData.getExpensesMonth();

// Вычислить доход за месяц, учитывая обязательные расходы
appData.budgetMonth = money - expenseAmount;

// Вычислить budgetDay учитывая бюджет на месяц, а не месячный доход.
appData.budgetDay = appData.budgetMonth / 30;


console.log("Уровень доходов:");
console.log('appData.getStatusIncome(): ', appData.getStatusIncome());
console.log();


// Накопление за месяц
let accumulatedMonth = appData.getAccumulatedMonth(
                          money,
                          expenseAmount
                        );


// Вывести в консоль:
// — Накопления за период
// — Cрок достижения цели в месяцах (значение округлить в меньшую сторону)
if (appData.getTargetMonth() >= 0) {
console.log("Cрок (период) достижения цели в месяцах:");
console.log('Math.floor(appData.getTargetMonth()): ', Math.floor(appData.getTargetMonth()));
} else {
  console.log("Цель не будет достигнута");
}
console.log();
console.log("Накопления за период:");
console.log('period * accumulatedMonth: ', appData.period * accumulatedMonth);
