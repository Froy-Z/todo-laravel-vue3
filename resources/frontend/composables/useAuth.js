import axios from 'axios';
import router from "@routers";

async function checkAuth() {
    try {
        const response = await axios.get('/api/auth');

        return {
            isAuthenticated: true,
            user: response.data.user
        };
    } catch (error) {
        localStorage.removeItem('token');

        return {
            isAuthenticated: false,
            email: null,
            message: error.response?.data?.message || 'Ошибка авторизации'
        };
    }
}

async function register(name, email, password) {
    try {
        const response = await axios.post('/api/register', {
            name: name,
            email: email,
            password: password
        });

        localStorage.setItem('token', response.data.token);

        return {
            isAuthenticated: true,
            token: response.data.token,
            email
        };
    } catch (error) {
        return {
            isAuthenticated: false,
            email: null,
            message: error.response?.data?.message || 'Ошибка регистрации'
        };
    }
}

async function login(email, password) {
    try {
        const response = await axios.post('/api/login', {
            email,
            password
        });

        localStorage.setItem('token', response.data.token);

        return {
            isAuthenticated: true,
            token: response.data.token,
            email
        };
    } catch (error) {
        return {
            isAuthenticated: false,
            email: null,
            message: error.response?.data?.message || 'Ошибка авторизации'
        };
    }
}

async function logout() {
    try {
        await axios.post('/api/logout', null);

        localStorage.removeItem('token');

        await router.push({name: 'Home'});


    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Ошибка выхода'
        };
    }
}

export {checkAuth, register, login, logout}
