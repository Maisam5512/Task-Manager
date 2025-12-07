"use client"

import type React from "react"

import { useState } from "react"
import { toast } from "sonner"

interface Task {
  _id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  dueDate?: string
  createdAt: string
}

interface TaskCardProps {
  task: Task
  onUpdate: (id: string, updatedData: Partial<Task>) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export default function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(task)

  const handleStatusChange = (newStatus: "pending" | "in-progress" | "completed") => {
    onUpdate(task._id, { ...task, status: newStatus })
  }

  const handleDeleteClick = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(task._id)
    }
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveEdit = () => {
    onUpdate(task._id, editData)
    setIsEditing(false)
    toast.success("Task updated!")
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "#ef4444"
      case "medium":
        return "#f59e0b"
      case "low":
        return "#10b981"
      default:
        return "#6b7280"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#10b981"
      case "in-progress":
        return "#3b82f6"
      case "pending":
        return "#f59e0b"
      default:
        return "#6b7280"
    }
  }

  return (
    <div className="task-card">
      {isEditing ? (
        <div className="task-edit-form">
          <input
            type="text"
            name="title"
            value={editData.title}
            onChange={handleEditChange}
            placeholder="Task title"
            className="edit-input"
          />
          <textarea
            name="description"
            value={editData.description}
            onChange={handleEditChange}
            placeholder="Task description"
            className="edit-textarea"
            rows={3}
          />
          <select name="priority" value={editData.priority} onChange={handleEditChange} className="edit-select">
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <input
            type="date"
            name="dueDate"
            value={editData.dueDate || ""}
            onChange={handleEditChange}
            className="edit-input"
          />
          <div className="edit-buttons">
            <button onClick={handleSaveEdit} className="btn btn-save">
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className="btn btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-header">
            <h3>{task.title}</h3>
            <div className="task-badges">
              <span className="priority-badge" style={{ backgroundColor: getPriorityColor(task.priority) }}>
                {task.priority}
              </span>
            </div>
          </div>

          {task.description && <p className="task-description">{task.description}</p>}

          <div className="task-meta">
            {task.dueDate && (
              <div className="due-date">
                <strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}
              </div>
            )}
            <div className="status-badge" style={{ backgroundColor: getStatusColor(task.status) }}>
              {task.status}
            </div>
          </div>

          <div className="task-status-buttons">
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(e.target.value as any)}
              className="status-select"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="task-actions">
            <button onClick={() => setIsEditing(true)} className="btn btn-edit">
              Edit
            </button>
            <button onClick={handleDeleteClick} className="btn btn-delete">
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}
