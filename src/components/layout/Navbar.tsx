import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-gradient-to-br from-torgovo-blue to-torgovo-purple">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">T</div>
            </div>
            <span className="hidden font-bold sm:inline-block text-xl glow-text text-torgovo-purple">TORGOVO</span>
          </Link>
        </div>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationItemClass}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Bots</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[700px] gap-3 p-4 md:grid-cols-3">
                  <li>
                    <Link to="/grid-bots">
                      <NavigationMenuLink className={cn(navigationCardClass)}>
                        <div className="mb-2 mt-4 text-lg font-medium text-torgovo-blue">
                          AI Powered Grid Bot
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Managed AI-powered grid strategies
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link to="/martingale-bots">
                      <NavigationMenuLink className={cn(navigationCardClass)}>
                        <div className="mb-2 mt-4 text-lg font-medium text-torgovo-purple">
                          Martingale Bots
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Managed cost-averaging strategy
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link to="/investment-bots">
                      <NavigationMenuLink className={cn(navigationCardClass)}>
                        <div className="mb-2 mt-4 text-lg font-medium text-torgovo-blue">
                          💰 Invest in Bots
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Invest in managed bots across exchanges
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link to="/spot-bots">
                      <NavigationMenuLink className={cn(navigationCardClass)}>
                        <div className="mb-2 mt-4 text-lg font-medium text-torgovo-blue">
                          SPOT Bots
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Custom spot trading with TradingView
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link to="/futures-bots">
                      <NavigationMenuLink className={cn(navigationCardClass)}>
                        <div className="mb-2 mt-4 text-lg font-medium text-torgovo-purple">
                          FUTURES Bots
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Custom futures trading with leverage
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link to="/custom-bots">
                      <NavigationMenuLink className={cn(navigationCardClass)}>
                        <div className="mb-2 mt-4 text-lg font-medium text-torgovo-purple">
                          🔧 Custom Bots
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Create your own TradingView bots
                        </p>
                      </NavigationMenuLink>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/tutorial">
                <NavigationMenuLink className={navigationItemClass}>
                  Tutorial
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/about">
                <NavigationMenuLink className={navigationItemClass}>
                  About
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/pricing">
                <NavigationMenuLink className={navigationItemClass}>
                  Pricing
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="min-w-[220px] p-4 bg-background border border-border rounded-lg shadow-lg z-50">
                  <li>
                    <Link to="/blog">
                      <NavigationMenuLink className={navigationDropdownItemClass}>
                        Blog
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link to="/faqs">
                      <NavigationMenuLink className={navigationDropdownItemClass}>
                        FAQs
                      </NavigationMenuLink>
                    </Link>
                  </li>
                  <li>
                    <Link to="/help-support">
                      <NavigationMenuLink className={navigationDropdownItemClass}>
                        Help & Support
                      </NavigationMenuLink>
                    </Link>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center space-x-4">
          <Link to="/auth/login">
            <Button variant="outline" className="hidden md:flex">
              Sign In
            </Button>
          </Link>
          <Link to="/auth/signup">
            <Button className="bg-torgovo-purple hover:bg-torgovo-purple-dim text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

const navigationItemClass = "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50";

const navigationCardClass = "block w-full select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground";

const navigationDropdownItemClass = "relative block w-full rounded-md px-4 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground";

export default Navbar;
