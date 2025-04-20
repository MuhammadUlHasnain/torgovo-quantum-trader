
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/hero-section";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const FAQs = () => {
  // Group FAQs by category
  const faqCategories = [
    {
      name: "Getting Started",
      questions: [
        {
          question: "What is Torgovo?",
          answer: "Torgovo is a next-generation automated trading platform for cryptocurrency markets. Our platform allows you to create, deploy, and manage automated trading bots without any coding knowledge."
        },
        {
          question: "How do I create my first bot?",
          answer: "To create your first bot, sign up for a Torgovo account, connect your exchange API, then navigate to the Dashboard and click on 'Create Bot'. Follow the guided setup process to configure your bot according to your trading preferences."
        },
        {
          question: "What exchanges do you support?",
          answer: "We currently support Binance, Bybit, Kucoin, Bitget, and OKX. We're constantly working to add more exchanges to our platform."
        }
      ]
    },
    {
      name: "Account Management",
      questions: [
        {
          question: "How do I change my password?",
          answer: "To change your password, go to Dashboard > Settings > Account Security. You'll need to enter your current password and then set a new one."
        },
        {
          question: "Can I have multiple accounts?",
          answer: "Each user should maintain only one account as per our terms of service. If you need to manage multiple trading strategies, you can create multiple bots under a single account."
        },
        {
          question: "What happens if I forget my password?",
          answer: "If you forget your password, click on the 'Forgot Password' link on the login page. We'll send a password reset link to your registered email address."
        }
      ]
    },
    {
      name: "Bot Creation and Management",
      questions: [
        {
          question: "What types of bots does Torgovo offer?",
          answer: "Torgovo currently offers GRID trading bots and Martingale strategy bots. GRID bots work best in range-bound markets, while Martingale bots utilize cost-averaging strategies to optimize trading performance."
        },
        {
          question: "How many bots can I run simultaneously?",
          answer: "The number of bots you can run simultaneously depends on your subscription plan. Free accounts can run 1 bot, while paid plans allow for more concurrent bots."
        },
        {
          question: "Can I modify a bot while it's running?",
          answer: "For safety reasons, you'll need to pause your bot before making significant changes to its configuration. Minor adjustments to certain parameters may be possible without stopping the bot."
        }
      ]
    },
    {
      name: "Grid Trading Strategies",
      questions: [
        {
          question: "What is Grid Trading?",
          answer: "Grid Trading is a strategy that places buy and sell orders at predetermined price levels, creating a grid. This strategy works well in sideways (range-bound) markets by buying low and selling high within the specified range."
        },
        {
          question: "How do I set up the price range for Grid Trading?",
          answer: "When setting up a Grid bot, you'll need to specify the upper and lower price limits that define your grid range. These should be set based on your market analysis and expected price movement."
        },
        {
          question: "What's the optimal number of grid lines?",
          answer: "The optimal number of grid lines depends on the volatility of the market and your risk tolerance. More grid lines mean smaller profits per trade but more frequent trading opportunities. We generally recommend starting with 20-50 grid lines for most markets."
        }
      ]
    },
    {
      name: "Martingale Strategies",
      questions: [
        {
          question: "What is a Martingale Strategy?",
          answer: "The Martingale strategy is a cost-averaging approach where the position size increases after each losing trade. It's designed to recover previous losses and make a profit when the market eventually moves in your favor."
        },
        {
          question: "Is Martingale trading risky?",
          answer: "Martingale strategies can involve higher risk as they increase position sizes after losses. We implement safety features like maximum drawdown protection and position size limits to manage this risk, but users should still carefully consider their risk tolerance."
        },
        {
          question: "What parameters should I adjust in a Martingale bot?",
          answer: "Key parameters include the initial position size, multiplier (how much to increase position size after each loss), maximum drawdown limit, take profit level, and the maximum number of positions."
        }
      ]
    }
  ];

  return (
    <Layout>
      <HeroSection 
        heroTitle="Frequently Asked Questions" 
        subtitle="Find answers to common questions about Torgovo's cryptocurrency trading automation platform"
      >
        <div className="w-full max-w-lg mx-auto mt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search questions..." 
              className="pl-10 bg-background border-torgovo-purple/30 focus:border-torgovo-purple"
            />
          </div>
        </div>
      </HeroSection>

      <div className="container py-12 space-y-12">
        {faqCategories.map((category, idx) => (
          <div key={idx}>
            <h2 className="text-2xl font-bold mb-4 text-torgovo-purple glow-text">{category.name}</h2>
            <Card className="glass-card overflow-hidden">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIdx) => (
                    <AccordionItem key={faqIdx} value={`item-${idx}-${faqIdx}`}>
                      <AccordionTrigger className="text-left font-medium py-4">{faq.question}</AccordionTrigger>
                      <AccordionContent>
                        <div className="pt-2 pb-4">
                          <p className="text-muted-foreground">{faq.answer}</p>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">Was this answer helpful?</div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">Yes</Button>
                              <Button variant="outline" size="sm">No</Button>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        ))}

        <div className="mt-12 bg-card/50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-bold mb-4">Can't find what you're looking for?</h3>
          <p className="mb-6 text-muted-foreground">Our support team is ready to help you with any questions you may have.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-torgovo-purple hover:bg-torgovo-purple-dim">
              <Link to="/help-support">Contact Support</Link>
            </Button>
            <Button variant="outline">View Documentation</Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQs;
