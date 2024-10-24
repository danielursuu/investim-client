"use client";

import { useEffect, useState } from "react";
import { Bell, LogOut, PlusCircle, Settings, User, Flag, Book, Folder } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { getUserData } from "../services/auth";
import { AccountDetailsDTO } from "../services/AccountDetailsDTO";

export function DashboardComponent() {
  const [user, setUser] = useState<AccountDetailsDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserData();
        setUser(data);
      } catch {
        // Redirect to IB login page
        window.location.href = "http://localhost:5001";
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#121212] text-gray-100">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const userInitial = user.displayName ? user.displayName.charAt(0) : "U";

  return (
    <div className="flex h-screen bg-[#121212] text-gray-100">
      {/* Sidebar */}
      <aside className="w-16 bg-black flex flex-col justify-between py-4">
        <div className="flex flex-col items-center space-y-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>New Item</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                  <Book className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Documents</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                  <Folder className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Folders</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                  <Flag className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Flags</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                  <Bell className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Notifications</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800">
                  <Settings className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Settings</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={user.displayName} />
                  <AvatarFallback>{userInitial}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-gray-800 text-gray-100">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-400">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#121212] p-6">
        <h1 className="text-3xl font-bold text-gray-100 mb-6">Welcome, {user.displayName}</h1>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gray-800 text-gray-100 border-gray-700">
            <CardHeader>
              <CardTitle>Account Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-400">Account ID</dt>
                  <dd className="mt-1 text-sm text-gray-100">{user.accountId}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-400">Account Title</dt>
                  <dd className="mt-1 text-sm text-gray-100">{user.accountTitle}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-400">Account Alias</dt>
                  <dd className="mt-1 text-sm text-gray-100">{user.accountAlias || "N/A"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-400">Currency</dt>
                  <dd className="mt-1 text-sm text-gray-100">{user.currency || "N/A"}</dd>
                </div>
              </dl>
            </CardContent>
            <CardFooter>
              <Badge variant={user.accountStatus === 1 ? "default" : "destructive"}>{user.accountStatus === 1 ? "Active" : "Suspended"}</Badge>
            </CardFooter>
          </Card>

          <Card className="bg-gray-800 text-gray-100 border-gray-700">
            <CardHeader>
              <CardTitle>Account Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-400">Account Type</dt>
                  <dd className="mt-1 text-sm text-gray-100">{user.type}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-400">Trading Type</dt>
                  <dd className="mt-1 text-sm text-gray-100">{user.tradingType}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-400">Business Type</dt>
                  <dd className="mt-1 text-sm text-gray-100">{user.businessType}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 text-gray-100 border-gray-700">
            <CardHeader>
              <CardTitle>Parent Account</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-gray-400">Parent Account ID</dt>
                  <dd className="mt-1 text-sm text-gray-100">{user.parent?.accountId || "N/A"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-400">Is Parent Account</dt>
                  <dd className="mt-1 text-sm text-gray-100">{user.parent?.isMParent ? "Yes" : "No"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-400">Is Child Account</dt>
                  <dd className="mt-1 text-sm text-gray-100">{user.parent?.isMChild ? "Yes" : "No"}</dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="activity" className="text-gray-100">
            <TabsList className="bg-gray-800">
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="activity">
              <Card className="bg-gray-800 text-gray-100 border-gray-700">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription className="text-gray-400">Your latest account activities and transactions.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Activity content goes here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="performance">
              <Card className="bg-gray-800 text-gray-100 border-gray-700">
                <CardHeader>
                  <CardTitle>Account Performance</CardTitle>
                  <CardDescription className="text-gray-400">View your account&apos;s performance over time.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Performance charts and data go here.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="documents">
              <Card className="bg-gray-800 text-gray-100 border-gray-700">
                <CardHeader>
                  <CardTitle>Account Documents</CardTitle>
                  <CardDescription className="text-gray-400">Access your account statements and other important documents.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>List of documents goes here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
