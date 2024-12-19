<template>
    <!-- Основной блок задачи с динамическим классом 'completed' при выполнении -->
    <div :class="['task-item', task.completed ? 'completed' : '']">
        <!-- Отображение текста задачи -->
        <p>{{ task.text }}</p>
        <!-- Кнопка для отметки задачи как выполненной/невыполненной -->
        <button
            @click="$emit('mark-completed', index)"
            :style="{ background: task.completed ? '#87ceeb' : '#6cd670' }"
        >
            <!-- Меняем текст кнопки в зависимости от состояния задачи -->
            {{ task.completed ? 'Не выполнено' : 'Выполнено' }}
        </button>
        <!-- Кнопка для удаления задачи -->
        <button @click="$emit('delete-task', index)" style="background: #ff6b6b;">
            Удалить
        </button>
    </div>
</template>

<script>
export default {
    props: {
        // Свойство для данных задачи
        task: Object,
        // Индекс задачи в массиве
        index: Number
    }
}
</script>

<style scoped>
/* Стили для отдельной задачи */
.task-item {
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid silver;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

/* Стили для выполненной задачи */
.completed {
    text-decoration: line-through;
    color: gray;
}
</style>