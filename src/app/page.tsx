
'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Paintbrush, Users, Briefcase, Star, Smile, Gem, DollarSign, BadgeCheck, Check } from "lucide-react";
import { projects } from "./projects/projects";
import { GetQuoteForm } from "@/components/GetQuoteForm";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { OfferPopup } from "@/components/OfferPopup";

const featuredProjects = projects.slice(0, 5);
const testimonials = projects.filter(p => p.testimonial).slice(0, 3);

const brands = [
  { name: "Apex Co.", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg> },
  { name: "Strive Inc.", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg> },
  { name: "Prestige", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg> },
  { name: "Vertex", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg> },
  { name: "Legacy", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg> },
];

const whyChooseUs = [
    {
        icon: <Smile className="h-8 w-8 text-primary" />,
        title: "100% Customer Satisfaction",
        description: "100% Customer satisfaction is the main motto of our company. We love to see happy and satisfied customers by delivering outstanding interior designing services. Your experience really matters to us!",
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: "1000+ Happy Clients",
        description: "Our 1000+ happy customers are the live example of our best-in-class interior designing services. We always aim to deliver high-quality service within your budget.",
    },
    {
        icon: <DollarSign className="h-8 w-8 text-primary" />,
        title: "Economic Cost",
        description: "We offer an affordable wide range of interior designing services for your dream home, yet no compromise in material quality to withstand durability.",
    },
     {
        icon: <Gem className="h-8 w-8 text-primary" />,
        title: "High Quality Materials",
        description: "We always use only high-quality material supplies for all of our interior works that provide complete protection to your dream house in the long run. No compromise in Quality.",
    },
    {
        icon: <BadgeCheck className="h-8 w-8 text-primary" />,
        title: "No Hidden Charges",
        description: "We believe that transparency is the core key in excellent customer service. So, we don't have any hidden charges. What you see is what you pay.",
    },
    {
        icon: <Briefcase className="h-8 w-8 text-primary" />,
        title: "Expert Interior Designers",
        description: "Our experienced designers have decades of experience in interior designing. So you just hand over everything to us and relax, we will take care of everything.",
    },
];

const services = [
  {
    value: "residential",
    title: "Residential Design",
    description: "We at Naims Interior, provide complete residential interior designing services including:",
    items: [
        "Living Room & Home Office Design",
        "Bedroom & Dinning Interior Design",
        "Kids’ Room Design"
    ]
  },
  {
    value: "kitchen-bathroom",
    title: "Kitchen & Bathroom Interior",
    description: "We offer complete Kitchen and Bathroom interior services for your dream home, including:",
    items: [
      "Modular Kitchen Design",
      "Kitchen Remodeling",
      "Bathroom Renovation"
    ]
  },
  {
    value: "furniture-decor",
    title: "Customized Furniture & Decor",
    description: "We offer high-end customized furniture and decor services, including:",
    items: [
      "Custom Furniture (Sofas, beds, and storage units.)",
      "Wall Treatments & Wallpapers",
      "Lighting Design & Solutions",
      "Flooring Solutions (Wooden, marble, tile, etc.)"
    ]
  },
  {
    value: "space-planning",
    title: "Space Planning & Optimization",
    description: "Our interior experts help transform any space into a functional area, including:",
    items: [
      "Smart Storage Solutions",
      "Compact Home Design",
      "Vastu/Feng Shui Interior Consulting"
    ]
  },
  {
    value: "renovation",
    title: "Home Renovation & Makeovers",
    description: "We undertake complete home renovations and makeovers, including:",
    items: [
      "Full Home Makeover",
      "Themed Interior (Contemporary, minimalist, bohemian, etc.)"
    ]
  },
  {
    value: "3d-visualization",
    title: "3D Visualization & Consultation",
    description: "We offer interior consultation and design services, including:",
    items: [
      "3D Interior Rendering",
      "Virtual Interior Design Services",
      "Mood Board & Material Selection"
    ]
  },
]

