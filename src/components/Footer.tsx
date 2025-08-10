
import Link from 'next/link';
import { Instagram, Facebook, Youtube, Linkedin, X } from 'lucide-react';
import Image from 'next/image';

const serviceAreas = [
    { name: "Delhi", href: "/interior-design-delhi" },
    { name: "Noida", href: "/interior-design-noida" },
    { name: "Gurgaon", href: "#" },
    { name: "Ghaziabad", href: "#" },
    { name: "Faridabad", href: "#" },
    { name: "Greater Noida", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 items-start">
          <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start py-2.5">
             <Link href="/">
                <Image src="/naimsinterior-logo-footer.png" alt="Interiorscape Logo" width="165" height="46" className="object-contain" />
            </Link>
            <div className="mt-4 text-sm text-muted-foreground text-center md:text-left">
                <p>Reg.Office H-77, Silai Bara Gaon, Milak</p>
                <p>Rampur, Uttar Pradesh (244701)</p>
                <p>WeCare@Naimsinterior.com</p>
            </div>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <X className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M12.5.5C5.87.5.5 5.87.5 12.5s5.37 12 12 12 12-5.37 12-12S19.13.5 12.5.5zm-1.4 17.85c-1.3.1-2.45-.69-2.8-1.92-.3-1.02.3-2.22 1-2.85.74-.65 1.74-.85 2.65-.54.9.3 1.63 1.14 1.79 2.18.2 1.22-.5 2.5-1.64 3.13zm2.5-7.03c.02-.02.04-.04.05-.06-.02.02-.03.04-.05.06zm-1.03 2.12c-1.4-.4-2.1-1.8-1.7-3.2.4-1.4 1.8-2.1 3.2-1.7 1.4.4 2.1 1.8 1.7 3.2-.4 1.4-1.8 2.1-3.2 1.7zm.3-6.1c.14-.15.28-.28.44-.4-.16.12-.3.25-.44.4zm2.14-1.3c-.4-.44-.8-.85-1.25-1.23-.3-.24-.6-.46-.9-.66-.23-.15-.46-.28-.7-.4-.4-.2-.8-.32-1.2-.4-.2-.03-.4-.05-.6-.05-.8-.04-1.6.1-2.3.4-.6.25-1.2.6-1.7 1-.5.4-1 .9-1.3 1.4-.3.5-.6 1.1-.7 1.7-.1.3-.2.6-.2.9-.04.8.1 1.6.4 2.3.2.6.6 1.2 1 1.7.4.5.9 1 1.4 1.3.5.3 1.1.6 1.7.7.3.1.6.2.9.2.8.04 1.6-.1 2.3-.4.6-.2 1.2-.6 1.7-1 .5-.4 1-.9 1.3-1.4.3-.5.6-1.1.7-1.7.1-.3.2-.6.2-.9.04-.8-.1-1.6-.4-2.3-.2-.6-.6-1.2-1-1.7-.2-.25-.4-.5-.6-.7zm.98 9.35c.1-.2.17-.4.2-.6.05-.2.08-.4.1-.6s.03-.4.03-.6c0-.4-.03-.8-.08-1.2-.06-.4-.16-.8-.3-1.2-.14-.4-.3-.7-.5-1-.2-.3-.4-.6-.7-.8-.25-.25-.5-.45-.8-.6s-.6-.3-.9-.4c-.3-.08-.6-.13-1-.15s-.6-.04-.9-.02c-.3.02-.6.06-.9.12-.3.07-.6.16-.9.27s-.5.2-.8.4c-.25.12-.5.3-.7.45-.2.15-.4.3-.6.5-.15.15-.3.3-.4.5-.1.15-.2.3-.3.45-.1.14-.15.3-.2.4-.1.3-.2.6-.25.9-.05.3-.08.6-.1.9s-.02.6 0 .9c.02.3.05.6.1.9.07.3.16.6.27.9.12.25.27.5.45.7.15.2.3.4.5.6.15.15.3.3.4.4.15.1.3.2.4.3.3.1.6.2.9.25.3.05.6.08.9.1s.6.02.9,0c.3-.02.6-.05.9-.1.3-.07.6-.16.9-.27.25-.12.5-.27.7-.45.2-.15.4-.3.6-.5.15-.15.3-.3.4-.4.15-.15.2-.3.3-.4.1-.15.2-.3.2-.4zm-3.3-6.85c.1-.03.2-.04.3-.05.1,0,.2-.02.3-.02s.2,0,.3.02c.1.02.2.03.3.05.1.04.2.08.3.13.1.05.15.1.2.16.05.06.1.1.1.2.03.1.05.2.06.3s.02.2.02.3c0,.1,0,.2,0,.3s0,.2-.02.3c-.02.1-.03.2-.06.3s-.1.15-.1.2c-.05.06-.1.1-.2.16s-.2.1-.3.13c-.1.02-.2.04-.3.05s-.2.02-.3.02-.2,0-.3-.02-.2-.03-.3-.05c-.1-.04-.2-.08-.3-.13-.1-.05-.15-.1-.2-.16-.05-.06-.1-.1-.1-.2-.03-.1-.05-.2-.06-.3s-.02-.2-.02-.3c0-.1,0-.2,0-.3s0-.2.02-.3c.02-.1.03-.2.06-.3s.1-.15.1-.2c.05-.06.1-.1.2-.16s.2-.1.3-.13z"/></svg>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
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
              <li><Link href="/terms-and-conditions" className="text-sm text-muted-foreground hover:text-primary">Terms & Conditions</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/declaration" className="text-sm text-muted-foreground hover:text-primary">Declaration</Link></li>
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
          <p>&copy; {new Date().getFullYear()} NAIMS INTERIOR. All rights reserved.</p>
        </div>
        <div className="mt-8 border-t pt-8">
            <h3 className="font-headline text-lg font-semibold text-center md:text-left">Our Service Areas</h3>
            <div className="mt-4">
                <ul className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
                    {serviceAreas.map(area => (
                        <li key={area.name}>
                            <Link href={area.href} className="text-sm text-muted-foreground hover:text-primary">
                                Interior Design in {area.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    </footer>
  );
}
