let productsList = [];
function Product(article, name, price) {
    this.article = article;
    this.name = name;
    this.price = price;
    this.pushThis = productsList.push(this)
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
        let basketPrice = 0;
        let basketProducts = 0;
        this.fillingBasket.forEach(function (item) {
            basketPrice += item.price * item.quantity;
            basketProducts += item.quantity;
        });
        return [basketPrice, basketProducts];
    },
}

shoppingBasket.addToBasket(skirt, 2);
shoppingBasket.addToBasket(jeans);
shoppingBasket.addToBasket(blouse, 3);


function sendBasket(currentBasket) {
    let basket = document.querySelector('#basket');

    let sendBasketTotal = currentBasket.getBasketPrice();
    if (sendBasketTotal[0] != 0) {
        basket.insertAdjacentHTML('afterbegin', `В корзине: ${sendBasketTotal[1]} товаров на сумму ${sendBasketTotal[0]} рублей`);
    }
    else {
        basket.insertAdjacentHTML('afterbegin', "Корзина пуста")
    }
}


function sendCatalog(currentProductsList) {
    let catalog = document.querySelector('#catalog');

    let productsCatalog = function () {
        catalogArr = [];
        for (let obj of currentProductsList) {
            catalogArr.push(`Наименование: ${obj.name}, цена: ${obj.price}`)
        };
        return catalogArr;
    }
    catalog.insertAdjacentHTML('afterbegin', `Каталог: ${productsCatalog()} `);
}

sendBasket(shoppingBasket);
sendCatalog(productsList);
