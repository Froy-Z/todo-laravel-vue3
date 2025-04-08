<template>
    <LCard>
        <v-row class="d-flex justify-center mb-4">
            <v-col class="text-center">
                <router-link to="/" class="text-decoration-none">
                    <v-btn color="primary" class="mt-2" block>На главную</v-btn>
                </router-link>
            </v-col>
        </v-row>

        <v-card-title class="text-h5 text-center mb-6">
            Авторизация
        </v-card-title>

        <v-form ref="formRef" v-model="formIsValid">
            <v-text-field
                v-model="email"
                label="Email"
                type="email"
                :rules="emailRules"
                required
            ></v-text-field>

            <v-text-field
                v-model="password"
                label="Пароль"
                type="password"
                :rules="passwordRules"
                required
            ></v-text-field>

            <v-btn @click="handlerLogin" class="mt-4" color="green" block>
                Вход
            </v-btn>

            <router-link to="/register" class="text-decoration-none">
                <v-btn color="primary" class="mt-2" block>
                    Регистрация
                </v-btn>
            </router-link>

            <v-alert v-if="errorMessage" type="error" class="mt-4" border="start" variant="tonal">
                {{ errorMessage }}
            </v-alert>
        </v-form>
    </LCard>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {checkAuth, login} from '@composables/useAuth.js';
import {emailRules, passwordRules} from "@composables/rules.js";
import LCard from "@layouts/LCard.vue";
import router from "@routers";

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const formRef = ref(null);
const formIsValid = ref(false);

async function handlerLogin() {
    const valid = await formRef.value?.validate();
    if (!valid) {
        errorMessage.value = 'Проверьте введённые данные';
        return;
    }

    errorMessage.value = '';

    const result = await login(email.value, password.value);

    if (result.isAuthenticated) {
        await router.push({ name: 'ToDoList' });
    } else {
        errorMessage.value = result.message;
    }
}
</script>
