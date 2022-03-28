'use strict';

let firstValue = [],
  secondValue = [],
  operand = [];
let output = document.querySelector('.output');
const numbers = Array.from(document.querySelectorAll('.num'));
const operators = Array.from(document.querySelectorAll('.oper'));
const clear = document.querySelector('.clear');
const equal = document.querySelector('.equal');
const percent = document.querySelector('.percent');
const dot = document.querySelector('.dot');

function reset(result = []) {
  firstValue = Array.from(result);
  secondValue = [];
  operand = [];
}

const math = {
  divide(a, b) {
    const result = Number(a.join('') / Number(b.join('')));
    return Number.isInteger(result) ? result : result.toFixed(1);
  },
  multiply(a, b) {
    const result = Number(a.join('')) * Number(b.join(''));
    return Number.isInteger(result) ? result : result.toFixed(1);
  },
  plus(a, b) {
    let result = Number(a.join('')) + Number(b.join(''));
    return Number.isInteger(result) ? result : result.toFixed(1);
  },
  subtract(a, b) {
    const result = Number(a.join('')) - Number(b.join(''));
    return Number.isInteger(result) ? result : result.toFixed(1);
  },
  percent(a) {
    const result = Number(a.join('')) / 100;
    return Number.isInteger(result) ? result : result.toFixed(2);
  },
};

clear.onclick = () => {
  output.textContent = '';
  reset();
};

percent.onclick = () => {
  if (firstValue.length > 0 && operand.length === 0) {
    output.textContent = math.percent(firstValue);
    reset(output.textContent);
  }
};

numbers.forEach((item) => {
  item.addEventListener('click', () => {
    if (firstValue.length > 0 && operand.length == 1) {
      secondValue.push(item.textContent);
      output.textContent += item.textContent;
    } else {
      firstValue.push(item.textContent);
      output.textContent += item.textContent;
    }
  });
});
dot.onclick = () => {
  if (
    !firstValue.includes('.') &&
    operand.length === 0 &&
    firstValue.length > 0
  ) {
    firstValue.push('.');
    output.textContent += '.';
  } else if (!secondValue.includes('.') && secondValue.length > 0) {
    secondValue.push('.');
    output.textContent += '.';
  }
};

operators.forEach((item) => {
  item.addEventListener('click', () => {
    if (operand.length == 0) {
      operand.push(item.textContent);
      output.textContent += ` ${operand.join('')} `;
    }
  });
});

equal.onclick = () => {
  if (firstValue.length > 0 && secondValue.length > 0) {
    switch (operand[0]) {
      case '÷':
        output.textContent = math.divide(firstValue, secondValue);
        reset(output.textContent);
        break;
      case 'x':
        output.textContent = math.multiply(firstValue, secondValue);
        reset(output.textContent);
        break;
      case '+':
        output.textContent = math.plus(firstValue, secondValue);
        reset(output.textContent);
        break;
      case '-':
        output.textContent = math.subtract(firstValue, secondValue);
        reset(output.textContent);
        break;
    }
  }
};
