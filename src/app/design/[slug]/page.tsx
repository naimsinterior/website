
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '@/app/projects/projects';
import { Button } from '@/components/ui/button';
import { useMoodboard } from '@/hooks/useMoodboard';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Heart, Share2, ArrowRight, Palette, ToyBrick } from 'lucide-react';
import type { Project } from '@/app/projects/projects';
import { Separator } from '@/components/ui/separator';

export default function DesignDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  
  if (!project) {
    notFound();
  }
  
  const { moodboard, addToMoodboard, removeFromMoodboard } = useMoodboard();
  const { toast } = useToast();

  const isInMoodboard = moodboard.some(item => item.slug === project.slug);

  const handleMoodboardClick = () => {
    if (isInMoodboard) {
      removeFromMoodboard(project.slug);
      toast({
        title: "Removed from Moodboard",
        description: `${project.title} has been removed from your moodboard.`,
      });
    } else {
      addToMoodboard(project);
      toast({
        title: "Added to Moodboard",
        description: `${project.title} has been added to your moodboard.`,
      });
    }
  };

  const handleShare = async () => {
    const projectUrl = window.location.href;
    if (navigator.share) {
        try {
            await navigator.share({
                title: project.title,
                text: `Check out this design inspiration: ${project.title}`,
                url: projectUrl,
            });
            toast({
                title: "Inspiration Shared!",
            });
        } catch (error: any) {
            if (error.name === 'AbortError') {
                return;
            }
            console.error('Error sharing:', error);
            navigator.clipboard.writeText(projectUrl);
            toast({
                title: "Link Copied!",
                description: "Sharing failed, but the link is in your clipboard.",
            });
        }
    } else {
        navigator.clipboard.writeText(projectUrl);
        toast({
            title: "Link Copied!",
            description: "Inspiration link has been copied to your clipboard.",
        });
    }
  };

  const relatedProjects = projects.filter(p => p.category === project.category && p.slug !== project.slug).slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-6xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{project.description}</p>
      </div>
      
      {/* Image Gallery */}
      <div className="mb-12">
        <div className="relative aspect-video w-full">
            <Image
                src={project.images[0]}
                alt={`${project.title} - main view`}
                fill
                className="rounded-lg object-cover shadow-lg"
                data-ai-hint={project.aiHint}
                priority={true}
            />
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Details Section */}
        <div className="lg:col-span-2">
            <h2 className="font-headline text-3xl">Inspiration Details</h2>
            <p className="mt-4 text-lg text-muted-foreground">
                {project.longDescription}
            </p>
            <Separator className="my-8" />
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <h3 className="font-headline text-xl mb-4 flex items-center"><Palette className="mr-2 h-5 w-5 text-primary" /> Key Elements</h3>
                     <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Style: {project.designStyle}</li>
                        <li>Focus on natural light</li>
                        <li>Open and airy layout</li>
                        <li>Comfortable, modern furnishings</li>
                    </ul>
                </div>
                 <div>
                    <h3 className="font-headline text-xl mb-4 flex items-center"><ToyBrick className="mr-2 h-5 w-5 text-primary" /> Materials & Textures</h3>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>Polished Concrete & Hardwood</li>
                        <li>Linen and Wool Fabrics</li>
                        <li>Matte Black Metal Accents</li>
                        <li>Exposed Brick and Natural Stone</li>
                    </ul>
                </div>
            </div>
        </div>

        {/* CTA Sidebar */}
        <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
                 <Button size="lg" asChild className="w-full">
                    <Link href="/portfolio">
                        View Our Work <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                <Button size="lg" variant="outline" onClick={handleMoodboardClick} className="w-full">
                    <Heart className={cn("mr-2 h-5 w-5", isInMoodboard && "fill-primary text-primary")} />
                    {isInMoodboard ? 'Saved' : 'Save to Moodboard'}
                </Button>
                <Button size="lg" variant="outline" onClick={handleShare} className="w-full">
                    <Share2 className="mr-2 h-5 w-5" />
                    Share Inspiration
                </Button>
            </div>
        </div>
      </div>


       {/* Related Inspirations */}
       {relatedProjects.length > 0 && (
          <div className="mt-24">
             <Separator className="my-12" />
            <h2 className="text-center font-headline text-3xl md:text-4xl">Related Inspirations</h2>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedProjects.map((p) => (
                     <Link key={p.slug} href={`/design/${p.slug}`} className="group block">
                        <div className="relative h-80 w-full overflow-hidden rounded-lg">
                           <Image
                                src={p.images[0]}
                                alt={p.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={p.aiHint}
                            />
                        </div>
                        <h3 className="mt-4 font-headline text-xl group-hover:text-primary">{p.title}</h3>
                        <p className="text-sm text-muted-foreground">{p.category}</p>
                    </Link>
                ))}
            </div>
          </div>
       )}
    </div>
  );
}
