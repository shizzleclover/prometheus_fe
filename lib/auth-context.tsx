"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  username: string
  email: string
  hasCompletedOnboarding?: boolean
  demographics?: {
    gender?: string
    nationality?: string
    race?: string
    tribe?: string
    skinColor?: string
    disabilities?: string[]
    politicalViews?: string
    moralAlignment?: string
    religion?: string
    religiousIntensity?: string
    culturalBackground?: string
    primaryLanguage?: string
    languagesSpoken?: string[]
    economicViews?: string
    socialValues?: string
    environmentalStance?: string
    sexualOrientation?: string
    relationshipStatus?: string
    parentalStatus?: string
    generationalIdentity?: string
    urbanRuralSuburban?: string
    personalityType?: string
    humorStyle?: string
    communicationPreference?: string
    sensitivityTopics?: string[]
    historicalFigureResonates?: string
    historicalFigureLiked?: string
    historicalFigureHated?: string
    favoriteHistoricalEra?: string
    leastFavoriteHistoricalEra?: string
    additionalInfo?: string
  }
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateUser: (user: User) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")
    
    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setToken(storedToken)
        setUser(userData)
        setIsLoading(false)
      } catch (error) {
        // Invalid stored data, clear it
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }, [])

  const fetchCurrentUser = async (authToken: string) => {
    try {
      // Mock user data for development - no API calls
      const mockUser: User = {
        id: "mock-user-id",
        username: "mockuser",
        email: "mock@example.com",
        hasCompletedOnboarding: false
      }
      setUser(mockUser)
    } catch (error) {
      console.error("Failed to fetch user:", error)
      localStorage.removeItem("token")
      setToken(null)
    } finally {
      setIsLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    // Mock login - no API calls
    const mockToken = "mock-token-" + Date.now()
    const mockUser: User = {
      id: "mock-user-id",
      username: email.split("@")[0], // Use email prefix as username
      email: email,
      hasCompletedOnboarding: false
    }
    
    setToken(mockToken)
    setUser(mockUser)
    localStorage.setItem("token", mockToken)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }

  const register = async (username: string, email: string, password: string) => {
    // Mock registration - no API calls
    const mockToken = "mock-token-" + Date.now()
    const mockUser: User = {
      id: "mock-user-id",
      username: username,
      email: email,
      hasCompletedOnboarding: false
    }
    
    setToken(mockToken)
    setUser(mockUser)
    localStorage.setItem("token", mockToken)
    localStorage.setItem("user", JSON.stringify(mockUser))
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    localStorage.setItem("user", JSON.stringify(updatedUser))
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, updateUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
