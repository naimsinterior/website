import { StyleToolClient } from './StyleToolClient';
import { Suspense } from 'react';

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
