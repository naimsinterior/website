
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useMoodboard } from '@/hooks/useMoodboard';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Heart, Share2, ArrowRight, Palette, ToyBrick } from 'lucide-react';
import type { Project } from '@/app/projects/projects';
import { Separator } from '@/components/ui/separator';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

// This is a temporary solution to have different data for inspirations
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


export default function DesignDetailPage({ params }: { params: { slug: string } }) {
  const project = inspirations.find((p) => p.slug === params.slug);
  
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
      addToMoodboard(project as Project);
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

  const allInspirations = [...inspirations.filter(p => p.slug !== project.slug)];
  
  const relatedByCategory = allInspirations.filter(p => p.category === project.category);
  let relatedProjects = [...relatedByCategory];

  if (relatedProjects.length < 2) {
      const otherProjects = allInspirations.filter(p => p.category !== project.category);
      const needed = 2 - relatedProjects.length;
      relatedProjects.push(...otherProjects.slice(0, needed));
  }
  
  relatedProjects = relatedProjects.slice(0, 6);


  return (
    <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl md:text-6xl">{project.title}</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{project.description}</p>
      </div>
      
      {/* Image Gallery Carousel */}
      <div className="mb-12">
        <Carousel className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {project.images.map((img, index) => (
                <CarouselItem key={index}>
                    <div className="p-1">
                        <div className="relative aspect-video w-full">
                            <Image
                                src={img}
                                alt={`${project.title} - view ${index + 1}`}
                                fill
                                className="rounded-md object-cover shadow-lg"
                                data-ai-hint={project.aiHint}
                                priority={index === 0}
                            />
                        </div>
                    </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-[-1rem] sm:-left-12" />
            <CarouselNext className="right-[-1rem] sm:-right-12" />
        </Carousel>
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
