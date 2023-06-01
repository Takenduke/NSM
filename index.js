let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
    body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'Bolacha',
        image: 'bolachas-ou-biscoitos.jpg',
        price: 2.00
    },
    {
        id: 2,
        name: 'Achocolatado',
        image: 'Todin.jpg',
        price: 99.00
    },
    {
        id: 3,
        name: 'Miojo',
        image: 'miojo.png',
        price: 5.00
    },
    {
        id: 4,
        name: 'irmã da Coca-Cola',
        image: 'PEPSI.png',
        price: 8.00
    },
    {
        id: 5,
        name: 'Repelente para Mulher',
        image: 'LOL.jpg',
        price: 5.00
    },
    {
        id: 6,
        name: 'Coca-Cola',
        image: 'coca.png',
        price: 8.00
    },
    {
        id: 7,
        name: 'Livro: "Como falar com seu gato sobre segurança de armas: e abstinência, drogas, satanismo e outros perigos que ameaçam suas nove vidas"',
        image: 'gato.jpg',
        price: 60.00
    },
    {
        id: 8,
        name: 'Livro: "Como sobreviver a um ataque de gnomo de jardim: defenda-se quando os guerreiros do gramado atacarem (e eles o farão)"<br><br>',
        image: 'Gnome.jpg',
        price: 79.00
    },
    {
        id: 9,
        name: 'Cafeteira do Star-Wars <br><br><br><br><br><br>',
        image: 'cafeteira.webp',
        price: 164.00
    },
    {
        id: 10,
        name: 'Almofada Nicolas Cage',
        image: 'Nicolau maduro.jpg',
        price: 60.00
    },
    {
        id: 11,
        name: 'Agua desidratada',
        image: 'Agua.jpg',
        price: 15.00
    },
    {
        id: 12,
        name: 'Nada',
        image: 'NADA.jpg',
        price: 60.00
    }
];
let listCards = [];
function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="img/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">R$${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Adcionar ao Carrinho</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key) {
    if (listCards[key] == null) {
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard() {
    listCard.innerHTML = ' ';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        totalPrice = totalPrice + value.price + value.price * 0.15;
        count = count + value.quantity;
        if (value != null) {
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="img/${value.image}"/></div>
                <div>${value.name}</div>
                <div>R$${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    })
    total.innerText = 'R$' + totalPrice.toLocaleString();
    quantity.innerText = count;
}
function changeQuantity(key, quantity) {
    if (quantity == 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}