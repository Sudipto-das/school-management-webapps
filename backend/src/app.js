const express = require('express')
const app = express();
const authRouter = require('./routes/auth.routes')
const studentRouter = require('./routes/student.routes')
const cookieParser = require('cookie-parser')
app.use(express.json());

app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/student', studentRouter)


module.exports = app;