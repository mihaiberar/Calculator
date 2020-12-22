const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

const calculatorButtons = document.querySelector('.calculator-buttons');

const addBtn = document.createElement('button');   
addBtn.innerHTML = '+';          
calculatorButtons.appendChild(addBtn);
addBtn.classList.add('operator');  

const subtractBtn = document.createElement('button');   
subtractBtn.innerHTML = '-';          
calculatorButtons.appendChild(subtractBtn);
subtractBtn.classList.add('operator');

const multiplyBtn = document.createElement('button');   
multiplyBtn.innerHTML = '×';          
calculatorButtons.appendChild(multiplyBtn);
multiplyBtn.classList.add('operator');

const divideBtn = document.createElement('button');   
divideBtn.innerHTML = '÷';          
calculatorButtons.appendChild(divideBtn);
divideBtn.classList.add('operator');

const sevenBtn = document.createElement('button');   
sevenBtn.value='7';
sevenBtn.innerHTML = '7';          
calculatorButtons.appendChild(sevenBtn);

const eightBtn = document.createElement('button');   
eightBtn.innerHTML = '8';          
calculatorButtons.appendChild(eightBtn);

const nineBtn = document.createElement('button');   
nineBtn.innerHTML = '9';          
calculatorButtons.appendChild(nineBtn);

const fourBtn = document.createElement('button');   
fourBtn.innerHTML = '4';          
calculatorButtons.appendChild(fourBtn);

const fiveBtn = document.createElement('button');   
fiveBtn.innerHTML = '5';          
calculatorButtons.appendChild(fiveBtn);

const sixBtn = document.createElement('button');   
sixBtn.innerHTML = '6';          
calculatorButtons.appendChild(sixBtn);

const oneBtn = document.createElement('button');   
oneBtn.innerHTML = '1';          
calculatorButtons.appendChild(oneBtn);

const twoBtn = document.createElement('button');   
twoBtn.innerHTML = '2';          
calculatorButtons.appendChild(twoBtn);

const threeBtn = document.createElement('button');   
threeBtn.innerHTML = '3';          
calculatorButtons.appendChild(threeBtn);

const decimalBtn = document.createElement('button');   
decimalBtn.innerHTML = '.';          
calculatorButtons.appendChild(decimalBtn);
decimalBtn.classList.add('decimal');

const zeroBtn = document.createElement('button');   
zeroBtn.innerHTML = '0';          
calculatorButtons.appendChild(zeroBtn);

const cleanBtn = document.createElement('button');   
cleanBtn.innerHTML = 'C';          
calculatorButtons.appendChild(cleanBtn);
cleanBtn.classList.add('clear');
cleanBtn.setAttribute('id', 'clear-btn');

const equalBtn = document.createElement('button');   
equalBtn.innerHTML = '=';          
calculatorButtons.appendChild(equalBtn);
equalBtn.classList.add('equal-sign');

function sendNumberValue(number) {
  // Replace current display value if first value is entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // If current display value is 0, replace it, if not add number to display value
    const displayValue = calculatorDisplay.textContent;
    calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
  }
}

function addDecimal() {
  // If operator pressed, don't add decimal
  if (awaitingNextValue) return;
  // If no decimal, add one
  if (!calculatorDisplay.textContent.includes('.')) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// Calculate first and second values depending on operator
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,

  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,

  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,

  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,

  '=': (firstNumber, secondNumber) => secondNumber,
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
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains('operator')) {
    inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains('decimal')) {
    inputBtn.addEventListener('click', () => addDecimal());
  }
});

// Reset all values, display
function resetAll() {
  firstValue = 0;
  operatorValue = '';
  awaitingNextValue = false;
  calculatorDisplay.textContent = '0';
}

// Event Listener
clearBtn.addEventListener('click', resetAll);