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

let a = +prompt("Задайте значение для первого аргумента");
let b = +prompt("Задайте значение для второго аргумента");

console.log(`${a} + ${b} = ${add(a, b)}`);
console.log(`${a} - ${b} = ${sub(a, b)}`);
console.log(`${a} * ${b} = ${mult(a, b)}`);
console.log(`${a} / ${b} = ${div(a, b)}`);
