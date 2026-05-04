
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Copy, Database, Eye, EyeOff, Info, Lock, Shield, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Mock data for exchanges
const exchanges = [
  {
    id: "binance",
    name: "Binance",
    connected: true,
    lastUsed: "2024-03-15T14:23:10Z",
    apiKey: "pQG7HdD0BFxM9r2zVnW8tY6sLjK5gUcA",
    permissions: ["READ_INFO", "SPOT_TRADE", "FUTURES_TRADE"],
    botCount: 5,
  },
  {
    id: "bybit",
    name: "Bybit",
    connected: true,
    lastUsed: "2024-03-10T09:45:22Z",
    apiKey: "cNw3mFj7ZrL8pVgT6sBd2hX5aYqKv9E4",
    permissions: ["READ_INFO", "SPOT_TRADE"],
    botCount: 2,
  },
  {
    id: "kucoin",
    name: "KuCoin",
    connected: false,
    lastUsed: null,
    apiKey: "",
    permissions: [],
    botCount: 0,
  },
  {
    id: "okx",
    name: "OKX",
    connected: false,
    lastUsed: null,
    apiKey: "",
    permissions: [],
    botCount: 0,
  },
  {
    id: "bitget",
    name: "Bitget",
    connected: false,
    lastUsed: null,
    apiKey: "",
    permissions: [],
    botCount: 0,
  }
];

