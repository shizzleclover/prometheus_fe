"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { SplashScreen } from "@/components/splash-screen"

interface AppInitializerProps {
  children: React.ReactNode
}

export function AppInitializer({ children }: AppInitializerProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [showSplash, setShowSplash] = useState(true)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  useEffect(() => {
    // Show splash screen for minimum time on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    const splashDuration = isMobile ? 2000 : 1000 // 2s on mobile, 1s on desktop

    const timer = setTimeout(() => {
      setShowSplash(false)
    }, splashDuration)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isLoading) return // Still loading auth state

    // Check if user is on landing page and should be redirected
    const currentPath = window.location.pathname
    
    if (user && currentPath === "/") {
      // User is logged in and on landing page - redirect to chat
      setShouldRedirect(true)
      router.push("/chat")
    } else if (!user && (currentPath === "/chat" || currentPath === "/onboarding")) {
      // User is not logged in but trying to access protected pages - redirect to landing
      setShouldRedirect(true)
      router.push("/")
    }
  }, [user, isLoading, router])

  // Show splash screen while loading or redirecting
  if (showSplash || isLoading || shouldRedirect) {
    return <SplashScreen isVisible={true} />
  }

  return <>{children}</>
}
