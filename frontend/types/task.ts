export interface Task {
  _id: string
  title: string
  description?: string
  status: "pending" | "in-progress" | "completed"
  priority: "high" | "medium" | "low"
  createdAt: string
  dueDate?: string
}

export interface User {
  _id: string
  username: string
  email: string
}