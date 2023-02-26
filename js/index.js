let buffer = '';
let currentNumber = '';
let operator = '';

const previousDisplayNumber = document.querySelector('.previous-number');
const currentDisplayNumber = document.querySelector('.current-number');
const numberButtons = document.querySelectorAll('.calc-number');
const operatorButtons = document.querySelectorAll('.calc-operator');
const resultBtn = document.querySelector('.calc-result');
const clearBtn = document.querySelector('.calc-clear');
const deleteBtn = document.querySelector('.calc-delete');
const decimalBtn = document.querySelector('.calc-decimal');

numberButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    handleNumber(e.target.textContent);
    // console.log(buffer);
    // console.log(currentNumber);
    // console.log(operator);
  });
});

function handleNumber(number) {
  if (currentNumber !== '' && buffer !== '' && operator === '') {
    buffer = '';
    currentDisplayNumber.textContent = currentNumber;
  }
  if (currentNumber.length <= 16) {
    currentNumber += number;
    currentDisplayNumber.textContent = currentNumber;
  }
}

operatorButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    handleOperator(e.target.textContent);
    // console.log(buffer);
    // console.log(currentNumber);
    // console.log(operator);
  });
});

function handleOperator(op) {
  if (buffer === '') {
    buffer = currentNumber;
    operatorCheck(op);
  } else if (currentNumber === '') {
    operatorCheck(op);
  } else {
    calculate();
    operator = op;
    currentDisplayNumber.textContent = '0';
    previousDisplayNumber.textContent = `${buffer} ${operator}`;
  }
}

resultBtn.addEventListener('click', () => {
  if (currentNumber !== '' && buffer !== '') {
    calculate();
  }
});

function calculate() {
  buffer = Number(buffer);
  currentNumber = Number(currentNumber);
  // if (operator === '÷') {
  //   if (currentNumber <= 0) {
  //     buffer = 'Error 😱️';
  //     displayResult();
  //     return;
  //   }
  //   buffer /= currentNumber;
  // } else if (operator === '*') {
  //   buffer *= currentNumber;
  // } else if (operator === '-') {
  //   buffer -= currentNumber;
  // } else if (operator === '+') {
  //   buffer += currentNumber;
  // }
  switch (operator) {
    case '÷':
      if (currentNumber <= 0) {
        buffer = 'Error 😱️';
        displayResult();
        return;
      }
      buffer /= currentNumber;
      break;
    case 'x':
      buffer *= currentNumber;
      break;
    case '-':
      buffer -= currentNumber;
      break;
    case '+':
      buffer += currentNumber;
      break;
  }

  buffer = roundNumber(buffer);
  buffer = buffer.toString();
  displayResult();
}

function displayResult() {
  if (buffer.length <= 16) {
    currentDisplayNumber.textContent = buffer;
  } else {
    currentDisplayNumber.textContent = buffer.slice(0, 16) + '...';
  }
  previousDisplayNumber.textContent = '';
  operator = '';
  currentNumber = '';
}

function roundNumber(number) {
  return Math.round(number * 100000000) / 100000000;
}

clearBtn.addEventListener('click', () => {
  buffer = '';
  currentNumber = '';
  operator = '';
  previousDisplayNumber.textContent = '';
  currentDisplayNumber.textContent = '0';
});

function operatorCheck(check) {
  operator = check;
  previousDisplayNumber.textContent = `${buffer} ${operator}`;
  currentNumber = '';
  currentDisplayNumber.textContent = '';
}

decimalBtn.addEventListener('click', handleDecimal);

function handleDecimal() {
  if (!currentNumber.includes('.')) {
    currentNumber += '.';
    currentDisplayNumber.textContent = currentNumber;
  }
}

deleteBtn.addEventListener('click', deleteNumber);

function deleteNumber() {
  if (currentNumber.length == 1) {
    currentNumber = '0';
    currentDisplayNumber.textContent = currentNumber;
  } else if (currentNumber.length > 1) {
    let string = currentDisplayNumber.textContent;
    currentNumber = string.substring(0, string.length - 1);
    currentDisplayNumber.textContent = currentNumber;
  }
}
