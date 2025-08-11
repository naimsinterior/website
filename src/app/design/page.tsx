
'use client';

import Image from "next/image";
import Link from "next/link";
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
        slug: 'monochrome-magic-living-room',
        title: 'Monochrome Magic',
        description: 'A sophisticated living room using a powerful black and white palette.',
        longDescription: 'This design inspiration explores the timeless elegance of a monochrome color scheme. By layering different shades of white, gray, and black, and mixing textures like velvet, metal, and wood, the space feels rich and dynamic. This approach proves that you don\'t need color to make a bold statement.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'monochrome living room',
        category: 'Living Room',
        location: 'Paris, FR',
        projectType: 'Concept',
        designStyle: 'Modern Chic',
    },
    {
        slug: 'biophilic-bathroom-sanctuary',
        title: 'Biophilic Bathroom Sanctuary',
        description: 'A bathroom that seamlessly blends nature with modern amenities.',
        longDescription: 'This concept brings the outdoors in, creating a spa-like sanctuary. It features a walk-in shower with a stone floor, a freestanding tub surrounded by lush plants, and a skylight to flood the room with natural light. The use of wood, stone, and greenery promotes a sense of calm and well-being.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'biophilic bathroom',
        category: 'Bathroom',
        location: 'Kyoto, JP',
        projectType: 'Concept',
        designStyle: 'Organic Modern',
    },
    {
        slug: 'jewel-toned-dining-room',
        title: 'Jewel-Toned Dining Room',
        description: 'A dramatic and luxurious dining space with rich, saturated colors.',
        longDescription: 'This inspiration showcases the power of bold color choices. Deep emerald green walls, sapphire blue velvet chairs, and ruby red accents create a dramatic and opulent atmosphere. Gold fixtures and a statement chandelier complete this luxurious look, perfect for hosting memorable dinner parties.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'jewel tone dining',
        category: 'Dining Room',
        location: 'London, UK',
        projectType: 'Concept',
        designStyle: 'Maximalist',
    },
    {
        slug: 'california-casual-bedroom',
        title: 'California Casual Bedroom',
        description: 'A light, airy, and effortlessly chic bedroom with a relaxed vibe.',
        longDescription: 'Inspired by the laid-back lifestyle of the West Coast, this bedroom features a neutral palette, natural materials like linen and rattan, and a minimalist approach to decor. The focus is on comfort and simplicity, creating a breezy and inviting space that feels like a permanent vacation.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'california bedroom',
        category: 'Bedroom',
        location: 'Los Angeles, CA',
        projectType: 'Concept',
        designStyle: 'California Casual',
    },
    {
        slug: 'industrial-loft-kitchen',
        title: 'Industrial Loft Kitchen',
        description: 'A functional and stylish kitchen that celebrates raw, industrial materials.',
        longDescription: 'This design idea highlights the beauty of industrial elements. Exposed brick walls, concrete countertops, and stainless steel appliances are balanced by warm wood open shelving. It\'s a practical, durable, and highly stylish solution for an urban loft or modern home.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'industrial kitchen',
        category: 'Kitchen',
        location: 'Brooklyn, NY',
        projectType: 'Concept',
        designStyle: 'Industrial',
    },
    {
        slug: 'bohemian-reading-corner',
        title: 'Bohemian Reading Corner',
        description: 'A cozy and eclectic nook perfect for getting lost in a good book.',
        longDescription: 'This inspiration shows how to create a personalized retreat in a small space. A comfortable armchair is layered with pillows and throws, surrounded by plants, and accompanied by a unique side table and a soft rug. It\'s a perfect example of how to mix patterns, textures, and personal items to create a cozy, bohemian vibe.',
        images: ['https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png', 'https://placehold.co/800x600.png'],
        aiHint: 'bohemian reading nook',
        category: 'Living Room',
        location: 'Lisbon, PT',
        projectType: 'Concept',
        designStyle: 'Bohemian',
    }
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
