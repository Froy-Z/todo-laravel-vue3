<template>
    <div :class="['pa-2', isEven ? 'bg-grey-lighten-2' : '']">
        <v-row v-if="!task.isEditing" no-gutters>
            <v-row no-gutters>
                <label>
                    Задача #{{ task.order }}: {{ task.title }}
                </label>

                <v-col v-if="!deleteLoading" class="d-flex justify-end">
                    <v-btn @click="editTask" size="small" icon>
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn class="ml-2" @click="removeTask(task.id)" size="small" icon>
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </v-col>

                <v-col v-else class="d-flex align-center justify-end">
                    <v-progress-circular
                        indeterminate
                        color="red"
                        class="mr-2"
                    />
                    <span >Удаление...</span>
                </v-col>
            </v-row>
        </v-row>
        <div v-else>
            <v-text-field
                v-model="task.title"
                placeholder="Описание задачи"
                density="compact"
                variant="outlined"
                hide-details
                class="w-100"
            />
            <v-row class="justify-center mt-2" no-gutters>
                <v-col v-if="!editingLoading" class="d-flex justify-center">
                    <v-col cols="5">
                        <v-btn @click="saveTask" color="success" block>
                            Сохранить
                        </v-btn>
                    </v-col>
                    <v-col cols="5">
                        <v-btn @click="cancel" color="error" block>
                            Отменить
                        </v-btn>
                    </v-col>
                </v-col>
                <div v-else class="d-flex align-center">
                    <v-progress-circular
                        indeterminate
                        color="blue"
                        class="mr-2"
                    />
                    <span >Обновление...</span>
                </div>
            </v-row>
        </div>
    </div>
</template>

<script setup>
import {computed, defineEmits, defineProps, reactive, ref} from 'vue';
import {deleteTask, updateTask} from "@composables/useTasks.js";

const props = defineProps({
    task: Object,
    index: Number,
});

const deleteLoading = ref(false);
const editingLoading = ref(false);

const originalTask = reactive({ ...props.task });

const emit = defineEmits(['update']);

const isEven = computed(() => props.index % 2 === 0);

const editTask = () => {
    props.task.isEditing = true
};

const saveTask = async () => {
    try {
        editingLoading.value = true
        props.task.isEditing = true
        await updateTask(props.task);
        emit('update');
    } catch (e) {
        console.error('Ошибка при сохранении задачи:', e);
    }
    editingLoading.value = false
};

const removeTask = async (id) => {
    const result = confirm('Вы уверены, что хотите удалить задачу?')
    deleteLoading.value = true
    if (result) {
        deleteLoading.value = true
        try {
            const data = await deleteTask(id);
            console.log(data.message)
            emit('update')
        } catch (e) {
            console.log('Ошибка удаления')
        }

    }
    deleteLoading.value = false
}

function cancel() {
    props.task.title = originalTask.title;
    props.task.order = originalTask.order;
    props.task.isEditing = false;
}

</script>

