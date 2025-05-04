"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import AuthModal from "@/components/auth-modal"

interface AuthContextType {
  isAuthenticated: boolean
  setIsAuthenticated: (value: boolean) => void
  showAuthModal: () => void
  hideAuthModal: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  showAuthModal: () => {},
  hideAuthModal: () => {},
  logout: () => {},
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const auth = localStorage.getItem("isAuthenticated")
      setIsAuthenticated(auth === "true")
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  useEffect(() => {
    // Show auth modal on first visit if not authenticated
    if (!isLoading && !isAuthenticated) {
      const hasVisited = localStorage.getItem("hasVisited")
      if (!hasVisited) {
        setIsAuthModalOpen(true)
        localStorage.setItem("hasVisited", "true")
      }
    }
  }, [isLoading, isAuthenticated])

  const showAuthModal = () => setIsAuthModalOpen(true)
  const hideAuthModal = () => setIsAuthModalOpen(false)

  const logout = () => {
    localStorage.removeItem("isAuthenticated")
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        showAuthModal,
        hideAuthModal,
        logout,
      }}
    >
      {children}
      <AuthModal isOpen={isAuthModalOpen} onClose={hideAuthModal} />
    </AuthContext.Provider>
  )
}
