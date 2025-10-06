import { useState, useEffect } from 'react'
import { AuthService } from '../api/services/auth.service'
import type { User, LoginRequest, RegisterRequest } from '../types/api'

interface UseAuthReturn {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string, acceptedTermsAndConditions: boolean) => Promise<void>
  logout: () => void
  updateUser: (user: User) => void
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored token on mount
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')
    
    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser)
        setToken(storedToken)
        setUser(userData)
        AuthService.setAuthToken(storedToken)
        setIsLoading(false)
      } catch (error) {
        // Invalid stored data, clear it
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.login({ email, password })
      setToken(response.token)
      setUser(response.user)
      AuthService.setAuthToken(response.token)
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
    } catch (error) {
      throw error
    }
  }

  const register = async (username: string, email: string, password: string, acceptedTermsAndConditions: boolean) => {
    try {
      const response = await AuthService.register({ username, email, password, acceptedTermsAndConditions })
      setToken(response.token)
      setUser(response.user)
      AuthService.setAuthToken(response.token)
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    AuthService.removeAuthToken()
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  return {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    updateUser,
  }
}
