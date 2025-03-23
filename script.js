let display = document.getElementById("display");
let currentInput = "";
let firstNumber = "";
let secondNumber = "";
let operator = "";
let shouldResetDisplay = false;

function clearCalculator() {
    currentInput = "";
    firstNumber = "";
    secondNumber = "";
    operator = "";
    shouldResetDisplay = false;
    display.textContent = "0";
}

document.querySelector(".clear").addEventListener("click", clearCalculator);

document.querySelectorAll(".number").forEach(button => {
    button.addEventListener("click", () => {
        if (shouldResetDisplay) {
            display.textContent = "";
            shouldResetDisplay = false;
        }
        if (display.textContent === "0") {
            display.textContent = button.textContent;
        } else {
            display.textContent += button.textContent;
        }
        currentInput = display.textContent;
    });
});

document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener("click", () => {
        if (firstNumber && operator) {
            secondNumber = currentInput;
            display.textContent = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
            firstNumber = display.textContent;
        } else {
            firstNumber = currentInput;
        }
        operator = button.dataset.operator;
        shouldResetDisplay = true;
    });
});

document.querySelector(".equal").addEventListener("click", () => {
    if (firstNumber && operator && currentInput) {
        secondNumber = currentInput;
        display.textContent = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
        firstNumber = display.textContent;
        operator = "";
        shouldResetDisplay = true;
    }
});

document.querySelector(".backspace").addEventListener("click", () => {
    display.textContent = display.textContent.slice(0, -1) || "0";
    currentInput = display.textContent;
});

document.querySelector(".decimal").addEventListener("click", () => {
    if (!display.textContent.includes(".")) {
        display.textContent += ".";
        currentInput = display.textContent;
    }
});

function operate(operator, a, b) {
    switch (operator) {
        case "+": return (a + b).toFixed(2);
        case "-": return (a - b).toFixed(2);
        case "*": return (a * b).toFixed(2);
        case "/": return b === 0 ? "Error" : (a / b).toFixed(2);
        default: return b;
    }
}