import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] })
    if (existingUser) {
      return res.status(400).json({ message: "Username or email already exists" })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    })

    await newUser.save()

    res.status(201).json({ message: "User registered successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error: error.message })
  }
})

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.json({ token, user: { id: user._id, username: user.username, email: user.email } })
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message })
  }
})

export default router
