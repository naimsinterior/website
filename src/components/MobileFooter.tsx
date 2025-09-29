
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Heart, Menu, LogIn, UserPlus, UserCircle, Calculator, Briefcase, Info, LayoutDashboard, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

const mainNavLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/design', label: 'Design', icon: LayoutGrid },
  { href: '/portfolio', label: 'Portfolio', icon: Briefcase },
  { href: '/moodboard', label: 'Moodboard', icon: Heart },
];

const allNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/design", label: "Design" },
  { href: "/style-tool", label: "Style Tool" },
  { href: "/franchise", label: "Franchise" },
  { href: "/careers", label: "Careers" },
  { href: "/interior-designer-near-me", label: "Contact" },
  { href: "/moodboard", label: "Moodboard" },
  { href: "/portfolio", label: "Portfolio" },
];

const legalLinks = [
    { href: "/terms-and-conditions", label: "Terms & Conditions" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/declaration", label: "Declaration" },
];


export function MobileFooter() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: React.ElementType }) => {
    const isActive = pathname === href;
    return (
      <Link href={href} className={cn("flex flex-col items-center gap-1 text-xs transition-colors hover:text-primary", isActive ? "text-primary" : "text-muted-foreground")}>
        <Icon className="h-5 w-5" />
        <span>{label}</span>
      </Link>
    );
  };
  
  const AllLinksNavLink = ({ href, label }: { href: string; label: string }) => (
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
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <div className="flex h-full items-center justify-around">
                {mainNavLinks.map(link => <NavLink key={link.href} {...link} />)}
                <SheetTrigger asChild>
                    <button className="flex flex-col items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary">
                        <Menu className="h-5 w-5" />
                        <span>Menu</span>
                    </button>
                </SheetTrigger>
            </div>
            <SheetContent side="bottom" className="h-full">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image src="/Naims_interior_logo.PNG" alt="NAIMS INTERIOR Logo" width="150" height="40" className="object-contain" />
                </Link>
                <nav className="flex flex-col gap-4">
                  {allNavLinks.map((link) => (
                    <AllLinksNavLink key={link.href} {...link} />
                  ))}
                </nav>
                 <div className="mt-4 flex flex-col gap-2">
                    <Button asChild>
                      <Link href="/calculate" onClick={() => setIsMobileMenuOpen(false)}>Calculate your home interior</Link>
                    </Button>
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
                        {legalLinks.map(link => <AllLinksNavLink key={link.href} {...link} />)}
                    </nav>
                </div>
              </div>
            </SheetContent>
        </Sheet>
    </div>
  );
}
