<script>
import axios from "axios";

export default {
    data() {
        return {
            city: "",
            region: "",
            error: "",
            info: null,
            regionCities: [],
            averageTemp: null,
            amount: null,
            rates: {},
            converted: null,
        };
    },

    mounted() {
        axios
            .get("https://open.er-api.com/v6/latest/RUB")
            .then((res) => {
                this.rates = res.data.rates;
            })
            .catch(() => {
                this.rates = {
                    USD: 0.013,
                    EUR: 0.012,
                    GBP: 0.010,
                    JPY: 1.9,
                    CNY: 0.09,
                };
            });
    },

    methods: {
        getWeather() {
            if (this.city.trim().length < 2) {
                this.error = "Введите название города длиной от двух символов.";
                return;
            }

            this.error = "";
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(this.city)}&units=metric&appid=17913b25d00b6586c56baf11e7d75d11`)
                .then((res) => (this.info = res.data))
                .catch(() => {
                    this.error = "Ошибка получения данных. Проверьте название города.";
                });
        },

        async getRegionWeather() {
            if (!this.region.trim()) {
                this.error = "Введите название региона.";
                return;
            }

            const regionData = {
                Россия: ["Москва", "Санкт-Петербург", "Казань"],
                Чувашия: ["Чебоксары", "Новочебоксарск"],
            };

            this.regionCities = regionData[this.region] || [];
            if (this.regionCities.length === 0) {
                this.error = `Для региона "${this.region}" города не найдены.`;
                return;
            }

            let totalTemp = 0;
            let count = 0;

            this.error = "";
            this.averageTemp = null;

            for (const city of this.regionCities) {
                try {
                    const res = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=17913b25d00b6586c56baf11e7d75d11`
                    );
                    totalTemp += res.data.main.temp;
                    count++;
                } catch (err) {
                    this.error = `Ошибка получения данных для города: ${city}`;
                }
            }

            if (count > 0) {
                this.averageTemp = (totalTemp / count).toFixed(2);
            } else {
                this.error = "Не удалось получить данные для региона.";
            }
        },

        async convertCurrency() {
            if (!this.amount || this.amount <= 0) {
                alert("Введите корректную сумму.");
                return;
            }

            const currencies = [
                { code: "USD", name: "Доллар США" },
                { code: "EUR", name: "Евро" },
                { code: "GBP", name: "Фунт стерлингов" },
                { code: "JPY", name: "Японская йена" },
                { code: "CNY", name: "Китайский юань" }
            ];
            const result = {};

            for (const { code, name } of currencies) {
                try {
                    const res = await axios.get(`https://open.er-api.com/v6/latest/RUB`);
                    const rate = this.rates[this.selectCurrency];
                    if (rate) {
                        result[`${code} (${name})`] = (this.amount * rate).toFixed(2);
                    } else {
                        result[`${code} (${name})`] = "Ошибка курса";
                    }
                } catch (err) {
                    result[`${code} (${name})`] = "Ошибка получения курса";
                }
            }

            this.converted = rate;
        },
    },
};
</script>

<template>
    <div class="wrapper">
        <h1>Погодное приложение</h1>

        <input type="text" v-model="city" placeholder="Введите город" />
        <button @click="getWeather">Получить погоду</button>
        <p class="error">{{ error }}</p>

        <div v-if="info">
            <p>Температура: {{ info.main.temp }}°C</p>
            <p>Ощущается как: {{ info.main.feels_like }}°C</p>
        </div>

        <hr />

        <h2>Средняя температура в регионе</h2>
        <input type="text" v-model="region" placeholder="Введите регион" />
        <button @click="getRegionWeather">Рассчитать</button>
        <p class="error">{{ error }}</p>

        <div v-if="averageTemp !== null">
            <p>Средняя температура: {{ averageTemp }}°C</p>
        </div>

        <hr />

        <h2>Конвертер валют</h2>
        <input type="number" v-model="amount" placeholder="Сумма в рублях" />
        <select v-model="selectCurrency">
            <option value="USD">Доллар США</option>
            <option value="EUR">Евро</option>
            <option value="GBP">Фунт стерлингов</option>
            <option value="JPY">Японская йена</option>
            <option value="CNY">Китайский юань</option>
        </select>
        <button @click="convertCurrency">Конвертировать</button>

        <div v-if="converted">
            <h3>Результаты:</h3>
            <ul class="result-list">
                <li v-for="(value, currency) in converted" :key="currency">
                    {{ currency }}: {{ value }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style>
.wrapper {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    background-color: #9fd587;
    color: #333;
    border: 1px solid #a5be6a;
    border-radius: 8px;
}

input, button {
    margin: 10px 0;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #35c0b6;
    border-radius: 4px;
}

button {
    background-color: #35c0b6;
    color: #fff;
    cursor: pointer;
}

button:hover {
    background-color: #77aaaa;
}

.error {
    color: red;
    font-size: 14px;
}

.result-list {
    list-style-type: none;
    padding: 0;
}

.result-list li {
    margin: 5px 0;
}
</style>
