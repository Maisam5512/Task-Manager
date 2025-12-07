import express from "express"
import { verifyToken } from "../middleware/auth.js"
import Task from "../models/Task.js"

const router = express.Router()

// Create task
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, description, priority, dueDate } = req.body
    const userId = req.userId

    if (!title) {
      return res.status(400).json({ message: "Title is required" })
    }

    const newTask = new Task({
      userId,
      title,
      description: description || "",
      priority: priority || "medium",
      dueDate: dueDate || null,
    })

    await newTask.save()

    res.status(201).json(newTask)
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error: error.message })
  }
})

// Get all tasks for user
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.userId
    const tasks = await Task.find({ userId }).sort({ createdAt: -1 })
    res.json(tasks)
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error: error.message })
  }
})

// Get single task
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId

    const task = await Task.findOne({ _id: id, userId })

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    res.json(task)
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error: error.message })
  }
})

// Update task
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId
    const { title, description, status, priority, dueDate } = req.body

    const task = await Task.findOne({ _id: id, userId })

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id, userId },
      {
        title: title || task.title,
        description: description !== undefined ? description : task.description,
        status: status || task.status,
        priority: priority || task.priority,
        dueDate: dueDate || task.dueDate,
      },
      { new: true },
    )

    res.json(updatedTask)
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error: error.message })
  }
})

// Delete task
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.userId

    const task = await Task.findOne({ _id: id, userId })

    if (!task) {
      return res.status(404).json({ message: "Task not found" })
    }

    await Task.findOneAndDelete({ _id: id, userId })

    res.json({ message: "Task deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error: error.message })
  }
})

export default router
