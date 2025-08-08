
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Heart, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from 'react';
import { Button } from './ui/button';
import { Mountain } from 'lucide-react';

const mainNavLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/projects', label: 'Projects', icon: LayoutGrid },
  { href: '/moodboard', label: 'Moodboard', icon: Heart },
];

const allNavLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/style-tool", label: "Style Tool" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
  { href: "/moodboard", label: "Moodboard" },
  { href: "/calculate", label: "Calculator" },
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
                  <Mountain className="h-6 w-6 text-primary" />
                  <span className="font-headline text-lg font-bold">Interiorscape</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {allNavLinks.map((link) => (
                    <AllLinksNavLink key={link.href} {...link} />
                  ))}
                </nav>
                 <div className="mt-4 flex flex-col gap-2">
                    <Button asChild>
                      <Link href="/calculate">Calculate</Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/login">Login</Link>
                    </Button>
                     <Button asChild>
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                </div>
              </div>
            </SheetContent>
        </Sheet>
    </div>
  );
}
