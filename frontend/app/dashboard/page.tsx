"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast, Toaster } from "sonner"
import TaskForm from "@/components/TaskForm"
import TaskList from "@/components/TaskList"
import TaskFilter from "@/components/TaskFilter"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

interface Task {
  _id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  dueDate?: string
  createdAt: string
}

interface User {
  username: string
  email: string
}

export default function Dashboard() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("createdAt")
  const [user, setUser] = useState<User | null>(null)

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null

  useEffect(() => {
    if (!token) {
      router.push("/login")
      return
    }

    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
    fetchTasks()
  }, [token, router])

  useEffect(() => {
    applyFiltersAndSort()
  }, [tasks, filter, sortBy])

  const fetchTasks = async () => {
    if (!token) return
    setLoading(true)
    try {
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTasks(response.data)
    } catch (error) {
      toast.error("Failed to fetch tasks")
    } finally {
      setLoading(false)
    }
  }

  const applyFiltersAndSort = () => {
    let filtered = [...tasks]

    if (filter !== "all") {
      filtered = filtered.filter((task) => task.status === filter)
    }

    filtered.sort((a, b) => {
      if (sortBy === "createdAt") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      } else if (sortBy === "dueDate") {
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      } else if (sortBy === "priority") {
        const priorityOrder: Record<string, number> = { high: 1, medium: 2, low: 3 }
        return (priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0)
      }
      return 0
    })

    setFilteredTasks(filtered)
  }

  const handleAddTask = (newTask: Task) => {
    setTasks((prev) => [newTask, ...prev])
    toast.success("Task created successfully!")
  }

  const handleUpdateTask = async (id: string, updatedData: Partial<Task>) => {
    if (!token) return
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTasks((prev) => prev.map((task) => (task._id === id ? response.data : task)))
      toast.success("Task updated successfully!")
    } catch (error) {
      toast.error("Failed to update task")
    }
  }

  const handleDeleteTask = async (id: string) => {
    if (!token) return
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setTasks((prev) => prev.filter((task) => task._id !== id))
      toast.success("Task deleted successfully!")
    } catch (error) {
      toast.error("Failed to delete task")
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged out successfully!")
    router.push("/login")
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="dashboard">
        <header className="dashboard-header">
          <div className="header-content">
            <div className="header-title">
              <h1>Task Manager</h1>
              {user && <p>Welcome, {user.username}!</p>}
            </div>
            <button onClick={handleLogout} className="btn btn-logout">
              Logout
            </button>
          </div>
        </header>

        <main className="dashboard-main">
          <div className="dashboard-container">
            <div className="dashboard-grid">
              <div className="sidebar">
                <TaskForm onTaskAdded={handleAddTask} />
              </div>

              <div className="content">
                <TaskFilter filter={filter} setFilter={setFilter} sortBy={sortBy} setSortBy={setSortBy} />

                {loading ? (
                  <div className="loading">Loading tasks...</div>
                ) : filteredTasks.length === 0 ? (
                  <div className="empty-state">
                    <p>No tasks found. Create one to get started!</p>
                  </div>
                ) : (
                  <TaskList tasks={filteredTasks} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
