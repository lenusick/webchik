<template>
  <div id="app">
    <h1>Добро пожаловать в приложение тестов</h1>

    <button @click="currentTest = 'Test1'">Тест 1</button>
    <button @click="currentTest = 'Test2'">Тест 2</button>
    <button @click="currentTest = 'Test3'">Тест 3</button>
    
    <component :is="currentTest" />
  </div>
</template>

<script>
import Test1 from './components/Test1.vue';
import Test2 from './components/Test2.vue';
import Test3 from './components/Test3.vue';

export default {
  name: 'App',
  data() {
    return {
      currentTest: 'Test1',
    };
  },
  components: {
    Test1,
    Test2,
    Test3,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  margin: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  margin-right: 20px;
}

button:last-child {
  margin-right: 0;
}
</style>
