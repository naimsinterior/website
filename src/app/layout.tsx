
'use client';

import './globals.css';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster";
import { SubHeader } from '@/components/SubHeader';
import { FloatingContactButtons } from '@/components/FloatingContactButtons';
import { MobileFooter } from '@/components/MobileFooter';


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAgentDashboard = pathname === '/agent-dashboard';

  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        <title>NAIMS INTERIOR</title>
        <meta name="description" content="Crafting timeless spaces for modern living." />
        <link rel="icon" href="/Naims_interior_logo.PNG" />
      </head>
      <body className="font-body antialiased">
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
