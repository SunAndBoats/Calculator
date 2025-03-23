

/* script.js */
const display = document.getElementById("display");
let currentValue = "0";
let firstOperand = null;
let secondOperand = null;
let operator = null;

function updateDisplay() {
    display.textContent = currentValue;
}

document.querySelectorAll(".btn.number").forEach(button => {
    button.addEventListener("click", () => {
        if (currentValue === "0") {
            currentValue = button.textContent;
        } else {
            currentValue += button.textContent;
        }
        updateDisplay();
    });
});

document.querySelector(".clear").addEventListener("click", () => {
    currentValue = "0";
    firstOperand = null;
    secondOperand = null;
    operator = null;
    updateDisplay();
});

document.querySelector(".backspace").addEventListener("click", () => {
    currentValue = currentValue.slice(0, -1) || "0";
    updateDisplay();
});

document.querySelectorAll(".btn.operator").forEach(button => {
    button.addEventListener("click", () => {
        if (firstOperand === null) {
            firstOperand = parseFloat(currentValue);
        } else if (operator) {
            secondOperand = parseFloat(currentValue);
            currentValue = String(operate(operator, firstOperand, secondOperand));
            firstOperand = parseFloat(currentValue);
        }
        operator = button.dataset.operator;
        currentValue = "0";
        updateDisplay();
    });
});

document.querySelector(".equal").addEventListener("click", () => {
    if (operator && firstOperand !== null) {
        secondOperand = parseFloat(currentValue);
        currentValue = String(operate(operator, firstOperand, secondOperand));
        firstOperand = null;
        operator = null;
        updateDisplay();
    }
});

document.querySelectorAll(".btn.function").forEach(button => {
    button.addEventListener("click", () => {
        let func = button.dataset.function;
        let num = parseFloat(currentValue);
        switch (func) {
            case "sin": currentValue = String(Math.sin(num)); break;
            case "cos": currentValue = String(Math.cos(num)); break;
            case "tan": currentValue = String(Math.tan(num)); break;
            case "sqrt": currentValue = String(Math.sqrt(num)); break;
            case "log": currentValue = String(Math.log10(num)); break;
            case "exp": currentValue = String(Math.exp(num)); break;
            case "pi": currentValue = String(Math.PI); break;
        }
        updateDisplay();
    });
});

function operate(op, a, b) {
    switch (op) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return b !== 0 ? a / b : "Error";
        case "%": return (a / 100) * b;
        default: return "Error";
    }
}

updateDisplay();
