"use client"

import { ReactNode, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./AuthContext" 
import { Loader2 } from "lucide-react" 

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/auth/login")
    }
  }, [isLoading, user, router]) // <-- 3. Dependencies

  // 4. Selama loading, tampilkan spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }
  return user ? <>{children}</> : null
}