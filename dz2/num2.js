const calculator = {
    calculatePower: function(y) {
      return Math.pow(y - 2, y);
    }
  };
  
  // Обработчик события
  document.getElementById("powerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Получаем значение Y
    const vvod = parseFloat(document.getElementById("vvod").value);
    const resultElement = document.getElementById("result");
  
    // Вызов метода и вывод
    const result = calculator.calculatePower(vvod);
    resultElement.innerHTML = `Результат: <br> <b> ${(vvod - 2)} </b> в степени <b> ${vvod} </b> <br> равно <br> <b> ${result} </b>`;
  });
  