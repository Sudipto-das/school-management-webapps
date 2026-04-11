const Student = require('../models/student.model');
const StudentTask = require('../models/studentTask.model')
const Task = require('../models/task.model')


const getDashboardStats = async (req, res) => {
    try {
        const [totalStudents, totalTasks, completedTasks, pendingTasks] = await Promise.all([
            Student.countDocuments(),
            Task.countDocuments(),
            StudentTask.countDocuments({ isCompleted: true }),
            StudentTask.countDocuments({ isCompleted: false })
        ])

        res.status(200).json({
            totalStudents,
            totalTasks,
            completedTasks,
            pendingTasks
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
}

const getDashboardRecent = async (req, res) => {
    try {
        const [recentStudents, recentTasks] = await Promise.all([
            Student.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select("name classNumber roll createdAt"),

            Task.find()
                .sort({ createdAt: -1 })
                .limit(5)
                .select("title dueDate createdAt")
        ])

        res.status(200).json({
            recentStudents,
            recentTasks
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = {
    getDashboardStats,
    getDashboardRecent
}