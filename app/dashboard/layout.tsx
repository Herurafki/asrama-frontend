"use client"

import type React from "react"
import AuthGuard from "@/context/AuthGuard"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Toaster } from "@/components/ui/sonner"
import { Navbar } from "@/components/layout/navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <div className="dashboard">
        
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Navbar />
            <main className="flex-1 overflow-auto">
              {children}
              <Toaster richColors position="top-center" theme="light" />
              </main>
          </SidebarInset>
        </SidebarProvider>
        
      </div>
    </AuthGuard>
  )
}
