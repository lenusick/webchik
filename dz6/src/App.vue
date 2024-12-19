<template>
    <input type="text" v-model="taskText" placeholder="Добавьте задачу">
    <p class="error">{{ error }}</p>
    <button @click="addTask">Добавить задачу</button>

    <div v-if="tasks.length === 0" class="task">
        Задач пока нет
    </div>
    <div v-else>
        <p>Задачи:</p>
        <div
            v-for="(task, index) in tasks"
            :key="index"
            class="task"
            :class="{ completed: task.completed, notCompleted: !task.completed }"
        >
            <span :class="{ 'task-completed': task.completed }">
                {{ task.text }}
            </span>
            <button
                @click="markTaskCompleted(index)"
                :class="task.completed ? 'not-completed-btn' : 'completed-btn'"
            >
                {{ task.completed ? 'Не выполнено' : 'Выполнено' }}
            </button>
            <button @click="deleteTask(index)" class="delete-btn">Удалить</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tasks: [],
            error: '',
            taskText: ''
        };
    },
    methods: {
        addTask() {
            if (this.taskText.trim() === '') {
                this.error = 'Введите текст задачи';
                return;
            }
            this.tasks.push({
                text: this.taskText,
                completed: false
            });
            this.taskText = '';
            this.error = '';
        },
        deleteTask(index) {
            this.tasks.splice(index, 1);
        },
        markTaskCompleted(index) {
            this.tasks[index].completed = !this.tasks[index].completed;
        }
    }
};
</script>

<style scoped>
button {
    border: 0;
    border-radius: 5px;
    outline: none;
    padding: 10px 15px;
    font-weight: bold;
    cursor: pointer;
    margin-left: 10px;
}

.completed-btn {
    background: #6cd670;
    color: #167f3d;
}

.not-completed-btn {
    background: #f76c6c;
    color: white;
}

.delete-btn {
    background: #000;
    color: white;
}

.task {
    width: 500px;
    margin-top: 20px;
    border: 1px solid silver;
    background: #e3e3e3;
    color: #222;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.completed {
    background: #d4f8d4;
    color: #167f3d;
}

.notCompleted {
    background: #f8d4d4;
    color: #7f1616;
}

.task-completed {
    text-decoration: line-through;
    color: #aaa;
}

.task span:hover {
    text-decoration: underline;
    cursor: pointer;
}
</style>
