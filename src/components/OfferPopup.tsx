
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const POPUP_SESSION_KEY = 'interiorscape-popup-shown';

export function OfferPopup() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        try {
            const hasBeenShown = sessionStorage.getItem(POPUP_SESSION_KEY);
            if (!hasBeenShown) {
                const timer = setTimeout(() => {
                    setIsOpen(true);
                    sessionStorage.setItem(POPUP_SESSION_KEY, 'true');
                }, 3000); // Open after 3 seconds

                return () => clearTimeout(timer);
            }
        } catch (error) {
            // This can happen in environments where sessionStorage is not available.
            console.warn("Could not use sessionStorage for popup.", error);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden" onInteractOutside={handleClose}>
                <div className="relative h-64 w-full">
                    <Image
                        src="https://placehold.co/600x400.png"
                        alt="Special Offer"
                        fill
                        className="object-cover"
                        data-ai-hint="modern furniture"
                    />
                </div>
                <div className="p-8 text-center">
                    <DialogHeader>
                        <DialogTitle className="font-headline text-3xl mb-2">Exclusive Offer!</DialogTitle>
                        <DialogDescription className="text-lg">
                           Get 15% off your first design consultation.
                        </DialogDescription>
                    </DialogHeader>
                    <p className="text-muted-foreground my-4">
                        Let's create a space you'll love. Book a consultation today to redeem your discount.
                    </p>
                    <Button asChild size="lg" className="w-full" onClick={handleClose}>
                        <Link href="/contact">Book Now & Save</Link>
                    </Button>
                     <Button variant="link" className="mt-2 text-muted-foreground" onClick={handleClose}>
                        No, thanks
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
