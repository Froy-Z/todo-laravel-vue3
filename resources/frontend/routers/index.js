import {createRouter, createWebHistory} from 'vue-router';
import {checkAuth} from "@composables/useAuth.js";
import {setUser} from "@composables/useUser.js";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import('@pages/Home.vue'),
    },
    {
        path: "/register",
        name: "Register",
        component: () => import('@pages/Register.vue')
    },
    {
        path: "/login",
        name: "Login",
        component: () => import('@pages/Login.vue')
    },
    {
        path: "/todo",
        name: "ToDoList",
        component: () => import('@pages/ToDoList.vue'),
        meta: { requiresAuth: true }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const data = await checkAuth();

    const { isAuthenticated, user } = data;

    if (user) {
        setUser(user);
    }

    if ((to.name === 'Register' || to.name === 'Login') && isAuthenticated) {
        next({ name: 'ToDoList' })
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            next({ name: 'Home' });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
