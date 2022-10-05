const numberBtn = document.querySelectorAll('.number');
const negativeBtn = document.querySelector('.negative');
const operatorBtn = document.querySelectorAll('.operator');
const equalsBtn = document.querySelector('.equals');
const clearBtn = document.querySelector('.clear');
const backspaceBtn = document.querySelector('.backspace');
const randomBtn = document.querySelector('.random');
const keyPress = document.querySelectorAll('.button');
const display = document.querySelector('.display');
const historyScreen = document.querySelector('.history-screen');
const currentScreen = document.querySelector('.current-screen');
const decimalPoint = document.querySelector('.decimal');

let firstNumber = '';
let operator = null;
let secondNumber = '';

document.addEventListener('keydown', keyboardInput);
backspaceBtn.onclick = () => backspace();
negativeBtn.onclick = () => addNegativeSymbol();
randomBtn.onclick = () => randomEquation();
clearBtn.onclick = () => clearAll();
equalsBtn.onclick = () => evaluate();
decimalPoint.onclick = () => addDecimal();

numberBtn.forEach((button) => {
	button.addEventListener('click', () => {
		currentDisplay(button.textContent);
	});
});

operatorBtn.forEach((button) => {
	button.addEventListener('click', () => {
		setOperator(button.textContent);
	});
});

//? Display number on current screen
function currentDisplay(number) {
	if (currentScreen.textContent === 'Error') clearCurrent();
	if (currentScreen.classList.contains('result')) clearAll();
	if (currentScreen.textContent === '0') clearCurrent();
	currentScreen.classList.remove('result');
	currentScreen.textContent += number;
}

//? Display number and operator on history screen
//? Set first number and operator variables
function setOperator(selectedOperator) {
	if (currentScreen.textContent === 'Error') clearCurrent();
	if (operator !== null) evaluate();
	if (firstNumber === '' && currentScreen.textContent === '') return;
	if (currentScreen.textContent === '') {
		operator = selectedOperator;
		historyScreen.textContent = `${firstNumber}${operator}`;
		return;
	}

	firstNumber = currentScreen.textContent;
	operator = selectedOperator;
	historyScreen.textContent = `${firstNumber} ${operator}`;
	currentScreen.classList.remove('result');
	clearCurrent();
}

//? Add decimal point to current screen
function addDecimal() {
	if (currentScreen.classList.contains('result')) clearAll();
	if (currentScreen.textContent === '') currentScreen.textContent = '0';
	if (currentScreen.textContent === '-') currentScreen.textContent += '0';
	if (currentScreen.textContent.includes('.')) return;

	currentScreen.textContent += '.';
}

//? Add negative symbol to number
function addNegativeSymbol() {
	if (currentScreen.classList.contains('result')) clearAll();
	if (currentScreen.textContent === '0') currentScreen.textContent = '-';
	if (currentScreen.textContent !== '') return;
	if (currentScreen.textContent.includes('.')) return;
	if (currentScreen.textContent.includes('-')) return;

	currentScreen.textContent += '-';
}

//? Evaluate equation using operate function
//? Set second number variable
function evaluate() {
	if (currentScreen.textContent === '' || operator === null) return;
	if (operator === '÷' && currentScreen.textContent === '0') {
		return (currentScreen.textContent = 'Error');
	}
	if (currentScreen.textContent === 'Error') return;

	secondNumber = currentScreen.textContent;
	historyScreen.textContent += ` ${secondNumber}`;
	currentScreen.textContent = roundNumber(operate(firstNumber, operator, secondNumber));
	currentScreen.classList.add('result');
	operator = null;
}

function roundNumber(num) {
	return Math.round(num * 1000) / 1000;
}

//? Do math things
function operate(a, operator, b) {
	a = Number(a);
	b = Number(b);
	if (operator === '+') return a + b;

	if (operator === '−') return a - b;

	if (operator === '×') return a * b;

	if (operator === '÷') return a / b;
}

//? Keyboard inputs
function keyboardInput(e) {
	if (e.key >= 0 || e.key <= 9) currentDisplay(e.key);
	if (e.key === '.') addDecimal(e.key);
	if (e.key === 'Backspace') backspace();
	if (e.key === 'Escape') clearAll();
	if (e.key === '=' || e.key === 'Enter') evaluate();
	if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
		setOperator(convertOperator(e.key));
	}
}

//? Convert keyboard inputs
function convertOperator(keyboardSelection) {
	if (keyboardSelection === '/') return '÷';
	if (keyboardSelection === '*') return '×';
	if (keyboardSelection === '-') return '−';
	if (keyboardSelection === '+') return '+';
}

//? Backspace function
function backspace() {
	if (currentScreen.textContent === 'Error') clearCurrent();
	if (currentScreen.classList.contains('result')) return;
	currentScreen.textContent = currentScreen.textContent.toString().slice(0, -1);
	if (currentScreen.textContent === '') {
		currentScreen.textContent = '0';
	}
}

//? Clear everything
function clearAll() {
	currentScreen.classList.remove('result');
	historyScreen.textContent = '';
	currentScreen.textContent = '0';
	firstNumber = '';
	operator = null;
	secondNumber = '';
}

//? Clear current screen
function clearCurrent() {
	currentScreen.textContent = '';
}

//? Display random number
function randomEquation() {
	if (currentScreen.classList.contains('result')) clearAll();

	min = Math.ceil(-1000);
	max = Math.floor(1000);
	currentScreen.textContent = Math.floor(Math.random() * (max - min + 1) + min);

	//? Display and evaluate random equation
	// const operators = [ '+', '−', '×', '÷' ];
	// const randomOperator = Math.floor(Math.random() * operators.length);
	// operator = operators[randomOperator];
	// firstNumber = Math.floor(Math.random() * (max - min + 1) + min);
	// secondNumber = Math.floor(Math.random() * (max - min + 1) + min);

	// historyScreen.textContent = `${firstNumber} ${operator} ${secondNumber}`;
	// currentScreen.textContent = roundNumber(operate(firstNumber, operator, secondNumber));
	// currentScreen.classList.add('result');

	// currentScreen.textContent = `${Math.floor(Math.random() * (max - min) + min)}`;
}
