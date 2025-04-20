
import React from "react";
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/ui/hero-section";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Grid Trading: The Complete Guide for 2025",
      excerpt: "Learn how to leverage grid trading strategies to maximize profits in sideways markets with Torgovo's automated bots.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
      category: "Trading Strategies",
      author: "Alex Chen",
      date: "April 15, 2025",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Martingale Trading: Risk Management Best Practices",
      excerpt: "Discover how to effectively manage risk when implementing Martingale trading strategies in volatile cryptocurrency markets.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop",
      category: "Risk Management",
      author: "Sophia Rodriguez",
      date: "April 10, 2025",
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "How to Connect Your Exchange API Securely",
      excerpt: "Follow our step-by-step guide to safely connect your cryptocurrency exchange API to Torgovo while minimizing security risks.",
      image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1000&auto=format&fit=crop",
      category: "Security",
      author: "Marcus Johnson",
      date: "April 5, 2025",
      readTime: "5 min read"
    },
    {
      id: 4,
      title: "Analyzing Your Bot Performance: Key Metrics to Track",
      excerpt: "Learn which performance indicators matter most when evaluating your trading bot's effectiveness and optimizing strategies.",
      image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=1000&auto=format&fit=crop",
      category: "Analytics",
      author: "Emma Williams",
      date: "April 1, 2025",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "The Future of Automated Trading: AI and Machine Learning",
      excerpt: "Explore how artificial intelligence and machine learning are reshaping automated trading strategies and what this means for traders.",
      image: "https://images.unsplash.com/photo-1639322537066-2e746dc3369f?q=80&w=1000&auto=format&fit=crop",
      category: "Technology",
      author: "Raj Patel",
      date: "March 25, 2025",
      readTime: "10 min read"
    }
  ];

  const categories = [
    "All Categories",
    "Trading Strategies",
    "Risk Management",
    "Security",
    "Analytics",
    "Technology",
    "Case Studies",
    "News & Updates"
  ];

  return (
    <Layout>
      <HeroSection 
        heroTitle="Torgovo Blog" 
        subtitle="Insights, guides, and news about cryptocurrency trading automation and strategies"
      >
        <div className="w-full max-w-lg mx-auto mt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Search articles..." 
              className="pl-10 bg-background border-torgovo-purple/30 focus:border-torgovo-purple"
            />
          </div>
        </div>
      </HeroSection>

      <div className="container py-12">
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((category, index) => (
            <Button 
              key={index} 
              variant={index === 0 ? "default" : "outline"} 
              className={index === 0 ? "bg-torgovo-purple hover:bg-torgovo-purple-dim" : ""}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col h-full glass-card hover:shadow-md transition-shadow">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardContent className="p-6 flex flex-col flex-1">
                <div className="mb-3">
                  <span className="text-xs font-medium text-torgovo-blue">{post.category}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4 text-sm flex-1">{post.excerpt}</p>
                <Separator className="my-4" />
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <div className="flex gap-4">
                    <div className="flex items-center">
                      <CalendarDays className="h-3 w-3 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="p-0 h-auto hover:bg-transparent hover:text-torgovo-purple">
                    Read more <ChevronRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="border-torgovo-purple text-torgovo-purple">
            Load More Articles
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
