const Task = require('../models/task.model');
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


const createTask = async (req,res)=>{
    try{
        const {title,description} = req.body
        if(!title || !description){
            return res.status(400).json({message:"All fields are required"})
        }
        const newTask = new Task({
            title,
            description
        })
        await newTask.save()
        res.status(201).json({message:"Task created successfully",task:newTask})
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Internal server error"})
    }
}

const createAndAssingedTask = async (req, res) => {
    try {
        const { title, description, assignedTo, dueDate } = req.body;
        if (!title || !description || !assignedTo || !dueDate) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const student = await Student.findById(assignedTo);
        if (!student) {
            return res.status(404).json({ message: "Student not found" })
        }
        const newTask = new Task({
            title,
            description,
            assignedTo: student._id,
            dueDate
        })
        await newTask.save();

        const assignedStudent = await Student.findByIdAndUpdate(
            student._id,
            { $push: { tasks: newTask._id } },
            { new: true })

        if (!assignedStudent) {
            await Task.findByIdAndDelete(newTask._id)
            return res.status(500).json({ message: "Failed to assign task to student" })
        }
        res.status(201).json({
            message: "task assignd successfully",
            task: newTask,
            studentTasks: assignedStudent.tasks
        });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params
        const { title, description, assignedTo, dueDate } = req.body
        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }
        if (title) task.title = title
        if (description) task.description = description
        if (assignedTo) task.assignedTo = assignedTo
        if (dueDate) task.dueDate = dueDate
        await task.save()
        res.status(200).json({ message: "Task updated successfully", task })
    } catch (err) {
        console.log(err)
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

const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params
        const { status } = req.body
        const task = await Task.findById(id)
        if (!task) {
            return res.status(404).json({ message: "Task not found" })
        }
        task.status = status
        await task.save()
        res.status(200).json({ message: "Task status updated successfully", task })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
}


module.exports = { getAllTasks,createTask, createAndAssingedTask, deleteTask, updateTaskStatus, updateTask }
