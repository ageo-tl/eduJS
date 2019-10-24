"use strict";
/*
Задача №4
Написать простой игровой бот, который:
1) Загадывает число от 1 до 100
2) Задает вопрос пользователю: «Угадай число»
3) Если пользователь ввел число меньше, чем загаданное, то бот сообщает
«Больше!» и предлагает ввести новый вариант
4) Если пользователь ввел число больше, чем загаданное, то бот выводит
«Меньше!» и предлагает ввести новый вариант
5) Если пользователь ввел правильное число, то бот выводит «Поздравляю вы
угадали!!!»
6) После угаданного число бот спрашивает «Хотите сыграть еще?»
7) Если пользователь ввел не число, то выводит «Введи число!» и предлагает
ввести новый вариант
8) Если пользователь нажимает «Отмена», то игра заканчивается
*/
const guessTheNumber = function () {

  // Функция генерирует случайное число в указанном диапазоне
  const getRandomInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  let num,
      userNum,
      msg,
      userChoice;

  do {
    num = getRandomInRange(1, 100);
    // console.log('num: ', num);      // Отладочное
    msg = "Угадай число!";

    // Цикл ввода и сравнения чисел
    do {
      userNum = prompt(msg);
      // Проверка введенного числа
      if (userNum === null) {
        break;
      } else if (isNaN(userNum) || userNum.trim().length === 0) {
        msg = "Введи число!";
      } else {
        // Сравнение введенного числа с "загаданным"
        if (num > userNum) {
          msg = "Больше!";
        } else if (num < userNum) {
          msg = "Меньше!";
        } else {
          break;
        }
      }
    } while (true);

    // Сообщение результата игры
    if (userNum === null) {
      alert("Игрок сдался!");
      break;
    } else {
      alert("Поздравляю! Вы угадали!!!");
    }

    userChoice = confirm("Хотите сыграть еще?");

  } while (userChoice);

};
guessTheNumber();
