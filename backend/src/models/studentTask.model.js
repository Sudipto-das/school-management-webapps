
const mongoose = require('mongoose')

const studentTaskSchema = new mongoose.Schema({
    taskId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Task', 
        required: true 
    },
    studentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Student', 
        required: true 
    },
    isCompleted: { type: Boolean, default: false },  
    completedAt: { type: Date, default: null }        
}, { timestamps: true })


studentTaskSchema.index({ taskId: 1, studentId: 1 }, { unique: true })

const StudentTask = mongoose.model('StudentTask', studentTaskSchema)

module.exports = StudentTask