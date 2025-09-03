
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PreloaderProps {
    isLoading: boolean;
}

export function Preloader({ isLoading }: PreloaderProps) {
  return (
    <div className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background transition-opacity duration-500",
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      <div className="relative">
        <Image src="/Naims_interior_logo.PNG" alt="NAIMS INTERIOR Logo" width="200" height="53" className="object-contain" priority />
        <div className="absolute bottom-[-10px] left-0 right-0 h-1 bg-primary/20 overflow-hidden rounded-full">
            <div className="h-full bg-primary animate-preloader-fill"></div>
        </div>
      </div>
    </div>
  );
}
