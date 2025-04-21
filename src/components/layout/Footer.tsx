
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Twitter, Youtube, Linkedin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const FooterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <h4 className="font-medium text-torgovo-blue">{title}</h4>
    <ul className="space-y-2 text-sm">
      {children}
    </ul>
  </div>
);

const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link to={to} className="text-muted-foreground hover:text-foreground transition-colors">
      {children}
    </Link>
  </li>
);

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    toast({
      title: "Newsletter Subscription",
      description: "Thank you for subscribing to our newsletter!",
    });
    
    setEmail("");
  };

  const socialLinks = [
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: Linkedin, href: "#", label: "LinkedIn" },
    { Icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-12">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-torgovo-blue to-torgovo-purple">
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold">
                  T
                </div>
              </div>
              <span className="font-bold text-xl glow-text text-torgovo-purple">TORGOVO</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Next-generation automated trading platform for cryptocurrency markets.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-muted-foreground hover:text-torgovo-purple transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products Section */}
          <FooterSection title="Products">
            <FooterLink to="/grid-bots">Grid Bots</FooterLink>
            <FooterLink to="/martingale-bots">Martingale Bots</FooterLink>
            <FooterLink to="/pricing">Pricing</FooterLink>
            <FooterLink to="/tutorial">Tutorial</FooterLink>
          </FooterSection>

          {/* Resources Section */}
          <FooterSection title="Resources">
            <FooterLink to="/blog">Blog</FooterLink>
            <FooterLink to="/faqs">FAQs</FooterLink>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/help-support">Documentation</FooterLink>
          </FooterSection>

          {/* Support Section */}
          <FooterSection title="Support">
            <FooterLink to="/help-support">Help Center</FooterLink>
            <FooterLink to="/help-support">Contact Us</FooterLink>
            <li>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                System Status
              </a>
            </li>
          </FooterSection>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h4 className="font-medium text-torgovo-blue">Stay Updated</h4>
            <p className="text-sm text-muted-foreground">
              Subscribe to receive updates and trading insights.
            </p>
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
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Torgovo. All rights reserved.
          </div>

          <div className="flex flex-wrap gap-4 text-xs">
            <a href="#" className="text-muted-foreground hover:text-foreground">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