export default function Home() {
    const plugins = [
        Autoplay({
            delay: 5000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
        }),
    ];

    const [activeTab, setActiveTab] = useState(services[0].value);
    const [isTabHovered, setIsTabHovered] = useState(false);

    useEffect(() => {
        if (isTabHovered) return;

        const interval = setInterval(() => {
            const currentIndex = services.findIndex(s => s.value === activeTab);
            const nextIndex = (currentIndex + 1) % services.length;
            setActiveTab(services[nextIndex].value);
        }, 3000); // Change tab every 3 seconds

        return () => clearInterval(interval);
    }, [activeTab, isTabHovered]);

  return (
    <div className="flex flex-col min-h-screen">
       <OfferPopup />
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
            <div className="mt-8">
                <GetQuoteForm />
            </div>
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
                    <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                        Transforming spaces into stunning works of art with thoughtful design solutions tailored to your needs.
                    </p>
                </div>
                <div 
                    className="mt-12 max-w-5xl mx-auto"
                    onMouseEnter={() => setIsTabHovered(true)}
                    onMouseLeave={() => setIsTabHovered(false)}
                >
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 h-auto">
                            {services.map((service) => (
                               <TabsTrigger key={service.value} value={service.value} className="py-2.5">
                                   {service.title}
                               </TabsTrigger>
                            ))}
                        </TabsList>
                        {services.map((service) => (
                           <TabsContent value={service.value} key={service.value} className="mt-8">
                                <Card>
                                    <CardContent className="p-8">
                                        <h3 className="font-headline text-2xl mb-4">{service.title}</h3>
                                        <p className="text-muted-foreground mb-6">{service.description}</p>
                                        <ul className="space-y-3">
                                          {service.items.map((item, index) => (
                                              <li key={index} className="flex items-start">
                                                <Check className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                                                <span className="text-base">{item}</span>
                                              </li>
                                          ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                           </TabsContent>
                        ))}
                    </Tabs>
                </div>
            </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl md:text-4xl">Why Choose Naims Interior?</h2>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                Over others?
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {whyChooseUs.map((item, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                      {item.icon}
                    </div>
                    <CardTitle className="font-headline text-xl">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Carousel */}
        <section className="py-16 md:py-24 bg-muted">
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

        {/* Testimonials Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="font-headline text-3xl md:text-4xl">What Our Clients Say</h2>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">We're proud to have created spaces that our clients love.</p>
            </div>
             <div className="mt-12">
                <Carousel
                    plugins={plugins}
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-5xl mx-auto"
                >
                    <CarouselContent>
                        {testimonials.map((project) => (
                            <CarouselItem key={project.slug} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-4 h-full">
                                    <Card className="h-full flex flex-col">
                                        <CardContent className="p-6 flex-grow">
                                            <div className="flex items-center mb-4">
                                                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
                                            </div>
                                            <p className="text-muted-foreground italic h-32 overflow-hidden">"{project.testimonial!.text}"</p>
                                        </CardContent>
                                        <CardFooter className="flex flex-col items-start p-6 pt-0">
                                            <p className="font-bold">{project.testimonial!.author}</p>
                                            <p className="text-sm text-muted-foreground">{project.title}</p>
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

        {/* Brands Section */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="font-headline text-3xl md:text-4xl">
             Best Materials, Sourced for You
            </h2>
             <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">We collaborate with the best in the industry providing exceptional quality.</p>
            <div className="mt-12">
              <Carousel
                  plugins={[
                    Autoplay({
                      delay: 2000,
                      stopOnInteraction: false,
                      stopOnMouseEnter: false,
                    }),
                  ]}
                  opts={{
                      align: "start",
                      loop: true,
                  }}
                  className="w-full max-w-4xl mx-auto"
              >
                  <CarouselContent>
                      {brands.map((brand) => (
                          <CarouselItem key={brand.name} className="basis-1/2 md:basis-1/3 lg:basis-1/5">
                              <div className="flex items-center justify-center p-6 text-muted-foreground">
                                  {brand.icon}
                                  <span className="font-bold text-xl ml-2">{brand.name}</span>
                              </div>
                          </CarouselItem>
                      ))}
                  </CarouselContent>
              </Carousel>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
