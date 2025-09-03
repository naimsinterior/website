
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const POPUP_SESSION_KEY = 'naimsinterior-popup-shown';

interface OfferPopupProps {
    onBookNow: () => void;
}

export function OfferPopup({ onBookNow }: OfferPopupProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasBeenShown = sessionStorage.getItem(POPUP_SESSION_KEY);
        if (!hasBeenShown) {
            const timer = setTimeout(() => {
                setIsOpen(true);
                sessionStorage.setItem(POPUP_SESSION_KEY, 'true');
            }, 3000); // Open after 3 seconds

            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    }
    
    const handleBookNow = () => {
        onBookNow();
        handleClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden" onInteractOutside={handleClose}>
                <div className="relative h-64 w-full">
                    <Image
                        src="/Popup-pro-5-off-image.png"
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
                           Get 5% off your first design consultation.
                        </DialogDescription>
                    </DialogHeader>
                    <p className="text-muted-foreground my-4">
                        Let's create a space you'll love. Book a consultation today to redeem your discount.
                    </p>
                    <Button size="lg" className="w-full" onClick={handleBookNow}>
                        Book Now & Save
                    </Button>
                     <Button variant="link" className="mt-2 text-muted-foreground" onClick={handleClose}>
                        No, thanks
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
