
import React from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/hero-section";
import { Button } from "@/components/ui/button";

const GridBots = () => {
  return (
    <Layout>
      <HeroSection
        heroTitle="GRID Trading Bots"
        subtitle="Automate your trading with powerful GRID bot strategies that work in any market condition."
      >
        <Button className="bg-torgovo-blue hover:bg-torgovo-blue/80">
          Create GRID Bot
        </Button>
      </HeroSection>
      
      {/* Content will be expanded in future iterations */}
      <div className="container py-12">
        <h2 className="text-2xl font-bold mb-4">Grid Trading Strategy</h2>
        <p className="text-muted-foreground">
          Grid trading is a strategy that places multiple buy and sell orders at
          set intervals around a set price. This allows you to profit from market
          volatility within a range.
        </p>
      </div>
    </Layout>
  );
};

export default GridBots;
