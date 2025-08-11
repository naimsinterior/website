
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { projects } from '../projects';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  
  if (!project) {
    notFound();
  }

  const projectDetails = [
      { label: "Client Name", value: project.testimonial?.author },
      { label: "Project Type", value: project.projectType },
      { label: "Completion Time", value: project.completionTime },
      { label: "Design Style", value: project.designStyle },
  ].filter(detail => detail.value);

  return (
    <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      {/* Header Section */}
      <div className="relative h-[60vh] w-full mb-12">
          <Image
              src={project.images[0]}
              alt={`${project.title} banner`}
              fill
              className="rounded-lg object-cover shadow-xl"
              data-ai-hint={project.aiHint}
              priority
          />
          <div className="absolute inset-0 bg-black/50 rounded-lg flex flex-col items-center justify-center text-center text-white p-4">
              <h1 className="font-headline text-4xl md:text-6xl">{project.title}</h1>
              <p className="mt-2 text-xl">{project.location}</p>
          </div>
      </div>
      
      {/* Intro & Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
            <h2 className="font-headline text-3xl">About the Project</h2>
            <p className="mt-4 text-lg text-muted-foreground">{project.longDescription}</p>
        </div>
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {projectDetails.map(detail => (
                             <li key={detail.label} className="flex justify-between">
                                <span className="font-semibold text-muted-foreground">{detail.label}</span>
                                <span className="text-right">{detail.value}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
      </div>

      {/* Project Gallery */}
      <div className="mt-16">
        <h2 className="text-center font-headline text-3xl md:text-4xl">Project Gallery</h2>
        <Carousel className="w-full max-w-4xl mx-auto mt-8">
            <CarouselContent>
              {project.images.map((img, index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                    <div className="p-1">
                        <div className="relative aspect-video w-full">
                            <Image
                                src={img}
                                alt={`${project.title} - view ${index + 1}`}
                                fill
                                className="rounded-md object-cover shadow-lg"
                                data-ai-hint={project.aiHint}
                            />
                        </div>
                    </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-12" />
            <CarouselNext className="hidden sm:flex -right-12" />
        </Carousel>
      </div>
      
      {/* Full Description */}
      <div className="max-w-4xl mx-auto mt-16">
          <Separator className="my-8" />
          <div className="prose prose-lg max-w-none">
              <p>We approached the {project.title} project with a focus on {project.designStyle.toLowerCase()} principles, aiming to create a space that was not only beautiful but deeply functional. The material selection was crucial; we opted for a combination of durable and aesthetically pleasing finishes that would stand the test of time. The color palette was carefully chosen to enhance the natural light and create a sense of harmony throughout the {project.projectType.toLowerCase()}. Every detail, from the custom furniture to the lighting fixtures, was thoughtfully considered to contribute to a cohesive and inspiring environment that the client would love for years to come.</p>
          </div>
      </div>

      {/* CTA */}
      <div className="mt-16 text-center">
        <Button size="lg" asChild>
            <Link href="/contact">
                Get a Similar Design
            </Link>
        </Button>
      </div>
    </div>
  );
}
