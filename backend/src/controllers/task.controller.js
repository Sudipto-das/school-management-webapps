const Task = require('../models/task.model');
const StudentTask = require('../models/studentTask.model')
const Student = require('../models/student.model')

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        if (!tasks) {
            return res.status(404).json({ message: "No task found" })
        }
        return res.status(200).json(tasks)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
}


const createTask = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body

        // validate required fields
        if (!title) {
            return res.status(400).json({ message: "Title is required" })
        }
        if (!dueDate) {
            return res.status(400).json({ message: "Due date is required" })
        }

        // check duplicate task title
        const taskExists = await Task.findOne({ title })
        if (taskExists) {
            return res.status(400).json({ message: "Task with this title already exists" })
        }

        const task = new Task({
            title,
            description,
            dueDate
        })
        await task.save()

        res.status(201).json({
            message: "Task created successfully",
            task
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, dueDate } = req.body

        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }

        
        if (title && title !== task.title) {
            const titleExists = await Task.findOne({ title, _id: { $ne: id } })
            if (titleExists) {
                return res.status(400).json({ message: "Task with this title already exists" })
            }
        }

        // update fields if provided
        if (title) task.title = title
        if (description) task.description = description
        if (dueDate) task.dueDate = dueDate

        task.updatedAt = Date.now()
        await task.save()

        res.status(200).json({
            message: "Task updated successfully",
            task
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
}


const updateTaskStatus = async (req, res) => {
    try {
        const { taskId, studentId } = req.body

        const studentTask = await StudentTask.findOne({ taskId, studentId })
        if (!studentTask) {
            return res.status(404).json({ message: "Assignment not found" })
        }

        
        studentTask.isCompleted = !studentTask.isCompleted
        studentTask.completedAt = studentTask.isCompleted ? new Date() : null
        await studentTask.save()

        res.status(200).json({
            message: `Task marked as ${studentTask.isCompleted ? 'completed' : 'pending'}`,
            studentTask
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
}


const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }
        await Task.findByIdAndDelete(id)

        await Student.findByIdAndUpdate(task.assignedTo, { $pull: { tasks: task._id } })
        res.status(200).json({ message: "Task deleted successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
}


const assignTask = async (req, res) => {
    try {
        const { taskId, studentIds } = req.body
        

        
        if (!taskId) {
            return res.status(400).json({ message: "taskId is required" })
        }
        if (!studentIds || studentIds.length === 0) {
            return res.status(400).json({ message: "At least one studentId is required" })
        }

        // step 1 — check task exists
        const task = await Task.findById(taskId)
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }

        // step 2 — check all students exist
        const students = await Student.find({ _id: { $in: studentIds } })
        if (students.length !== studentIds.length) {
            return res.status(404).json({ message: "One or more students not found" })
        }

        // step 3 — check if task already assigned to any of these students
        const alreadyAssigned = await StudentTask.find({
            taskId,
            studentId: { $in: studentIds }
        }).populate('studentId', 'name')

        if (alreadyAssigned.length > 0) {
            const names = alreadyAssigned.map(st => st.studentId.name).join(', ')
            return res.status(400).json({
                message: `Task already assigned to: ${names}`
            })
        }

        // step 4 — create StudentTask records for each student
        const studentTasks = studentIds.map(studentId => ({
            taskId,
            studentId,
            isCompleted: false
        }))

        await StudentTask.insertMany(studentTasks)

        res.status(201).json({
            message: "Task assigned successfully",
            task: {
                id: task._id,
                title: task.title,
                dueDate: task.dueDate
            },
            assignedTo: students.map(s => ({
                id: s._id,
                name: s.name,
                classNumber: s.classNumber
            }))
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
}

const getTasksByStudent = async (req, res) => {
    try {
        const { studentId } = req.params

        const studentTasks = await StudentTask.find({ studentId })
            .populate('taskId', 'title description dueDate')

        res.status(200).json({ tasks: studentTasks })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
}

const getStudentsByTask = async (req, res) => {
    try {
        const { taskId } = req.params

        const studentTasks = await StudentTask.find({ taskId })
            .populate('studentId', 'name classNumber roll')  // get student details

        res.status(200).json({ students: studentTasks })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
}



module.exports = { getAllTasks, createTask, deleteTask, updateTaskStatus, assignTask, updateTask, getStudentsByTask, getTasksByStudent }
