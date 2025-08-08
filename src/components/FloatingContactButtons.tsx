'use client';

import Link from 'next/link';
import { Phone } from 'lucide-react';

const WhatsAppIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-6 w-6"
    >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.919 6.066l-1.225 4.485 4.67-1.241zM11.381 15.348c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.297.297-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01s-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.075-.124-.272-.198-.57-.347z"/>
    </svg>
);

export function FloatingContactButtons() {
    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
            <Link 
                href="https://wa.me/15551234567" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#1EBE57] transition-all flex items-center justify-center"
                aria-label="Chat on WhatsApp"
            >
                <WhatsAppIcon />
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
