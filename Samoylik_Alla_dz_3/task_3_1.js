let isPrimeNumber = 0;
let stopNumber = 100;

while (isPrimeNumber <= stopNumber) {
    if (isPrimeNumber > 1) {
        let divider = 2;
        while (divider <= stopNumber) {
            if (isPrimeNumber % divider == 0) {
                if (isPrimeNumber == divider) {
                    console.log(isPrimeNumber);
                    break;
                }
                break;
            }
            divider++;
        }
    }
    isPrimeNumber++;
}
