const Student = require('../models/student.model')

const createStudent = async (req, res) => {
    try {
        const { name, email, phone, roll, guirdenName,guirdenPhoneNumber, classNumber } = req.body
        const rollExists = await Student.findOne({ roll, classNumber })
        if (rollExists) {
            return res.status(400).json({ message: `Roll number ${roll} already taken in class ${classNumber}` })
        }
        const newStudent = new Student({
            name,
            email,
            phone,
            roll,
            guirdenName,
            guirdenPhoneNumber,
            classNumber
        })
        await newStudent.save()
        res.status(201).json({ message: "Student created successfully" })
    } catch (err) {
        console.log(err)
        throw err
    }

}


const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findById(studentId)
        if (!student) {
            return res.status(404).json({ message: "Student not found" })
        }
        res.status(200).json(student)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}


const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find()
        res.status(200).json(students)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}

const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id
        const { name, email, phone, roll, guirdenName,guirdenPhoneNumber, classNumber } = req.body
        const student = await Student.findByIdAndUpdate(studentId, {
            name,
            email,
            phone,
            roll,
            guirdenName,
            guirdenPhoneNumber,
            classNumber
        }, { new: true })
        if (!student) {
            return res.status(404).json({ message: "Student not found" })
        }
        res.status(200).json({ message: "Student updated successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }

}

const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await Student.findByIdAndDelete(studentId)
        if (!student) {
            return res.status(404).json({ message: "Student not found" })
        }
        res.status(200).json({ message: "Student deleted successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}

module.exports = { createStudent, getStudentById, getAllStudents, updateStudent, deleteStudent }