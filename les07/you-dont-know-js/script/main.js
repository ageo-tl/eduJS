
// ===== ВОССТАНОВИТЬ ПОРЯДОК КНИГ ====
// Получим все элементы книг
const allBooks = document.querySelectorAll(".book");

// Преобразуем nodeList в массив
const arr = [];
for(let i = allBooks.length; i--; arr.unshift(allBooks[i]));

// Сортировочная функция
const sorterForBooks = function(a, b) {
  const aTxt = a.querySelector("a").innerText.trim();
  const bTxt = b.querySelector("a").innerText.trim();
  if (aTxt > bTxt) {
    return 1;
  }
  if (aTxt === bTxt) {
    return 0;
  }
  if (aTxt < bTxt) {
    return -1;
  }
};

// Непосредственно сортировка массива
arr.sort(sorterForBooks);

// Замена элементов после сортировки
const books = document.querySelector(".books");
// console.log('books: ', books);
books.innerHTML = "";
for (let i = 0; i < arr.length; i++) {
  books.appendChild(arr[i]);
}
// ===== END OF === ВОССТАНОВИТЬ ПОРЯДОК КНИГ ====



// ===== ЗАМЕНИТЬ КАРТИНКУ ЗАДНЕГО ФОНА НА ДРУГУЮ ИЗ ПАПКИ IMAGE =====
document.body.style.backgroundImage = "url(./image/you-dont-know-js.jpg)";
// ===== END OF === ЗАМЕНИТЬ КАРТИНКУ ЗАДНЕГО ФОНА НА ДРУГУЮ ИЗ ПАПКИ IMAGE ===



// ===== ИСПРАВИТЬ ЗАГОЛОВОК В КНИГЕ 3 =====
// === ( Должно получится - "Книга 3. this и Прототипы Объектов") ===
  // arr.forEach( book => {
  //   if (book.querySelector("a").innerText.trim().startsWith("Книга 3")) {
      // book.querySelector("a")
      //   .innerText = "Книга 3. this и Прототипы Объектов";
  //     // break;
  //   }
  // });
for (let i = 0; i < arr.length; i++) {
  if (arr[i].querySelector("a").innerText.trim().startsWith("Книга 3")) {
    arr[i].querySelector("a").innerText = "Книга 3. this и Прототипы Объектов";
    break;
  }
}
// ===== END OF === ИСПРАВИТЬ ЗАГОЛОВОК В КНИГЕ 3 =====



// ===== УДАЛИТЬ РЕКЛАМУ СО СТРАНИЦЫ =====
document.querySelector(".adv").remove();
// ===== END OF === УДАЛИТЬ РЕКЛАМУ СО СТРАНИЦЫ =====



// ===== ВОССТАНОВИТЬ ПОРЯДОК ГЛАВ ВО ВТОРОЙ И ПЯТОЙ КНИГЕ =====
// Сортирует оглавление (дочерние элементы source по их innerText)
const sortingChapets = function(source) {
  const newTable = [];
  let chapNewNum;

  // Первый проход с выбором 'Введения', 'Предисловия' и 'Глав'
  [...source.children].forEach( chap => {
    switch (true) {
      case (chap.innerText.startsWith("Введение")):
        newTable[0] = chap;
        break;
      case (chap.innerText.startsWith("Предисловие")):
        newTable[1] = chap;
        break;
      case (chap.innerText.startsWith("Глава")):
        // 6 - длина подстроки 'Глава '
        chapNewNum = +chap.innerText.slice(6, chap.innerText.indexOf(":"));
        newTable[chapNewNum + 1] = chap;
        // break;
    }
  });

  // Второй проход с выбором 'Приложений'
  const lenNewTableWOatt = newTable.length;
  [...source.children].forEach( chap => {
    if (chap.innerText.startsWith("Приложение")) {
      // 11 - длина подстроки 'Приложение '; 65 - код символа 'A' (англ.)
      chapNewNum = (chap.innerText.slice(11, chap.innerText.indexOf(":")))
        .charCodeAt() - 65;
      newTable[chapNewNum + lenNewTableWOatt] = chap;
      // break;
    }
  });

  // Замена элементов в source
  source.innerHTML = "";
  for (let i = 0; i < newTable.length; i++) {
    source.appendChild(newTable[i]);
  }
}

// Вызов сортировки оглавлений для указанных книг
let bookName;
arr.forEach( book => {
  bookName = book.querySelector("a").innerText.trim();
  // console.log('bookName: ', bookName);
  if (bookName.startsWith("Книга 2") || bookName.startsWith("Книга 5")) {
    sortingChapets(book.querySelector("ul"));
  }
});
// ===== END OF === ВОССТАНОВИТЬ ПОРЯДОК ГЛАВ ВО ВТОРОЙ И ПЯТОЙ КНИГЕ =====



/* ===== В ШЕСТОЙ КНИГЕ ДОБАВИТЬ ГЛАВУ “Глава 8: За пределами ES6” =====
   ===== И ПОСТАВИТЬ ЕЁ В ПРАВИЛЬНОЕ МЕСТО                         ===== */

// Тут вопрос о нахождении шестой главы:
//    можно ли искать по содержимому без перебора коллекции?
const ul = arr[5].querySelector("ul");

// новая глава
const newLi = document.createElement("li");
newLi.innerText = "Глава 8: За пределами ES6";

// элемент для определения месты вставки новой главы
let targetLi;
// const ulChildren = ul.querySelectorAll("li")
for (let i = 0; i < ul.children.length - 1; i++) {
  if (ul.children[i].innerText.startsWith("Глава 7")) {
    targetLi = ul.children[i + 1];
  }
}

// вставка нового элемента на положенное место
if (targetLi === undefined) {
  ul.appendChild(newLi);
} else {
  ul.insertBefore(newLi, targetLi);
}
// ===== END OF === В ШЕСТОЙ КНИГЕ ДОБАВИТЬ ГЛАВУ =====
