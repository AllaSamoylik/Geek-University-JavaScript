function power(val, pow) {
    if (pow == 0) {
        return 1;
    }
    if (pow == 1) {
        return val;
    }
    return val * power(val, pow - 1);
}

let val = +prompt("Задайте число");
let pow = +prompt("Задайте степень");

console.log(`${val} в степени ${pow} равно ${power(val, pow)}`);
