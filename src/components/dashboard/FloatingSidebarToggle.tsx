
import React from 'react';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useSidebar } from '@/components/ui/sidebar';

const FloatingSidebarToggle = () => {
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <button
      aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      onClick={toggleSidebar}
      className="
        absolute left-4 top-4 z-50
        bg-accent-primary hover:bg-accent-primary/90
        text-accent-primary-foreground rounded-full shadow-lg
        flex items-center justify-center
        transition-all duration-200 hover:scale-105
        w-10 h-10
        border border-white/10
        focus:outline-none focus:ring-2 focus:ring-accent-primary
      "
      style={{
        boxShadow: '0 4px 24px 0 rgba(50,50,80,0.18)'
      }}
    >
      {isCollapsed ? <ChevronsRight size={18} /> : <ChevronsLeft size={18} />}
    </button>
  );
};

export default FloatingSidebarToggle;
