
'use client';

import Image from "next/image";
import Link from "next/link";
import { projects } from "../projects/projects";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMoodboard } from "@/hooks/useMoodboard";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

const inspirations = [
    {
        slug: 'modern-corporate-hub',
        title: 'Modern Corporate Hub',
        description: 'A sleek and professional office space designed for productivity and collaboration.',
        longDescription: 'This project involved designing a new headquarters for a fast-growing tech firm. The goal was to create a modern, energizing workspace that encourages collaboration while also providing quiet areas for focused work. The design features a mix of open-plan workstations, private offices with glass walls, and comfortable lounge areas. We used a cool color palette of blues and grays, accented with the company\'s brand colors. Natural wood elements and biophilic design add warmth and a connection to nature.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'modern office',
        category: 'Commercial',
        location: 'Seattle, WA',
        projectType: 'Office HQ',
        designStyle: 'Corporate Modern',
        testimonial: {
            text: "The new office is incredible. NAIMS INTERIOR perfectly captured our company culture in the design. It's a place our team loves coming to.",
            author: "CEO of TechForward Inc."
        }
    },
    {
        slug: 'art-deco-apartment',
        title: 'Art Deco Apartment',
        description: 'A glamorous apartment that pays homage to the Art Deco era with bold geometrics and lavish details.',
        longDescription: 'This project was a full-scale remodel to bring the glamour of the Roaring Twenties into a modern city apartment. We used a rich color palette of deep jewel tones, metallics, and high-contrast black and white. Key features include custom terrazzo flooring, fan-shaped motifs, and luxurious velvet upholstery. The lighting was a key focus, with statement chandeliers and sconces creating a dramatic and inviting atmosphere.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'art deco apartment',
        category: 'Bedroom',
        location: 'Miami, FL',
        projectType: 'Apartment',
        designStyle: 'Art Deco',
        testimonial: {
            text: "They brought our Gatsby-esque dreams to life! Every detail is exquisite.",
            author: "The Fitzgeralds"
        }
    },
    ...projects.slice(2, 6)
];

const PROJECTS_PER_PAGE = 6;

export default function DesignPage() {
  const { moodboard, addToMoodboard, removeFromMoodboard } = useMoodboard();
  const { toast } = useToast();
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);

  const handleMoodboardClick = (e: React.MouseEvent, project: (typeof inspirations)[0]) => {
    e.preventDefault(); // Prevent the Link from navigating
    const isInMoodboard = moodboard.some(item => item.slug === project.slug);
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

  const handleViewMore = () => {
    setVisibleCount(prevCount => prevCount + PROJECTS_PER_PAGE);
  };

  return (
    <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl">Design Inspirations</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Discover a world of creative possibilities. Browse our curated collection of stunning interiors to spark your next big idea.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {inspirations.slice(0, visibleCount).map((project) => {
          const isInMoodboard = moodboard.some(item => item.slug === project.slug);
          return (
            <Link key={project.slug} href={`/design/${project.slug}`} className="group block">
              <Card className="flex flex-col overflow-hidden h-full">
                <CardHeader className="p-0 relative">
                  <div className="relative h-60 w-full">
                      <Image
                          src={project.images[0]}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint={project.aiHint}
                      />
                  </div>
                  <Button 
                    size="icon" 
                    variant="secondary"
                    className="absolute top-3 right-3 z-10 h-9 w-9 opacity-80 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => handleMoodboardClick(e, project)}
                    aria-label="Save to Moodboard"
                  >
                      <Heart className={cn("h-5 w-5", isInMoodboard && "fill-primary text-primary")} />
                  </Button>
                   <Badge variant="secondary" className="absolute bottom-3 left-3 z-10">{project.category}</Badge>
                </CardHeader>
                <CardContent className="flex-grow p-6">
                  <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{project.title}</CardTitle>
                  <CardDescription className="mt-2 text-base">{project.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
      
      {visibleCount < inspirations.length && (
        <div className="mt-12 text-center">
          <Button onClick={handleViewMore} size="lg">
            View More
          </Button>
        </div>
      )}
      
      <p className="mt-8 text-center text-sm text-muted-foreground opacity-40">
        Availability of products may vary. Prices are subject to change as per market dynamics.
      </p>
    </div>
  );
}
