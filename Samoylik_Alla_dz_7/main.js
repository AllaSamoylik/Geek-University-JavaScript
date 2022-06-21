//Навигация
const navigation = {
    init() {
        this.draw();
    },
    draw() {
        const navEl = document.querySelector('#navigation');

        const navHomeEl = document.createElement('a');
        navHomeEl.href = "index.html";
        const imgHomeEl = new Image(30, 30);
        imgHomeEl.src = 'img/nav-home.png';
        navHomeEl.append(imgHomeEl);
        navEl.append(navHomeEl);

        const navBasketEl = document.createElement('a');
        navBasketEl.href = "basket.html";
        const imgBasketEl = new Image(30, 30);
        imgBasketEl.src = 'img/nav-basket.png';
        navBasketEl.append(imgBasketEl);
        navEl.append(navBasketEl);
    }
};


// Конструктор продукта + разметка
const productsList = [];
class Product {
    constructor(id, name, description, price, image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.color = '';
        this.size = '';
        this.image = image;
        this.price = price;
        this.quantity = 1;
        productsList.push(this);
    }

    markup() {
        return `
        <div class="product">
            <img class="p_img" src="${this.image}" alt="">
            <div class="p_name">${this.name}</div>
            <div>${this.description}</div>
            <div class="p_price">${this.price} руб.</div>
            <button class="p_buy-btn" data-name="${this.name}">Купить</button>
        </div>`;
    }
};


// Товары
const products = [
    new Product(1, 'SKIRT', 'Jersey skirt', 800, 'img/skirt.jpg'),
    new Product(2, 'JEANS', 'Slim jeans', 1500, 'img/jeans.jpg'),
    new Product(3, 'DRESS', 'Viscose dress', 2300, 'img/dress.jpg'),
    new Product(4, 'BLOUSE', 'Cotton blouse', 500, 'img/blouse.jpg')
];


// Каталог
fillingBasket = [];
const catalog = {
    products: productsList,
    init() {
        this.draw();
        this.handlers();
    },

    draw() {
        const catalogEl = document.querySelector('#catalog');
        catalogEl.innerHTML = products.map(product => product.markup()).join("");

        const modalEl = document.createElement('div');
        modalEl.classList.add('modal');
        catalogEl.append(modalEl);
        const modalCloseEl = document.createElement('span');
        modalCloseEl.classList.add('m_close');
        modalCloseEl.textContent = 'x';
        const modalContentEl = document.createElement('img');
        modalContentEl.classList.add('m_content');
        modalEl.append(modalCloseEl, modalContentEl);

        const messageEl = document.createElement('div');
        messageEl.classList.add('message');
        messageEl.style.display = 'none';
        catalogEl.append(messageEl);
    },

    handlers() {
        // Слушаем кнопки "Купить"
        document.querySelector('#catalog').addEventListener('click', event => {
            if (!event.target.classList.contains('p_buy-btn')) {
                return;
            }
            catalog.products.forEach(product => {
                if (product.name == event.target.dataset.name) {
                    this.addToBasket(product);
                    this.sayAdd(product);
                }
            });
        });
        // Слушаем фото для модалки
        document.querySelector('#catalog').addEventListener('click', event => {
            if (!event.target.classList.contains('p_img')) {
                return;
            }
            document.querySelector('.modal').style.display = "block";
            document.querySelector('.m_content').src = event.target.src;
        });
        // Слушаем [х] в модалке
        document.querySelector('#catalog').addEventListener('click', event => {
            if (!event.target.classList.contains('m_close')) {
                return;
            }
            document.querySelector('.modal').style.display = "none";
        });
    },

    addToBasket(selectedProduct) {
        if (fillingBasket.length == 0) {
            fillingBasket.push(selectedProduct);
        }
        else {
            let oneMore = false;
            fillingBasket.forEach(product => {
                if (selectedProduct.name == product.name) {
                    oneMore = true;
                    product.quantity += 1;
                }
            });
            if (!oneMore) {
                fillingBasket.push(selectedProduct);
            }
        }
        // Отдаём корзину на страницу #basket
        localStorage.setItem('fillingBasket', JSON.stringify(fillingBasket));
    },

    sayAdd(product) {
        const messageAdd = document.querySelector('.message')
        messageAdd.style.display = 'block';
        messageAdd.textContent = `${product.name} добавлен в корзину`;
        setTimeout(function () {
            messageAdd.style.display = 'none';
        }, 1000);
    }
};


