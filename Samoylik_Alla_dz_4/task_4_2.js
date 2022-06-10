function Product(article, name, price) {
    this.article = article;
    this.name = name;
    this.price = price;
}

let skirt = new Product(25674, 'Jersey skirt', 800);
let jeans = new Product(17554, 'Slim jeans', 1500);
let dress = new Product(91244, 'Viscose dress', 2300);
let blouse = new Product(11363, 'Cotton blouse', 500);


let shoppingBasket = {
    fillingBasket: [],
    addToBasket: function (productToBasket, quantity = 1) {
        productToBasket.quantity = quantity;
        this.fillingBasket.push(productToBasket);
    },
    getBasketPrice: function () {
        if (!this.fillingBasket.length) {
            console.log("Корзина пуста");
        }
        else {
            basketPrice = 0;
            this.fillingBasket.forEach(function (item) {
                this.basketPrice += item.price * item.quantity;
            });
            console.log(`Стоимость козины: ${basketPrice} руб.`);
        }
    },
}

shoppingBasket.addToBasket(skirt, 2);
shoppingBasket.addToBasket(jeans);
shoppingBasket.addToBasket(blouse, 3);
shoppingBasket.getBasketPrice();
console.log(shoppingBasket.fillingBasket);
