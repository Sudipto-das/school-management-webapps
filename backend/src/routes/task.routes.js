const { getAllTasks, createTask,createAndAssingedTask, updateTask, deleteTask, updateTaskStatus } = require('../controllers/task.controller')
const authenticateToken = require('../middleware/auth.middleware')

const taskRouter = require('express').Router()

taskRouter.get('/', authenticateToken, getAllTasks)
taskRouter.post('/create', authenticateToken, createTask)
taskRouter.put('/:id', authenticateToken, updateTask)
taskRouter.delete('/:id', authenticateToken, deleteTask)
taskRouter.patch('/status/:id', authenticateToken, updateTaskStatus)
taskRouter.post('/createAndAssign', authenticateToken, createAndAssingedTask)

module.exports = taskRouter