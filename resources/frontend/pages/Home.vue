<template>
    <LCard>
        <v-card-title class="text-h5 mb-4">Главная страница</v-card-title>
        <v-row class="d-flex justify-center mb-4">
            <router-link to="/login">
                <v-btn color="green" class="mt-4">Авторизация</v-btn>
            </router-link>
        </v-row>

        <v-row class="d-flex justify-center mb-4">
            <router-link to="/register">
                <v-btn color="primary" class="mt-4">Регистрация</v-btn>
            </router-link>
        </v-row>
    </LCard>
    <v-row class="mt-2 d-flex justify-center">
        <v-col class="text-center">
            <h3>Проект релизован в рамках технического задания.</h3>
        </v-col>
    </v-row>
</template>

<script setup>
import LCard from "@layouts/LCard.vue";

</script>
