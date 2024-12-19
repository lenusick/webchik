let randomNumber;
let attempts;
let score = 0; // Начальные баллы

function startGame() {
    const minInput = document.getElementById('min');
    const maxInput = document.getElementById('max');
    const min = parseInt(minInput.value);
    const max = parseInt(maxInput.value);
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.color = "red";

    // Проверка 1
    if (isNaN(min) || isNaN(max)) {
        errorMessage.textContent = "Введите действительные числа.";
        return;
    }

    // Проверка 2
    if (min >= max) {
        errorMessage.textContent = "Минимальное значение должно быть меньше максимального.";
        return;
    }

    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min; // Загадываем число
    attempts = 5; // Максимальное количество попыток

    errorMessage.textContent = ''; // Очищаем сообщение об ошибке при старте игры
    document.getElementById('attemptsLeft').textContent = attempts;
    document.getElementById('gameArea').style.display = "block"; // Показываем саму игру
    document.getElementById('result').textContent = "";
    document.getElementById('score').textContent = score;
    document.getElementById('restartButton').style.display = "none"; // Скрыть кнопку "Заново"
    document.getElementById('guessButton').style.display = "inline"; // Показать кнопку "Угадать"


    // Отключаем редактирование полей min и max после начала игры
    minInput.disabled = true;
    maxInput.disabled = true;
}

function makeGuess() {
    const guessInput = document.getElementById('guess').value; // Получаем введенное значение
    const guess = parseInt(guessInput); // Преобразуем его в целое число
    const result = document.getElementById('result');
    const attemptsLeft = document.getElementById('attemptsLeft');

    // Сброс сообщения об ошибке
    guessErrorMessage.textContent = ''; // Очищаем предыдущее сообщение об ошибке

    // Проверка на валидность ввода
    if (isNaN(guess) || guessInput.includes('.')) { // Проверяем, является ли ввод числом и содержит ли он точку
        guessErrorMessage.textContent = "Пожалуйста, введите целое число."; // Сообщаем об ошибке
        return; // Завершаем выполнение функции
    }

    attempts--; // Уменьшаем количество оставшихся попыток

    if (guess === randomNumber) {
        // Начисляем баллы за правильный ответ
        if (attempts === 4) score += 100; // 1 попытка
        else if (attempts === 3) score += 80; // 2 попытка
        else if (attempts === 2) score += 60; // 3 попытка
        else if (attempts === 1) score += 40; // 4 попытка
        
        result.textContent = `Поздравляем! Вы угадали число за ${5 - attempts} ${declineAttempts(5 - attempts)}!`;
        result.style.color = "green";
        attemptsLeft.textContent = attempts;
        document.getElementById('score').textContent = score; // Обновляем количество баллов
        // Скрываем кнопку "Угадать" и показываем кнопку "Заново"
        document.getElementById('guessButton').style.display = "none"; 
        document.getElementById('restartButton').style.display = "block"; 
        return;
    } else if (attempts === 0) {
        
        // Чтобы было честно вычисляем количество чисел между min и max включительно

        const min = parseInt(document.getElementById('min').value);
        const max = parseInt(document.getElementById('max').value);
        const totalNumbers = max - min + 1;

        // Делим это на количнство попыток и умножаем на тысячу (на 100 мне показалось неощутимо)
        const penalty = (totalNumbers / 5) * 1000;
        score -= penalty;

        result.textContent = `Игра окончена! Загаданное число было: ${randomNumber}`;
        result.style.color = "pink";
        document.getElementById('score').textContent = score; // Обновляем количество баллов
        // Скрываем кнопку "Угадать" и показываем кнопку "Заново"
        document.getElementById('guessButton').style.display = "none"; 
        document.getElementById('restartButton').style.display = "block"; 
    } else {
        result.textContent = guess < randomNumber ? "Слишком мало!" : "Слишком много!";
        result.style.color = "orange";
    }

    attemptsLeft.textContent = attempts; // Обновляем количество оставшихся попыток
}

// моменты русского языка
function declineAttempts(count) {
    if (count === 1) {
        return "попытку";
    } else if (count >= 2 && count <= 4) {
        return "попытки";
    } else {
        return "попыток";
    }
}

function clearFields() {
    document.getElementById('min').value = '';
    document.getElementById('max').value = '';
    document.getElementById('guess').value = '';
    document.getElementById('errorMessage').textContent = ''; // Очищаем сообщение об ошибке
    document.getElementById('gameArea').style.display = "none"; // Скрываем саму игру
    document.getElementById('restartButton').style.display = "none"; // Скрываем кнопку "Заново"
}

function resetFields() {
    clearFields();
    document.getElementById('min').disabled = false; // Снова разрешаем редактировать min
    document.getElementById('max').disabled = false; // Снова разрешаем редактировать max
}