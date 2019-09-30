function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const stack = [];
    const rpn = [];
    for (let i = 0; i < expr.length; i++) {
        let str = '';
        if (expr[i] !== ' ') {
        if (expr[i] === '(') {
            stack.push(expr[i]);
        } else  if (expr[i] === ')') {
            while (stack[stack.length - 1] !== '(') {
                rpn.push(stack.pop())
                if (!stack.length) throw Error('ExpressionError: Brackets must be paired');
            }
            stack.pop();
        } else  if (priority(expr[i])) {
           if (stack.length) {
            while (priority(stack[stack.length - 1]) >= priority(expr[i])) {
                rpn.push(stack.pop());
           }
        }
           stack.push(expr[i]);
        } else { 
                while (!priority(expr[i]) && i < expr.length) {
                    if (expr[i] !== ' ') {
                        str += expr[i];
                    }
                    i++;
                }
            rpn.push(+str);
            i--;
            }
        }
    }
    while (stack.length) rpn.push(stack.pop());
    let a, b, result;
    if (rpn.indexOf('(') !== -1) throw Error('ExpressionError: Brackets must be paired')
    while (rpn.length > 1) {
        let operator = rpn.find(priority);
        let index = rpn.indexOf(operator);
        a = rpn[index - 2];
        b = rpn[index - 1];
        if (operator === '/' && b === 0) throw Error('TypeError: Division by zero.');
        switch (operator) {
            case '+': result = a + b;  break;
            case '-': result = a - b; break;
            case '*': result = a * b; break;
            case '/': result = a / b; break;
        }
        rpn.splice(index - 2, 3, result);
    }
    return rpn[0];
}

function priority(char) {
	switch (char) {
    case '(': case ')': return 1;
    case '+': case '-': return 2; 
    case '*': case '/': return 3;
	default: return 0;
	}
}

module.exports = {
    expressionCalculator
}
