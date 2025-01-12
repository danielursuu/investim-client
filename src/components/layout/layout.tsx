"use client"

import { ReactNode, useState } from "react"
import { SidebarNav } from "./sidebar"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-background">
        {/* Sidebar */}
        <SidebarNav isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* Main content */}
        <div className="flex-1 flex flex-col min-h-screen">
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
        <Toaster />
      </div>
    </TooltipProvider>
  );
}
