
import React from 'react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ChevronLeft } from 'lucide-react';

const FloatingSidebarToggle = () => {
  return (
    <div className="absolute top-3 left-3 z-10">
      <SidebarTrigger className="h-8 w-8 bg-accent-primary hover:bg-accent-primary/90 text-accent-primary-foreground rounded-full flex items-center justify-center shadow-lg transition-all">
        <ChevronLeft className="h-4 w-4" />
      </SidebarTrigger>
    </div>
  );
};

export default FloatingSidebarToggle;
