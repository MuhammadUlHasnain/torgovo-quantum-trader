
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import GridBots from "./pages/GridBots";
import MartingaleBots from "./pages/MartingaleBots";
import Tutorial from "./pages/Tutorial";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import DashboardHome from "./pages/dashboard/DashboardHome";
import BotManagement from "./pages/dashboard/BotManagement";
import ExchangeConnections from "./pages/dashboard/ExchangeConnections";
import UserSettings from "./pages/dashboard/UserSettings";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import FAQs from "./pages/FAQs";
import Blog from "./pages/Blog";
import HelpSupport from "./pages/HelpSupport";
import Analytics from "./pages/dashboard/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/grid-bots" element={<GridBots />} />
          <Route path="/martingale-bots" element={<MartingaleBots />} />
          <Route path="/tutorial" element={<Tutorial />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/help-support" element={<HelpSupport />} />
          
          {/* Authentication Routes */}
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="bots" element={<BotManagement />} />
            <Route path="exchanges" element={<ExchangeConnections />} />
            <Route path="settings" element={<UserSettings />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
