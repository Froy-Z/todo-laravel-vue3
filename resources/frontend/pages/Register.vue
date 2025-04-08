<template>
    <LCard>
        <v-row class="d-flex justify-center mb-4">
            <v-col class="text-center">
                <router-link to="/">
                    <v-btn color="primary" class="mt-4">На главную</v-btn>
                </router-link>
            </v-col>
        </v-row>
        <v-card-title class="text-h5 mb-4">Регистрация</v-card-title>

        <v-form ref="formRef" v-model="formIsValid">
            <v-text-field
                v-model="name"
                label="Ваше имя"
                type="name"
                :rules="nameRules"
                required
            ></v-text-field>

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

            <router-link to="/login" class="text-decoration-none">
                <v-btn color="green" class="mt-4" block>
                    Уже есть регистрация
                </v-btn>
            </router-link>

            <v-btn @click="handlerRegister" class="mt-4" color="primary" block>
                Зарегистрироваться
            </v-btn>

            <v-alert v-if="errorMessage" type="error" class="mt-4">
                {{ errorMessage }}
            </v-alert>
        </v-form>
    </LCard>
</template>

<script setup>
import {emailRules, nameRules, passwordRules} from "@composables/rules.js";
import {ref} from "vue";
import {register} from "@composables/useAuth.js";
import router from "@routers";
import LCard from "@layouts/LCard.vue";

const name = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const formRef = ref(null);
const formIsValid = ref(false);

async function handlerRegister() {
    const valid = await formRef.value?.validate();
    if (!valid) {
        errorMessage.value = 'Проверьте введённые данные';
        return;
    }

    errorMessage.value = '';

    const result = await register(name.value, email.value, password.value);

    if (result.isAuthenticated) {
        await router.push({name: 'ToDoList'});
    } else {
        errorMessage.value = result.message;
    }
}
</script>
