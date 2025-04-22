
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Home,
  Bot,
  PlusCircle,
  LineChart,
  Settings,
  HelpCircle,
  LogOut,
  Database,
  Bell,
  User,
  Search,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Custom Sidebar Toggle placed outside the sidebar
function FloatingSidebarToggle() {
  const { state, toggleSidebar } = useSidebar();
  // Expand if collapsed, collapse if expanded
  const isCollapsed = state === "collapsed";
  return (
    <button
      aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
      onClick={toggleSidebar}
      className={`
        fixed z-50 top-5 left-5
        md:absolute md:z-30 md:top-5 md:left-5
        bg-torgovo-purple hover:bg-torgovo-blue
        text-white rounded-full shadow-lg
        flex items-center justify-center
        transition-colors
        w-10 h-10
        border border-white/10
        focus:outline-none focus:ring-2 focus:ring-torgovo-blue
      `}
      style={{
        // To ensure visibility above everything else
        boxShadow: "0 4px 24px 0 rgba(50,50,80,0.2)",
      }}
    >
      {isCollapsed ? (
        <ChevronsRight size={24} />
      ) : (
        <ChevronsLeft size={24} />
      )}
    </button>
  );
}

const DashboardLayout = () => {
  const [notifications, setNotifications] = useState(3);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-sidebar-background">
        <Sidebar variant="inset">
          <SidebarHeader className="flex h-14 items-center px-4">
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-torgovo-blue to-torgovo-purple">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">T</div>
              </div>
              <div className="font-semibold text-lg tracking-tight">Torgovo</div>
            </div>
            {/* Removed SidebarTrigger button from header */}
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <div className="px-4 py-2">
                <form>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground z-10" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="w-full bg-sidebar-accent pl-8 text-sm z-9"
                    />
                  </div>
                </form>
              </div>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Overview</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Dashboard">
                    <a href="/dashboard">
                      <Home />
                      <span>Dashboard</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Trading Bots</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="My Bots">
                    <a href="/dashboard/bots">
                      <Bot />
                      <span>My Bots</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Create Bot">
                    <a href="/dashboard/create-bot">
                      <PlusCircle />
                      <span>Create Bot</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Management</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Exchange Connections">
                    <a href="/dashboard/exchanges">
                      <Database />
                      <span>Exchange Connections</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Analytics">
                    <a href="/dashboard/analytics">
                      <LineChart />
                      <span>Analytics</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Account</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Settings">
                    <a href="/dashboard/settings">
                      <Settings />
                      <span>Settings</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip="Help & Support">
                    <a href="/dashboard/support">
                      <HelpCircle />
                      <span>Help & Support</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-4 p-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative size-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="https://github.com/shadcn.png" alt="User" className="rounded-full" />
                      <AvatarFallback className="rounded-full bg-muted">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
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
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Separator orientation="vertical" className="h-8" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative size-8">
                    <Bell className="h-4 w-4" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 size-4 rounded-full bg-torgovo-purple text-[10px] font-medium flex items-center justify-center text-white">
                        {notifications}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="max-h-[300px] overflow-auto">
                    <DropdownMenuItem className="cursor-pointer">
                      <div className="flex flex-col gap-1">
                        <p className="font-medium">Bot BTCUSDT #1 started trading</p>
                        <p className="text-xs text-muted-foreground">Today at 10:45 AM</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <div className="flex flex-col gap-1">
                        <p className="font-medium">Successful trade on ETHUSDT</p>
                        <p className="text-xs text-muted-foreground">Yesterday at 6:30 PM</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer">
                      <div className="flex flex-col gap-1">
                        <p className="font-medium">New update available</p>
                        <p className="text-xs text-muted-foreground">2 days ago</p>
                      </div>
                    </DropdownMenuItem>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="cursor-pointer">
                    <span className="text-center w-full text-sm">View all notifications</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          {/* Floating toggle button, always visible */}
          <FloatingSidebarToggle />
          <div className="flex-1 p-4 md:p-6 relative z-0">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;

// ... end of file
