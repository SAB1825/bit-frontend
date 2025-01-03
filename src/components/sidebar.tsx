"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Home, Users, Calendar, Settings, Menu, ChevronLeft } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar"

const menuItems = [
  { icon: Home, label: "Dashboard" },
  { icon: Users, label: "Team" },
  { icon: Calendar, label: "Schedule" },
  { icon: Settings, label: "Settings" },
]

export function FloatingSidebar() {
  const [isOpen, setIsOpen] = React.useState(true)

  return (
    <Sidebar
      className={cn(
        "fixed left-4 top-4 z-50 h-[calc(100vh-2rem)] w-64 rounded-xl bg-white shadow-xl transition-all duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-[calc(100%-3rem)]"
      )}
      collapsible="icon"
    >
      <SidebarHeader className="h-16 px-4">
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <SidebarTrigger onClick={() => setIsOpen(!isOpen)} className="h-8 w-8">
            {isOpen ? <ChevronLeft className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </SidebarTrigger>
        </motion.div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton className="w-full justify-start gap-4">
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <p className="text-sm text-gray-500">© 2023 Your Company</p>
      </SidebarFooter>
    </Sidebar>
  )
}

