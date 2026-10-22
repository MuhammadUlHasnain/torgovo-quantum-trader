import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Copy, Database, Eye, EyeOff, Info, KeyRound, Loader2, Lock, Shield, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { exchangesApi, asList } from "@/lib/services";
import { errorMessage } from "@/lib/api";
import type { ExchangeCredentials } from "@/types/api";

// Backend doc (§6): connected adapters today + coming soon (project decision).
const EXCHANGES = [
  { id: "binance", name: "Binance", passphrase: false },
  { id: "bybit", name: "Bybit", passphrase: false },
  { id: "okx", name: "OKX", passphrase: true },
  { id: "mexc", name: "MEXC", passphrase: false },
  { id: "alpaca", name: "Alpaca", passphrase: false },
  { id: "coinbase", name: "Coinbase", passphrase: false },
];
const COMING_SOON = [
  { id: "kucoin", name: "KuCoin" },
  { id: "bitget", name: "Bitget" },
];

const ExchangeConnections = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("binance");
  const [showSecret, setShowSecret] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [isTestnet, setIsTestnet] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { data: credsData, isLoading } = useQuery({
    queryKey: ["exchange-credentials"],
    queryFn: exchangesApi.credentials,
  });
  const credentials = asList<ExchangeCredentials>(credsData);

  const credsFor = (exchangeId: string) =>
    credentials.filter((c) => c.exchange_name?.toLowerCase() === exchangeId);

  const handleConnect = async () => {
    const exchange = EXCHANGES.find((e) => e.id === activeTab);
    if (!exchange) return;
    if (!apiKey.trim() || !secretKey.trim()) {
      toast.error("API Key and Secret Key are required.");
      return;
    }
    setSubmitting(true);
    try {
      await exchangesApi.createCredentials({
        exchange_name: exchange.id,
        api_key: apiKey.trim(),
        secret_key: secretKey.trim(),
        ...(exchange.passphrase && passphrase.trim() ? { passphrase: passphrase.trim() } : {}),
        is_testnet: isTestnet,
      });
      toast.success(`${exchange.name} connected successfully!`);
      setApiKey(""); setSecretKey(""); setPassphrase(""); setShowSecret(false);
      queryClient.invalidateQueries({ queryKey: ["exchange-credentials"] });
    } catch (err) {
      toast.error(errorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const handleDisconnect = async (cred: ExchangeCredentials) => {
    try {
      await exchangesApi.deleteCredentials(cred.id);
      toast.success("Exchange connection removed.");
      queryClient.invalidateQueries({ queryKey: ["exchange-credentials"] });
    } catch (err) {
      toast.error(errorMessage(err));
    }
  };

  const handleCopyApiKey = (value: string) => {
    navigator.clipboard.writeText(value);
    toast.success("API Key copied to clipboard!");
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
          {isLoading ? (
            <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4 flex h-auto flex-wrap items-center justify-start overflow-visible rounded-none border-b border-border p-0 w-full">
                {[...EXCHANGES, ...COMING_SOON].map((exchange) => {
                  const connected = credsFor(exchange.id).length > 0;
                  return (
                    <TabsTrigger
                      key={exchange.id}
                      value={exchange.id}
                      disabled={COMING_SOON.some((c) => c.id === exchange.id)}
                      className="relative rounded-none border-b-2 border-transparent py-3 transition-none data-[state=active]:border-b-torgovo-purple data-[state=active]:text-foreground data-[state=active]:shadow-none disabled:opacity-50"
                    >
                      <div className="flex items-center space-x-2">
                        <span>{exchange.name}</span>
                        {connected && <CheckCircle className="h-4 w-4 text-green-500" />}
                      </div>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {EXCHANGES.map((exchange) => {
                const myCreds = credsFor(exchange.id);
                const connected = myCreds.length > 0;
                return (
                  <TabsContent key={exchange.id} value={exchange.id} className="border-none p-0 outline-none">
                    {connected ? (
                      <div className="space-y-6">
                        {/* Connection Status */}
                        <div className="flex items-center justify-between bg-muted/20 p-4 rounded-md">
                          <div className="flex items-center">
                            <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                            <span className="font-medium">Connected</span>
                            <span className="ml-4 text-sm text-muted-foreground">
                              {myCreds.length} connection{myCreds.length !== 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>

                        {myCreds.map((cred) => (
                          <div key={cred.id} className="rounded-md border p-4 space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <KeyRound className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium text-sm">
                                  {cred.is_testnet ? "Testnet" : "Live"} key
                                </span>
                              </div>
                              <Button variant="outline" size="sm" onClick={() => handleDisconnect(cred)}>
                                <X className="mr-1 h-4 w-4" />
                                Disconnect
                              </Button>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <label className="text-sm font-medium block mb-1">API Key</label>
                                <div className="flex">
                                  <Input
                                    readOnly
                                    value={cred.api_key}
                                    className="flex-1 bg-muted/20 font-mono text-xs"
                                  />
                                  <Button variant="outline" className="ml-2" onClick={() => handleCopyApiKey(cred.api_key)}>
                                    <Copy className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              <div>
                                <label className="text-sm font-medium block mb-1">API Secret</label>
                                <Input
                                  readOnly
                                  type={showSecret ? "text" : "password"}
                                  value="••••••••••••••••••••••••••••••••••"
                                  className="bg-muted/20 font-mono text-xs"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                  For security reasons, your API secret is stored encrypted and never shown in full.
                                </p>
                              </div>
                            </div>

                            {cred.permissions?.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium mb-2">Permissions</h4>
                                <div className="flex flex-wrap gap-2">
                                  {cred.permissions.map((p, i) => (
                                    <span key={i} className="flex items-center text-xs bg-muted/20 rounded-md px-2 py-1">
                                      <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
                                      {String(p).replace(/_/g, " ")}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}

                        <div className="flex justify-end">
                          <Button
                            className="bg-torgovo-purple hover:bg-torgovo-purple/90"
                            onClick={() => setActiveTab(exchange.id)}
                          >
                            Create Bot Using {exchange.name}
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="max-w-md space-y-4 py-4">
                        <div className="flex flex-col items-center text-center mb-2">
                          <Database className="h-12 w-12 text-muted-foreground/50 mb-3" />
                          <h3 className="text-lg font-medium mb-1">Connect to {exchange.name}</h3>
                          <p className="text-muted-foreground text-sm max-w-md">
                            Enter the API keys you created in your {exchange.name} account. Keys are stored encrypted and used only for trading.
                          </p>
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor={`api-key-${exchange.id}`}>API Key</Label>
                          <Input id={`api-key-${exchange.id}`} value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Your API key" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor={`api-secret-${exchange.id}`}>API Secret</Label>
                          <div className="flex">
                            <Input
                              id={`api-secret-${exchange.id}`}
                              type={showSecret ? "text" : "password"}
                              value={secretKey}
                              onChange={(e) => setSecretKey(e.target.value)}
                              placeholder="Your API secret"
                              className="flex-1"
                            />
                            <Button variant="outline" className="ml-2" onClick={() => setShowSecret(!showSecret)}>
                              {showSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </Button>
                          </div>
                        </div>
                        {exchange.passphrase && (
                          <div className="space-y-1">
                            <Label htmlFor={`passphrase-${exchange.id}`}>Passphrase (optional)</Label>
                            <Input id={`passphrase-${exchange.id}`} value={passphrase} onChange={(e) => setPassphrase(e.target.value)} placeholder="Only if your key requires one" />
                          </div>
                        )}
                        <div className="flex items-center justify-between rounded-md bg-muted/20 p-3">
                          <div>
                            <Label htmlFor={`testnet-${exchange.id}`}>Use testnet</Label>
                            <p className="text-xs text-muted-foreground">Connect a sandbox/testnet key for paper trading.</p>
                          </div>
                          <Switch id={`testnet-${exchange.id}`} checked={isTestnet} onCheckedChange={setIsTestnet} />
                        </div>
                        <Button className="w-full bg-torgovo-purple hover:bg-torgovo-purple/90" disabled={submitting} onClick={handleConnect}>
                          {submitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                          Connect {exchange.name}
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                );
              })}

              {COMING_SOON.map((exchange) => (
                <TabsContent key={exchange.id} value={exchange.id} className="border-none p-0 outline-none">
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Database className="h-16 w-16 text-muted-foreground/50 mb-4" />
                    <h3 className="text-lg font-medium mb-2">{exchange.name} — Coming Soon</h3>
                    <p className="text-muted-foreground text-center max-w-md">
                      {exchange.name} is not supported yet. We'll announce it as soon as it goes live.
                    </p>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
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
                  Select your exchange tab above and enter your API Key and Secret Key
                </li>
                <li className="text-sm text-muted-foreground">
                  Optionally enable testnet for sandbox trading
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
                    <th className="text-center py-2">Signal Bots</th>
                  </tr>
                </thead>
                <tbody>
                  {EXCHANGES.map((e, idx) => (
                    <tr key={e.id} className={idx < EXCHANGES.length - 1 ? "border-b" : ""}>
                      <td className="py-2">{e.name}</td>
                      <td className="text-center py-2"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                      <td className="text-center py-2"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                      <td className="text-center py-2"><CheckCircle className="h-4 w-4 text-green-500 mx-auto" /></td>
                    </tr>
                  ))}
                  {COMING_SOON.map((e) => (
                    <tr key={e.id} className="border-t">
                      <td className="py-2">{e.name} <span className="text-xs text-muted-foreground">(Coming soon)</span></td>
                      <td className="text-center py-2"><X className="h-4 w-4 text-muted-foreground mx-auto" /></td>
                      <td className="text-center py-2"><X className="h-4 w-4 text-muted-foreground mx-auto" /></td>
                      <td className="text-center py-2"><X className="h-4 w-4 text-muted-foreground mx-auto" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <Button variant="outline" onClick={() => setActiveTab("binance")}>
            Connect New Exchange
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ExchangeConnections;
