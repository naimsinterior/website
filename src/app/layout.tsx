import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Toaster } from "@/components/ui/toaster";
import { SubHeader } from '@/components/SubHeader';
import { FloatingContactButtons } from '@/components/FloatingContactButtons';

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
        <main>{children}</main>
        <FloatingContactButtons />
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
