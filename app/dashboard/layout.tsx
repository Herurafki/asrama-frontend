"use client"

import "@/styles/globals-dashboard.css";
import type React from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Navbar } from "@/components/layout/navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="dashboard">
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <Navbar />
            <main className="flex-1 overflow-auto">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}
