let balance = 0; // Начальный баланс

document.getElementById("transactionForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const summa = parseFloat(document.getElementById("summa").value);
  const operation = document.getElementById("operation").value;
  const resultElement = document.getElementById("result");
  const balanceElement = document.getElementById("balance");

  if (isNaN(summa) || summa <= 0) {
    resultElement.textContent = "Введите корректную сумму!";
    resultElement.style.color = "red";
    return;
  }

  if (operation === "vnesti") {
    balance += summa;
    resultElement.textContent = `Вы внесли на счет ${summa} руб.`;
    resultElement.style.color = "green";
  } else if (operation === "snyat") {
    if (summa > balance) {
      resultElement.textContent = "Недостаточно средств для снятия!";
      resultElement.style.color = "red";
    } else {
      balance -= summa;
      resultElement.textContent = `Вы сняли со счета ${summa} руб.`;
      resultElement.style.color = "green";
    }
  }

  balanceElement.textContent = balance.toFixed(2); // Обновляем баланс
});
