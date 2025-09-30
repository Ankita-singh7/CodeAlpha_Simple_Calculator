
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.buttons button[data-key]');
const clearBtn = document.getElementById('clear');
const equalsBtn = document.getElementById('equals');
let current = '';
let lastResult = '';

function updateDisplay(val) {
    display.value = val;
}

function appendInput(key) {
    if (key === '.' && current.includes('.')) return;
    current += key;
    updateDisplay(current);
}

function clearDisplay() {
    current = '';
    updateDisplay('');
}

function calculate() {
    try {
        let result = eval(current.replace(/÷/g, '/').replace(/×/g, '*'));
        lastResult = result;
        updateDisplay(result);
        current = '' + result;
    } catch (e) {
        updateDisplay('Error');
        current = '';
    }
}

buttons.forEach(button => {
    button.addEventListener('click', e => {
        let key = button.getAttribute('data-key');
        appendInput(key);
    });
});

clearBtn.addEventListener('click', clearDisplay);
equalsBtn.addEventListener('click', calculate);

document.addEventListener('keydown', e => {
    let key = e.key;
    if ((key >= '0' && key <= '9') || key === '.' || key === '+' || key === '-' || key === '*' || key === '/') {
        appendInput(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearDisplay();
    }
});
