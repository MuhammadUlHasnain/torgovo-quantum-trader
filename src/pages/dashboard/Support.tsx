
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, HeadphonesIcon, BookOpenIcon, MessageCircleIcon } from "lucide-react";

const Support = () => {
  const faqs = [
    {
      question: "How do I connect my exchange API?",
      answer: "Go to Dashboard > Exchange Connections and click 'Add New Exchange'. Follow the instructions to generate API keys from your exchange and enter them in the form. Make sure to set read-only permissions for maximum security."
    },
    {
      question: "What happens if my internet connection drops?",
      answer: "Our trading bots run on cloud servers, so they will continue to operate even if your computer loses internet connection. However, you won't be able to make changes to your bot settings until your connection is restored."
    },
    {
      question: "How do I pause all my trading bots at once?",
      answer: "On the Bot Management page, click on the 'Actions' dropdown in the top right corner and select 'Pause All Bots'. You can resume them the same way by selecting 'Resume All Bots'."
    },
    {
      question: "Can I test my strategy before risking real funds?",
      answer: "Yes! We offer paper trading functionality that simulates real market conditions without using actual funds. Enable this option when creating a new bot or in the bot settings page."
    },
    {
      question: "How are trading fees calculated?",
      answer: "Trading fees are determined by your exchange, not by Torgovo. Our platform displays the fees charged by your exchange for transparency, but we don't add any additional trading fees."
    },
    {
      question: "What's the difference between Grid and Martingale bots?",
      answer: "Grid bots place multiple orders at predefined price levels to profit from price oscillations in sideways markets. Martingale bots use a cost-averaging strategy, increasing position size as the price moves against your initial position."
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Help & Support</h2>
        <p className="text-muted-foreground">
          Find answers, get help, and contact our support team.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search for help articles..." className="pl-10" />
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <BookOpenIcon className="h-4 w-4" />
            <span>FAQs</span>
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <MessageCircleIcon className="h-4 w-4" />
            <span>Contact Us</span>
          </TabsTrigger>
          <TabsTrigger value="live" className="flex items-center gap-2">
            <HeadphonesIcon className="h-4 w-4" />
            <span>Live Chat</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Our Support Team</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Name</label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">Email</label>
                  <Input id="email" type="email" placeholder="Your email address" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                  <Input id="subject" placeholder="What is your issue about?" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    placeholder="Describe your issue in detail"
                  ></textarea>
                </div>
                <Button type="submit" className="bg-torgovo-blue hover:bg-torgovo-blue/80">
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="live" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Live Chat Support</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <HeadphonesIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Connect with a Support Agent</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Our support team is available Monday through Friday, 9am-5pm EST.
                </p>
                <Button className="bg-torgovo-blue hover:bg-torgovo-blue/80">
                  Start Live Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Support;
