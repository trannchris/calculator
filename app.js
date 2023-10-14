let firstNum = "",
  secondNum = "",
  currentOperator = null,
  shouldResetScreen = false;

const lastDisplay = document.querySelector(".display-last");
const currentDisplay = document.querySelector(".display-current");

const numBtns = document.querySelectorAll(".numBtn");
Array.from(numBtns).forEach((btn) => {
  btn.addEventListener("click", function () {
    if (currentDisplay.textContent === "0" || shouldResetScreen) {
      resetScreen();
    }
    currentDisplay.textContent += btn.textContent;
  });
});

const decBtn = document.querySelector(".decBtn");
decBtn.addEventListener("click", function () {
  if (shouldResetScreen) resetScreen();
  if (currentDisplay.textContent === "") currentDisplay.textContent = "0";
  if (currentDisplay.textContent.includes(".")) return;
  currentDisplay.textContent += ".";
});

const clearBtn = document.querySelector(".redBtn");
clearBtn.addEventListener("click", function () {
  currentDisplay.textContent = "0";
  lastDisplay.textContent = "";
  firstNum = "";
  secondNum = "";
  currentOperator = null;
});

const opBtns = document.querySelectorAll(".opBtn");
Array.from(opBtns).forEach((btn) => {
  btn.addEventListener("click", function () {
    if (currentOperator) evaluate();
    firstNum = currentDisplay.textContent;
    currentOperator = btn.textContent;
    lastDisplay.textContent = `${firstNum} ${currentOperator}`;
    shouldResetScreen = true;
  });
});

const equalBtn = document.querySelector(".equal");
equalBtn.addEventListener("click", evaluate);

const deleteBtn = document.querySelector(".blueBtn");
deleteBtn.addEventListener("click", function () {
  if (currentDisplay.textContent) {
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
  }
});

function evaluate() {
  if (!currentOperator || shouldResetScreen) return;
  if (currentOperator === "÷" && currentDisplay.textContent === "0") {
    alert("You can't divide by 0!");
    return;
  }
  secondNum = currentDisplay.textContent;
  currentDisplay.textContent = roundResult(
    operate(currentOperator, firstNum, secondNum)
  );
  lastDisplay.textContent = `${firstNum} ${currentOperator} ${secondNum} =`;
  currentOperator = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function resetScreen() {
  currentDisplay.textContent = "";
  shouldResetScreen = false;
}

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

function operate(currentOperator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (currentOperator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "÷":
      if (b == 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}
