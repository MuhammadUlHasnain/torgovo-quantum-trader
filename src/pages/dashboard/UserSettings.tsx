
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Check, 
  CreditCard, 
  Eye, 
  EyeOff, 
  Key, 
  Lock, 
  Mail, 
  Phone, 
  Save, 
  Shield, 
  User, 
  X 
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

const UserSettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [themeMode, setThemeMode] = React.useState("dark");
  
  const handleSaveProfile = () => {
    toast.success("Profile settings saved successfully!");
  };
  
  const handleChangePassword = () => {
    toast.success("Password changed successfully!");
  };
  
  const handleSaveNotifications = () => {
    toast.success("Notification preferences saved!");
  };
  
  const handle2FAEnable = () => {
    toast.success("2FA verification code sent to your email!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and security settings.
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-4 flex h-auto flex-wrap items-center justify-start overflow-visible rounded-none border-b border-border p-0 w-full">
          <TabsTrigger
            value="profile"
            className="relative rounded-none border-b-2 border-transparent py-3 transition-none data-[state=active]:border-b-torgovo-purple data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="relative rounded-none border-b-2 border-transparent py-3 transition-none data-[state=active]:border-b-torgovo-purple data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="relative rounded-none border-b-2 border-transparent py-3 transition-none data-[state=active]:border-b-torgovo-purple data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            <div className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="subscription"
            className="relative rounded-none border-b-2 border-transparent py-3 transition-none data-[state=active]:border-b-torgovo-purple data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            <div className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>Subscription</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="relative rounded-none border-b-2 border-transparent py-3 transition-none data-[state=active]:border-b-torgovo-purple data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            <div className="flex items-center space-x-2">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2" />
                <path d="M12 20v2" />
                <path d="m4.93 4.93 1.41 1.41" />
                <path d="m17.66 17.66 1.41 1.41" />
                <path d="M2 12h2" />
                <path d="M20 12h2" />
                <path d="m6.34 17.66-1.41 1.41" />
                <path d="m19.07 4.93-1.41 1.41" />
              </svg>
              <span>Appearance</span>
            </div>
          </TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your account personal details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center overflow-hidden border border-border">
                  <span className="text-2xl font-medium">JD</span>
                  {/* Display actual avatar image if available */}
                  {/* <img src="" alt="Profile" className="h-full w-full object-cover" /> */}
                </div>
                <div>
                  <Button size="sm" className="mb-2">
                    Upload Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG or GIF. 1MB max size.
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      className="pl-10"
                      defaultValue="john.doe@example.com"
                      disabled
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Email changes require verification from support
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="phone"
                      className="pl-10"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <select 
                    id="timezone" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    defaultValue="UTC"
                  >
                    <option value="UTC">UTC (Coordinated Universal Time)</option>
                    <option value="EST">EST (Eastern Standard Time)</option>
                    <option value="PST">PST (Pacific Standard Time)</option>
                    <option value="GMT">GMT (Greenwich Mean Time)</option>
                    <option value="JST">JST (Japan Standard Time)</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox id="marketing" />
                <label
                  htmlFor="marketing"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Receive marketing communications
                </label>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  className="bg-torgovo-purple hover:bg-torgovo-purple/90"
                  onClick={handleSaveProfile}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your account password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      className="pl-10"
                      placeholder="••••••••"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">
                        {showCurrentPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      className="pl-10"
                      placeholder="••••••••"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">
                        {showNewPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className="pl-10"
                      placeholder="••••••••"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                      <span className="sr-only">
                        {showConfirmPassword ? "Hide password" : "Show password"}
                      </span>
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Password Requirements:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li className="flex items-center">
                      <Check className="h-3 w-3 text-green-500 mr-1" />
                      Minimum 8 characters
                    </li>
                    <li className="flex items-center">
                      <Check className="h-3 w-3 text-green-500 mr-1" />
                      At least one uppercase letter
                    </li>
                    <li className="flex items-center">
                      <Check className="h-3 w-3 text-green-500 mr-1" />
                      At least one number
                    </li>
                    <li className="flex items-center">
                      <Check className="h-3 w-3 text-green-500 mr-1" />
                      At least one special character
                    </li>
                  </ul>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    className="bg-torgovo-purple hover:bg-torgovo-purple/90"
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="font-medium">Authenticator App</p>
                  <p className="text-sm text-muted-foreground">
                    Use an app like Google Authenticator or Authy
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-red-500 font-medium">Disabled</div>
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-torgovo-purple text-torgovo-purple hover:bg-torgovo-purple/10"
                    onClick={handle2FAEnable}
                  >
                    Enable
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="font-medium">SMS Authentication</p>
                  <p className="text-sm text-muted-foreground">
                    Receive a code via SMS when signing in
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-red-500 font-medium">Disabled</div>
                  <Button 
                    variant="outline"
                    size="sm"
                    disabled
                  >
                    Coming Soon
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="font-medium">Security Keys (WebAuthn)</p>
                  <p className="text-sm text-muted-foreground">
                    Use a hardware security key like YubiKey
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="text-sm text-red-500 font-medium">Disabled</div>
                  <Button 
                    variant="outline"
                    size="sm"
                    disabled
                  >
                    Coming Soon
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>
                Manage API keys for programmatic access to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Developer API Access</p>
                  <p className="text-sm text-muted-foreground">
                    Create API keys for external applications
                  </p>
                </div>
                
                <Button variant="outline" disabled>
                  <Key className="mr-2 h-4 w-4" />
                  Generate API Key
                </Button>
              </div>
              
              <div className="rounded-md border p-4 text-center text-sm text-muted-foreground">
                API access is available on Pro and Enterprise plans only
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Sessions</CardTitle>
              <CardDescription>
                Manage your active login sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-muted/20 rounded-md">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="h-5 w-5 text-muted-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="16" height="20" x="4" y="2" rx="2" />
                      <path d="M12 18h.01" />
                    </svg>
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-xs text-torgovo-blue">Your current device</p>
                      <div className="text-xs text-muted-foreground mt-1">
                        Chrome on Windows • New York, USA • Started 2 hours ago
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted/20 rounded-md">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="h-5 w-5 text-muted-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="14" x="2" y="3" rx="2" />
                      <line x1="8" x2="16" y1="21" y2="21" />
                      <line x1="12" x2="12" y1="17" y2="21" />
                    </svg>
                    <div>
                      <p className="font-medium">MacBook Pro</p>
                      <div className="text-xs text-muted-foreground mt-1">
                        Safari on macOS • San Francisco, USA • Last active 1 day ago
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Revoke</span>
                  </Button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted/20 rounded-md">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="h-5 w-5 text-muted-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="14" height="20" x="5" y="2" rx="2" />
                      <path d="M12 18h.01" />
                    </svg>
                    <div>
                      <p className="font-medium">iPhone 13</p>
                      <div className="text-xs text-muted-foreground mt-1">
                        Torgovo iOS App • Miami, USA • Last active 3 days ago
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                    <span className="sr-only">Revoke</span>
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-500/10">
                  Log Out All Other Devices
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Notification Channels</h3>
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                        <span>Email Notifications</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Receive notifications via email
                        </span>
                      </Label>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
                        <span>Push Notifications</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Receive notifications in-app
                        </span>
                      </Label>
                      <Switch id="push-notifications" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="sms-notifications" className="flex flex-col space-y-1">
                        <span>SMS Notifications</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Receive notifications via SMS
                        </span>
                      </Label>
                      <Switch id="sms-notifications" />
                    </div>
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="telegram-notifications" className="flex flex-col space-y-1">
                        <span>Telegram Notifications</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Receive notifications via Telegram
                        </span>
                      </Label>
                      <Switch id="telegram-notifications" />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Trading Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="trade-executed" className="flex flex-col space-y-1">
                        <span>Trade Executed</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Notify when your bot executes a trade
                        </span>
                      </Label>
                      <Switch id="trade-executed" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="profit-target" className="flex flex-col space-y-1">
                        <span>Profit Target Reached</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Notify when a bot reaches its profit target
                        </span>
                      </Label>
                      <Switch id="profit-target" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="bot-stopped" className="flex flex-col space-y-1">
                        <span>Bot Stopped</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Notify when a bot stops trading
                        </span>
                      </Label>
                      <Switch id="bot-stopped" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="market-volatility" className="flex flex-col space-y-1">
                        <span>Market Volatility</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Notify about significant market movements
                        </span>
                      </Label>
                      <Switch id="market-volatility" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Account Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-activity" className="flex flex-col space-y-1">
                        <span>Login Activity</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Notify about new logins to your account
                        </span>
                      </Label>
                      <Switch id="login-activity" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="api-changes" className="flex flex-col space-y-1">
                        <span>API Key Changes</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Notify when API keys are added or removed
                        </span>
                      </Label>
                      <Switch id="api-changes" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="subscription-updates" className="flex flex-col space-y-1">
                        <span>Subscription Updates</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Notify about changes to your subscription
                        </span>
                      </Label>
                      <Switch id="subscription-updates" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="feature-updates" className="flex flex-col space-y-1">
                        <span>Feature Updates</span>
                        <span className="font-normal text-xs text-muted-foreground">
                          Notify about new features and platform updates
                        </span>
                      </Label>
                      <Switch id="feature-updates" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button 
                    className="bg-torgovo-purple hover:bg-torgovo-purple/90"
                    onClick={handleSaveNotifications}
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Subscription Tab */}
        <TabsContent value="subscription" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>
                Manage your subscription and billing details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-torgovo-purple/10 border border-torgovo-purple/20 rounded-lg">
                  <div>
                    <h3 className="text-xl font-semibold text-torgovo-purple mb-1">Pro Plan</h3>
                    <p className="text-sm text-muted-foreground">
                      Billed monthly • Renews on April 15, 2024
                    </p>
                    <div className="mt-2">
                      <span className="text-lg font-semibold">$49.99</span>
                      <span className="text-sm text-muted-foreground">/month</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" className="border-torgovo-purple text-torgovo-purple hover:bg-torgovo-purple/10">
                      Upgrade Plan
                    </Button>
                    <Button variant="ghost" className="text-sm text-muted-foreground">
                      Cancel Subscription
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Plan Features</h3>
                  
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Up to 10 concurrent bots</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>GRID and Martingale strategies</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Binance & Bybit support</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Advanced analytics</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>Email support</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                      <span>No commission fees</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Payment Method</h3>
                  
                  <div className="flex items-center justify-between p-4 bg-muted/20 rounded-md">
                    <div className="flex items-center">
                      <svg
                        className="h-8 w-8 mr-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="20" height="14" x="2" y="5" rx="2" />
                        <line x1="2" x2="22" y1="10" y2="10" />
                      </svg>
                      <div>
                        <p className="font-medium">VISA ending in 4242</p>
                        <p className="text-xs text-muted-foreground">
                          Expires 04/25
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Billing History</h3>
                  
                  <div className="rounded-md border">
                    <div className="relative w-full overflow-auto">
                      <table className="w-full caption-bottom text-sm">
                        <thead>
                          <tr className="border-b bg-muted/40">
                            <th className="h-10 px-4 text-left font-medium">Date</th>
                            <th className="h-10 px-4 text-left font-medium">Amount</th>
                            <th className="h-10 px-4 text-left font-medium">Status</th>
                            <th className="h-10 px-4 text-left font-medium">Invoice</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle">Mar 15, 2024</td>
                            <td className="p-4 align-middle">$49.99</td>
                            <td className="p-4 align-middle">
                              <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-500/10 text-green-500">
                                Paid
                              </span>
                            </td>
                            <td className="p-4 align-middle">
                              <Button variant="ghost" size="sm">
                                Download
                              </Button>
                            </td>
                          </tr>
                          <tr className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle">Feb 15, 2024</td>
                            <td className="p-4 align-middle">$49.99</td>
                            <td className="p-4 align-middle">
                              <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-500/10 text-green-500">
                                Paid
                              </span>
                            </td>
                            <td className="p-4 align-middle">
                              <Button variant="ghost" size="sm">
                                Download
                              </Button>
                            </td>
                          </tr>
                          <tr className="border-b transition-colors hover:bg-muted/50">
                            <td className="p-4 align-middle">Jan 15, 2024</td>
                            <td className="p-4 align-middle">$49.99</td>
                            <td className="p-4 align-middle">
                              <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-500/10 text-green-500">
                                Paid
                              </span>
                            </td>
                            <td className="p-4 align-middle">
                              <Button variant="ghost" size="sm">
                                Download
                              </Button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the look and feel of the application
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      themeMode === "dark" 
                        ? "bg-torgovo-purple/10 border-torgovo-purple/50" 
                        : "bg-muted/20 hover:bg-muted/30"
                    }`}
                    onClick={() => setThemeMode("dark")}
                  >
                    <div className="h-24 rounded-md bg-background mb-2 flex items-center justify-center">
                      <div className="w-1/2 h-1/2 bg-torgovo-purple/20 rounded" />
                    </div>
                    <p className="font-medium text-sm text-center">Dark</p>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      themeMode === "light" 
                        ? "bg-torgovo-purple/10 border-torgovo-purple/50" 
                        : "bg-muted/20 hover:bg-muted/30"
                    }`}
                    onClick={() => setThemeMode("light")}
                  >
                    <div className="h-24 rounded-md bg-white mb-2 flex items-center justify-center">
                      <div className="w-1/2 h-1/2 bg-torgovo-purple/20 rounded" />
                    </div>
                    <p className="font-medium text-sm text-center text-black">Light</p>
                  </div>
                  
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      themeMode === "system" 
                        ? "bg-torgovo-purple/10 border-torgovo-purple/50" 
                        : "bg-muted/20 hover:bg-muted/30"
                    }`}
                    onClick={() => setThemeMode("system")}
                  >
                    <div className="h-24 rounded-md bg-gradient-to-r from-background to-white mb-2 flex items-center justify-center">
                      <div className="w-1/2 h-1/2 bg-torgovo-purple/20 rounded" />
                    </div>
                    <p className="font-medium text-sm text-center">System</p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Accent Color</h3>
                <div className="grid grid-cols-6 gap-4">
                  <div className="border rounded-full h-12 w-12 bg-torgovo-purple cursor-pointer flex items-center justify-center">
                    <Check className="h-5 w-5 text-white" />
                  </div>
                  <div className="border rounded-full h-12 w-12 bg-blue-500 cursor-pointer"></div>
                  <div className="border rounded-full h-12 w-12 bg-green-500 cursor-pointer"></div>
                  <div className="border rounded-full h-12 w-12 bg-orange-500 cursor-pointer"></div>
                  <div className="border rounded-full h-12 w-12 bg-pink-500 cursor-pointer"></div>
                  <div className="border rounded-full h-12 w-12 bg-teal-500 cursor-pointer"></div>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="text-lg font-medium mb-4">Layout Options</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="condensed-view" className="flex flex-col space-y-1">
                      <span>Condensed View</span>
                      <span className="font-normal text-xs text-muted-foreground">
                        Show more content with less spacing
                      </span>
                    </Label>
                    <Switch id="condensed-view" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="large-fonts" className="flex flex-col space-y-1">
                      <span>Large Fonts</span>
                      <span className="font-normal text-xs text-muted-foreground">
                        Increase text size throughout the app
                      </span>
                    </Label>
                    <Switch id="large-fonts" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="animations" className="flex flex-col space-y-1">
                      <span>Animations</span>
                      <span className="font-normal text-xs text-muted-foreground">
                        Enable or disable UI animations
                      </span>
                    </Label>
                    <Switch id="animations" defaultChecked />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-torgovo-purple hover:bg-torgovo-purple/90">
                  Save Appearance Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserSettings;
