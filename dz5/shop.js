const app = Vue.createApp({
    data() {
        return {
            products: [],
            searchQuery: "",
            sortField: ""
        };
    },
    computed: {
        filteredAndSortedProducts() {
            let filteredProducts = this.products.filter(product => {
                const query = this.searchQuery.toLowerCase();
                return (
                    product.title.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query)
                );
            });

            if (this.sortField === "price") {
                filteredProducts.sort((a, b) => a.price - b.price);
            } else if (this.sortField === "title") {
                filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
            }

            return filteredProducts;
        }
    },
    methods: {
        async fetchProducts() {
            const response = await fetch('shop.json');
            this.products = await response.json();
        }
    },
    mounted() {
        this.fetchProducts();
    }
});

app.mount("#app");
