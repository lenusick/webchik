document.getElementById("triangleForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const sideA = parseFloat(document.getElementById("sideA").value);
    const sideB = parseFloat(document.getElementById("sideB").value);
    const sideC = parseFloat(document.getElementById("sideC").value);
    const resultElement = document.getElementById("result");
  
    if (checkTriangleExistence(sideA, sideB, sideC)) {
      resultElement.textContent = "Треугольник существует!";
      resultElement.style.color = "green";
    } else {
      resultElement.textContent = "Такого треугольника не существует!";
      resultElement.style.color = "red";
    }
  });
  
  function checkTriangleExistence(a, b, c) {
    return a + b > c && a + c > b && b + c > a;
  }
  