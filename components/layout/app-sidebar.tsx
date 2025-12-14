"use client"

import { GraduationCap, LayoutDashboard, Users, UserPlus, FileText, User, LucideHome } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import Image from "next/image"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Orang Tua",
    href: "/dashboard/parents",
    icon: LucideHome,
  },
  {
    name: "Anak Saya",
    href: "/dashboard/students",
    icon: Users,
  },
  {
    name: "Daftar Anak Baru",
    href: "/dashboard/registration",
    icon: UserPlus,
  },
  {
    name: "Ajukan Izin",
    href: "/dashboard/permits",
    icon: FileText,
  },
  {
    name: "Profile",
    href: "/dashboard/profile",
    icon: User,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center space-x-2 px-0">
          <Image src="/logo.png" alt="Logo" width={20} height={20} ></Image>
          <span className="font-semibold text-sidebar-foreground">Portal Orang Tua</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={isActive}>
                  <Link href={item.href} className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
