<template>
    <v-row v-if="!task.hidden" no-gutters class="align-center">
        <v-col cols="1" class="d-flex justify-center align-center">
            <span class="text-h6 font-weight-medium">#{{ task.order }}</span>
        </v-col>

        <v-col cols="7">
            <v-text-field
                v-model="task.title"
                placeholder="Описание задачи"
                density="compact"
                variant="outlined"
                hide-details
                class="w-100"
            />
        </v-col>
        <v-col/>
        <v-col cols="3" class="d-flex flex-column align-end">
            <v-btn @click="saveTask" color="success" class="mb-2" block>
                Сохранить
            </v-btn>
            <v-btn @click="emit('cancel')" color="error" block>
                Отменить
            </v-btn>
        </v-col>
    </v-row>
</template>

<script setup>
import {defineEmits, defineProps} from "vue";
import {addTask} from "@composables/useTasks.js";

const props = defineProps({
    task: Object
});

const emit = defineEmits(['update', 'cancel']);

const saveTask = async () => {
    try {
        props.task.hidden = true
        await addTask(props.task);
        emit('update');
    } catch (e) {
        console.error('Ошибка при сохранении задачи:', e);
    }
};

</script>
