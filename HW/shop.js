"use strict";

let seekSec = 0; // селектор раскрытия текстовых секций
let basket = []; // массив корзины
let inputStream = [['plates.png', 'Пластина', , 44.5, 'id0001'], ['spheres.png', 'Шарик', 'Красный', 26.00, 'id0002'], ['pyramids.png', 'Пирамидка', 'Синяя', 60.50, 'id0003'],
['cylinders.png', 'Цилиндр', , 33.15, 'id0004'], ['cubes.png', 'Кубик', 'Зелёный, из малахита добытого в Пермском крае', 89.00, 'id0005']]; // поток входных данных

const $goodList = document.querySelector('#goodList'); // хэндлеры объектов
const $bb = document.querySelector('#basketBlock');
const $popup = document.querySelector('#popup');
const $text1 = document.querySelector('#text1');
const $text2 = document.querySelector('#text2');
const $text3 = document.querySelector('#text3');
const $orderSend = document.querySelector('#orderSend');
const $orderBtn = document.querySelector('#orderBtn');
const $nextSectionBtn = document.querySelector('#nextSectionBtn');
const $closePopupBtn = document.querySelector('#closePopupBtn');
const $btnSect = document.querySelector('#btnSect');
const $clearBtn = document.querySelector('#clearBtn');
const htmlEmpty = `<div class="good"><div class="basketImg"><img src='img/empty.png'></div><div class="basketDesc">Корзина пуста</div></div>`; // html пустой корзины

function Goods(pic = '', name = '', color = undefined, price = 0, id, quantity = 1) {   // описыввем функцию-генератор объектов
    this.pic = pic;
    this.name = name;                                                           // и свойства экземпляра объекта
    this.price = price;
    this.color = color;
    this.id = id;
    this.quantity = quantity
}

function addGoodToList(img, title, desc = 'Описание отсутствует.', price, id) { // формируем html код для каждой строки товара
    img = 'img/' + img; // добавляем путь к картинкам
    const html = `<div class="good"> 
        <div class="photo"><img src=${img}></div>
        <div class="name"><h3>${title}</h3></div>
        <div class="desc">${desc}</div>
        <div class="price">${price} руб.</div>
        <div class="btn"><button data-id="${id}">Купить</button></div>
    </div>`;
    $goodList.insertAdjacentHTML('beforeend', html); // добавляем сгенерированный html на страницу
}

function addToBasket(goodID) { // добавление товаров в массив корзины
    let noGood = true; // флаг отсутствия товара в корзине
    for (const i of basket) { // сначала пробегаемся по массиву корзины 
        if (i.id == goodID) { // и смотри, если там уже такой товар
            i.quantity += 1; // если есть, увеличиваем его количество
            noGood = false; // и сбрасываем флаг отсутствия
            break;
        }
    }
    if (noGood) { // если товар отсутствует в массиве корзины
        for (const i of inputStream) { // ищем все данные о нём во входном потоке
            if (i[4] == goodID) { // если нашли
                basket.push(new Goods(...i)); //закидываем в массив
                break;
            }
        }
    }
}

function drawGoodList(inStrm) { // вывод на страницу строк с товаром
    let n = 0; // стартовое смещение для последнего блока (корзины)
    for (const i of inStrm) { // проходимся по входному потоку, 
        addGoodToList(...i); // и выводим на страницу html блоки с товарами
        n += 127; // с каждым выведенным блоком корректируем смещение для последнего блока (корзины)
    }
    $goodList.style.height = n + 'px'; // изменяем размер блока списка товаров с учётом количества блоков товаров
}

function drawBasket() {
    $bb.insertAdjacentHTML('beforeend', htmlEmpty); // добавляем последний html блок для пустой корзины
}

