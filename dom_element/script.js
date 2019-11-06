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
    const el = document.createElement(elemType);
    el.style.cssText=`height: ${this.height};
                           width: ${this.width};
                           background: ${this.bg};
                           fontSize: ${this.fontSize};
                          `;
    el.textContent = "внутрь записывать любой текст";
    document.body.appendChild(el);
  };
};


const myElem = new DomElement( ".block", "100px", "100px", "silver", "1rem");
myElem.create();
