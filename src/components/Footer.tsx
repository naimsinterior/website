
import Link from 'next/link';
import Image from 'next/image';
import { inspirations } from '@/app/design/inspirations';

const serviceAreas = [
    { name: "Delhi", href: "/interior-design-delhi" },
    { name: "Noida", href: "/interior-design-noida" },
    { name: "Gurgaon", href: "#" },
    { name: "Ghaziabad", href: "#" },
    { name: "Faridabad", href: "#" },
    { name: "Greater Noida", href: "#" },
];

const socialLinks = [
    { name: "Facebook", href: "#", icon: "/facebook.svg" },
    { name: "Instagram", href: "#", icon: "/instagram.svg" },
    { name: "X", href: "#", icon: "/x-logo.svg" },
    { name: "YouTube", href: "#", icon: "/youtube.svg" },
    { name: "LinkedIn", href: "#", icon: "/linkedin.svg" },
    { name: "Pinterest", href: "#", icon: "/pinterest.svg" },
];

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 items-start">
          <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start py-2.5">
             <Link href="/">
                <Image src="/naimsinterior-logo-footer.png" alt="NAIMS INTERIOR Logo" width="165" height="46" className="object-contain" />
            </Link>
            <div className="mt-4 text-sm text-muted-foreground text-center md:text-left">
                <p>Reg.Office H-77, Silai Bara Gaon, Milak</p>
                <p>Rampur, Uttar Pradesh (244701)</p>
                <p>WeCare@Naimsinterior.com</p>
            </div>
             <div className="mt-4 flex gap-4">
                {socialLinks.map(social => (
                    <Link key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                        <Image src={social.icon} alt={social.name} width={20} height={20} className="object-contain" />
                    </Link>
                ))}
            </div>
          </div>
          <div>
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wider">Company</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary">About Us</Link></li>
              <li><Link href="/design" className="text-sm text-muted-foreground hover:text-primary">Design</Link></li>
              <li><Link href="/careers" className="text-sm text-muted-foreground hover:text-primary">Careers</Link></li>
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
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-primary">Blog</Link></li>
              <li><Link href="/feedback" className="text-sm text-muted-foreground hover:text-primary">Feedback</Link></li>
            </ul>
          </div>
           <div>
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wider">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/contact?office=headoffice" className="text-sm text-muted-foreground hover:text-primary">Head office</Link></li>
              <li><Link href="/contact?office=noida" className="text-sm text-muted-foreground hover:text-primary">Noida</Link></li>
              <li><Link href="/contact?office=gurgaon" className="text-sm text-muted-foreground hover:text-primary">Gurgaon</Link></li>
              <li><Link href="/contact?office=chennai" className="text-sm text-muted-foreground hover:text-primary">Chennai</Link></li>
              <li><Link href="/contact?office=omr" className="text-sm text-muted-foreground hover:text-primary">OMR</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
            <h3 className="font-headline text-lg font-semibold text-center md:text-left">Design Inspirations</h3>
            <div className="mt-4">
                <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-6 gap-y-2">
                  {inspirations.map(project => (
                      <li key={project.slug} className='text-sm text-muted-foreground'>
                          <Link href={`/design/${project.slug}`} className="hover:text-primary">
                              {project.title}
                          </Link>
                      </li>
                  ))}
                </ul>
            </div>
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
        <div className="border-t text-sm text-muted-foreground flex items-center justify-center py-[6px]">
          <p className="m-0">&copy; {new Date().getFullYear()} NAIMS INTERIOR. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
