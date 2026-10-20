
import React from 'react';
import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, Users, ScrollText, Inbox, Mail, Cpu, Home, Bot, PlusCircle, LineChart, Settings, HelpCircle, Database, Search, TrendingUp, Wallet, DollarSign } from 'lucide-react';

const adminLinks = [
  { href: '/dashboard/admin', label: 'Admin Overview', Icon: Shield },
  { href: '/dashboard/admin/users', label: 'Users', Icon: Users },
  { href: '/dashboard/admin/bots', label: 'All Bots', Icon: Cpu },
  { href: '/dashboard/admin/trade-logs', label: 'Trade Logs', Icon: ScrollText },
  { href: '/dashboard/admin/deposits', label: 'Deposit Approvals', Icon: Inbox },
  { href: '/dashboard/admin/emails', label: 'Send Email', Icon: Mail },
];

const DashboardSidebarNav = () => {
  const { isStaff } = useAuth();
  return (
    <SidebarContent>
      <SidebarGroup>
        <div className="px-4 py-2">
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground z-10" />
              <Input 
                type="search" 
                placeholder="Search..." 
                className="w-full bg-sidebar-accent pl-8 text-sm z-9 theme-transition" 
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
            <SidebarMenuButton asChild tooltip="Create Signal Bot">
              <a href="/dashboard/create-signal-bot">
                <PlusCircle />
                <span>Create Signal Bot</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Invest in Managed Bots">
              <a href="/dashboard/invest-in-bot">
                <TrendingUp />
                <span>Invest in Bots</span>
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
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Withdrawals">
              <a href="/dashboard/withdrawals">
                <Wallet />
                <span>Withdrawals</span>
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
      {isStaff && (
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarMenu>
            {adminLinks.map(({ href, label, Icon }) => (
              <SidebarMenuItem key={href}>
                <SidebarMenuButton asChild tooltip={label}>
                  <a href={href}><Icon /><span>{label}</span></a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      )}
    </SidebarContent>
  );
};

export default DashboardSidebarNav;
