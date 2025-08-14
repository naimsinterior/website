
'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Star, Check, DollarSign, Users, Smile, Gem, BadgeCheck, Briefcase, MessageCircleQuestion } from "lucide-react";
import { projects } from "../projects/projects";
import { GetQuoteForm } from "@/components/GetQuoteForm";
import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { ScratchCard } from "@/components/ScratchCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const featuredProjects = projects.filter(p => p.category === 'Kitchen').slice(0, 5);
const testimonials = projects.filter(p => p.testimonial && p.category === 'Kitchen').slice(0, 3);

const beforeAfterProjects = [
    {
        before: "/naims_logo.PNG",
        after: "/Naims_interior.PNG",
        beforeHint: "outdated kitchen",
        afterHint: "modern kitchen",
        title: "Modern Kitchen Remodel",
        description: "From a cramped and dated kitchen to a bright, open-concept culinary hub."
    },
    {
        before: "https://placehold.co/600x400.png",
        after: "https://placehold.co/600x400.png",
        beforeHint: "old kitchen",
        afterHint: "sleek kitchen",
        title: "Sleek & Functional Kitchen Update",
        description: "A complete overhaul focusing on smart storage and a minimalist aesthetic."
    },
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
        title: "Customer Satisfaction",
        description: "Our main motto is achieving customer satisfaction for our kitchen design projects. We love to see happy clients by delivering outstanding services.",
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: "1000+ Happy Clients",
        description: "Our 1000+ happy customers are a testament to our best-in-class kitchen designing services. We always aim to deliver high-quality service within your budget.",
    },
    {
        icon: <DollarSign className="h-8 w-8 text-primary" />,
        title: "Economic Cost for Kitchens",
        description: "We offer an affordable wide range of kitchen designing services for your dream home, with no compromise on material quality to ensure durability.",
    },
     {
        icon: <Gem className="h-8 w-8 text-primary" />,
        title: "High Quality Materials",
        description: "We always use only high-quality material supplies for all of our kitchen works that provide complete protection to your dream kitchen in the long run. No compromise in Quality.",
    },
    {
        icon: <BadgeCheck className="h-8 w-8 text-primary" />,
        title: "No Hidden Charges",
        description: "We believe that transparency is the core key in excellent customer service. So, we don't have any hidden charges for your kitchen interior project.",
    },
    {
        icon: <Briefcase className="h-8 w-8 text-primary" />,
        title: "Expert Kitchen Designers",
        description: "Our experienced designers have decades of experience in kitchen designing. Hand over everything to us and relax, we will take care of everything.",
    },
];

const services = [
  {
    value: "modular-kitchen",
    title: "Modular Kitchen Design",
    description: "We provide complete modular kitchen interior designing services including:",
    items: [
        "L-Shaped & U-Shaped Kitchens",
        "Parallel & Straight Kitchen Layouts",
        "Island & Peninsula Kitchens"
    ]
  },
  {
    value: "remodeling",
    title: "Kitchen Remodeling",
    description: "We offer complete Kitchen remodeling services for your dream home, including:",
    items: [
      "Cabinetry & Countertop replacement",
      "Flooring and Tiling",
      "Lighting and Fixture updates"
    ]
  },
  {
    value: "materials-finishes",
    title: "Materials & Finishes",
    description: "We offer a wide variety of high-quality materials and finishes:",
    items: [
      "Laminates, Acrylics, and Veneers",
      "Granite, Quartz, and Marble Countertops",
      "Modern hardware and accessories"
    ]
  },
]

const processSteps = [
    {
        step: 1,
        title: "Meet with a Designer",
        percentage: 2,
        paymentText: "Free",
        description: "Start your kitchen journey with a free consultation. Discuss your ideas, needs, and preferences with our expert designers.",
    },
    {
        step: 2,
        title: "Kickstart Your Journey",
        percentage: 20,
        paymentText: "5% Payment",
        description: "Secure your booking with just 5% and let us start crafting your vision.",
    },
    {
        step: 3,
        title: "3D Design Review",
        percentage: 50,
        paymentText: "40% Payment",
        description: "See your dream kitchen come to life with a customized 3D design and approve it with confidence.",
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
        description: "Celebrate the completion of your brand new kitchen with confidence and satisfaction.",
    },
];

