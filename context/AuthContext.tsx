"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"

type CurrentUser = {
  id: number
  name: string
  email?: string
  avatar_url?: string | null
}

type AuthContextType = {
  user: CurrentUser | null
  isLoading: boolean
  logout: () => void
  login: (token: string) => Promise<void>
}

// Buat context dengan nilai default
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Buat "Provider"
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [isLoading, setIsLoading] = useState(true) // <-- Mulai dengan true
  const router = useRouter()

  useEffect(() => {
    const fetchMe = async () => {
      // Cek token dulu, jika tidak ada, tidak perlu panggil API
      const token = localStorage.getItem("auth_token")
      if (!token) {
        setUser(null)
        setIsLoading(false)
        return
      }

      try {
        const response = await api.get("/me")
        setUser(response.data)
      } catch (err) {
        setUser(null)
        // Jika token ada tapi /me gagal (misal expired), hapus tokennya
        localStorage.removeItem("auth_token") 
      } finally {
        setIsLoading(false)
      }
    }
    fetchMe()
  }, [])

  const logout = () => {
    localStorage.removeItem("auth_token")
    setUser(null)
    router.push("/auth/login") 
  }

  const login = async (token: string) => {
    localStorage.setItem("auth_token", token)
    setIsLoading(true)
    try {
      // Ambil data user SETELAH dapat token
      const response = await api.get("/me") 
      setUser(response.data)
    } catch (err) {
      setUser(null)
      localStorage.removeItem("auth_token")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, login }}>
      {children}
    </AuthContext.Provider>
  )
}

// Buat custom hook untuk gampang dipakai
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}