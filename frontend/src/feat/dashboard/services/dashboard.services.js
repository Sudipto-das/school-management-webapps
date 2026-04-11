import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:7000';
const API_URL = `${backendUrl}/api/dashboard`;


const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
});


export const getDashboardStats = async ()=>{
    try{
        const response = await api.get('/stats')
        return response.data
    }catch(error){
        console.log(error)
        throw new Error('Failed to fetch dashboard stats')
    }
}

export const getDashboardRecent = async ()=>{
    try{
        const response = await api.get('/recent')
        return response.data
    }catch(error){
        console.log(error)
        throw new Error('Failed to fetch dashboard recent')
    }
}


