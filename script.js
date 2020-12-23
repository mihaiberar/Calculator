const calculatorDisplay = document.querySelector("h1");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

const calculatorButtons = document.querySelector(".calculator-buttons");

const data = {
  operator: ["+", "-", "×", "÷"],
  numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
  decimal: ["."],
  clear: ["C"],
  equal: ["="],
};

function createButtons(data) {
  Object.getOwnPropertyNames(data).forEach((property) => {
    data[property].forEach((element) => {
      const addBtn = document.createElement("button");
      addBtn.innerHTML = element;
      calculatorButtons.appendChild(addBtn);
      if (property == "equal") {
        addBtn.classList.add("equal-sign");
        addBtn.classList.add("operator");
      } else {
        addBtn.classList.add(property);
      }
    });
  });
}

createButtons(data);

const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementsByClassName("clear")[0];

function sendNumberValue(number) {
  // Replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // If current display value is 0, replace it, if not add number to display value
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  // If operator pressed, don't add decimal
  if (awaitingNextValue) return;
  // If no decimal, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// Calculate first and second values depending on operator
const calculate = {
  "÷": (firstNumber, secondNumber) => firstNumber / secondNumber,

  "×": (firstNumber, secondNumber) => firstNumber * secondNumber,

  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,

  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,

  "=": (firstNumber, secondNumber) => secondNumber,
};

function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  // Prevent multiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // Assign firstValue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  // Ready for next value, store operator
  awaitingNextValue = true;
  operatorValue = operator;
}

// Add Event Listeners for numbers, operators, decimal
inputBtns.forEach((inputBtn) => {
  
  if (inputBtn.classList.contains("numbers")) {
    inputBtn.addEventListener("click", () =>
      sendNumberValue(inputBtn.innerText)
    );
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.innerText));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});


// Reset all values, display
function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}

// Event Listener
clearBtn.addEventListener("click", resetAll);
