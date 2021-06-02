
// Задача 1.
// Создать функцию, генерирующую шахматную доску. Можно использовать любые html-теги.
// Доска должна быть верно разлинована на черные и белые ячейки. Строки должны
// нумероваться числами от 1 до 8, столбцы — латинскими буквами A, B, C, D, E, F, G, H.

function addCell(h, w, c, t = '') {  // высота, ширина, цвет, текст (создание блока)
    let block = document.createElement('div');
    block.id = 'cell';
    block.style.width = w;
    block.style.height = h;
    block.style.background = c;
    block.textContent = t;
    return block
}

let ch = 'ABCDEFGH'; // итератор для подписей столбцов
const board = document.createElement('div');
board.id = 'board';
document.body.appendChild(board);  // создаём контейнер (доску)

for (let i = 8; i >= 0; i--) {  // создаём строки для заполнения
    const line = document.createElement('div');
    line.id = 'line';
    board.appendChild(line);

    if (i == 0) {   // формирование нижней строки с подписями
        line.appendChild(addCell('20px', '20px', 'white')); // рисуем левый нижний угловой квадратик
        for (let c of ch) {  // подписи столбцов (буквами)
            line.appendChild(addCell('20px', '60px', 'lightGray', c)); // рисуем элементы подписей столбцов
        }
    }
    else { // формирование строк с клетками
        line.appendChild(addCell('60px', '20px', 'lightGray', i));  // рисуем элементы подписей строк в начале каждой строки
        for (let j = 8; j > 0; j--) {
            if ((i + j) % 2) {  // вычисляем цвет клетки
                col = 'black';
            }
            else {
                col = 'white';
            }
            line.appendChild(addCell('60px', '60px', col)); // рисуем клетку в строке
        }
    }
}