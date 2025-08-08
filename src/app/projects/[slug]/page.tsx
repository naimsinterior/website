'use client';

import Image from 'next/image';
import { notFound } from 'next/navigation';
import { projects } from '../projects';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useMoodboard } from '@/hooks/useMoodboard';
import { Heart, CheckCircle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const { toast } = useToast();
  const project = projects.find((p) => p.slug === params.slug);
  const { moodboard, addToMoodboard, removeFromMoodboard } = useMoodboard();
  
  if (!project) {
    notFound();
  }

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

  return (
    <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <h1 className="font-headline text-4xl md:text-5xl">{project.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{project.longDescription}</p>

          <Button onClick={handleMoodboardClick} className="mt-8">
            {isInMoodboard ? (
              <>
                <CheckCircle className="mr-2 h-5 w-5" /> Saved to Moodboard
              </>
            ) : (
              <>
                <Heart className="mr-2 h-5 w-5" /> Save to Moodboard
              </>
            )}
          </Button>
        </div>
        <div className="lg:col-span-2">
          <Carousel className="w-full">
            <CarouselContent>
              {project.images.map((img, index) => (
                <CarouselItem key={index}>
                    <div className="relative h-96 w-full">
                        <Image
                            src={img}
                            alt={`${project.title} - view ${index + 1}`}
                            fill
                            className="rounded-lg object-cover shadow-xl"
                            data-ai-hint={project.aiHint}
                        />
                    </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </div>
      </div>
      
      {project.testimonial && (
        <div className="mt-24">
            <Card className="max-w-3xl mx-auto bg-muted border-none">
                <CardContent className="p-8 text-center">
                    <p className="text-xl italic">"{project.testimonial.text}"</p>
                    <footer className="mt-4 font-headline text-lg font-semibold">- {project.testimonial.author}</footer>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}
