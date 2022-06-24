const button = document.querySelectorAll('.button');
const numberBtn = document.querySelectorAll('.number');
const operatorBtn = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('.clear');
const display = document.querySelector('.display');
const historyScreen = document.querySelector('.history-screen');
const currentScreen = document.querySelector('.current-screen');
let firstNumber = '';
let operator = null;
let secondNumber = '';

//? Clears the screen
clearBtn.onclick = () => clearAll();

//? Listen for number
//? Display current number
numberBtn.forEach((number) => {
	number.addEventListener('click', () => {
		if (currentScreen.textContent === 'Error') clearCurrent();
		currentScreen.classList.remove('result', 'error');
		currentScreen.textContent += number.textContent;
	});
});

//TODO Fix function when operator is pressed multiple times
//? Save the operator variable
//? Listen for operator and display on screen
operatorBtn.forEach((button) => {
	button.addEventListener('click', () => {
		currentScreen.classList.remove('result', 'error');
		if (currentScreen.textContent === 'Error') {
			clearCurrent();
			return;
		}
		//? Evaluate current operation before setting new operator
		if (operator !== null) evaluate();
		operator = button.textContent;
		setFirstNumber(button.textContent);
		// clearCurrent();
	});
});

//? Listen for equals button and evaluate the answer
equalsBtn.addEventListener('click', evaluate);

//? Save the first number variable
//? Display first number and operator
function setFirstNumber(operation) {
	if (operator !== null) {
		operator = operation;
	}
	firstNumber = currentScreen.textContent;
	historyScreen.textContent = `${firstNumber}${operator}`;
	clearCurrent();
}

//? Clear the current screen
function clearCurrent() {
	currentScreen.textContent = '';
}

function clearAll() {
	historyScreen.textContent = '';
	currentScreen.textContent = '';
	firstNumber = '';
	operator = null;
	secondNumber = '';
}

//? Save the second number variable
function evaluate() {
	secondNumber = currentScreen.textContent;
	if (firstNumber === '' || secondNumber === '') return;
	if (operator === '÷' && secondNumber == 0) {
		secondNumber = '';
		currentScreen.classList.add('error');
		return (currentScreen.textContent = 'Error');
	}
	historyScreen.textContent += `${secondNumber}`;
	clearCurrent();
	currentScreen.textContent = roundNumber(operate(firstNumber, operator, secondNumber));
	currentScreen.classList.add('result');
	operator = null;
}

function roundNumber(num) {
	return Math.round(num * 1000) / 1000;
}

function operate(a, operator, b) {
	a = Number(a);
	b = Number(b);
	if (operator === '+') return a + b;

	if (operator === '−') return a - b;

	if (operator === '×') return a * b;

	if (operator === '÷') return a / b;
}
