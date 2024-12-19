// Пример с вводом данных
function findStudentWithLowestAverage() {
    const namesInput = document.getElementById('names').value;
    const gradesInput = document.getElementById('grades').value;

    const names = namesInput.split(', ');
    const gradesArray = gradesInput.split(' ');

    // Начальное значение для минимального среднего будет максимальный балл
    let lowestAverage = 100; 
    let studentWithLowestAverage = '';

    names.forEach((name, index) => {
        // Преобразуем строки в числа разделённые "-"
        const grades = gradesArray[index].split('-').map(Number); 
        let total = 0; // Сумма пока что 0

        grades.forEach(grade => {
            total += grade; // Суммируем оценки
        });

        // Вычисляем средний балл( сумма / количество оценок )
        const average = total / grades.length; 

        // Наименьший ли это балл
        if (average < lowestAverage) {
            lowestAverage = average;
            studentWithLowestAverage = name;
        }
    });

    document.getElementById('result').innerHTML = `Ученик с самым низким средним баллом: <br>${studentWithLowestAverage}`;
}