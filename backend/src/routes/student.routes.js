const { Router } = require('express')
const { getAllStudents, getStudentById, createStudent, updateStudent, deleteStudent } = require('../controllers/student.controller');
const authenticateToken = require('../middleware/auth.middleware');
const studentRouter = Router();



studentRouter.post('/create', authenticateToken, createStudent)
studentRouter.get('/getAll', authenticateToken, getAllStudents)
studentRouter.get('/get/:id', authenticateToken, getStudentById)
studentRouter.put('/update/:id', authenticateToken, updateStudent)
studentRouter.delete('/delete/:id', authenticateToken, deleteStudent)

module.exports = studentRouter;










