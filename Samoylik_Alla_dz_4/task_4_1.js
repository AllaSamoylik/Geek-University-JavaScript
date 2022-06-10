function numberToObject(number) {
    let numObject = {};
    if (Number(number) > 999) {
        console.log("Введённое число больше 999");
        return numObject;
    }
    else {
        if (number.length < 3) {
            number = number.padStart(3, '0')
        }
        let numArray = Array.from(number, Number);
        numObject['единицы'] = +numArray[2];
        numObject['десятки'] = +numArray[1];
        numObject['сотни'] = +numArray[0];
        return numObject;
    }

}

console.log(numberToObject(prompt("Введите число в промежутке [0..999]")));
