const button = document.querySelectorAll('.button');
const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('.clear');
const display = document.querySelector('.display');
const historyScreen = document.querySelector('.history-screen');
const currentScreen = document.querySelector('.current-number');
let firstNumber = '';
let operator = '';
let secondNumber = '';
let result = '';

//? Clears the screen
clearBtn.onclick = () => {
	historyScreen.textContent = '';
	currentScreen.textContent = '';
};

//? Listen for number
//? Display current number
numberBtn.forEach((number) => {
	number.addEventListener('click', () => {
		currentScreen.textContent += number.textContent;
	});
});

//? Save the operator variable
//? Listen for operator and display on screen
operatorBtn.forEach((button) => {
	button.addEventListener('click', () => {
		operator = button.textContent;
		setOperator();
		// clearCurrent();
	});
});

//? Listen for equals button and evaluate the answer
equalsBtn.addEventListener('click', evaluate);

//? Save the first number variable
//? Save the operator variable
//? Display first number and operator
function setOperator() {
	firstNumber = currentScreen.textContent;
	historyScreen.textContent = `${firstNumber}${operator}`;
	clearCurrent();
}

//? Clear the current screen
function clearCurrent() {
	currentScreen.textContent = '';
}

//? Save the second number variable
function evaluate() {
	secondNumber = currentScreen.textContent;
	historyScreen.textContent += `${secondNumber}`;
	clearCurrent();
	operate(firstNumber, operator, secondNumber);
	currentScreen.textContent = result;
}

function operate(a, operator, b) {
	a = Number(a);
	b = Number(b);
	if (operator === '+') {
		result = a + b;
	}
	if (operator === '−') {
		result = a - b;
	}
	if (operator === '×') {
		result = a * b;
	}
	if (operator === '÷') {
		result = a / b;
	}
}
