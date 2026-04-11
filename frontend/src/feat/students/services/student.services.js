import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:7000';
const API_URL = `${backendUrl}/api/student`;


const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});


export const getStudents = async ()=>{
    try{
        const response = await api.get('/getAll')
        return response.data;
    } catch (error) {
        console.error('Error fetching students:', error);
        throw error;
    }
}

export const createStudent = async (studentData) => {
    try {
        const response = await api.post('/create', studentData);
        return response.data;
    } catch (error) {
        console.error('Error creating student:', error);
        throw error;
    }
}

export const getStudentById =async (id)=>{
    try{
        const response = await api.get(`/get/${id}`)
        return response.data;
    }catch (error) {
        console.error(`Error fetching student with id ${id}:`, error);
        throw error;
    }
}

export const updateStudent = async (id, studentData) => {
    try {
        const response = await api.put(`/update/${id}`, studentData);
        return response.data;
    } catch (error) {
        console.error(`Error updating student with id ${id}:`, error);
        throw error;
    }
}

export const deleteStudent = async (id) => {
    try {
        const response = await api.delete(`/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting student with id ${id}:`, error);
        throw error;
    }
}