const ExchangeConnections = () => {
  const [activeTab, setActiveTab] = React.useState("binance");
  const [showApiSecret, setShowApiSecret] = React.useState(false);
  
  const handleCopyApiKey = () => {
    const apiKey = exchanges.find(ex => ex.id === activeTab)?.apiKey;
    if (apiKey) {
      navigator.clipboard.writeText(apiKey);
      toast.success("API Key copied to clipboard!");
    }
  };
  
  const handleDisconnect = (exchangeId: string) => {
    toast.success(`${exchanges.find(ex => ex.id === exchangeId)?.name} disconnected successfully!`);
    // In a real app, we would call an API to disconnect the exchange
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Exchange Connections</h1>
        <p className="text-muted-foreground">
          Connect and manage your cryptocurrency exchange API keys.
        </p>
      </div>
      
      {/* Security Notice */}
      <Card className="border-torgovo-blue/30 bg-torgovo-blue/5">
        <CardContent className="p-4">
          <div className="flex">
            <Shield className="h-5 w-5 text-torgovo-blue mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-medium text-torgovo-blue mb-1">Security Best Practices</h3>
              <p className="text-sm text-muted-foreground">
                When creating API keys for Torgovo, we recommend the following security practices:
              </p>
              <ul className="mt-2 text-sm text-muted-foreground list-disc pl-5 space-y-1">
                <li>Only enable trading permissions, not withdrawal permissions</li>
                <li>Use unique API keys for each platform or service</li>
                <li>Regularly rotate your API keys to enhance security</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Exchange Connections Tabs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Database className="mr-2 h-5 w-5" />
            Exchange Connections
          </CardTitle>
          <CardDescription>
            Connect to your favorite cryptocurrency exchanges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 flex h-auto flex-wrap items-center justify-start overflow-visible rounded-none border-b border-border p-0 w-full">
              {exchanges.map((exchange) => (
                <TabsTrigger
                  key={exchange.id}
                  value={exchange.id}
                  className="relative rounded-none border-b-2 border-transparent py-3 transition-none data-[state=active]:border-b-torgovo-purple data-[state=active]:text-foreground data-[state=active]:shadow-none"
                >
                  <div className="flex items-center space-x-2">
                    <span>{exchange.name}</span>
                    {exchange.connected && (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>

            {exchanges.map((exchange) => (
              <TabsContent 
                key={exchange.id} 
                value={exchange.id} 
                className="border-none p-0 outline-none"
              >
                {exchange.connected ? (
                  <div className="space-y-6">
                    {/* Connection Status */}
                    <div className="flex items-center justify-between bg-muted/20 p-4 rounded-md">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                        <span className="font-medium">Connected</span>
                        <span className="ml-4 text-sm text-muted-foreground">
                          Last used: {new Date(exchange.lastUsed!).toLocaleString()}
                        </span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDisconnect(exchange.id)}
                      >
                        <X className="mr-1 h-4 w-4" />
                        Disconnect
                      </Button>
                    </div>

                    {/* API Details */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">API Details</h3>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium block mb-1">API Key</label>
                          <div className="flex">
                            <Input
                              readOnly
                              value={exchange.apiKey}
                              className="flex-1 bg-muted/20 font-mono text-xs"
                            />
                            <Button 
                              variant="outline" 
                              className="ml-2"
                              onClick={handleCopyApiKey}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium block mb-1">API Secret</label>
                          <div className="flex">
                            <Input
                              readOnly
                              type={showApiSecret ? "text" : "password"}
                              value="••••••••••••••••••••••••••••••••"
                              className="flex-1 bg-muted/20 font-mono text-xs"
                            />
                            <Button 
                              variant="outline" 
                              className="ml-2"
                              onClick={() => setShowApiSecret(!showApiSecret)}
                            >
                              {showApiSecret ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            For security reasons, we don't display your full API secret.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Permissions */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Permissions</h3>
                      <div className="space-y-2">
                        {exchange.permissions.map((permission, index) => (
                          <div key={index} className="flex items-center p-2 bg-muted/20 rounded-md">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span className="text-sm">{permission.replace(/_/g, " ")}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Connected Bots */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Connected Bots</h3>
                      <p className="text-muted-foreground">
                        This exchange is used by {exchange.botCount} bot{exchange.botCount !== 1 ? 's' : ''}
                      </p>
                      <div className="flex justify-end">
                        <Button className="bg-torgovo-purple hover:bg-torgovo-purple/90">
                          Create Bot Using {exchange.name}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Database className="h-16 w-16 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium mb-2">Connect to {exchange.name}</h3>
                    <p className="text-muted-foreground text-center max-w-md mb-6">
                      Connect your {exchange.name} account to create and manage trading bots. You'll need to create API keys in your {exchange.name} account.
                    </p>
                    <Button className="bg-torgovo-purple hover:bg-torgovo-purple/90">
                      Connect {exchange.name}
                    </Button>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
      
      {/* How To Connect Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Info className="mr-2 h-5 w-5" />
            How to Connect Exchanges
          </CardTitle>
          <CardDescription>
            Follow these steps to securely connect your exchange accounts
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-medium">Step 1: Create API Keys on Exchange</h3>
              <ol className="list-decimal space-y-2 pl-5">
                <li className="text-sm text-muted-foreground">
                  Log in to your exchange account and navigate to the API management section
                </li>
                <li className="text-sm text-muted-foreground">
                  Create a new API key and set the appropriate permissions (read info, spot trading)
                </li>
                <li className="text-sm text-muted-foreground">
                  Enable IP restrictions if available for enhanced security
                </li>
                <li className="text-sm text-muted-foreground">
                  Save your API Key and Secret Key in a secure location
                </li>
              </ol>
              
              <div className="flex items-center mt-4">
                <Lock className="h-4 w-4 text-torgovo-blue mr-2" />
                <span className="text-sm text-torgovo-blue">
                  Never share your API Secret with anyone!
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">Step 2: Connect to Torgovo</h3>
              <ol className="list-decimal space-y-2 pl-5">
                <li className="text-sm text-muted-foreground">
                  Click the "Connect" button for your chosen exchange
                </li>
                <li className="text-sm text-muted-foreground">
                  Enter your API Key and Secret Key in the secure form
                </li>
                <li className="text-sm text-muted-foreground">
                  Verify the connection by allowing a test API call
                </li>
                <li className="text-sm text-muted-foreground">
                  Start creating and managing your trading bots
                </li>
              </ol>
              
              <div className="flex items-center p-2 bg-torgovo-blue/5 border border-torgovo-blue/20 rounded-md mt-4">
                <Info className="h-4 w-4 text-torgovo-blue mr-2 flex-shrink-0" />
                <span className="text-xs">
                  Torgovo encrypts all API keys using industry-standard encryption protocols.
                </span>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div className="rounded-md bg-muted/20 p-4">
            <h3 className="font-medium mb-2">Supported Features by Exchange</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Exchange</th>
                    <th className="text-center py-2">GRID Bots</th>
                    <th className="text-center py-2">Martingale Bots</th>
                    <th className="text-center py-2">Custom Bots</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Binance</td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">Bybit</td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">KuCoin</td>
                    <td className="text-center py-2">
                      <X className="h-4 w-4 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <X className="h-4 w-4 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2">OKX</td>
                    <td className="text-center py-2">
                      <X className="h-4 w-4 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <X className="h-4 w-4 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">Bitget</td>
                    <td className="text-center py-2">
                      <X className="h-4 w-4 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <X className="h-4 w-4 text-muted-foreground mx-auto" />
                    </td>
                    <td className="text-center py-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mx-auto" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <Button variant="outline">
            View API Documentation
          </Button>
          <Button className="bg-torgovo-purple hover:bg-torgovo-purple/90">
            Connect New Exchange
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExchangeConnections;
