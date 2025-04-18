import './bootstrap.js'
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import App from "@/App.vue"
import router from "@routers/index.js"

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives
});

const app = createApp(App);


app.use(router);
app.use(vuetify);
app.mount('#app');
