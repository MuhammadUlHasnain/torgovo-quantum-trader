
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Home from "./pages/Home";
import GridBots from "./pages/GridBots";
import SpotBots from "./pages/SpotBots";
import FuturesBots from "./pages/FuturesBots";
import MartingaleBots from "./pages/MartingaleBots";
import Tutorial from "./pages/Tutorial";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import InvestmentBots from "./pages/InvestmentBots";
import CustomBots from "./pages/CustomBots";
import DashboardHome from "./pages/dashboard/DashboardHome";
import BotManagement from "./pages/dashboard/BotManagement";
import ExchangeConnections from "./pages/dashboard/ExchangeConnections";
import UserSettings from "./pages/dashboard/UserSettings";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import FAQs from "./pages/FAQs";
import Blog from "./pages/Blog";
import HelpSupport from "./pages/HelpSupport";
import Analytics from "./pages/dashboard/Analytics";
import ScrollToTop from "./components/layout/ScrollToTop";
import CreateBot from "./pages/dashboard/CreateBot";
import Support from "./pages/dashboard/Support";
import InvestInBot from "./pages/dashboard/InvestInBot";
import CreateCustomBot from "./pages/dashboard/CreateCustomBot";
import Withdrawals from "./pages/dashboard/Withdrawals";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/grid-bots" element={<GridBots />} />
            <Route path="/spot-bots" element={<SpotBots />} />
            <Route path="/futures-bots" element={<FuturesBots />} />
            <Route path="/martingale-bots" element={<MartingaleBots />} />
            <Route path="/tutorial" element={<Tutorial />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/help-support" element={<HelpSupport />} />
            <Route path="/investment-bots" element={<InvestmentBots />} />
            <Route path="/custom-bots" element={<CustomBots />} />
            
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="bots" element={<BotManagement />} />
                <Route path="exchanges" element={<ExchangeConnections />} />
                <Route path="settings" element={<UserSettings />} />
                <Route path="analytics" element={<Analytics />} />
                <Route path="create-bot" element={<CreateBot />} />
                <Route path="support" element={<Support />} />
                <Route path="invest-in-bot" element={<InvestInBot />} />
                <Route path="create-custom-bot" element={<CreateCustomBot />} />
                <Route path="withdrawals" element={<Withdrawals />} />
              </Route>
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
