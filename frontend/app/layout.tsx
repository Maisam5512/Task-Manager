import type React from "react"
import type { Metadata, Viewport } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Manage your tasks efficiently with our simple and powerful task manager",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1f2937",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
