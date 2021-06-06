"use strict";

let emptyCart = false; // переключатель корзины (полная / пустая)
let inputStream = [['Plates', 44.5], ['Spheres', 26.00, 'Red'], ['Pyramids', 60.50, 'Blue'],
['Cylinders', 33.18], ['Cubes', 89.00, 'Green']]; // поток входных данных
let basket = [];                    // выходная корзина товаров

function addCell(na, hi, wi, co, te = '', cl = '') {  // css имя ячейки, высота, ширина, цвет, текст (создание блока), class
    let block = document.createElement('div');
    block.id = na;
    block.style.width = wi;
    block.style.height = hi;
    block.style.background = co;
    block.textContent = te;
    if (cl > '') { // если был передан class, то устанавливаем его 
        block.className = cl;
    }
    return block
}

function Goods(name = '', price = 0, color = undefined, quantity = 1) {   // описыввем функцию-генератор объектов
    this.name = name;                                                           // и свойства экземпляра объекта
    this.price = price;
    this.color = color;
    this.quantity = quantity
}

function drawCart() {
    let goods = 0;
    let summ = 0;
    const panel = document.createElement('div'); // генерация вывода
    panel.id = 'shopCart';
    document.body.appendChild(panel);  // создаём контейнер (доску)

    const line = document.createElement('div');
    line.id = 'line';
    panel.appendChild(line); // создаём первую строку в контейнере, которую заполняем в зависимости от состояния корзины

    if (basket.length == 0) { // если корзина пуста, сообщаем об этом
        line.appendChild(addCell('cell', '30px', '100%', 'lightGray', 'Корзина пуста'));
    }
    else { // иначе формируем красивый вывод
        line.appendChild(addCell('cell', '30px', '50%', 'lightGray', 'Название'));
        line.appendChild(addCell('cell', '30px', '15%', 'lightGray', 'Кол-во'));
        line.appendChild(addCell('cell', '30px', '15%', 'lightGray', 'Цена'));
        line.appendChild(addCell('cell', '30px', '20%', 'lightGray', 'Сумма'));

        for (let i of basket) { // перебираем товары в корзине
            const line = document.createElement('div');
            line.id = 'line';
            panel.appendChild(line);
            let s = i.price * i.quantity
            line.appendChild(addCell('cell', '30px', '50%', 'white', i.name));
            line.appendChild(addCell('cell', '30px', '15%', 'white', i.quantity));
            line.appendChild(addCell('cell', '30px', '15%', 'white', i.price));
            line.appendChild(addCell('cell', '30px', '20%', 'white', s));
            summ += s;
            goods += i.quantity;
        }
        summ = ~~(summ * 100) / 100;    // округление до сотых

        const lineSum = document.createElement('div'); // формируем итоговую строку
        lineSum.id = 'line';
        panel.appendChild(lineSum);
        lineSum.appendChild(addCell('cell', '30px', '100%', 'pink', 'В корзине: ' + goods + ' товаров, на сумму ' + summ + ' рублей'));
    }
}

function addToCart(GoodName) {
    let i = [];
    let noGood = true; // флаг отсутствия товара в корзине
    for (i of basket) { // проходимся по корзине
        if (i.name == GoodName) { // если в корзине уже есть такой товар, просто увеличиваем количество
            i.quantity += 1;
            noGood = false; // сбрасываем флаг
            break; // выходим из цикла
        }
    }
    if (noGood) { // если флаг не сброшен, значита такого товара в корзине ещё не было
        for (i of inputStream) {        // проходимся в цикле по входному потоку
            if (i[0] == GoodName) {
                basket.push(new Goods(...i));   // создаём экземпляр товара в корзине
                break;  // выходим из цикла
            }
        }
    }
    drawCart(); // перерисовываем корзину
}

function drawProduct() {
    const panelP = document.createElement('div'); // генерация вывода
    panelP.id = 'products';
    document.body.appendChild(panelP);  // создаём контейнер (доску)

    const line = document.createElement('div');
    line.id = 'line';
    panelP.appendChild(line); // создаём первую строку в контейнере, которую заполняем в зависимости от состояния корзины

    line.appendChild(addCell('cell', '30px', '60%', 'lightGreen', 'Название'));
    line.appendChild(addCell('cell', '30px', '20%', 'lightGreen', 'Цена'));
    line.appendChild(addCell('cell', '30px', '20%', 'lightGreen', ''));
    for (let i of inputStream) {        // проходимся в цикле по входному потоку

        const line = document.createElement('div');
        line.id = 'line';
        panelP.appendChild(line);
        line.appendChild(addCell('cell', '30px', '60%', 'white', i[2] ? i[0] + ' (' + i[2] + ')' : i[0])); // формируем название с указанием цвета (если есть)
        line.appendChild(addCell('cell', '30px', '20%', 'white', i[1]));
        line.appendChild(addCell('cell', '30px', '20%', 'white', 'Купить', i[0])); // задаём блоку класс с именем товара
    }
    panelP.addEventListener('click', function (e) { // добавляем слушателя события "click" ко всей панели целиком
        // вызываем функцию добавления товара и передаём ей имя класса
        if (e.target.className > '') { // классы присвоены блокам с текстом "Купить", значит клик на тексте
            addToCart(e.target.className); // добавляем в корзину товар с указанным классом
        }
    })
}

//-----------------------------------------------------------------------------------------------------------------

drawProduct(); // начальная отрисовка товаров
drawCart(); // и корзины
