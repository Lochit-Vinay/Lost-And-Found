"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import { Mail, Lock, User, ArrowRight, Loader2 } from "lucide-react"

export default function AuthPage() {
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      if (!formData.email || !formData.password) {
        setError("Email and password are required")
        setIsLoading(false)
        return
      }

      if (isSignUp) {
        if (!formData.name) {
          setError("Name is required")
          setIsLoading(false)
          return
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match")
          setIsLoading(false)
          return
        }
        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters")
          setIsLoading(false)
          return
        }
      }

      const endpoint = isSignUp ? "/api/auth/signup" : "/api/auth/signin"
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.message || "Authentication failed")
        setIsLoading(false)
        return
      }

      // Store user session and redirect
      const data = await response.json()
      localStorage.setItem("user", JSON.stringify(data.user))
      router.push("/dashboard")
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setIsLoading(true)
    try {
      // Redirect to Google OAuth flow
      window.location.href = `/api/auth/google?mode=${isSignUp ? "signup" : "signin"}`
    } catch (err) {
      setError("Google authentication failed")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* <VantaBackground /> */}
      <Navigation />

      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-card border border-border rounded-lg p-8 backdrop-blur-sm">
            <h1 className="text-2xl font-bold text-foreground mb-2 text-center">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="text-muted-foreground text-center mb-8 text-sm">
              {isSignUp ? "Join LostFound to find your belongings" : "Sign in to your LostFound account"}
            </p>

            {error && (
              <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded text-destructive text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <div className="flex items-center gap-2 px-3 py-2 border border-input rounded-lg bg-background/50 focus-within:ring-1 focus-within:ring-ring">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground text-sm disabled:opacity-50"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <div className="flex items-center gap-2 px-3 py-2 border border-input rounded-lg bg-background/50 focus-within:ring-1 focus-within:ring-ring">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground text-sm disabled:opacity-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                <div className="flex items-center gap-2 px-3 py-2 border border-input rounded-lg bg-background/50 focus-within:ring-1 focus-within:ring-ring">
                  <Lock className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground text-sm disabled:opacity-50"
                  />
                </div>
              </div>

              {isSignUp && (
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Confirm Password</label>
                  <div className="flex items-center gap-2 px-3 py-2 border border-input rounded-lg bg-background/50 focus-within:ring-1 focus-within:ring-ring">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="flex-1 bg-transparent border-0 outline-none text-foreground placeholder:text-muted-foreground text-sm disabled:opacity-50"
                    />
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isSignUp ? "Creating..." : "Signing in..."}
                  </>
                ) : (
                  <>
                    {isSignUp ? "Create Account" : "Sign In"}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <div className="space-y-2">
              <Button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoading}
                variant="outline"
                className="w-full border-border hover:bg-secondary/50 bg-transparent disabled:opacity-50"
              >
                <Mail className="w-4 h-4 mr-2" />
                Google
              </Button>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp)
                  setError("")
                  setFormData({ name: "", email: "", password: "", confirmPassword: "" })
                }}
                className="text-primary hover:underline font-medium"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>

          {/* User Dashboard Preview */}
          {!isSignUp && (
            <div className="mt-8 bg-card border border-border rounded-lg p-6 backdrop-blur-sm">
              <h3 className="font-semibold text-foreground mb-4">Dashboard Preview</h3>
              <div className="space-y-3">
                {[
                  { label: "My Lost Items", value: "3" },
                  { label: "My Found Items", value: "1" },
                  { label: "Active Chats", value: "5" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 bg-secondary/50 rounded">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <span className="font-semibold text-primary">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
