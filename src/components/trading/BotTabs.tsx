
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface BotTabsProps {
  activeTab: 'grid' | 'spot' | 'futures' | 'martingale';
  className?: string;
}

const BotTabs: React.FC<BotTabsProps> = ({ activeTab, className }) => {
  return (
    <div className={cn("container py-6", className)}>
      <Tabs value={activeTab} className="w-full">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 max-w-3xl mx-auto bg-muted/50">
          <Link to="/grid-bots" className="w-full">
            <TabsTrigger value="grid" className="w-full" data-state={activeTab === 'grid' ? 'active' : ''}>
              Grid Bots
            </TabsTrigger>
          </Link>
          <Link to="/spot-bots" className="w-full">
            <TabsTrigger value="spot" className="w-full" data-state={activeTab === 'spot' ? 'active' : ''}>
              Spot Bots
            </TabsTrigger>
          </Link>
          <Link to="/futures-bots" className="w-full">
            <TabsTrigger value="futures" className="w-full" data-state={activeTab === 'futures' ? 'active' : ''}>
              Futures Bots
            </TabsTrigger>
          </Link>
          <Link to="/martingale-bots" className="w-full">
            <TabsTrigger value="martingale" className="w-full" data-state={activeTab === 'martingale' ? 'active' : ''}>
              Martingale Bots
            </TabsTrigger>
          </Link>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default BotTabs;
