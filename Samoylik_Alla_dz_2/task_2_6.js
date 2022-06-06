function add(arg1, arg2) {
    return arg1 + arg2;
}

function sub(arg1, arg2) {
    return arg1 - arg2;
}

function mult(arg1, arg2) {
    return arg1 * arg2;
}

function div(arg1, arg2) {
    return (arg1 / arg2).toFixed(2);
}

function mathOperation(arg1, arg2, operation) {
    switch (operation) {
        case '+':
            console.log(add(arg1, arg2));
            break;
        case '-':
            console.log(sub(arg1, arg2));
            break;
        case '*':
            console.log(mult(arg1, arg2));
            break;
        case '/':
            console.log(div(arg1, arg2));
            break;
        default:
            console.log("Введена некорректная операция")
    }
}

let a = +prompt("Задайте значение для первого аргумента");
let sign = prompt("Выберите операцию: + - * /")
let b = +prompt("Задайте значение для второго аргумента");

mathOperation(a, b, sign);
