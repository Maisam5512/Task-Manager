"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { toast, Toaster } from "sonner"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export default function Register() {
  const router = useRouter()
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      await axios.post(`${API_URL}/auth/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      toast.success("Registration successful! Please log in.")
      router.push("/login")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Create Account</h1>
            <p>Join us and start managing your tasks efficiently</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Choose a username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account? <Link href="/login">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
