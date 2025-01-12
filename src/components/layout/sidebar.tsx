"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, LineChart, Settings, FileText, BarChart3, ChevronLeft, ChevronRight, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";

interface SidebarNavProps {
  isOpen: boolean;
  onToggle: () => void;
}

// Define main navigation items
const mainNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Portfolio",
    href: "/portfolio",
    icon: FileText,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: BarChart3,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: LineChart,
  },
];

export function SidebarNav({ isOpen, onToggle }: SidebarNavProps) {
  const pathname = usePathname();

  const renderNavItem = (item: typeof mainNavItems[0]) => (
    <Tooltip key={item.href} delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "w-full flex items-center",
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-muted",
            isOpen ? "justify-start px-3" : "justify-center px-0"
          )}
        >
          <item.icon className="h-5 w-5" />
          {isOpen && (
            <span className="ml-3">
              {item.title}
            </span>
          )}
        </Link>
      </TooltipTrigger>
      {!isOpen && (
        <TooltipContent side="right" className="flex items-center gap-4">
          {item.title}
        </TooltipContent>
      )}
    </Tooltip>
  );

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "min-h-screen border-r bg-background relative transition-[width] duration-300 ease-in-out",
          isOpen ? "w-64" : "w-[70px]"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className={cn(
            "h-[70px] flex items-center",
            isOpen ? "px-6" : "flex justify-center px-3"
          )}>
            <Link href="/" className={cn(
              "relative",
              isOpen ? "h-[40px] w-[150px]" : "h-[40px] w-[40px]"
            )}>
              <Image
                src="/investim-logo.png"
                alt="Investim"
                width={150}
                height={40}
                className={cn(
                  "absolute top-0 left-0 h-[40px] w-[200px]",
                  !isOpen && "hidden"
                )}
                priority
              />
              <Image
                src="/logo-small.png"
                alt="Investim"
                width={40}
                height={40}
                className={cn(
                  "absolute top-0 h-[40px] w-[40px]",
                  isOpen && "hidden",
                  !isOpen && "left-0"
                )}
                priority
              />
            </Link>
          </div>
          
          {/* Main Navigation */}
          <div className="flex-1 flex flex-col">
            <nav className="space-y-2 px-3 py-4">
              {mainNavItems.map(renderNavItem)}
            </nav>

            {/* Bottom Section */}
            <div className="mt-auto px-3 py-4">
              {/* Collapse Button */}
              <div className="flex justify-center mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full border bg-background"
                  onClick={onToggle}
                >
                  {isOpen ? (
                    <ChevronLeft className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </Button>
              </div>

              {/* Settings with Dropdown */}
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full flex items-center",
                          isOpen ? "justify-start px-3" : "justify-center px-0"
                        )}
                      >
                        <Settings className="h-5 w-5" />
                        {isOpen && <span className="ml-3">Settings</span>}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="start"
                      className="w-[200px]"
                      side={isOpen ? "top" : "right"}
                    >
                      <DropdownMenuItem asChild>
                        <ThemeToggle />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                {!isOpen && (
                  <TooltipContent side="right" className="flex items-center gap-4">
                    Settings
                  </TooltipContent>
                )}
              </Tooltip>

              {/* Profile Section */}
              <div className="mt-4 border-t pt-4">
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full flex items-center",
                        isOpen ? "justify-start px-3" : "justify-center px-0"
                      )}
                    >
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                        <User className="h-4 w-4" />
                      </div>
                      {isOpen && (
                        <div className="ml-3 flex flex-col items-start">
                          <span className="text-sm text-muted-foreground">
                            user@example.com
                          </span>
                        </div>
                      )}
                    </Button>
                  </TooltipTrigger>
                  {!isOpen && (
                    <TooltipContent side="right" className="flex items-center gap-4">
                      user@example.com
                    </TooltipContent>
                  )}
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
