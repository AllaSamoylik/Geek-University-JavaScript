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


const products = [
    new Product(1, 'SKIRT', 'Jersey skirt', 800, 'skirt.jpg'),
    new Product(2, 'JEANS', 'Slim jeans', 1500, 'jeans.jpg'),
    new Product(3, 'DRESS', 'Viscose dress', 2300, 'dress.jpg'),
    new Product(4, 'BLOUSE', 'Cotton blouse', 500, 'blouse.jpg')
];


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
    },

    handlers() {
        document.querySelector('#catalog').addEventListener('click', event => {
            if (!event.target.classList.contains('p_img')) {
                return;
            }
            document.querySelector('.modal').style.display = "block";
            document.querySelector('.m_content').src = event.target.src;
        });

        document.querySelector('#catalog').addEventListener('click', event => {
            if (!event.target.classList.contains('m_close')) {
                return;
            }
            document.querySelector('.modal').style.display = "none";
        });
    }
};


const basket = {
    fillingBasket: [],

    init() {
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
        const basketTotalEl = document.querySelector('.b_total');
        basketTotalEl.textContent = (this.fillingBasket.length) ?
            `В корзине: ${this.getTotalProducts()} товара(ов) на сумму ${this.getTotalPrice()} рублей` :
            'Корзина пуста';
        document.querySelector('#basket').prepend(basketTotalEl);

        const buyEl = document.querySelector('#buy');
        buyEl.innerHTML = '';
        this.fillingBasket.forEach(product => {
            const buyTrEl = document.createElement('tr');
            buyTrEl.classList.add('buy_tr');
            buyEl.append(buyTrEl);
            buyTrEl.innerHTML =
                `
                <td>${product.name}</td>
                <td>${product.price} руб.</td>
                <td>${product.quantity} шт.</td>`;
        });

    },

    handlers() {
        document.querySelector('#catalog').addEventListener('click', event => {
            if (!event.target.classList.contains('p_buy-btn')) {
                return;
            }
            catalog.products.forEach(product => {
                if (product.name == event.target.dataset.name) {
                    this.addToBasket(product);
                }
            });
        });

        document.querySelector('.b_empty-btn').addEventListener('click', event => {
            this.emptyingBasket();
        });
    },

    addToBasket(selectedProduct) {
        if (this.fillingBasket.length == 0) {
            this.fillingBasket.push(selectedProduct);
        }
        else {
            let oneMore = false;
            this.fillingBasket.forEach(product => {
                if (selectedProduct.name == product.name) {
                    oneMore = true;
                    product.quantity += 1;
                }
            });
            if (!oneMore) {
                this.fillingBasket.push(selectedProduct);
            }
        };
        this.drow();
    },

    getTotalPrice() {
        return this.fillingBasket.reduce((counter, product) => {
            return counter + product.price * product.quantity;
        }, 0);
    },

    getTotalProducts() {
        return this.fillingBasket.reduce((counter, product) => {
            return counter + product.quantity;
        }, 0);
    },

    emptyingBasket() {
        this.fillingBasket = [];
        this.drow();
    }
};

catalog.init();
basket.init();
