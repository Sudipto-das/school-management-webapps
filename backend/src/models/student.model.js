const mongoose = require('mongoose');


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
    roll: {
        type: Number,
        required: true,
    },
    classNumber: {
        type: Number,
        required: true,
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
    }
})
studentSchema.index({ roll: 1, classNumber: 1 }, { unique: true })

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;