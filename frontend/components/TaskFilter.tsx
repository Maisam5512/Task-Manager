"use client"

interface TaskFilterProps {
  filter: string
  setFilter: (filter: string) => void
  sortBy: string
  setSortBy: (sortBy: string) => void
}

export default function TaskFilter({ filter, setFilter, sortBy, setSortBy }: TaskFilterProps) {
  return (
    <div className="filter-container">
      <div className="filter-group">
        <label htmlFor="filter">Filter by Status:</label>
        <select id="filter" value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
          <option value="createdAt">Newest First</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  )
}
