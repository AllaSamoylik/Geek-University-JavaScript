shoppingBasket = [
    ['skirt', 800, 1],
    ['jeans', 1500, 1],
    ['dress', 2300, 1],
    ['top', 500, 3]
];

function countBasketPrice() {
    if (shoppingBasket.length == 0) {
        console.log("Корзина пуста");
    }
    else {
        let basketPrice = 0;
        for (products of shoppingBasket) {
            basketPrice += products[1] * products[2];
        }
        console.log(`Стоимость козины: ${basketPrice} руб.`);
    }
}

countBasketPrice();
