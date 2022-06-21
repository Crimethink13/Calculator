// const button = document.querySelectorAll('.button');
const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('.clear');
const display = document.querySelector('.display');
const historyScreen = document.querySelector('.history-screen');
const currentScreen = document.querySelector('.current-number');

let firstNumber = '';
let secondNumber = '';
let operator = '';
let result = '';

//? Listen for number
numberBtn.forEach((number) => {
	number.addEventListener('click', function() {
		currentDisplay(number.textContent);
	});
});

//? Listen for operator
operatorBtn.forEach((operator) => {
	operator.addEventListener('click', function() {
		setOperator(operator.textContent);
	});
});

//? Listen for equals button
equalsBtn.addEventListener('click', function() {
	evaluate();
});

//? Set the current display
function currentDisplay(number) {
	currentScreen.textContent += number;
}
// ? Set the operator
//? Set the first operand
//? Set the history screen
function setOperator(currentOperator) {
	firstNumber = currentScreen.textContent;
	operator = currentOperator;
	historyScreen.textContent += `${firstNumber}${currentOperator}`;
	resetCurrentNumber();
}

//? Set the second operand
//? Call the operate function
function evaluate() {
	secondNumber = currentScreen.textContent;
	resetCurrentNumber();
	historyScreen.textContent += `${secondNumber}`;
	operate(firstNumber, operator, secondNumber);
	currentScreen.textContent = result;
}

//? Reset the current screen
function resetCurrentNumber() {
	currentScreen.textContent = '';
}

//? Math operations
let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => a / b;

//? Operate on the numbers
function operate(a, operator, b) {
	console.log(a, operator, b);
	a = Number(a);
	b = Number(b);
	if (operator === '+') {
		result = a + b;
	}
	if (operator === '−') {
		subtract(a - b);
		result = a - b;
		console.log(a - b);
	}
	if (operator === '×') {
		multiply(a * b);
		result = a * b;
		console.log(a * b);
	}
	if (operator === '÷') {
		divide(a / b);
		result = a / b;
		console.log(a / b);
	}
}
