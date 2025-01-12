"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { LayoutDashboard, LineChart, Settings, FileText, BarChart3, ChevronLeft, User } from "lucide-react";
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

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "min-h-screen border-r bg-black relative transition-[width] duration-200 rounded-r-[32px]",
          isOpen ? "w-64" : "w-[70px]"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="h-[70px] flex items-center justify-center mb-8">
            <div className={cn(
              "relative transition-[width] duration-200",
              isOpen ? "w-[200px]" : "w-[40px]"
            )}>
              <Image
                src="/investim-logo.png"
                alt="Investim"
                width={150}
                height={40}
                className={cn(
                  "absolute top-0 left-0 h-[40px] transition-opacity duration-200",
                  isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                priority
              />
              <Image
                src="/logo-small.png"
                alt="Investim"
                width={40}
                height={40}
                className={cn(
                  "absolute top-0 left-0 h-[40px] w-[40px] transition-opacity duration-200",
                  isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                )}
                priority
              />
            </div>
          </div>
          
          {/* Main Navigation */}
          <div className="flex-1 flex flex-col">
            <nav className="space-y-2 px-3 py-4">
              {mainNavItems.map((item) => (
                <Tooltip key={item.href} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "w-full flex items-center justify-center relative h-10",
                        pathname === item.href
                          ? "bg-muted hover:bg-muted"
                          : "hover:bg-muted"
                      )}
                    >
                      <item.icon className="h-5 w-5 absolute left-3" />
                      <span
                        className={cn(
                          "ml-3 absolute left-[40px] transition-[opacity,transform] duration-200",
                          isOpen 
                            ? "opacity-100 translate-x-0" 
                            : "opacity-0 -translate-x-2 pointer-events-none"
                        )}
                      >
                        {item.title}
                      </span>
                    </Link>
                  </TooltipTrigger>
                  {!isOpen && (
                    <TooltipContent side="right" className="flex items-center gap-4">
                      {item.title}
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </nav>

            {/* Bottom Section */}
            <div className="mt-auto px-3 py-4">
              {/* Collapse Button */}
              <div className="flex justify-center mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full border bg-background hover:bg-muted"
                  onClick={onToggle}
                >
                  <ChevronLeft 
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      !isOpen && "rotate-180"
                    )}
                  />
                </Button>
              </div>

              {/* Settings with Dropdown */}
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full flex items-center justify-center relative h-10"
                      >
                        <Settings className="h-5 w-5 absolute left-3" />
                        <span
                          className={cn(
                            "ml-3 absolute left-[40px] transition-[opacity,transform] duration-200",
                            isOpen 
                              ? "opacity-100 translate-x-0" 
                              : "opacity-0 -translate-x-2 pointer-events-none"
                          )}
                        >
                          Settings
                        </span>
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
                      className="w-full flex items-center justify-center relative h-10"
                    >
                      <div className={cn(
                        "h-9 w-9 rounded-full bg-secondary flex items-center justify-center absolute",
                        isOpen ? "left-3" : "left-[calc(50%-18px)]"
                      )}>
                        <User className="h-4 w-4" />
                      </div>
                      <span
                        className={cn(
                          "ml-3 absolute left-[52px] text-sm text-muted-foreground transition-[opacity,transform] duration-200",
                          isOpen 
                            ? "opacity-100 translate-x-0" 
                            : "opacity-0 -translate-x-2 pointer-events-none"
                        )}
                      >
                        user@example.com
                      </span>
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
