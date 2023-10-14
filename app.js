let firstNum = null,
  secondNum = null,
  operator = "";

const display = document.querySelector(".display");

const numBtns = document.querySelectorAll(".numBtn");
Array.from(numBtns).forEach((btn) => {
  btn.addEventListener("click", function () {
    display.textContent += btn.textContent;
  });
});

const clearBtn = document.querySelector(".redBtn");
clearBtn.addEventListener("click", function () {
  display.textContent = "";
  firstNum = null;
  secondNum = null;
  operator = "";
});

const opBtns = document.querySelectorAll(".opBtn");
Array.from(opBtns).forEach((btn) => {
  btn.addEventListener("click", function () {
    if (display.textContent == "") {
      operator = btn.textContent;
      return;
    } else {
      if (firstNum) {
        if (!operator) {
          operator = btn.textContent;
        } else {
          secondNum = Number(display.textContent);
          firstNum = operate(operator, firstNum, secondNum);
        }
      } else {
        firstNum = Number(display.textContent);
      }
      operator = btn.textContent;
      secondNum = null;
      display.textContent = "";
    }
  });
});

const equalBtn = document.querySelector(".equal");
equalBtn.addEventListener("click", function () {
  if (firstNum && display.textContent && operator) {
    secondNum = Number(display.textContent);
    firstNum = operate(operator, firstNum, secondNum);
    display.textContent = firstNum;
    secondNum = null;
    operator = "";
  }
});

const deleteBtn = document.querySelector(".blueBtn");
deleteBtn.addEventListener("click", function () {
  if (display.textContent) {
    display.textContent = display.textContent.slice(
      0,
      display.textContent.length - 1
    );
  }
});

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
  }
}
