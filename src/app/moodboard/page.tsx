
'use client';

import { useMoodboard } from '@/hooks/useMoodboard';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Share2 } from 'lucide-react';
import type { Project } from '@/app/projects/projects';
import { useToast } from '@/hooks/use-toast';

export default function MoodboardPage() {
    const { moodboard, isLoaded, clearMoodboard, removeFromMoodboard } = useMoodboard();
    const { toast } = useToast();

    const handleShare = async (project: Project) => {
        const projectUrl = `${window.location.origin}/projects/${project.slug}`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: project.title,
                    text: `Check out this interior design project: ${project.title}`,
                    url: projectUrl,
                });
                toast({
                    title: "Project Shared!",
                });
            } catch (error: any) {
                // Ignore AbortError which is triggered when the user cancels the share dialog
                if (error.name === 'AbortError') {
                    return;
                }
                console.error('Error sharing:', error);
                 // Fallback to clipboard for other errors
                navigator.clipboard.writeText(projectUrl);
                toast({
                    title: "Link Copied!",
                    description: "Sharing failed, but the link is in your clipboard.",
                });
            }
        } else {
            // Fallback for browsers that don't support navigator.share
            navigator.clipboard.writeText(projectUrl);
            toast({
                title: "Link Copied!",
                description: "Project link has been copied to your clipboard.",
            });
        }
    };


    return (
        <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
            <div className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="font-headline text-4xl md:text-5xl">Your Moodboard</h1>
                    <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                        Your personal collection of design inspiration.
                    </p>
                </div>
                {moodboard.length > 0 && (
                    <Button variant="destructive" onClick={clearMoodboard}>
                        <Trash2 className="mr-2 h-4 w-4" /> Clear All
                    </Button>
                )}
            </div>

            {!isLoaded && (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i} className="animate-pulse">
                            <div className="h-60 bg-muted rounded-t-lg"></div>
                            <CardHeader><div className="h-6 w-3/4 bg-muted rounded"></div></CardHeader>
                            <CardContent><div className="h-4 w-full bg-muted rounded"></div></CardContent>
                            <CardFooter><div className="h-10 w-full bg-muted rounded"></div></CardFooter>
                        </Card>
                    ))}
                </div>
            )}

            {isLoaded && moodboard.length === 0 && (
                <div className="text-center py-20 border-2 border-dashed rounded-lg">
                    <h2 className="font-headline text-2xl">Your Moodboard is Empty</h2>
                    <p className="mt-2 text-muted-foreground">Start exploring our projects to find your inspiration.</p>
                    <Button asChild className="mt-6">
                        <Link href="/projects">Browse Projects</Link>
                    </Button>
                </div>
            )}

            {isLoaded && moodboard.length > 0 && (
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {moodboard.map((project) => (
                        <Card key={project.slug} className="flex flex-col overflow-hidden group relative">
                            <CardHeader className="p-0">
                                <Link href={`/projects/${project.slug}`}>
                                    <div className="relative h-60 w-full">
                                        <Image
                                            src={project.images[0]}
                                            alt={project.title}
                                            fill
                                            className="object-cover"
                                            data-ai-hint={project.aiHint}
                                        />
                                    </div>
                                </Link>
                            </CardHeader>
                            <CardContent className="flex-grow p-6">
                                <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
                            </CardContent>
                             <CardFooter className="p-6 pt-0 grid grid-cols-2 gap-4">
                                <Button asChild variant="secondary" className="w-full">
                                    <Link href={`/projects/${project.slug}`}>View Project</Link>
                                </Button>
                                <Button variant="outline" className="w-full" onClick={() => handleShare(project)}>
                                    <Share2 className="mr-2 h-4 w-4" /> Share
                                </Button>
                            </CardFooter>
                            <div className="absolute top-4 right-4">
                                <Button size="icon" variant="destructive" onClick={() => removeFromMoodboard(project.slug)} className="opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2 className="h-5 w-5" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
