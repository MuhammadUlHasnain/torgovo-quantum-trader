
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Globe, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";

const socials = [
  { name: "Twitter", url: "#" },
  { name: "Telegram", url: "#" },
  { name: "Discord", url: "#" },
  { name: "LinkedIn", url: "#" },
  { name: "YouTube", url: "#" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    // In a real application, this would send the email to your newsletter service
    toast({
      title: "Newsletter Subscription",
      description: "Thank you for subscribing to our newsletter!",
    });
    
    setEmail("");
  };

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-8">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-torgovo-blue to-torgovo-purple">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">T</div>
              </div>
              <span className="font-bold text-xl glow-text text-torgovo-purple">TORGOVO</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Next-generation automated trading platform for cryptocurrency markets.
            </p>
            
            {/* Social Media Links */}
            <div className="flex flex-wrap gap-3 mt-4">
              {socials.map((social) => (
                <a 
                  key={social.name} 
                  href={social.url}
                  className="text-sm text-muted-foreground hover:text-torgovo-purple transition-colors"
                  aria-label={social.name}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-torgovo-blue">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
              </li>
              <li>
                <Link to="/grid-bots" className="text-muted-foreground hover:text-foreground">GRID Bots</Link>
              </li>
              <li>
                <Link to="/martingale-bots" className="text-muted-foreground hover:text-foreground">Martingale Bots</Link>
              </li>
              <li>
                <Link to="/tutorial" className="text-muted-foreground hover:text-foreground">Tutorial</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-torgovo-blue">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground">About Us</Link>
              </li>
              <li>
                <Link to="/faqs" className="text-muted-foreground hover:text-foreground">FAQs</Link>
              </li>
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground">Blog</Link>
              </li>
              <li>
                <Link to="/help-support" className="text-muted-foreground hover:text-foreground">Help & Support</Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-torgovo-blue">Newsletter</h4>
            <p className="text-sm text-muted-foreground">Subscribe to receive updates, trading tips, and exclusive offers.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-muted/30"
              />
              <Button type="submit" className="bg-torgovo-purple hover:bg-torgovo-purple/80">
                <Mail className="h-4 w-4" />
              </Button>
            </form>
            
            <div className="pt-4">
              <h4 className="font-medium text-torgovo-blue mb-2">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="mailto:support@torgovo.com" className="text-muted-foreground hover:text-foreground">support@torgovo.com</a>
                </li>
                <li>
                  <Link to="/about" className="text-muted-foreground hover:text-foreground">Contact Us</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Torgovo. All rights reserved.
          </div>
          
          <div className="flex flex-wrap gap-4 text-xs">
            <a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</a>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Globe className="h-4 w-4" />
            </Button>
            <span className="text-xs text-muted-foreground">English</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