const faqs = [
    {
        question: "What is the starting cost for a modular kitchen?",
        answer: "The cost of a modular kitchen depends on various factors like size, materials, finishes, and appliances. Our basic packages start from a competitive price point. We recommend a free consultation to get a detailed quote based on your specific requirements."
    },
    {
        question: "How long does it take to install a modular kitchen?",
        answer: "Typically, from design finalization to installation, a modular kitchen can take anywhere from 4 to 8 weeks. The timeline can vary based on the complexity of the design and material availability."
    },
    {
        question: "What materials do you use for kitchen cabinets?",
        answer: "We offer a wide range of materials to suit every budget and style, including HDF, MDF, Plywood, and more. For finishes, we have options like laminate, acrylic, veneer, and polymer."
    },
    {
        question: "Do you provide a warranty on your kitchen interiors?",
        answer: "Yes, we provide a warranty on our modular kitchens against any manufacturing defects. The warranty period varies depending on the products and materials used. We provide all warranty details in our project agreement."
    },
     {
        question: "Can I see a 3D model of my kitchen design before work begins?",
        answer: "Absolutely! We provide detailed 3D visualizations of your kitchen project. This allows you to see exactly how your space will look and feel, and gives you the opportunity to make any changes before we start manufacturing."
    },
];

export default function KitchenDesignPage() {
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
    const [activeFaqIndex, setActiveFaqIndex] = useState(0);


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
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[80vh] w-full">
          <Image
            src="https://placehold.co/1600x900.png"
            alt="Beautifully designed modular kitchen"
            fill
            className="z-0 object-cover"
            data-ai-hint="modern kitchen"
            priority
          />
          <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black/50 text-center text-white p-4">
            <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl">
              Transform Your Space with Expert Interior Design Services
            </h1>
            <p className="mt-4 max-w-3xl text-lg md:text-xl">
              End-to-End Solutions for Your Dream Home, From Modular Kitchens to Stunning Interiors!
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
                  Your Destination for the Best Kitchen Interior Design
                </h2>
                <p className="mt-4 text-muted-foreground">
                    Transform your home with NAIMS INTERIOR – your destination for the best kitchen interior design and modular kitchen solutions. Explore innovative spaces that blend style and functionality, perfect for every home.
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
                    alt="Design team collaborating on a kitchen project"
                    fill
                    className="rounded-lg object-cover"
                    data-ai-hint="kitchen design team"
                  />
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-muted py-16 md:py-24">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center">
                    <h2 className="font-headline text-3xl md:text-4xl">Our Kitchen Design Services</h2>
                    <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                        Crafting beautiful and functional kitchens with solutions tailored to your lifestyle.
                    </p>
                </div>
                <div 
                    className="mt-12 max-w-5xl mx-auto"
                    onMouseEnter={() => setIsTabHovered(true)}
                    onMouseLeave={() => setIsTabHovered(false)}
                >
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid w-full grid-cols-3 h-auto">
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
              <h2 className="font-headline text-3xl md:text-4xl">Why Choose Us For Your Kitchen?</h2>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                The preferred choice for kitchen interior design.
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
                    <h2 className="font-headline text-3xl md:text-4xl">OUR KITCHEN DESIGN PROCESS</h2>
                    <p className="mt-2 text-lg font-semibold">Your Journey to a Dream Kitchen.</p>
                    <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                        Transforming kitchens is easy with our transparent and customer-focused process.
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
                                <div className={cn('flex items-center justify-center h-10 w-10 rounded-full border-4 border-background transition-all duration-300', activeProcessStep >= index ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground')}>
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
                     <p className={'text-center mb-2 text-sm font-semibold transition-colors duration-300 text-primary'}>
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
              Our Kitchen Projects
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
                    <h2 className="font-headline text-3xl md:text-4xl">Kitchen Transformations: Before & After</h2>
                    <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                        Scratch to see the transformation we bring to every kitchen.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {beforeAfterProjects.map((project, index) => (
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
        {testimonials.length > 0 && 
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center">
              <h2 className="font-headline text-3xl md:text-4xl">What Our Clients Say</h2>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">We're proud to have created kitchens that our clients love.</p>
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
        }

        {/* Brands Section */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="font-headline text-3xl md:text-4xl">
             Best Materials for Your Kitchen
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

         {/* FAQ Section */}
        <section className="bg-muted py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center">
                    <h2 className="font-headline text-3xl md:text-4xl">Frequently Asked Questions</h2>
                    <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                        Have questions about kitchen design? We have answers.
                    </p>
                </div>
                <div className="mt-12 max-w-4xl mx-auto">
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
                                <Card>
                                    <AccordionTrigger className="p-6 text-lg text-left hover:no-underline font-headline">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="px-6 pb-6">
                                        <p className="text-base text-muted-foreground">{faq.answer}</p>
                                    </AccordionContent>
                                </Card>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>

      </main>
    </div>
  );
}
