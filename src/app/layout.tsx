
'use client';

import './globals.css';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster";
import { SubHeader } from '@/components/SubHeader';
import { FloatingContactButtons } from '@/components/FloatingContactButtons';
import { MobileFooter } from '@/components/MobileFooter';
import { useState, useEffect } from 'react';
import { SimpleContactForm } from '@/components/SimpleContactForm';
import { OfferPopup } from '@/components/OfferPopup';
import { Preloader } from '@/components/Preloader';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAgentDashboard = pathname === '/agent-dashboard';
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <title>NAIMS INTERIOR</title>
        <meta name="description" content="Crafting timeless spaces for modern living." />
        <link rel="icon" href="/naimsinterior-icon.png" />
      </head>
      <body className="font-body antialiased">
        <Preloader isLoading={isLoading} />
        <OfferPopup onBookNow={() => setIsContactFormOpen(true)} />
        <SimpleContactForm open={isContactFormOpen} onOpenChange={setIsContactFormOpen}>
            {null}
        </SimpleContactForm>
        {!isAgentDashboard && <SubHeader />}
        {!isAgentDashboard && <Header />}
        <main className={!isAgentDashboard ? "pb-20 md:pb-0" : ""}>{children}</main>
        {!isAgentDashboard && <FloatingContactButtons />}
        {!isAgentDashboard && <Footer />}
        {!isAgentDashboard && <MobileFooter />}
        <Toaster />
      </body>
    </html>
  );
}
