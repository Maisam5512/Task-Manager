"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import axios from "axios"
import { toast, Toaster } from "sonner"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"

export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: "", password: "" })
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
    setLoading(true)

    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData)
      localStorage.setItem("token", response.data.token)
      localStorage.setItem("user", JSON.stringify(response.data.user))
      toast.success("Login successful!")
      router.push("/dashboard")
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed")
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
            <h1>Welcome Back</h1>
            <p>Sign in to your task management account</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account? <Link href="/register">Sign up here</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
