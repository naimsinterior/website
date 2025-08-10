import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster";
import { SubHeader } from '@/components/SubHeader';
import { FloatingContactButtons } from '@/components/FloatingContactButtons';
import { MobileFooter } from '@/components/MobileFooter';
import { SubFooter } from '@/components/SubFooter';

export const metadata: Metadata = {
  title: 'Interiorscape',
  description: 'Crafting timeless spaces for modern living.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <SubHeader />
        <Header />
        <main className="pb-20 md:pb-0">{children}</main>
        <FloatingContactButtons />
        <SubFooter />
        <Footer />
        <MobileFooter />
        <Toaster />
      </body>
    </html>
  );
}
