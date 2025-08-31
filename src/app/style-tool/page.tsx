
import { StyleToolClient } from './StyleToolClient';
import { Suspense } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from '@/components/ui/card';


const faqs = [
    {
        question: "How does the AI Style Suggestion tool work?",
        answer: "Our tool uses a powerful AI model (Gemini) to analyze the contents of your uploaded photo—looking at furniture, colors, lighting, and layout. Based on this visual information, it suggests established interior design styles that match the aesthetic of your room."
    },
    {
        question: "What kind of photos work best for accurate suggestions?",
        answer: "For the best results, use a clear, well-lit photo of the entire room. Photos that show the main furniture pieces and overall color scheme are ideal. Avoid blurry images or photos that are too dark or too bright."
    },
    {
        question: "Is the AI's suggestion always correct?",
        answer: "The AI provides suggestions based on common design principles and patterns it has learned. While it's highly accurate, think of it as a starting point for inspiration. Design is subjective, and the best style is the one you love!"
    },
    {
        question: "Can I use photos from the internet?",
        answer: "Yes, you can upload any room photo you find inspiring. The tool will analyze it and suggest corresponding design styles and projects from our gallery, helping you identify the look you're aiming for."
    },
];


function StyleToolPageContent() {
    return (
        <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
            <div className="text-center">
                <h1 className="font-headline text-4xl md:text-5xl">AI Style Suggestion</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Upload a photo of your space, and our AI will suggest interior design styles that match. Find your perfect look in seconds.
                </p>
            </div>
            <StyleToolClient />

             <div className="mt-16 max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="font-headline text-3xl md:text-4xl">Frequently Asked Questions</h2>
                </div>
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
                            <Card>
                                <AccordionTrigger className="p-6 text-lg text-left hover:no-underline font-headline">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6">
                                    <p className="text-base text-muted-foreground">{faq.answer}</p>
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}


export default function StyleToolPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <StyleToolPageContent />
        </Suspense>
    )
}
