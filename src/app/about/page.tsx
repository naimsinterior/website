

'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Smile, Users, DollarSign, Gem, BadgeCheck, Briefcase, ArrowRight, Building, Target, Eye } from "lucide-react";
import { GetQuoteForm } from "@/components/GetQuoteForm";
import { useState } from "react";


const whyChooseUs = [
    {
        icon: <Smile className="h-8 w-8 text-primary" />,
        title: "Customer Satisfaction",
        description: "Your experience really matters to us! We aim for total satisfaction by delivering outstanding interior design services.",
    },
    {
        icon: <Users className="h-8 w-8 text-primary" />,
        title: "1000+ Happy Clients",
        description: "Our happy customers are a testament to our best-in-class services. We deliver high-quality results within your budget.",
    },
    {
        icon: <DollarSign className="h-8 w-8 text-primary" />,
        title: "Economic Cost",
        description: "We offer affordable design services with no compromise on material quality, ensuring durability and style.",
    },
     {
        icon: <Gem className="h-8 w-8 text-primary" />,
        title: "High Quality Materials",
        description: "We use only high-quality materials for all our interior work, providing long-term protection for your dream home.",
    },
    {
        icon: <BadgeCheck className="h-8 w-8 text-primary" />,
        title: "No Hidden Charges",
        description: "We believe in transparency. The price you see is the price you pay. No surprises, just beautiful interiors.",
    },
    {
        icon: <Briefcase className="h-8 w-8 text-primary" />,
        title: "Expert Interior Designers",
        description: "Our experienced designers have decades of experience. Hand everything over to us and relax—we'll take care of it all.",
    },
];

const teamMembers = [
    {
        name: "Naims Shaikh",
        role: "Founder & CEO",
        image: "https://placehold.co/150x150.png",
        aiHint: "professional portrait"
    },
    {
        name: "Jane Doe",
        role: "Lead Designer",
        image: "https://placehold.co/150x150.png",
        aiHint: "designer headshot"
    },
    {
        name: "John Smith",
        role: "Project Manager",
        image: "https://placehold.co/150x150.png",
        aiHint: "manager headshot"
    },
    {
        name: "Emily White",
        role: "Marketing Head",
        image: "https://placehold.co/150x150.png",
        aiHint: "marketing professional"
    }
];

export default function AboutPage() {
    const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative h-[60vh] w-full">
                    <Image
                        src="https://placehold.co/1600x800.png"
                        alt="NAIMS INTERIOR team working in a modern office"
                        fill
                        className="z-0 object-cover"
                        data-ai-hint="modern office interior"
                        priority
                    />
                    <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black/50 text-center text-white p-4">
                        <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl">
                            About NAIMS INTERIOR
                        </h1>
                        <p className="mt-4 max-w-2xl text-lg md:text-xl">
                            Designing the future of living and working spaces.
                        </p>
                    </div>
                </section>

                {/* Our Story Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid gap-12 md:grid-cols-2 lg:gap-20 items-center">
                            <div className="relative h-96 w-full rounded-lg shadow-xl">
                                <Image
                                    src="https://placehold.co/600x800.png"
                                    alt="Founder sketching design ideas"
                                    fill
                                    className="rounded-lg object-cover"
                                    data-ai-hint="interior designer sketching"
                                />
                            </div>
                            <div>
                                <h2 className="font-headline text-3xl md:text-4xl">
                                    Our Story
                                </h2>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    Founded in 2010, NAIMS INTERIOR began with a simple yet powerful vision: to transform ordinary spaces into extraordinary experiences. What started as a small team of passionate designers has grown into a full-service firm known for its creative excellence and unwavering commitment to quality. Over the years, we've had the privilege of working on a diverse range of projects, from cozy residential homes to dynamic commercial hubs, each time leaving our mark of thoughtful design and meticulous craftsmanship.
                                </p>
                                <p className="mt-4 text-muted-foreground leading-relaxed">
                                    Our journey is one of continuous evolution, driven by a passion for innovation and a deep understanding of our clients' needs. We believe that a well-designed space can enhance quality of life, and this belief is at the core of everything we do.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision Section */}
                <section className="bg-muted py-16 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div className="flex flex-col items-center">
                                <Building className="h-10 w-10 text-primary mb-4" />
                                <h3 className="font-headline text-2xl">Our Company</h3>
                                <p className="mt-2 text-muted-foreground">We are a team of creators, thinkers, and innovators dedicated to excellence in interior design.</p>
                            </div>
                             <div className="flex flex-col items-center">
                                <Target className="h-10 w-10 text-primary mb-4" />
                                <h3 className="font-headline text-2xl">Our Mission</h3>
                                <p className="mt-2 text-muted-foreground">To create beautiful, functional, and personal spaces that our clients are proud to call their own.</p>
                            </div>
                             <div className="flex flex-col items-center">
                                <Eye className="h-10 w-10 text-primary mb-4" />
                                <h3 className="font-headline text-2xl">Our Vision</h3>
                                <p className="mt-2 text-muted-foreground">To be the most sought-after interior design firm, known for our creativity, quality, and client-centric approach.</p>
                            </div>
                        </div>
                    </div>
                </section>

                 {/* Meet The Team Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-headline text-3xl md:text-4xl">Meet Our Team</h2>
                            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                                The creative minds behind our award-winning designs.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {teamMembers.map((member, index) => (
                                <div key={index} className="text-center">
                                    <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-muted">
                                        <AvatarImage src={member.image} alt={member.name} data-ai-hint={member.aiHint}/>
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <h4 className="font-semibold text-lg">{member.name}</h4>
                                    <p className="text-primary">{member.role}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us Section */}
                <section className="bg-muted py-16 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="text-center mb-12">
                            <h2 className="font-headline text-3xl md:text-4xl">Why Choose NAIMS INTERIOR?</h2>
                             <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                                Our commitment to excellence sets us apart.
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

                {/* CTA Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <h2 className="font-headline text-3xl md:text-4xl">Ready to Start Your Project?</h2>
                        <p className="mt-4 max-w-xl mx-auto text-muted-foreground">
                            Let's collaborate to create a space that is uniquely yours. Contact us today for a free consultation.
                        </p>
                        <div className="mt-8">
                           <GetQuoteForm open={isQuoteFormOpen} onOpenChange={setIsQuoteFormOpen} />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
