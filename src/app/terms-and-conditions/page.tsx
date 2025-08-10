'use client';

import { useEffect, useState } from "react";

export default function TermsAndConditionsPage() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="prose prose-lg max-w-4xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl mb-8">Terms & Conditions</h1>
        <p>Last updated: {currentDate}</p>
        <p>Please read these terms and conditions carefully before using Our Service.</p>
        
        <h2 className="font-headline text-2xl mt-8">Interpretation and Definitions</h2>
        <p>[Placeholder for Interpretation and Definitions]</p>

        <h2 className="font-headline text-2xl mt-8">Acknowledgment</h2>
        <p>[Placeholder for Acknowledgment]</p>
        
        <h2 className="font-headline text-2xl mt-8">Links to Other Websites</h2>
        <p>[Placeholder for Links to Other Websites]</p>

        <h2 className="font-headline text-2xl mt-8">Termination</h2>
        <p>[Placeholder for Termination]</p>

        <h2 className="font-headline text-2xl mt-8">Limitation of Liability</h2>
        <p>[Placeholder for Limitation of Liability]</p>

        <h2 className="font-headline text-2xl mt-8">"AS IS" and "AS AVAILABLE" Disclaimer</h2>
        <p>[Placeholder for "AS IS" and "AS AVAILABLE" Disclaimer]</p>

        <h2 className="font-headline text-2xl mt-8">Governing Law</h2>
        <p>[Placeholder for Governing Law]</p>

        <h2 className="font-headline text-2xl mt-8">Disputes Resolution</h2>
        <p>[Placeholder for Disputes Resolution]</p>

        <h2 className="font-headline text-2xl mt-8">Changes to These Terms and Conditions</h2>
        <p>[Placeholder for Changes to These Terms and Conditions]</p>

        <h2 className="font-headline text-2xl mt-8">Contact Us</h2>
        <p>If you have any questions about these Terms and Conditions, You can contact us:</p>
        <ul>
          <li>By email: hello@interiorscape.com</li>
          <li>By phone number: (555) 123-4567</li>
        </ul>
      </div>
    </div>
  );
}
