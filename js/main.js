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
    for (let i = 0; i < 2; i++) {
      let exp, sum;
      if (!i) {
        exp = requestValue("Какие обязательные ежемесячные расходы у вас есть?", "Квартплата");
      } else {
        exp = requestValue("Какие обязательные ежемесячные расходы у вас есть?", "Бензин");
      }
      sum = requestNumber("Во сколько это обойдется?");
      appData.expenses[exp] = sum;
    }
    appData.addExpenses = requestValue("Перечислите возможные расходы за рассчитываемый период через запятую.");
    appData.deposit = confirm("Есть ли у вас депозит в банке?");
  },
  getExpensesMonth: function() {
    let sum = 0;
    for (let exp in appData.expenses) {
      sum += appData.expenses[exp];
    }
    appData.expensesMonth = sum;
  },
  getBudget: function() {
    // считает бюджеты за месяц и за день
    appData.budgetMonth = money - appData.expensesMonth;
    appData.budgetDay = appData.budgetMonth / 30;
  },
  getTargetMonth: function() {
    // Возвращает период (количество месяцев), за который будет достигнута
    // цель по накоплению
    return Math.ceil(appData.mission / appData.budgetMonth);
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

appData.asking();
appData.getExpensesMonth();
appData.getBudget();


console.log("Расходы за месяц:");
console.log('appData.expensesMonth: ', appData.expensesMonth);
console.log();
console.log("Период, за который будет достигнута цель по накоплениям");
if (appData.getTargetMonth() >= 0) {
  console.log('Math.floor(appData.getTargetMonth()): ', Math.floor(appData.getTargetMonth()));
} else {
  console.log("Цель не будет достигнута");
}
console.log();
console.log("Уровень дохода:");
console.log('appData.getStatusIncome(): ', appData.getStatusIncome());
console.log();



// Вспопомогательные функции
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
