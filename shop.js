"use strict";

let emptyCart = false; // переключатель корзины (полная / пустая)

function addCell(n, h, w, c, t = '') {  // css имя ячейки, высота, ширина, цвет, текст (создание блока)
    let block = document.createElement('div');
    block.id = n;
    block.style.width = w;
    block.style.height = h;
    block.style.background = c;
    block.textContent = t;
    return block
}
function Goods(name = '', price = 0, color = undefined, weight = undefined, quantity = 0) {   // описыввем функцию-генератор объектов
    this.name = name;                                                           // и свойства экземпляра объекта
    this.price = price;
    this.color = color;
    this.weight = weight;
    this.quantity = quantity
}

let summ = 0;
let inputStream = [['Plates', 44.5, , , 2], ['Spheres', 26.00, 'Red', 90, 5], ['Pyramids', 60.50, 'Blue', , 1],
['Cylinders', 33.18, , 145, 2], ['Cubes', 89.00, 'Green', , 10]]; // поток входных данных
let basket = [];                    // выходная корзина товаров

if (!emptyCart) { // если переключатель установлен, пропускаем наполнение корзины из входного потока
    for (let i of inputStream) {        // проходимся в цикле по входному потоку
        basket.push(new Goods(...i));   // и складываем экземпляры товаров с корзину
    }
}
//-----------------------------------------------------------------------------------------------------------------
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
    }
    summ = ~~(summ * 100) / 100;    // округление до сотых

    const lineSum = document.createElement('div'); // формируем итоговую строку
    lineSum.id = 'line';
    panel.appendChild(lineSum);
    lineSum.appendChild(addCell('cell', '30px', '100%', 'pink', 'В корзине: ' + basket.length + ' товаров, на сумму ' + summ + ' рублей'));
}
