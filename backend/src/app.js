const express = require('express')
const app = express();
const authRouter = require('./routes/auth.routes')
const studentRouter = require('./routes/student.routes')
const taskRouter = require('./routes/task.routes')
const cookieParser = require('cookie-parser')
app.use(express.json());

app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/student', studentRouter)
app.use('/api/task', taskRouter)


module.exports = app;