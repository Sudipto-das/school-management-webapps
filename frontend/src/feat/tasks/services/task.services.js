import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:7000';
const API_URL = `${backendUrl}/api/task`;


const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});


const createTask = async (taskData) => {
    try {
        const response = await api.post('/create', taskData);
        return response.data;
    } catch (error) {
        console.error('Error creating task:', error);
        throw error;
    }
};

const getTasks = async () => {
    try {
        const response = await api.get('/');
        return response.data;
    } catch (error) {
        console.error('Error fetching tasks:', error);
        throw error;
    }
};

const updateTask = async (taskId, taskData) => {
    try {
        const response = await api.put(`/update/${taskId}`, taskData);
        return response.data;
    } catch (error) {
        console.error('Error updating task:', error);
        throw error;
    }
};

const deleteTask = async (taskId) => {
    try {
        const response = await api.delete(`/delete/${taskId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting task:', error);
        throw error;
    }
};

const assignTask = async (taskId, studentIds) => {
    try {
        const response = await api.post(`/assign`, { taskId, studentIds });
        return response.data;
    } catch (error) {
        console.error('Error assigning task:', error);
        throw error;
    }
};

const getStudentsByTask = async (taskId) => {
    try {
        const response = await api.get(`/${taskId}/students`);
        return response.data;
    } catch (error) {
        console.error('Error fetching students by task:', error);
        throw error;
    }
};

const updateStudentTaskStatus = async (studentId, taskId) => {
    try {
        const response = await api.patch(`/status`, { studentId, taskId });
        return response.data;
    } catch (error) {
        console.error('Error updating student task status:', error);
        throw error;
    }
};

export { getTasks, updateTask, deleteTask, createTask, assignTask, getStudentsByTask, updateStudentTaskStatus };