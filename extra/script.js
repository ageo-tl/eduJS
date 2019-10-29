"use strict";

// Вспомогательные функции
const dateFormat = function(d) {
  return d.getHours() + ":" +
          d.getMinutes() + ":" +
          d.getSeconds() + " " +
          d.getDate() + "." +
          d.getMonth() + "." + d.getFullYear();
};

// Работа с датой
const d = new Date();

const h = document.createElement("h2");
h.innerText = dateFormat(d);
h.style.margin = "50px";

const dt = document.createElement("div");
dt.appendChild(h);
document.body.appendChild(dt);
