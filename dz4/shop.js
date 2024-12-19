let products = [];

async function fetchProducts() {
    const response = await fetch('shop.json');
    const data = await response.json();
    products = data;
    return data;
}

function displayProducts(products) {
    const nodeForInsert = document.getElementById('node_for_insert');
    nodeForInsert.innerHTML = '';

    products.forEach(product => {
        nodeForInsert.innerHTML += ` 
            <li style="width: 300px" class="card m-2 p-3">
                <img src="${product.img}" class="card-img-top" alt="${product.title}" style="height: 200px;">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">Цена: ${product.price} р.</p>
                </div>
            </li>
        `;
    });
}

function sortItems() {
    const sortByPrice = document.getElementById('price').checked;
    const sortByTitle = document.getElementById('title').checked;

    let sortedProducts = [...products];

    if (sortByPrice) {
        sortedProducts.sort((a, b) => a.price - b.price);
    }

    if (sortByTitle) {
        sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
    }

    displayProducts(sortedProducts);
}

async function initialize() {
    await fetchProducts();
    sortItems();
}

window.onload = initialize;
