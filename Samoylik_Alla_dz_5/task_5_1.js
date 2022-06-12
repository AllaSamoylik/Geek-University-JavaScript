const body = document.querySelector('body');
body.insertAdjacentHTML('afterbegin', '<div class="chessBoard"></div>');

const letters = ['', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', ''];
const numbers = ['', 8, 7, 6, 5, 4, 3, 2, 1, ''];


function createChessBoard() {
    let table = document.createElement('table');
    table.style.border = "8px ridge #b04705";
    table.style.backgroundColor = "#edc393";
    table.style.borderCollapse = "collapse";

    for (let row = 0; row < letters.length; row++) {
        let tr = document.createElement('tr');
        table.append(tr);

        for (let col = 0; col < numbers.length; col++) {
            let td = document.createElement('td');
            td.style.width = "50px";
            td.style.height = "50px";
            td.style.textAlign = "center";

            if (row == 0 || row == 9) {
                td.innerHTML = letters[col];
            }
            else if (col == 0 || col == 9) {
                td.innerHTML = numbers[row];
            }
            else {
                td.style.border = "3px solid #b04705";
                if ((row + col) % 2 == 1) {
                    td.style.backgroundColor = "#b04705";
                }
            }
            tr.append(td);
        }
    }
    body.querySelector('.chessBoard').append(table);
}

createChessBoard();
