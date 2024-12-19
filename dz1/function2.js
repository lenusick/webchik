let size = 2;

function insert_table() {
    const table = document.querySelector('#table');
    table.innerHTML = '';

    for (let i = 1; i <= size; i++) {
        let tr = document.createElement('tr');
        for (let j = 1; j <= size; j++) {
            let td = document.createElement('td');
            let value = i * j;
            td.innerText = value;

            // Для цветных ячеек добавила классы
            if (value === 1 || value === i || value === j) {
                td.classList.add('number');
            } else if (value === i * i) {
                td.classList.add('square');
            } 
            
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    size++;
}

const node_insert_table = document.getElementById("insert_table");
node_insert_table.addEventListener("click", insert_table);
