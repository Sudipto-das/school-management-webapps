const {getAllTasks, createTask, deleteTask, updateTaskStatus, assignTask, updateTask, getStudentsByTask, getTasksByStudent } = require('../controllers/task.controller')
const authenticateToken = require('../middleware/auth.middleware')

const taskRouter = require('express').Router()


taskRouter.get('/', authenticateToken, getAllTasks)
taskRouter.post('/create', authenticateToken, createTask) 
taskRouter.post('/assign', authenticateToken, assignTask)                        
taskRouter.patch('/status', authenticateToken, updateTaskStatus)         
taskRouter.get('/student/:studentId', authenticateToken, getTasksByStudent)  
taskRouter.get('/:taskId/students', authenticateToken, getStudentsByTask)    
taskRouter.put('/update/:id', authenticateToken, updateTask)                       
taskRouter.delete('/delete/:id', authenticateToken, deleteTask)                     


module.exports = taskRouter