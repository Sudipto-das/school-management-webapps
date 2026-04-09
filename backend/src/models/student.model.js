const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    roll: {
        type: Number,
        required: true,
        unique: true
    },
    classNumber: {
        type: Number,
        required: true,
        unique: true
    },
    guirdenName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    guirdenPhoneNumber: {
        type: Number,
        required: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    taskId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }]
})


const Student = mongoose.model('Student', userSchema);

module.exports = Student;