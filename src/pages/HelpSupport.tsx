
import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/hero-section";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Search, 
  HelpCircle, 
  FileText, 
  BookOpen, 
  MessageSquare, 
  Users,
  Video,
  ExternalLink,
  ChevronRight,
  CheckCircle,
  Bot,
  Settings,
  Shield,
  CreditCard,
  Info,
  ThumbsUp,
  ThumbsDown,
  Upload
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Support categories with icons
  const supportCategories = [
    { name: "Getting Started", icon: BookOpen, color: "from-torgovo-blue to-torgovo-purple" },
    { name: "Account Management", icon: Settings, color: "from-torgovo-purple to-torgovo-purple-dim" },
    { name: "Bot Management", icon: Bot, color: "from-torgovo-blue to-torgovo-blue" },
    { name: "Trading Strategies", icon: ChevronRight, color: "from-torgovo-purple-dim to-torgovo-purple" },
    { name: "Security", icon: Shield, color: "from-torgovo-blue to-torgovo-purple" },
    { name: "Billing", icon: CreditCard, color: "from-torgovo-purple to-torgovo-blue" }
  ];

  // Featured/common questions
  const featuredQuestions = [
    "How do I create my first trading bot?",
    "How to connect my exchange API securely?",
    "What are the differences between Grid and Martingale bots?",
    "How do I withdraw my profits?",
    "Can I customize my trading strategies?",
    "How to interpret bot performance metrics?"
  ];

  // Featured video tutorials
  const videoTutorials = [
    {
      id: 1,
      title: "Getting Started with Torgovo",
      description: "Learn how to set up your account and create your first trading bot",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=600&auto=format&fit=crop",
      duration: "8:24"
    },
    {
      id: 2,
      title: "Configuring Grid Trading Bots",
      description: "Master the setup process for Grid trading bots for optimal performance",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=600&auto=format&fit=crop",
      duration: "12:05"
    },
    {
      id: 3,
      title: "Setting Up Martingale Strategies",
      description: "Deep dive into Martingale bots configuration and risk management",
      thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=600&auto=format&fit=crop",
      duration: "15:47"
    },
    {
      id: 4,
      title: "Connecting Exchange APIs Securely",
      description: "Step-by-step guide to safely connect your exchange accounts to Torgovo",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
      duration: "6:12"
    }
  ];

  // Recent community forum discussions
  const communityDiscussions = [
    {
      title: "Best settings for BTCUSDT Grid bot in current market conditions",
      author: "CryptoTrader92",
      replies: 24,
      timestamp: "2 hours ago"
    },
    {
      title: "Is anyone experiencing higher win rates with the new Martingale algorithm?",
      author: "AlgoTrader",
      replies: 18,
      timestamp: "5 hours ago"
    },
    {
      title: "Tips for optimizing bots during high volatility",
      author: "TradingMaster",
      replies: 32,
      timestamp: "1 day ago"
    }
  ];

  return (
    <Layout>
      <HeroSection 
        heroTitle="Help & Support Center" 
        subtitle="Find the answers you need with our comprehensive resources"
      >
        <div className="w-full max-w-2xl mx-auto mt-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search for help articles, tutorials, FAQs..." 
            className="pl-12 py-6 text-lg bg-card/50 border-torgovo-purple/30 focus:border-torgovo-purple"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-torgovo-purple hover:bg-torgovo-purple-dim">
            Search
          </Button>
        </div>
      </HeroSection>

      <div className="container py-12 space-y-16">
        {/* Support Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-8 text-center">How Can We Help You?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {supportCategories.map((category, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer glass-card">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                    <category.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-medium">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Questions */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Common Questions</h2>
            <Button variant="ghost" className="text-torgovo-purple flex items-center gap-1 hover:bg-transparent hover:underline">
              View all FAQs
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {featuredQuestions.map((question, idx) => (
              <Card key={idx} className="glass-card hover:border-torgovo-purple/50 transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-start gap-3">
                  <HelpCircle className="h-5 w-5 text-torgovo-purple mt-0.5 flex-shrink-0" />
                  <span>{question}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Main tabbed content */}
        <section>
          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="faq">
                <FileText className="h-4 w-4 mr-2" />
                Knowledge Base
              </TabsTrigger>
              <TabsTrigger value="video">
                <Video className="h-4 w-4 mr-2" />
                Video Tutorials
              </TabsTrigger>
              <TabsTrigger value="contact">
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Support
              </TabsTrigger>
              <TabsTrigger value="community">
                <Users className="h-4 w-4 mr-2" />
                Community
              </TabsTrigger>
            </TabsList>
            
            {/* Knowledge Base / FAQ Section */}
            <TabsContent value="faq" className="space-y-8">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Find answers to common questions organized by topic
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">
                        How do I create my first bot?
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>To create your first trading bot:</p>
                          <ol className="list-decimal pl-5 space-y-2">
                            <li>Navigate to the dashboard and click the "Create Bot" button</li>
                            <li>Choose between Grid or Martingale bot type</li>
                            <li>Select your preferred trading pair from the supported markets</li>
                            <li>Configure your trading parameters (price range, grid size, etc.)</li>
                            <li>Review your settings and click "Create Bot"</li>
                            <li>Start your bot when you're ready to begin trading</li>
                          </ol>
                          <p className="text-muted-foreground">For a more detailed walkthrough, check out our <span className="text-torgovo-blue cursor-pointer">Getting Started video tutorial</span>.</p>
                          
                          <div className="bg-accent/30 p-4 rounded-lg mt-4">
                            <h4 className="font-medium mb-2 text-torgovo-purple">Related Articles</h4>
                            <ul className="space-y-2">
                              <li className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span className="text-torgovo-blue cursor-pointer">Grid Bot Configuration Guide</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span className="text-torgovo-blue cursor-pointer">Understanding Bot Parameters</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span className="text-torgovo-blue cursor-pointer">Strategy Selection Tips</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              Helpful
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <ThumbsDown className="h-4 w-4" />
                              Not helpful
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">
                        How do I connect my exchange API keys?
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>To securely connect your exchange API keys:</p>
                          <ol className="list-decimal pl-5 space-y-2">
                            <li>Go to your Dashboard and navigate to "Exchange Connections"</li>
                            <li>Click "Add New Exchange" and select your exchange from the list</li>
                            <li>Follow the instructions to generate API keys on your exchange (make sure to set appropriate permissions - trading only, no withdrawals)</li>
                            <li>Enter your API Key and Secret in the provided fields</li>
                            <li>Set a name for this connection for easy identification</li>
                            <li>Click "Connect Exchange" to save and verify the connection</li>
                          </ol>
                          
                          <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
                            <div className="flex gap-2 items-start">
                              <Info className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                              <div>
                                <h5 className="font-medium text-yellow-500">Security Note</h5>
                                <p className="text-sm text-muted-foreground">Never share your API secret key with anyone. Torgovo encrypts all API keys and never stores API secrets in plain text. For maximum security, create API keys with trading-only permissions and no withdrawal access.</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              Helpful
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <ThumbsDown className="h-4 w-4" />
                              Not helpful
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">
                        What's the difference between Grid and Martingale bots?
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-4">
                          <p>Grid and Martingale bots use different trading strategies:</p>
                          
                          <div className="grid md:grid-cols-2 gap-4">
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Grid Trading</CardTitle>
                              </CardHeader>
                              <CardContent className="text-sm space-y-2">
                                <p>Places buy and sell orders at predetermined price levels across a specified range.</p>
                                <p>Best for sideways/ranging markets with predictable boundaries.</p>
                                <p>Profits from price oscillations within the range.</p>
                                <p>Lower risk, consistent smaller profits.</p>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardHeader>
                                <CardTitle className="text-lg">Martingale Strategy</CardTitle>
                              </CardHeader>
                              <CardContent className="text-sm space-y-2">
                                <p>Uses cost-averaging by increasing position sizes after losses.</p>
                                <p>Works in trending and volatile markets.</p>
                                <p>Aims to recover previous losses when the market moves favorably.</p>
                                <p>Higher risk but potential for bigger profits.</p>
                              </CardContent>
                            </Card>
                          </div>
                          
                          <p className="text-muted-foreground">Your choice should depend on market conditions, risk tolerance, and trading goals. For beginners, Grid bots typically offer a gentler learning curve.</p>
                          
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="gap-1">
                              <ThumbsUp className="h-4 w-4" />
                              Helpful
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-1">
                              <ThumbsDown className="h-4 w-4" />
                              Not helpful
                            </Button>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button variant="outline">View All Knowledge Base Articles</Button>
                </CardFooter>
              </Card>
              
              {/* System Status */}
              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                  <CardDescription>Current operational status of Torgovo services</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Trading Services</span>
                      </div>
                      <span className="text-sm text-green-500">Operational</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Exchange Connections</span>
                      </div>
                      <span className="text-sm text-green-500">Operational</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Dashboard & Analytics</span>
                      </div>
                      <span className="text-sm text-green-500">Operational</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2 items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span>Account Services</span>
                      </div>
                      <span className="text-sm text-green-500">Operational</span>
                    </div>
                    <Separator />
                    <div className="text-center text-sm text-muted-foreground">
                      Last updated: Today at 09:45 AM UTC
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Video Tutorials */}
            <TabsContent value="video" className="space-y-8">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Video Tutorials</CardTitle>
                  <CardDescription>
                    Step-by-step visual guides for using the Torgovo platform
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {videoTutorials.map((video) => (
                      <div key={video.id} className="overflow-hidden rounded-lg border border-border group">
                        <div className="relative aspect-video">
                          <img 
                            src={video.thumbnail} 
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                          />
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-16 h-16 rounded-full bg-torgovo-purple/80 flex items-center justify-center">
                              <Video className="h-8 w-8 text-white" />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                            {video.duration}
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-1">{video.title}</h3>
                          <p className="text-sm text-muted-foreground">{video.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">View Full Tutorial Library</Button>
                </CardFooter>
              </Card>
              
              {/* Playlists */}
              <Card>
                <CardHeader>
                  <CardTitle>Tutorial Playlists</CardTitle>
                  <CardDescription>Curated collections of tutorials by topic</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border border-border rounded-lg p-4 hover:border-torgovo-purple/50 transition-colors cursor-pointer">
                      <h3 className="font-medium flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-torgovo-purple" />
                        Getting Started Series
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">From account creation to launching your first bot</p>
                      <div className="text-xs text-muted-foreground mt-2">4 videos • 32 minutes</div>
                    </div>
                    
                    <div className="border border-border rounded-lg p-4 hover:border-torgovo-purple/50 transition-colors cursor-pointer">
                      <h3 className="font-medium flex items-center gap-2">
                        <Bot className="h-5 w-5 text-torgovo-purple" />
                        Grid Trading Masterclass
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">Advanced grid bot configuration and optimization</p>
                      <div className="text-xs text-muted-foreground mt-2">6 videos • 48 minutes</div>
                    </div>
                    
                    <div className="border border-border rounded-lg p-4 hover:border-torgovo-purple/50 transition-colors cursor-pointer">
                      <h3 className="font-medium flex items-center gap-2">
                        <ChevronRight className="h-5 w-5 text-torgovo-purple" />
                        Martingale Strategy Deep Dive
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">Understanding and configuring Martingale trading bots</p>
                      <div className="text-xs text-muted-foreground mt-2">5 videos • 37 minutes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Contact Support */}
            <TabsContent value="contact" className="space-y-8">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>
                    Submit a support ticket and our team will assist you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="your.email@example.com" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Issue Category</FormLabel>
                            <Select>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="account">Account Issues</SelectItem>
                                  <SelectItem value="bot-creation">Bot Creation Problems</SelectItem>
                                  <SelectItem value="bot-performance">Bot Performance Issues</SelectItem>
                                  <SelectItem value="exchange-connection">Exchange Connection</SelectItem>
                                  <SelectItem value="billing">Billing & Subscription</SelectItem>
                                  <SelectItem value="security">Security Concerns</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="Brief description of your issue" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Please provide as much detail as possible about your issue..." 
                                className="min-h-[200px]"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Include any error messages, steps to reproduce the issue, and what you've already tried.
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        name="priority"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Priority</FormLabel>
                            <Select>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select priority level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="low">Low - General question</SelectItem>
                                  <SelectItem value="medium">Medium - Issue affecting functionality</SelectItem>
                                  <SelectItem value="high">High - Critical problem</SelectItem>
                                  <SelectItem value="urgent">Urgent - Security or financial issue</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      
                      <div>
                        <Button type="button" variant="outline" className="flex items-center gap-2 mb-2">
                          <Upload className="h-4 w-4" />
                          Attach Files
                        </Button>
                        <p className="text-xs text-muted-foreground">
                          Max file size: 10MB. Supported formats: JPG, PNG, PDF.
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                      <Button type="submit" className="bg-torgovo-purple hover:bg-torgovo-purple-dim">Submit Ticket</Button>
                    </div>
                  </Form>
                </CardContent>
                <CardFooter className="flex-col items-start gap-4">
                  <div className="bg-card/50 p-4 rounded-lg w-full">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Clock className="h-4 w-4 text-torgovo-blue" />
                      Expected Response Times
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span>Urgent Priority</span>
                        <span className="font-medium text-torgovo-purple">Within 2 hours</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>High Priority</span>
                        <span className="font-medium">Within 4 hours</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Medium Priority</span>
                        <span className="font-medium">Within 24 hours</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span>Low Priority</span>
                        <span className="font-medium">Within 48 hours</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="w-full">
                    <h4 className="font-medium mb-2">Support Hours</h4>
                    <p className="text-sm text-muted-foreground">
                      Our support team is available 24/7 for urgent issues. Regular inquiries are handled Monday to Friday, 9:00 AM - 6:00 PM UTC.
                    </p>
                  </div>
                </CardFooter>
              </Card>
              
              {/* Live Chat */}
              <Card>
                <CardHeader>
                  <CardTitle>Live Chat Support</CardTitle>
                  <CardDescription>Get real-time assistance from our support team</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center text-center">
                  <MessageSquare className="h-16 w-16 text-torgovo-purple opacity-80 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Need immediate assistance?</h3>
                  <p className="text-muted-foreground mb-6 max-w-md">
                    Premium and Enterprise plan subscribers have access to our live chat support for immediate assistance with urgent issues.
                  </p>
                  <Button className="bg-torgovo-purple hover:bg-torgovo-purple-dim">
                    Start Live Chat
                  </Button>
                  <p className="text-xs text-muted-foreground mt-4">
                    Current wait time: ~5 minutes
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Community */}
            <TabsContent value="community" className="space-y-8">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Community Forum</CardTitle>
                  <CardDescription>
                    Join discussions with other Torgovo users and share strategies
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h3 className="font-medium mb-4">Recent Discussions</h3>
                  <div className="space-y-4">
                    {communityDiscussions.map((discussion, idx) => (
                      <div key={idx} className="border border-border rounded-lg p-4 hover:border-torgovo-purple/30 transition-colors cursor-pointer">
                        <h4 className="font-medium mb-2">{discussion.title}</h4>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <div className="flex gap-2 items-center">
                            <div className="w-6 h-6 rounded-full bg-torgovo-purple/20 flex items-center justify-center">
                              {discussion.author.charAt(0).toUpperCase()}
                            </div>
                            <span>{discussion.author}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{discussion.replies}</span>
                            </div>
                            <span>{discussion.timestamp}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="justify-center">
                  <Button variant="outline">Visit Community Forum</Button>
                </CardFooter>
              </Card>
              
              {/* Top Contributors */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Community Contributors</CardTitle>
                  <CardDescription>Members who actively help others in our community</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-torgovo-purple/20 flex items-center justify-center font-bold text-torgovo-purple">
                        AT
                      </div>
                      <div>
                        <div className="font-medium">AlgoTrader</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-torgovo-blue" />
                          <span>528 helpful responses</span>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <div className="text-xs text-muted-foreground mb-1">Expertise</div>
                        <div className="flex gap-1">
                          <span className="px-2 py-0.5 text-xs bg-torgovo-purple/20 text-torgovo-purple rounded-full">Grid Trading</span>
                          <span className="px-2 py-0.5 text-xs bg-torgovo-blue/20 text-torgovo-blue rounded-full">Binance</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-torgovo-purple/20 flex items-center justify-center font-bold text-torgovo-purple">
                        CT
                      </div>
                      <div>
                        <div className="font-medium">CryptoTrader92</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-torgovo-blue" />
                          <span>394 helpful responses</span>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <div className="text-xs text-muted-foreground mb-1">Expertise</div>
                        <div className="flex gap-1">
                          <span className="px-2 py-0.5 text-xs bg-torgovo-purple/20 text-torgovo-purple rounded-full">Martingale</span>
                          <span className="px-2 py-0.5 text-xs bg-torgovo-blue/20 text-torgovo-blue rounded-full">Risk Management</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-torgovo-purple/20 flex items-center justify-center font-bold text-torgovo-purple">
                        TM
                      </div>
                      <div>
                        <div className="font-medium">TradingMaster</div>
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-torgovo-blue" />
                          <span>276 helpful responses</span>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <div className="text-xs text-muted-foreground mb-1">Expertise</div>
                        <div className="flex gap-1">
                          <span className="px-2 py-0.5 text-xs bg-torgovo-purple/20 text-torgovo-purple rounded-full">Technical Analysis</span>
                          <span className="px-2 py-0.5 text-xs bg-torgovo-blue/20 text-torgovo-blue rounded-full">API Integration</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Community Resources */}
              <Card>
                <CardHeader>
                  <CardTitle>Community Resources</CardTitle>
                  <CardDescription>Guides and resources created by community members</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border border-border rounded-lg p-4 hover:border-torgovo-purple/30 transition-colors cursor-pointer">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Advanced Grid Bot Configuration Guide</h4>
                        <div className="flex items-center gap-1 text-xs text-torgovo-blue">
                          <ExternalLink className="h-3 w-3" />
                          <span>PDF</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Comprehensive guide for optimizing grid bot settings based on different market conditions.
                      </p>
                      <div className="text-xs text-muted-foreground">
                        By AlgoTrader • 4.9/5 stars (124 ratings)
                      </div>
                    </div>
                    
                    <div className="border border-border rounded-lg p-4 hover:border-torgovo-purple/30 transition-colors cursor-pointer">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Martingale Calculator Spreadsheet</h4>
                        <div className="flex items-center gap-1 text-xs text-torgovo-blue">
                          <ExternalLink className="h-3 w-3" />
                          <span>XLSX</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Excel tool for calculating optimal Martingale parameters and risk assessment.
                      </p>
                      <div className="text-xs text-muted-foreground">
                        By CryptoTrader92 • 4.8/5 stars (87 ratings)
                      </div>
                    </div>
                    
                    <div className="border border-border rounded-lg p-4 hover:border-torgovo-purple/30 transition-colors cursor-pointer">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Market Condition Analyzer</h4>
                        <div className="flex items-center gap-1 text-xs text-torgovo-blue">
                          <ExternalLink className="h-3 w-3" />
                          <span>Tool</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Web-based tool to analyze market conditions and determine the best bot strategy.
                      </p>
                      <div className="text-xs text-muted-foreground">
                        By TradingMaster • 4.7/5 stars (112 ratings)
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Interactive Troubleshooter */}
        <section>
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Interactive Troubleshooter</CardTitle>
              <CardDescription>Quickly diagnose and resolve common issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-accent/30 p-6 rounded-lg text-center">
                <h3 className="font-medium text-lg mb-2">Having trouble with your trading bot?</h3>
                <p className="text-muted-foreground mb-6">
                  Our interactive troubleshooter can help you identify and resolve common issues without waiting for support.
                </p>
                <Button className="bg-torgovo-purple hover:bg-torgovo-purple-dim">
                  Start Troubleshooting
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Feedback Section */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Help Us Improve</CardTitle>
              <CardDescription>Your feedback helps us enhance our support resources</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border-l-4 border-torgovo-purple pl-4 py-1">
                <h3 className="font-medium mb-2">Was this help center useful?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Please let us know how we can make our support resources more helpful.
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    Yes, it was helpful
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <ThumbsDown className="h-4 w-4" />
                    No, I need more help
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </Layout>
  );
};

export default HelpSupport;
