"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogIn, UserPlus, UserCircle, Calculator } from "lucide-react";
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

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/style-tool", label: "Style Tool" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
  { href: "/moodboard", label: "Moodboard" },
  { href: "/calculate", label: "Calculator" },
];

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
                <Image src="/Naims_interior_logo.PNG" alt="Interiorscape Logo" width="150" height="40" className="object-contain" />
            </Link>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <div className="flex-1 flex items-center justify-end gap-4">
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 p-6">
                <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image src="/Naims_interior_logo.PNG" alt="Interiorscape Logo" width="150" height="40" className="object-contain" />
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <NavLink key={link.href} {...link} />
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
      </div>
    </header>
  );
}
