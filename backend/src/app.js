const express = require('express')
const cors = require('cors')
const app = express();
const authRouter = require('./routes/auth.routes')
const studentRouter = require('./routes/student.routes')
const taskRouter = require('./routes/task.routes')
const cookieParser = require('cookie-parser')
app.use(express.json());
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
console.log(process.env.CLIENT_URL)

app.use(cors(corsOptions));
app.options("/{*any}", cors(corsOptions))

app.use(cookieParser())
app.use('/api/auth', authRouter)
app.use('/api/student', studentRouter)
app.use('/api/task', taskRouter)


module.exports = app;