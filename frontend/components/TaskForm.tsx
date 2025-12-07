"use client"

import type React from "react"

import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

interface Task {
  _id: string
  title: string
  description: string
  status: string
  priority: string
  dueDate?: string
  createdAt: string
}

interface TaskFormProps {
  onTaskAdded: (task: Task) => void
}

export default function TaskForm({ onTaskAdded }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  })
  const [loading, setLoading] = useState(false)

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast.error("Title is required")
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(`${API_URL}/tasks`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      onTaskAdded(response.data)

      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
      })
    } catch (error) {
      toast.error("Failed to create task")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="task-form-container">
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="What needs to be done?"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Add more details..."
            rows={3}
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select id="priority" name="priority" value={formData.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input type="date" id="dueDate" name="dueDate" value={formData.dueDate} onChange={handleChange} />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  )
}
