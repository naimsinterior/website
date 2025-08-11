'use client';

import { useEffect, useState } from "react";

export default function PrivacyPolicyPage() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }));
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="prose prose-lg max-w-4xl mx-auto">
        <h1 className="font-headline text-4xl md:text-5xl mb-8">Privacy Policy</h1>
        <p>Last updated: {currentDate}</p>
        <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>
        
        <h2 className="font-headline text-2xl mt-8">Interpretation and Definitions</h2>
        <p>[Placeholder for Interpretation and Definitions]</p>

        <h2 className="font-headline text-2xl mt-8">Collecting and Using Your Personal Data</h2>
        <p>[Placeholder for Collecting and Using Your Personal Data. Explain types of data collected, such as personal data, usage data, and tracking technologies.]</p>
        
        <h2 className="font-headline text-2xl mt-8">Use of Your Personal Data</h2>
        <p>[Placeholder for Use of Your Personal Data. Explain how the company uses the data.]</p>

        <h2 className="font-headline text-2xl mt-8">Disclosure of Your Personal Data</h2>
        <p>[Placeholder for Disclosure of Your Personal Data.]</p>

        <h2 className="font-headline text-2xl mt-8">Security of Your Personal Data</h2>
        <p>[Placeholder for Security of Your Personal Data.]</p>

        <h2 className="font-headline text-2xl mt-8">Children's Privacy</h2>
        <p>[Placeholder for Children's Privacy.]</p>

        <h2 className="font-headline text-2xl mt-8">Links to Other Websites</h2>
        <p>[Placeholder for Links to Other Websites.]</p>
        
        <h2 className="font-headline text-2xl mt-8">Changes to this Privacy Policy</h2>
        <p>[Placeholder for Changes to this Privacy Policy.]</p>

        <h2 className="font-headline text-2xl mt-8">Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, You can contact us:</p>
        <ul>
          <li>By email: hello@naimsinterior.com</li>
          <li>By phone number: (555) 123-4567</li>
        </ul>
      </div>
    </div>
  );
}
