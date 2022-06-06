let a = +prompt("Задайте значение для переменной 'a'");
let b = +prompt("Задайте значение для переменной 'b'");

if (a >= 0 && b >= 0) {
    console.log(`Разность 'a' и 'b' равна ${a - b}`)
}
else if (a < 0 && b < 0) {
    console.log(`Произведение 'a' и 'b' равно ${a * b}`)
}
else {
    console.log(`Сумма 'a' и 'b' равна ${a + b}`)
}
