"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Flame, ArrowRight, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/lib/auth-context"
import { handleApiError } from "@/lib/utils/errorHandler"

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuthContext()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedTermsAndConditions: false,
  })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      return
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters")
      return
    }

    if (!formData.acceptedTermsAndConditions) {
      setError("You must accept the terms and conditions")
      return
    }

    setIsLoading(true)

    try {
      await register(formData.username, formData.email, formData.password, formData.acceptedTermsAndConditions)
      router.push("/onboarding")
    } catch (err: any) {
      setError(handleApiError(err))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-card border-4 border-foreground brutalist-shadow-lg p-8">
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-16 border-4 border-foreground flex items-center justify-center brutalist-shadow-sm" style={{ backgroundColor: '#FF00FF' }}>
              <Flame className="w-10 h-10 text-foreground" />
            </div>
          </div>

          <h1 className="text-4xl font-black text-center mb-2">Join Prometheus</h1>
          <p className="text-center text-muted-foreground mb-8">Create your account to get started</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="font-bold">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                required
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="border-4 border-foreground focus:ring-4 focus:ring-primary"
                placeholder="johndoe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="border-4 border-foreground focus:ring-4 focus:ring-primary"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="font-bold">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="border-4 border-foreground focus:ring-4 focus:ring-primary"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="font-bold">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="border-4 border-foreground focus:ring-4 focus:ring-primary"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  id="acceptedTermsAndConditions"
                  type="checkbox"
                  checked={formData.acceptedTermsAndConditions}
                  onChange={(e) => setFormData({ ...formData, acceptedTermsAndConditions: e.target.checked })}
                  className="w-4 h-4 border-4 border-foreground"
                />
                <label htmlFor="acceptedTermsAndConditions" className="text-sm font-bold">
                  I accept the{" "}
                  <a href="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </a>
                </label>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 border-4 border-destructive p-4">
                <p className="text-destructive font-bold text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground border-4 border-foreground brutalist-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-black text-lg h-14"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-bold hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
