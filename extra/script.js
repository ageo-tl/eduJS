"use strict";

// Вспомогательные функции
const numFrmt = function(n) {
  if (isNaN(n)) {
    return n;
  } else {
    return n.toLocaleString(undefined, {minimumIntegerDigits: 2});
  }
};
const dateFormat = function(d) {
  return numFrmt(d.getHours()) + ":" +
          numFrmt(d.getMinutes()) + ":" +
          numFrmt(d.getSeconds()) + " " +
          numFrmt(d.getDate()) + "." +
          numFrmt(d.getMonth()) + "." + d.getFullYear();
};

// Работа с датой
const d = new Date();

const h = document.createElement("h2");
h.innerText = dateFormat(d);
h.style.margin = "50px";

const dt = document.createElement("div");
dt.appendChild(h);
document.body.appendChild(dt);
