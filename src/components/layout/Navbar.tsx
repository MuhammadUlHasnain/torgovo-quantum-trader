
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
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  <li>
                    <Link to="/grid-bots">
                      <NavigationMenuLink className={cn(navigationCardClass)}>
                        <div className="mb-2 mt-4 text-lg font-medium text-torgovo-blue">
                          GRID Bots
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Automate trading with our advanced GRID bot strategies
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
                          Leverage cost-averaging strategy for optimal trading results
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
                <ul className="min-w-[220px] p-2">
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

// Shared navigation styles
const navigationItemClass = "group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50";

const navigationCardClass = "flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md";

const navigationDropdownItemClass = "block w-full rounded-md px-4 py-2 text-sm hover:bg-accent hover:text-accent-foreground";

export default Navbar;
