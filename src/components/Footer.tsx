import Link from 'next/link';
import { Twitter, Instagram, Facebook } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 items-start">
          <div className="flex flex-col items-center md:items-start py-2.5">
             <Link href="/">
                <Image src="/Naims_interior_logo.PNG" alt="Interiorscape Logo" width="180" height="50" className="object-contain" />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground text-center md:text-left">
              Crafting timeless spaces for modern living.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/projects" className="text-sm text-muted-foreground hover:text-primary">Projects</Link></li>
              <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/style-tool" className="text-sm text-muted-foreground hover:text-primary">Style Tool</Link></li>
              <li><Link href="/moodboard" className="text-sm text-muted-foreground hover:text-primary">Moodboard</Link></li>
              <li><Link href="/calculate" className="text-sm text-muted-foreground hover:text-primary">Calculator</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
            </ul>
          </div>
           <div>
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>123 Design Lane</li>
              <li>New York, NY 10001</li>
              <li>(555) 123-4567</li>
              <li>hello@interiorscape.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Interiorscape. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
