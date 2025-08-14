
'use client';

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMoodboard } from "@/hooks/useMoodboard";
import { useToast } from "@/hooks/use-toast";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { inspirations, Inspiration } from "./inspirations";
import { useSearchParams } from "next/navigation";

const PROJECTS_PER_PAGE = 6;

export default function DesignPage() {
  const { moodboard, addToMoodboard, removeFromMoodboard } = useMoodboard();
  const { toast } = useToast();
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);

  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const filteredInspirations = useMemo(() => {
    if (!categoryFilter) {
      return inspirations;
    }
    return inspirations.filter(i => i.category === categoryFilter);
  }, [categoryFilter]);


  const handleMoodboardClick = (e: React.MouseEvent, project: Inspiration) => {
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
        <h1 className="font-headline text-4xl md:text-5xl">{categoryFilter ? `${categoryFilter} Designs` : 'Design Inspirations'}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          {categoryFilter 
            ? `Explore our collection of ${categoryFilter.toLowerCase()} designs.`
            : "Discover a world of creative possibilities. Browse our curated collection of stunning interiors to spark your next big idea."
          }
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredInspirations.slice(0, visibleCount).map((project) => {
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
      
      {visibleCount < filteredInspirations.length && (
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
