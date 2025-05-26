
import React from "react";
import { Outlet } from "react-router-dom";
import { SidebarProvider, Sidebar, SidebarInset } from "@/components/ui/sidebar";
import FloatingSidebarToggle from "./FloatingSidebarToggle";
import DashboardSidebarHeader from "./DashboardSidebarHeader";
import DashboardSidebarNav from "./DashboardSidebarNav";
import DashboardSidebarFooter from "./DashboardSidebarFooter";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-sidebar-background theme-transition">
        <Sidebar variant="inset" className="theme-transition">
          <DashboardSidebarHeader />
          <DashboardSidebarNav />
          <DashboardSidebarFooter />
        </Sidebar>
        
        <SidebarInset>
          <div className="relative w-full">
            <FloatingSidebarToggle />
            {/* Fixed header spacing to prevent overlap */}
            <div className="flex items-center pl-16 pr-4 pt-4 pb-2 gap-4">
              {/* Space reserved for back button and proper gap for content */}
            </div>
          </div>
          <div className="flex-1 p-4 md:p-6 pt-2 relative z-0 theme-transition">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