// Корзина
const basket = {
    init() {
        // Получаем корзину из #catalog
        isAnyData = localStorage.getItem('fillingBasket');
        if (isAnyData) {
            fillingBasket = JSON.parse(localStorage.getItem('fillingBasket'));
        }

        const basketEl = document.querySelector('#basket');

        const basketTotalEl = document.createElement('div');
        basketTotalEl.classList.add('b_total');
        basketEl.prepend(basketTotalEl);

        const basketEmptyingEl = document.createElement('button');
        basketEmptyingEl.classList.add('b_empty-btn');
        basketEmptyingEl.textContent = 'Очистить';
        basketEl.append(basketEmptyingEl);

        this.drow();
        this.handlers();
    },

    drow() {
        // Рисуем счетчики корзины
        const basketTotalEl = document.querySelector('.b_total');
        basketTotalEl.textContent = (fillingBasket.length) ?
            `В корзине: ${this.getTotalProducts()} товара(ов) на сумму ${this.getTotalPrice()} рублей` :
            'Корзина пуста';
        document.querySelector('#basket').prepend(basketTotalEl);
        //Рисуем состав корзины
        const buyEl = document.querySelector('#buy');
        buyEl.innerHTML = '';
        fillingBasket.forEach(product => {
            const buyTrEl = document.createElement('tr');
            buyTrEl.classList.add('buy_tr');
            buyEl.append(buyTrEl);
            buyTrEl.innerHTML =
                `
                <td>${product.name}</td>
                <td>${product.price} руб.</td>
                <td>
                <button class="buy_btn-minus buy_btn" data-name="${product.name}">-</button> ${product.quantity} шт. <button class="buy_btn-plus buy_btn" data-name="${product.name}">+</button>
                </td>`;
        });
        // Обновляем корзину в localStorage
        localStorage.setItem('fillingBasket', JSON.stringify(fillingBasket));
        // Рисуем форму заказа
        const orderingEl = document.querySelector('#ordering');
        if (orderingEl.children.length == 0) {
            const orderingHTML = `
            <button class='o_btn'>Перейти к оформлению заказа</button>
            <form id="data" class="o_content">
                <label for="address">Адрес доставки</label>
                <div class="o_address o_unit">
                    <input class="address data" type="text" placeholder="Город, улица, дом, квартира">
                    <button class="next_button">Далее</button>
                </div>
                <label for="comments">Комментарии</label>
                <div class="o_comments o_unit">
                    <input class="comments data" type="text" placeholder="Дополнительная информация">
                    <button class="next_button">Далее</button>
                </div>
                <p><button class="checkout" type="submit" form="data">Оформить заказ</button></p>
            </form>
            `;
            orderingEl.insertAdjacentHTML("afterbegin", orderingHTML);
        }
    },

    handlers() {
        // Слушаем кнопку "Очистить"
        document.querySelector('.b_empty-btn').addEventListener('click', event => {
            this.emptyingBasket();
        });
        // Слушаем кнопки [-] / [+]
        document.querySelector('#buy').addEventListener('click', event => {
            if (!event.target.classList.contains('buy_btn-minus') &&
                !event.target.classList.contains('buy_btn-plus')) {
                return;
            }
            const productName = event.target.getAttribute('data-name');
            const changeProductQua = this.findProductByName(productName);

            if (event.target.classList.contains('buy_btn-minus')) {
                changeProductQua.quantity--;
                if (changeProductQua.quantity < 1) {
                    for (let key in fillingBasket) {
                        if (fillingBasket[key] == changeProductQua) {
                            fillingBasket.splice(key, 1)
                        }
                    }
                }
            }
            if (event.target.classList.contains('buy_btn-plus')) {
                changeProductQua.quantity++;
            }
            this.drow();
        });
        // Слушаем кнопку "Перейти к оформлению"
        const orderingEl = document.querySelector('#ordering');
        const orderingContentEl = document.querySelector('.o_content');

        orderingEl.addEventListener('click', event => {
            event.preventDefault();
            if (!event.target.classList.contains('o_btn')) {
                return;
            }
            event.target.classList.toggle("active");
            const allEl = document.querySelector('.o_content');
            allEl.style.display = (allEl.style.display == 'block') ? 'none' : 'block';
        });
        // Слушаем кнопки "Далее"
        orderingContentEl.addEventListener('click', event => {
            event.preventDefault();
            if (!event.target.classList.contains('next_button')) {
                return;
            }

            if (this.validForm(event.target)) {
                const orderingUnit = event.target.parentElement;
                orderingUnit.style.display = (orderingUnit.style.display == 'none') ? 'block' : 'none';

                const orderingNextUnit = this.findNext(orderingUnit);
                if (orderingNextUnit) {
                    orderingNextUnit.style.display = (orderingUnit.style.display == 'block') ? 'none' : 'block';
                }
            }
        });
        // Слушаем кнопку "Оформить заказ"
        orderingEl.addEventListener('click', event => {
            if (!event.target.classList.contains('checkout')) {
                return;
            }
            localStorage.clear();
            location.reload();
            alert('Спасибо за заказ!');
        });
    },

    findProductByName(productName) {
        for (i = 0; i < fillingBasket.length; i++) {
            if (fillingBasket[i].name == productName) {
                return fillingBasket[i];
            }
        }
    },

    getTotalPrice() {
        return fillingBasket.reduce((counter, product) => {
            return counter + product.price * product.quantity;
        }, 0);
    },

    getTotalProducts() {
        return fillingBasket.reduce((counter, product) => {
            return counter + product.quantity;
        }, 0);
    },

    emptyingBasket() {
        localStorage.clear();
        location.reload();
        fillingBasket = [];
        this.drow();
    },

    findNext(elem) {
        let nextUnit = elem.nextElementSibling;
        while (nextUnit) {
            if (nextUnit.classList.contains('o_unit')) {
                return nextUnit;
            }
            nextUnit = nextUnit.nextElementSibling;
        }
        return null;
    },

    validForm(eBtn) {
        if (eBtn.previousElementSibling.value == "") {
            alert('Пожалуйста, введите данные');
            eBtn.previousElementSibling.focus();
            return false;
        }
        return true;
    }
};



navigation.init();
if (document.body.dataset.page == 'catalog') {
    catalog.init();
}
if (document.body.dataset.page == 'basket') {
    basket.init();
}
