const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const equalsButton = document.querySelector('[data-action="equals"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const allClearButton = document.querySelector('[data-action="clear"]');
const previousOperandText = document.getElementById("previous-operand");
const currentOperandText = document.getElementById("current-operand");

let currentOperand = "";
let previousOperand = "";
let operation = null;

function updateDisplay() {
  currentOperandText.textContent = currentOperand;
  previousOperandText.textContent = operation
    ? `${previousOperand} ${operation}`
    : "";
}

function appendNumber(number) {
  if (number === "." && currentOperand.includes(".")) return;
  currentOperand += number;
}

function chooseOperation(op) {
  if (currentOperand === "") return;
  if (previousOperand !== "") compute();
  operation = op;
  previousOperand = currentOperand;
  currentOperand = "";
}

function compute() {
  let result;
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) return;

  switch (operation) {
    case "+":
      result = prev + curr;
      break;
    case "-":
      result = prev - curr;
      break;
    case "*":
      result = prev * curr;
      break;
    case "÷":
      result = curr !== 0 ? prev / curr : "Error";
      break;
    default:
      return;
  }

  currentOperand = result.toString();
  operation = null;
  previousOperand = "";
}

function clear() {
  currentOperand = "";
  previousOperand = "";
  operation = null;
}

function deleteLast() {
  currentOperand = currentOperand.slice(0, -1);
}

numberButtons.forEach((button) =>
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
    updateDisplay();
  })
);

operatorButtons.forEach((button) =>
  button.addEventListener("click", () => {
    chooseOperation(button.getAttribute("data-operator"));
    updateDisplay();
  })
);

equalsButton.addEventListener("click", () => {
  compute();
  updateDisplay();
});

allClearButton.addEventListener("click", () => {
  clear();
  updateDisplay();
});

deleteButton.addEventListener("click", () => {
  deleteLast();
  updateDisplay();
});

// Optional: Keyboard support
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key) || e.key === ".") {
    appendNumber(e.key);
  } else if (["+", "-", "*", "/"].includes(e.key)) {
    chooseOperation(e.key === "/" ? "÷" : e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    compute();
  } else if (e.key === "Backspace") {
    deleteLast();
  } else if (e.key === "Escape") {
    clear();
  }
  updateDisplay();
});
