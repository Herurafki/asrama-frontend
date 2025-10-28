"use client"

import { Search, Sun, Moon, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { GraduationCap } from "lucide-react"
import { useState, useEffect } from "react"

type CurrentUser = {
  id: number
  name: string
  email?: string
  avatar_url?: string | null
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000"

export function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState<CurrentUser | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "light"
    setTheme(savedTheme)
    document.documentElement.classList.toggle("dark", savedTheme === "dark")
  }, [])

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null
        const res = await fetch(`${API_BASE}/api/me`, {
          method: "GET",
          // Kalau pakai Sanctum (cookie-based), penting:
          credentials: "include",
          headers: token
            ? { Authorization: `Bearer ${token}` } // kalau pakai JWT
            : {},
        })
        if (!res.ok) throw new Error("Unauthenticated")
        const data: CurrentUser = await res.json()
        setUser(data)
      } catch (err) {
        setUser(null)
      } finally {
        setLoadingUser(false)
      }
    }
    fetchMe()
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const handleLogout = () => {
    // Optional: hit API logout, hapus token lokal kalau pakai JWT
    localStorage.removeItem("access_token")
    window.location.href = "/auth/login"
  }

  const displayName = loadingUser ? "Memuat..." : (user?.name ?? "Tamu")

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <div className="flex items-center space-x-2">
        <GraduationCap className="h-6 w-6 text-primary md:hidden" />
        <span className="font-semibold md:hidden">Portal Orang Tua</span>
      </div>

      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 ml-auto">
        <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-9 w-9">
          {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 h-9">
              <div className="h-8 w-8 rounded-full bg-primary/10 overflow-hidden flex items-center justify-center">
                {user?.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.avatar_url} alt={user.name} className="h-8 w-8 object-cover" />
                ) : (
                  <User className="h-4 w-4 text-primary" />
                )}
              </div>
              <span className="hidden md:block text-sm font-medium">{displayName}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive">
              <span>Keluar</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
