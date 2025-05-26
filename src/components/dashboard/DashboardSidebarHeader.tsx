
import React from 'react';
import { SidebarHeader } from '@/components/ui/sidebar';

const DashboardSidebarHeader = () => {
  return (
    <SidebarHeader className="flex h-14 items-center px-4">
      <div className="flex items-center gap-2">
        <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-accent-primary/80 to-accent-primary">
          <div className="absolute inset-0 flex items-center justify-center text-accent-primary-foreground font-bold">
            T
          </div>
        </div>
        <div className="font-semibold text-lg tracking-tight">Torgovo</div>
      </div>
    </SidebarHeader>
  );
};

export default DashboardSidebarHeader;
