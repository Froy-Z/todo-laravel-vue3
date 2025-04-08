<template>
    <LCard>
        <v-btn @click="logout" color="error" block>
            Выход из системы
        </v-btn>

        <v-row class="mb-4 mt-4">
            <v-col class="text-center">
                <h3>Добро пожаловать, {{ user.name }}!</h3>
            </v-col>
        </v-row>

        <div v-if="isLoading">
            <v-skeleton-loader
                   v-for="index in 6" :index="index"
                   class="rounded-lg mb-1"
                   elevation="12"
                   max-width="500"
                   type="heading"
            />
        </div>
        <v-card class="mt-4" v-else-if="tasks?.length > 0">
            <div v-for="(task, index) in tasks" :key="task.id">
                <Task
                    :task="task"
                    :index="index"
                    @update="updateTask"
                />
            </div>
        </v-card>
        <v-card v-else max-width="500">
            <h3 class="ma-2">У вас нет текущих задач, создать можно на кнопку "Добавить задачу"</h3>
        </v-card>

        <v-btn class="mt-2" v-if="newTask.hidden && !isLoading" @click="addTask" color="green" block>
            Добавить задачу
        </v-btn>

        <NewTask class="mt-2"
                 :task="newTask"
                 @update="updateTask"
                 @cancel="newTask.hidden = true"
        />
    </LCard>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {logout} from "@composables/useAuth.js";
import LCard from "@layouts/LCard.vue";
import Task from "@components/ToDoList/Task.vue";
import NewTask from "@components/ToDoList/NewTask.vue";
import {getUser} from "@composables/useUser.js";
import {getTasks} from "@composables/useTasks.js";

const user = getUser().globalUser;
const tasks = ref([]);
const isLoading = ref(true);

const newTask = ref({
    hidden: true,
    order: null,
    title: '',
});

onMounted(() => {
    updateTask();
});

async function updateTask() {
    isLoading.value = true;

    const result = await getTasks();

    tasks.value = result.map((task) => ({
        ...task,
        isEditing: false
    }));

    isLoading.value = false;
}

const addTask = () => {
    const maxOrder = tasks.value.length ? Math.max(...tasks.value.map(t => t.order)) : 0;

    newTask.value.hidden = false;
    newTask.value.order = maxOrder + 1;
    newTask.value.title = '';
};

</script>


