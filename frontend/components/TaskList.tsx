import TaskCard from "./TaskCard"

interface Task {
  _id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  dueDate?: string
  createdAt: string
}

interface TaskListProps {
  tasks: Task[]
  onUpdateTask: (id: string, updatedData: Partial<Task>) => Promise<void>
  onDeleteTask: (id: string) => Promise<void>
}

export default function TaskList({ tasks, onUpdateTask, onDeleteTask }: TaskListProps) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onUpdate={onUpdateTask} onDelete={onDeleteTask} />
      ))}
    </div>
  )
}
