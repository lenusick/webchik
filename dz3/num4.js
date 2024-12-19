function findLowestCalorieProduct() {
    const productsInput = document.getElementById('products').value;
    const nutritionInput = document.getElementById('nutrition').value;

    const products = productsInput.split(' ');
    const nutritionList = nutritionInput.split(' ');

    let lowestCalories = 10000; // Задаем максимальное значение
    let lowestCalorieProduct = '';

    for (let i = 0; i < products.length; i++) {
        const [proteins, fats, carbohydrates] = nutritionList[i].split('-').map(Number);
        const calories = 0.4 * proteins + 0.3 * fats + 0.3 * carbohydrates;

        if (calories < lowestCalories) {
            lowestCalories = calories;
            lowestCalorieProduct = products[i];
        }
    }

    document.getElementById('result').textContent = `Самый низкокалорийный продукт: ${lowestCalorieProduct}`;
}
