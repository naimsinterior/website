
'use client';

import Image from "next/image";
import Link from "next/link";
import { projects } from "../projects/projects";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMoodboard } from "@/hooks/useMoodboard";
import { useToast } from "@/hooks/use-toast";
import { Heart, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { Project } from '@/app/projects/projects';

const PROJECTS_PER_PAGE = 6;

export default function PortfolioPage() {
  const { moodboard, addToMoodboard, removeFromMoodboard } = useMoodboard();
  const { toast } = useToast();
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_PAGE);

  const handleMoodboardClick = (project: Project) => {
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
            description: "Project link has been copied to your clipboard.",
        });
    }
  };

  const handleViewMore = () => {
    setVisibleCount(prevCount => prevCount + PROJECTS_PER_PAGE);
  };

  return (
    <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="text-center">
        <h1 className="font-headline text-4xl md:text-5xl">Our Portfolio</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Explore a selection of our finest work, showcasing our commitment to quality, creativity, and craftsmanship.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, visibleCount).map((project) => {
          const isInMoodboard = moodboard.some(item => item.slug === project.slug);
          return (
            <Card key={project.slug} className="flex flex-col overflow-hidden group">
              <CardHeader className="p-0 relative">
                  <Link href={`/projects/${project.slug}`}>
                    <div className="relative h-60 w-full">
                        <Image
                            src={project.images[0]}
                            alt={project.title}
                            fill
                            className="object-cover"
                            data-ai-hint={project.aiHint}
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Link>
                  <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                    <Button 
                      size="icon" 
                      variant="secondary"
                      onClick={() => handleMoodboardClick(project)}
                      aria-label="Save to Moodboard"
                    >
                        <Heart className={cn("h-5 w-5", isInMoodboard && "fill-primary text-primary")} />
                    </Button>
                    <Button 
                      size="icon" 
                      variant="secondary"
                      onClick={() => handleShare(project)}
                      aria-label="Share Project"
                    >
                        <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                   <Badge variant="secondary" className="absolute bottom-3 left-3 z-10">{project.projectType}</Badge>
              </CardHeader>
              <CardContent className="flex-grow p-6">
                <CardTitle className="font-headline text-2xl">{project.title}</CardTitle>
                <CardDescription className="mt-2 text-base">{project.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full">
                  <Link href={`/projects/${project.slug}`}>View Project</Link>
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
      
      {visibleCount < projects.length && (
        <div className="mt-12 text-center">
          <Button onClick={handleViewMore} size="lg">
            View More
          </Button>
        </div>
      )}
    </div>
  );
}
