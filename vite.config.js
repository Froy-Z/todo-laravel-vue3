import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        vue(),
    ],
    resolve: {
        alias: {
            '@':            path.resolve(__dirname, 'resources/frontend'),
            '@components':  path.resolve(__dirname, 'resources/frontend/components'),
            '@composables': path.resolve(__dirname, 'resources/frontend/composables'),
            '@layouts':     path.resolve(__dirname, 'resources/frontend/layouts'),
            '@pages':       path.resolve(__dirname, 'resources/frontend/pages'),
            '@routers':     path.resolve(__dirname, 'resources/frontend/routers'),
        }
    }
});


