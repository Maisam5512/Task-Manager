import mongoose from "mongoose"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const __dirname = dirname(fileURLToPath(import.meta.url))
const dbPath = join(__dirname, "tasks.db")

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/task-app")
    console.log("Connected to MongoDB")
    return conn
  } catch (error) {
    console.error("MongoDB connection error:", error)
    process.exit(1)
  }
}

// MongoDB schemas and models can be defined here
// const userSchema = new mongoose.Schema({
//   username: { type: String, unique: true, required: true },
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// })

// const taskSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   title: { type: String, required: true },
//   description: String,
//   status: { type: String, default: "pending" },
//   priority: { type: String, default: "medium" },
//   dueDate: String,
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
// })

// export const User = mongoose.model("User", userSchema)
// export const Task = mongoose.model("Task", taskSchema)
