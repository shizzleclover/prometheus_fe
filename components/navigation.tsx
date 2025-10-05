"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Flame, Moon, Sun, LogOut } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/lib/theme-provider"
import { useAuth } from "@/lib/auth-context"

export function Navigation() {
  const { theme, toggleTheme } = useTheme()
  const { user, logout } = useAuth()

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background border-b-4 border-foreground"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 border-4 border-foreground flex items-center justify-center brutalist-shadow-sm" style={{ backgroundColor: '#FF00FF' }}>
            <Flame className="w-6 h-6 text-foreground" />
          </div>
          <span className="text-2xl font-black tracking-tight">PROMETHEUS</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="font-bold hover:text-primary transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="font-bold hover:text-primary transition-colors">
            How It Works
          </Link>
          <Link href="/chat" className="font-bold hover:text-primary transition-colors">
            Try It
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="border-4 border-foreground hover:bg-foreground hover:text-background transition-all bg-transparent"
          >
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>

          {user ? (
            <>
              <span className="hidden sm:inline font-bold">Hi, {user.username}!</span>
              <Button
                variant="outline"
                onClick={logout}
                className="border-4 border-foreground font-black hover:bg-foreground hover:text-background transition-all bg-transparent"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  variant="outline"
                  className="hidden sm:flex border-4 border-foreground font-black hover:bg-foreground hover:text-background transition-all bg-transparent"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-primary text-primary-foreground border-4 border-foreground brutalist-shadow-sm hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-black">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  )
}
