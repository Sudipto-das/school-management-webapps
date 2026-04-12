import { createContext, useState } from "react";
import { getTasks, createTask, updateTask, updateStudentTaskStatus, getStudentsByTask, deleteTask, assignTask } from "../services/task.services";

export const TaskContext = createContext()

export const TaskProvider = ({ children }) => {

    const [tasks, setTasks] = useState([])
    const [taskDetails, setTaskDetails] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    const fetchTasks = async () => {
        setLoading(true)
        try {
            const data = await getTasks()
            setTasks(data)
        } catch (error) {
            setError(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleCreateTask = async (taskData) => {
        setLoading(true)
        try {
            const response = await createTask(taskData)
            setTasks([...tasks, response.task])
        } catch (error) {
            setError(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdateTask = async (taskId, taskData) => {
        setLoading(true)
        try {
            const response = await updateTask(taskId, taskData)
            setTasks(tasks.map(task => task._id === taskId ? response.task : task))
        } catch (error) {
            setError(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteTask = async (taskId) => {
        setLoading(true)
        try {
            await deleteTask(taskId)
            setTasks(tasks.filter(task => task._id !== taskId))
        } catch (error) {
            setError(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleAssignTask = async (taskId, studentIds) => {
        setLoading(true)
        try {
            const response = await assignTask(taskId, studentIds)
            setTasks(tasks.map(task => task._id === taskId ? response.task : task))
        } catch (error) {
            setError(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleGetStudentsByTask = async (taskId) => {
        setLoading(true)
        try {
            const response = await getStudentsByTask(taskId)
            setTaskDetails(response.students || [])
        } catch (error) {
            setError(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }
    const handleUpdateStudentTaskStatus = async (studentTaskId, taskId) => {
        setLoading(true)
        try {
            const response = await updateStudentTaskStatus(studentTaskId, taskId)
            
            setTaskDetails(prev =>
                prev.map(task =>
                    task.studentId._id === studentTaskId
                        ? { ...task, isCompleted: response.studentTask.isCompleted }
                        : task
                )
            )
        } catch (error) {
            setError(error.response?.data?.message || error.message)
        } finally {
            setLoading(false)
        }
    }


    return (
        <TaskContext.Provider value={{ tasks, taskDetails, loading, error, fetchTasks, handleCreateTask, handleUpdateTask, handleDeleteTask, handleAssignTask, handleGetStudentsByTask, handleUpdateStudentTaskStatus }}>
            {children}
        </TaskContext.Provider>
    )
}