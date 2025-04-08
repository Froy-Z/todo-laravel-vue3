import axios from 'axios';

async function getTasks() {
    const response = await axios.get('/api/tasks');
    return response.data;
}

async function addTask(task) {
    const response = await axios.post('/api/tasks', task);
    return response.data;
}

async function updateTask(task) {
    const response = await axios.put(`/api/tasks/${task.id}`, task);
    return response.data;
}

async function deleteTask(id) {
    const response = await axios.delete(`/api/tasks/${id}`);
    return response.data;
}

export { getTasks, addTask, updateTask, deleteTask };
