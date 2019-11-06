const DomElement = function(selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  this.el = null;     // сам создаваемый DOM-элемент

  this.create = function() {
    const elemType = this.selector[0] === "."
                        ? "div"
                        : this.selector[0] === "#"
                          ? "p"
                          : "hr";
    this.el = document.createElement(elemType);
    this.el.style.cssText=`height: ${this.height};
                           width: ${this.width};
                           background: ${this.bg};
                           fontSize: ${this.fontSize};
                          `;
    this.el.textContent = "внутрь записывать любой текст";
    document.body.appendChild(this.el);
  };
};

const arr = [37, 38, 39, 40];
const pushArrows = function(event) {
  const key = event.keyCode;
  let top, left;
  if (arr.includes(key)) {
    switch (key) {
      case 37:
        // влево
        left = this.style.left ? parseInt(this.style.left) : 0;
        this.style.left = left - 10 + "px";
        break;
      case 38:
        // вверх
        top = this.style.top ? parseInt(this.style.top) : 0;
        this.style.top = top - 10 + "px";
        break;
      case 39:
        // вправо
        left = this.style.left ? parseInt(this.style.left) : 0;
        this.style.left = left + 10 + "px";
        break;
      case 40:
        // вниз
        top = this.style.top ? parseInt(this.style.top) : 0;
        this.style.top = top + 10 + "px";
    }
  }
};

const myElem = new DomElement( ".block", "100px", "100px", "silver", "1rem");
myElem.create();

myElem.el.style.position = "absolute";
document.addEventListener("keydown", pushArrows.bind(myElem.el));
