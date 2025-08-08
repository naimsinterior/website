import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ArrowRight, Paintbrush, Users, Briefcase } from "lucide-react";
import { projects } from "./projects/projects";

const featuredProjects = projects.slice(0, 5);

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[80vh] w-full">
          <Image
            src="https://placehold.co/1600x900.png"
            alt="Beautifully designed living room"
            fill
            className="z-0 object-cover"
            data-ai-hint="living room"
            priority
          />
          <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black/50 text-center text-white">
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl">
              Crafting Timeless Spaces
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl">
              We believe in creating interiors that are not just beautiful, but also a true reflection of you.
            </p>
            <Button asChild className="mt-8">
              <Link href="/projects">
                Explore Our Work <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>

        {/* About Us Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 lg:gap-20 items-center">
              <div>
                <h2 className="font-headline text-3xl md:text-4xl">
                  Where Vision Meets Design
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Interiorscape is a full-service interior design firm specializing in high-end residential and commercial projects. Our philosophy is rooted in the belief that design should be both functional and inspiring. We work closely with our clients to create personalized spaces that stand the test of time.
                </p>
                <Button asChild variant="link" className="mt-4 px-0">
                  <Link href="/contact">
                    Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative h-80 w-full rounded-lg shadow-xl">
                 <Image
                    src="https://placehold.co/600x400.png"
                    alt="Design team collaborating"
                    fill
                    className="rounded-lg object-cover"
                    data-ai-hint="design team"
                  />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-muted py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center">
                    <h2 className="font-headline text-3xl md:text-4xl">Our Services</h2>
                    <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">From concept to completion, we offer a range of services to bring your vision to life.</p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    <Card className="text-center">
                        <CardHeader>
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                <Paintbrush className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="font-headline mt-4">Interior Design</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Full-service design for new constructions and renovations, tailored to your style and needs.</p>
                        </CardContent>
                    </Card>
                    <Card className="text-center">
                        <CardHeader>
                             <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                <Users className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="font-headline mt-4">Design Consultation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Expert advice on color palettes, furniture selection, and space planning to refresh your home.</p>
                        </CardContent>
                    </Card>
                    <Card className="text-center">
                        <CardHeader>
                             <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                                <Briefcase className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="font-headline mt-4">Commercial Spaces</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Creating functional and inspiring environments for offices, retail, and hospitality.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        {/* Featured Projects Carousel */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-center font-headline text-3xl md:text-4xl">
              Featured Projects
            </h2>
            <div className="mt-12">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {featuredProjects.map((project) => (
                    <CarouselItem key={project.slug} className="md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <Card>
                          <CardHeader className="p-0">
                            <div className="relative h-64 w-full">
                                <Image
                                    src={project.images[0]}
                                    alt={project.title}
                                    fill
                                    className="rounded-t-lg object-cover"
                                    data-ai-hint={project.aiHint}
                                />
                            </div>
                          </CardHeader>
                          <CardContent className="p-6">
                            <CardTitle className="font-headline">{project.title}</CardTitle>
                            <CardDescription className="mt-2 h-20 overflow-hidden">{project.description}</CardDescription>
                          </CardContent>
                          <CardFooter>
                            <Button asChild variant="secondary" className="w-full">
                                <Link href={`/projects/${project.slug}`}>View Project</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden sm:flex" />
                <CarouselNext className="hidden sm:flex" />
              </Carousel>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
