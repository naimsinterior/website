
'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';
import Image from 'next/image';

export function FloatingContactButtons() {
    return (
        <div className="fixed bottom-24 right-4 z-50 flex flex-col items-center gap-4">
            <Link 
                href="https://wa.me/918449446389?text=Hi+NAIMS+INTERIOR+Team,+I+need+some+information./start:naimsinterior/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="transition-all flex items-center justify-center w-12 h-12"
                aria-label="Chat on WhatsApp"
            >
                <Image src="/WhatsApp_icon.png" alt="WhatsApp" width={48} height={48} />
            </Link>
            <Link 
                href="tel:7251000103" 
                className="bg-card text-card-foreground p-3 rounded-full shadow-lg hover:bg-muted transition-all flex items-center justify-center border w-12 h-12"
                aria-label="Call Us"
            >
                <Phone className="h-6 w-6" />
            </Link>
        </div>
    );
}
