
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
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
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-torgovo-blue">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">API Documentation</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">FAQs</a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-torgovo-blue">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:support@torgovo.com" className="text-muted-foreground hover:text-foreground">support@torgovo.com</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">Twitter</a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">Telegram</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-border pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Torgovo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
