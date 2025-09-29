
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogIn, UserPlus, UserCircle, Calculator, ChevronDown, LayoutDashboard, User } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GetQuoteForm } from "./GetQuoteForm";
import Image from "next/image";
import { inspirations } from "@/app/design/inspirations";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"


const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  // Design link is handled separately
  { href: "/style-tool", label: "Style Tool" },
  { href: "/franchise", label: "Franchise" },
  { href: "/careers", label: "Careers" },
  { href: "/interior-designer-near-me", label: "Contact" },
  { href: "/moodboard", label: "Moodboard" },
  { href: "/portfolio", label: "Portfolio" },
];

const designCategories = Array.from(new Set(inspirations.map(i => i.category)));

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary",
        pathname === href ? "text-primary" : "text-muted-foreground"
      )}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex-1 flex items-center">
            <Link href="/" className="flex items-center gap-2">
                <Image src="/Naims_interior_logo.PNG" alt="NAIMS INTERIOR Logo" width="150" height="40" className="object-contain" />
            </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink href="/" label="Home" />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className={cn(
                "flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary focus:outline-none",
                pathname.startsWith('/design') ? "text-primary" : "text-muted-foreground"
              )}>
                Design <ChevronDown className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/design">All Inspirations</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {designCategories.map(category => (
                <DropdownMenuItem key={category} asChild>
                  <Link href={`/design?category=${encodeURIComponent(category)}`}>{category}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navLinks.filter(l => !["/", "/about", "/design"].includes(l.href)).map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <div className="flex-1 flex items-center justify-end gap-2">
          <div className="hidden md:flex items-center gap-4">
            <Button asChild>
                <Link href="/calculate">
                    <Calculator className="mr-2 h-4 w-4" /> Calculate
                </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon">
                  <UserCircle className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/signup">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Sign Up
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/client-dashboard">
                    <User className="mr-2 h-4 w-4" />
                    Client Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/agent-dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Agent Dashboard
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="flex items-center gap-2 md:hidden">
            <Button asChild variant="ghost" size="icon">
                <Link href="/calculate">
                    <Calculator className="h-7 w-7" />
                    <span className="sr-only">Calculate</span>
                </Link>
            </Button>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-6 p-6 pt-0">
                  <div className="flex items-center">
                    <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                      <Image src="/Naims_interior_logo.PNG" alt="NAIMS INTERIOR Logo" width="150" height="40" className="object-contain" />
                    </Link>
                  </div>
                  <nav className="flex flex-col gap-4">
                    <NavLink href="/" label="Home" />
                    <NavLink href="/about" label="About" />
                    <Collapsible>
                      <CollapsibleTrigger className="flex items-center justify-between w-full text-sm font-medium [&[data-state=open]>svg]:rotate-180">
                         <NavLink href="/design" label="Design" />
                         <ChevronDown className="h-4 w-4 transition-transform" />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="flex flex-col gap-2 pl-4 mt-2">
                           {designCategories.map(category => (
                            <NavLink key={category} href={`/design?category=${encodeURIComponent(category)}`} label={category} />
                          ))}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                    {navLinks.filter(l => !["/", "/about", "/design"].includes(l.href)).map((link) => (
                      <NavLink key={link.href} {...link} />
                    ))}
                  </nav>
                   <div className="mt-4 flex flex-col gap-2">
                       <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline">
                            <UserCircle className="mr-2 h-4 w-4" /> Account
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem asChild>
                            <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                              <LogIn className="mr-2 h-4 w-4" />
                              Login
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                              <UserPlus className="mr-2 h-4 w-4" />
                              Sign Up
                            </Link>
                          </DropdownMenuItem>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem asChild>
                              <Link href="/client-dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                                <User className="mr-2 h-4 w-4" />
                                Client Dashboard
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href="/agent-dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                Agent Dashboard
                              </Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                  </div>
                   <div className="mt-4 border-t pt-4">
                      <nav className="flex flex-col gap-4">
                          <Link href="/terms-and-conditions" className="text-sm text-muted-foreground hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Terms & Conditions</Link>
                          <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Privacy Policy</Link>
                          <Link href="/declaration" className="text-sm text-muted-foreground hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Declaration</Link>
                      </nav>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
