"use client"

import { buttonVariants } from "@/components/ui/button"
import { Modal } from "@/components/modal"
import { cn } from "@/lib/utils"

import { 
  LayoutDashboard, 
  MessageSquareWarning, 
  Users, 
  UserCircle,  
  LucideIcon,
  Menu
} from "lucide-react"
import Link from "next/link"
import { PropsWithChildren, useState, useEffect } from "react"

interface SidebarItem {
  href: string
  icon: LucideIcon
  text: string
}

interface SidebarCategory {
  category: string
  items: SidebarItem[]
}

interface User {
  username: string;
  email: string;
}
const API_BASE_URL = process.env.NEXT_PUBLIC_API_AUTH_BASE_URL;

const SIDEBAR_ITEMS: SidebarCategory[] = [
  {
    category: "Overview",
    items: [{ href: "/admin", icon: LayoutDashboard, text: "Dashboard" }],
  },
  {
    category: "Options",
    items: [
      { href: "/admin/complaints", icon: MessageSquareWarning, text: "Complaints" },
      { href: "/admin/guests", icon: Users, text: "Guest Details" }
    ],
  },
  {
    category: "Account",
    items: [
      { href: "/admin/users", icon: UserCircle, text: "Users" },
      
    ],
  },
]

const Sidebar = ({ onClose }: { onClose?: () => void }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showLogout, setShowLogout] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/check`, {
          credentials: 'include'
        });
        const data = await response.json();
        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        credentials: 'include'
      });
      window.location.href = '/sign-in';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="space-y-4  md:space-y-6 relative z-20 flex flex-col h-full">
      
      <p className="hidden sm:block text-lg/7 font-semibold text-brand-900">
        BIT{" "}<span className="text-red-700">Staff Quarters portal</span>
      </p>

     
      <div className="flex-grow">
        <ul>
          {SIDEBAR_ITEMS.map(({ category, items }) => (
            <li key={category} className="mb-4 md:mb-8">
              <p className="text-xs font-medium leading-6 text-zinc-500">
                {category}
              </p>
              <div className="-mx-2 flex flex-1 flex-col">
                {items.map((item, i) => (
                  <Link
                    key={i}
                    href={item.href}
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      "w-full justify-start group flex items-center gap-x-2.5 rounded-md px-2 py-1.5 text-sm font-medium leading-6 text-zinc-700 hover:bg-gray-50 transition"
                    )}
                    onClick={onClose}
                  >
                    <item.icon className="size-4 text-zinc-500 group-hover:text-zinc-700" />
                    {item.text}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col">
        <hr className="my-4 md:my-6 w-full h-px bg-gray-100" />
        
        {/* Add user profile section */}
        {user && (
          <div className="relative">
            <button
              onClick={() => setShowLogout(!showLogout)}
              className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
            >
              <div className="bg-gray-200 rounded-full w-9 h-9 flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-900">{user.username}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </button>

            {showLogout && (
              <button
                onClick={handleLogout}
                className="absolute bottom-full left-0 w-full mb-1 p-2 text-sm text-red-600 bg-white border rounded-lg shadow-lg hover:bg-gray-50"
              >
                Logout
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

const Layout = ({ children }: PropsWithChildren) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    
      <div className="relative h-screen flex flex-col md:flex-row bg-white overflow-hidden">
        {/* sidebar for desktop */}
        <div className="hidden md:block w-64 lg:w-80 border-r border-gray-100 p-6 h-full text-brand-900 relative z-10">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* mobile header */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200">
            <p className="text-lg/7 font-semibold text-brand-900">
              BIT{" "}<span className="text-red-700">Staff Quarters portal</span>
            </p>
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="text-gray-500 hover:text-gray-600"
            >
              <Menu className="size-6" />
            </button>
          </div>

          {/* main content area */}
          <div className="flex-1 overflow-y-auto bg-gray-50 shadow-md p-4 md:p-6 relative z-10">
            <div className="relative min-h-full flex flex-col">
              <div className="h-full flex flex-col flex-1 space-y-4">
                {children}
              </div>
            </div>
          </div>

          <Modal
            className="p-4"
            showModal={isDrawerOpen}
            setShowModal={setIsDrawerOpen}
          >
            <Sidebar onClose={() => setIsDrawerOpen(false)} />
          </Modal>
        </div>
      </div>
  )
}

export default Layout