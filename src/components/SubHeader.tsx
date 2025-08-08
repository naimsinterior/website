'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

export function SubHeader() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="relative bg-accent text-accent-foreground">
      <div className="container mx-auto flex items-center justify-center px-4 py-2 text-center text-sm">
        <p>
          Refer a friend and join our network for exclusive offers!{' '}
          <Link href="/contact" className="underline font-bold hover:opacity-80 transition-opacity">
            Learn More
          </Link>
        </p>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-1/2 right-4 -translate-y-1/2 p-1 rounded-md hover:bg-accent/80 transition-colors"
          aria-label="Dismiss"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
