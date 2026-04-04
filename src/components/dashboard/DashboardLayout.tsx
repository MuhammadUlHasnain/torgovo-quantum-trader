import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import FloatingSidebarToggle from "./FloatingSidebarToggle";
import DashboardSidebarHeader from "./DashboardSidebarHeader";
import DashboardSidebarNav from "./DashboardSidebarNav";
import DashboardSidebarFooter from "./DashboardSidebarFooter";
const DashboardLayout = () => {
  return <SidebarProvider>
      <div className="flex min-h-screen w-full bg-sidebar-background theme-transition">
        <Sidebar variant="inset" className="theme-transition">
          <DashboardSidebarHeader />
          <DashboardSidebarNav />
          <DashboardSidebarFooter />
        </Sidebar>
        
        <SidebarInset>
          <div className="relative w-full h-14 flex items-center">
            <FloatingSidebarToggle />
          </div>
          <div className="flex-1 p-4 md:p-6 relative z-0 theme-transition">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>;
};
export default DashboardLayout;