$goodList.addEventListener('click', function (e) { // слушаем события нажатий на кнопку "Купить"
    let goodCnt = 0, goodSum = 0; // обнуляем переменные количества добавленных в корзину товаров и их сумму
    let clcId = e.target.getAttribute('data-id'); // получаем ID нажатой кнопки
    if (clcId) { // если ID не пустой
        addToBasket(clcId); // добавляем товар с выбранным ID в массив корзиины
        for (const i of basket) { // пересчитываем количество и стоимость товаров в корзине (хотя можно реализовать и ленивый подсчёт)
            goodCnt += i.quantity;
            goodSum += i.quantity * i.price;
        }
        $bb.innerHTML = `<div class="good"><div class="basketImg"><img src='img/full.png'></div>
        <div class="basketDesc">В корзине товаров: ${goodCnt} <br> На сумму: ${goodSum} руб.</div>
        </div>`; // меняем html код корзины в соостветсвии с тем что насчитали
    };
})

function nextSect() { // переключатель раскрытия секций в блоке корзины
    const sectmax = 280;
    const sectmin = 15;
    switch (seekSec) { // изменяем размеры текстовых полей в соответсвии с селектором
        case 0: // тоеже можно реализовать с меньшим количеством кода
            $text1.style.height = sectmax + 'px';
            $text2.style.height = sectmin + 'px';
            $text3.style.height = sectmin + 'px';
            break;
        case 1:
            $text1.style.height = sectmin + 'px';
            $text2.style.height = sectmax + 'px';
            $text3.style.height = sectmin + 'px';
            break;
        case 2:
            $text1.style.height = sectmin + 'px';
            $text2.style.height = sectmin + 'px';
            $text3.style.height = sectmax + 'px';
            break;
        default:
            $text1.style.height = sectmin + 'px';
            $text2.style.height = sectmin + 'px';
            $text3.style.height = sectmin + 'px';
    }
    if (seekSec == 2) { // проверяем селектор на предмет выхода за пределы перебора
        seekSec = 0;
    }
    else {
        seekSec += 1; // есди не вышли - увеличиваем
    }
}

function showPopup() { // раскрытие подробностей о корзине
    let basketSumm = 0, tmpSumm = 0;
    seekSec = 0; // будем открывать первый текстовый блок
    $text1.textContent = ''; // обнуляем текстовое поле состава корзины
    $orderSend.style.display = 'none';
    if (basket.length > 0) {
        $popup.style.display = 'block'
    }
    for (const i of basket) { // наполняем текстовый блок составом корзины
        tmpSumm = i.quantity * i.price // сумма по позиции
        basketSumm += tmpSumm; // подсчёт общей суммы
        $text1.textContent += i.name + ' => ' + i.quantity + 'шт., на сумму ' + tmpSumm + ' руб. \n'
    }
    $text1.textContent += 'Общая сумма заказа: ' + basketSumm + 'руб.'
    nextSect(); // раскрываем блоки при первом открытии
}

function clearBasket() { // очистка корзины и всех упоминаний о товарах
    basket = [];
    $text1.textContent = '';
    $bb.innerHTML = htmlEmpty;
}

function hidePopup() { // закрываем подробности о корзине
    $popup.style.display = 'none';
    seekSec = 0;
    if ($btnSect.style.display == 'none') { // если закрытие после сделанного заказа
        clearBasket(); // то ещё и корзину очищаем
        $btnSect.style.display = 'flex'; // и возвращаем кнопки к показу
    }
}

function clrBask() { // реакция на конопку "Очистить"
    clearBasket() // очистить корзину
    hidePopup(); // спрятать попап
}

function order() { // реакция на кнопку "Заказать"
    seekSec = 3; // сворачиваем все текстовые блоки
    nextSect(); //
    $orderSend.style.display = 'block'; // показываем надпись
    $btnSect.style.display = 'none'; // прячем кнопки
}

$bb.addEventListener('click', showPopup); // слушатели событий
$closePopupBtn.addEventListener('click', hidePopup);
$nextSectionBtn.addEventListener('click', nextSect);
$orderBtn.addEventListener('click', order);
$clearBtn.addEventListener('click', clrBask);

drawGoodList(inputStream); // первичная прорисовка списка товаров
drawBasket(basket); // первичная прорисовка корзины
