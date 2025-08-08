'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';
import Image from 'next/image';

export function FloatingContactButtons() {
    return (
        <div className="fixed bottom-6 right-4 z-50 flex flex-col items-center gap-4">
            <Link 
                href="https://wa.me/15551234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#1EBE57] transition-all flex items-center justify-center"
                aria-label="Chat on WhatsApp"
            >
                <Image src="/whatsapp.svg" alt="WhatsApp" width={32} height={32} />
            </Link>
            <Link 
                href="tel:5551234567" 
                className="bg-card text-card-foreground p-4 rounded-full shadow-lg hover:bg-muted transition-all flex items-center justify-center border"
                aria-label="Call Us"
            >
                <Phone className="h-6 w-6" />
            </Link>
        </div>
    );
}
