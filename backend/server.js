import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.js"
import taskRoutes from "./routes/tasks.js"
import { connectDB } from "./db/database.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Initialize database
connectDB()

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
