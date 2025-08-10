

'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Paintbrush, Users, Briefcase, Star, Smile, Gem, DollarSign, BadgeCheck, Check, Workflow } from "lucide-react";
import { projects } from "./projects/projects";
import { GetQuoteForm } from "@/components/GetQuoteForm";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { OfferPopup } from "@/components/OfferPopup";
import { Progress } from "@/components/ui/progress";
import { ScratchCard } from "@/components/ScratchCard";

const featuredProjects = projects.slice(0, 5);
const testimonials = projects.filter(p => p.testimonial).slice(0, 3);

const beforeAfterProjects = [
    {
        before: "/naims_logo.PNG",
        after: "/Naims_interior.PNG",
        beforeHint: "outdated kitchen",
        afterHint: "modern kitchen",
        title: "Kitchen Remodel",
        description: "From a cramped and dated kitchen to a bright, open-concept culinary hub."
    },
    {
        before: "https://placehold.co/600x400.png",
        after: "https://placehold.co/600x400.png",
        beforeHint: "empty living room",
        afterHint: "cozy living room",
        title: "Living Room Transformation",
        description: "A blank canvas transformed into a warm, inviting space for family gatherings."
    },
    {
        before: "https://placehold.co/600x400.png",
        after: "https://placehold.co/600x400.png",
        beforeHint: "old bathroom",
        afterHint: "luxury bathroom",
        title: "Master Bathroom Oasis",
        description: "An old, tired bathroom became a spa-like retreat with modern finishes."
    },
    {
        before: "https://placehold.co/600x400.png",
        after: "https://placehold.co/600x400.png",
        beforeHint: "outdated bedroom",
        afterHint: "modern bedroom",
        title: "Bedroom Refresh",
        description: "A dull bedroom turned into a serene and stylish personal sanctuary."
    }
];


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

const processSteps = [
    {
        step: 1,
        title: "Meet with a Designer",
        percentage: 2,
        paymentText: "Free",
        description: "Start your journey with a free consultation. Discuss your ideas, needs, and preferences with our expert designers—no strings attached!",
    },
    {
        step: 2,
        title: "Kickstart Your Journey",
        percentage: 20,
        paymentText: "5% Payment",
        description: "Secure your booking with just 5% and let us bring your vision to life.",
    },
    {
        step: 3,
        title: "3D Design Review",
        percentage: 50,
        paymentText: "40% Payment",
        description: "See your dream space come to life with a customized 3D design and approve it with confidence.",
    },
    {
        step: 4,
        title: "Execution Phase",
        percentage: 80,
        paymentText: "50% Payment",
        description: "Our skilled team ensures every detail is perfectly crafted during the execution phase.",
    },
    {
        step: 5,
        title: "The Final Touch – Handover",
        percentage: 100,
        paymentText: "5% Payment",
        description: "Celebrate the completion of your project with confidence and satisfaction.",
    },
];

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
    
    const [activeProcessStep, setActiveProcessStep] = useState(0);
    const [isProcessHovered, setIsProcessHovered] = useState(false);
    const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);


    useEffect(() => {
        if (isTabHovered) return;

        const interval = setInterval(() => {
            const currentIndex = services.findIndex(s => s.value === activeTab);
            const nextIndex = (currentIndex + 1) % services.length;
            setActiveTab(services[nextIndex].value);
        }, 3000); // Change tab every 3 seconds

        return () => clearInterval(interval);
    }, [activeTab, isTabHovered]);

    useEffect(() => {
        if(isProcessHovered) return;

        const processInterval = setInterval(() => {
            setActiveProcessStep(prev => (prev + 1) % processSteps.length);
        }, 3000);

        return () => clearInterval(processInterval);
    }, [isProcessHovered]);

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
                <GetQuoteForm open={isQuoteFormOpen} onOpenChange={setIsQuoteFormOpen} />
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
                               <TabsTrigger key={service.value} value={service.value} className="py-2.5 whitespace-normal">
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

        {/* Our Process Section */}
        <section className="py-16 md:py-24 bg-muted">
            <div 
                className="container mx-auto px-4 md:px-6"
                onMouseEnter={() => setIsProcessHovered(true)}
                onMouseLeave={() => setIsProcessHovered(false)}
            >
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl">NAIMS INTERIOR</h2>
                    <p className="mt-2 text-lg font-semibold">Your Journey to Dream Interior Made Simple.</p>
                    <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                        Transforming spaces is easy with our transparent and customer-focused process.
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    <div className="flex justify-between">
                        {processSteps.map((item, index) => (
                             <div 
                                key={item.step} 
                                className="flex flex-col items-center text-center cursor-pointer z-10"
                                onClick={() => setActiveProcessStep(index)}
                             >
                                <div className={`flex items-center justify-center h-10 w-10 rounded-full border-4 border-background transition-all duration-300 ${activeProcessStep >= index ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`}>
                                    {item.step}
                                </div>
                            </div>
                        ))}
                    </div>
                     <div className="absolute top-5 left-0 w-full h-2 bg-secondary rounded-full transform -translate-y-1/2">
                        <div 
                           className="h-full bg-primary rounded-full transition-all duration-300" 
                           style={{width: `${processSteps[activeProcessStep].percentage}%`}}
                        ></div>
                    </div>
                </div>

                <div className="mt-8">
                     <p className={`text-center mb-2 text-sm font-semibold transition-colors duration-300 text-primary`}>
                        {processSteps[activeProcessStep].paymentText}
                    </p>
                    <Card className="max-w-2xl mx-auto">
                         <CardContent className="p-8 text-center min-h-[150px] flex flex-col justify-center">
                            <h3 className="font-headline text-2xl mb-2">{processSteps[activeProcessStep].title}</h3>
                            <p className="text-muted-foreground">{processSteps[activeProcessStep].description}</p>
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
        
        {/* Before and After Section */}
        <section className="bg-muted py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center">
                    <h2 className="font-headline text-3xl md:text-4xl">From Vision to Reality: Before & After</h2>
                    <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                        Scratch to see the transformation we bring to every space.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {beforeAfterProjects.slice(0, 2).map((project, index) => (
                        <Card key={index}>
                            <CardContent className="p-4">
                                <ScratchCard
                                    beforeImage={project.before}
                                    afterImage={project.after}
                                    beforeHint={project.beforeHint}
                                    afterHint={project.afterHint}
                                    onScratchComplete={() => setIsQuoteFormOpen(true)}
                                />
                            </CardContent>
                            <CardHeader className="pt-2">
                                <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
                                <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
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
