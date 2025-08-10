import Link from 'next/link';

const serviceAreas = [
    { name: "Delhi", href: "/interior-design-delhi" },
    { name: "Noida", href: "/interior-design-noida" },
    { name: "Gurgaon", href: "#" },
    { name: "Ghaziabad", href: "#" },
    { name: "Faridabad", href: "#" },
    { name: "Greater Noida", href: "#" },
];

export function SubFooter() {
  return (
    <div className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
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
  );
}
