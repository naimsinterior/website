
'use client';

import { useState } from 'react';
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Handshake, Target, Rocket, Lightbulb, Store, TrendingUp, BookOpen, Brush } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FranchiseForm } from "@/components/FranchiseForm";

const partnershipBenefits = [
    {
        icon: <Store className="h-8 w-8 text-primary" />,
        title: "Established Brand",
        description: "Leverage the NAIMS INTERIOR brand name, trusted by thousands for quality and design excellence.",
    },
    {
        icon: <TrendingUp className="h-8 w-8 text-primary" />,
        title: "Proven Business Model",
        description: "Benefit from our refined processes, from client acquisition to project delivery, ensuring a smooth operation.",
    },
    {
        icon: <BookOpen className="h-8 w-8 text-primary" />,
        title: "Comprehensive Support",
        description: "Receive extensive training, marketing materials, and ongoing operational support from our dedicated team.",
    },
     {
        icon: <Brush className="h-8 w-8 text-primary" />,
        title: "Design & Tech Suite",
        description: "Gain access to our proprietary design tools, project management software, and a vast library of resources.",
    },
];

const franchiseProcess = [
    {
        step: 1,
        title: "Submit Inquiry",
        description: "Fill out the franchise inquiry form to express your interest and provide us with your initial details.",
    },
    {
        step: 2,
        title: "Initial Discussion",
        description: "Our franchise development team will contact you to discuss the opportunity and answer your preliminary questions.",
    },
    {
        step: 3,
        title: "Review & Discovery",
        description: "We'll provide you with our Franchise Disclosure Document (FDD) and you'll have the chance to learn more about our operations.",
    },
    {
        step: 4,
        title: "Sign Agreement",
        description: "Once we mutually decide to move forward, we'll sign the franchise agreement and welcome you to the team.",
    },
     {
        step: 5,
        title: "Training & Onboarding",
        description: "You'll undergo our comprehensive training program to get you ready for your grand opening.",
    },
    {
        step: 6,
        title: "Launch Your Studio",
        description: "With our support, you'll launch your NAIMS INTERIOR studio and start transforming spaces in your territory.",
    },
];

const faqs = [
    {
        question: "What is the initial investment required to open a franchise?",
        answer: "The initial investment varies depending on the city and size of the studio. It typically includes the franchise fee, showroom setup, and initial marketing costs. We'll provide a detailed breakdown after your initial inquiry."
    },
    {
        question: "Do I need prior experience in interior design?",
        answer: "While a passion for design is essential, direct experience is not a strict requirement. We welcome entrepreneurs with strong business acumen and management skills. Our training program will cover the operational and design aspects of the business."
    },
    {
        question: "What kind of support will I receive?",
        answer: "We provide end-to-end support, including site selection assistance, showroom design, technology and software training, marketing and lead generation support, and ongoing operational guidance from a dedicated franchise manager."
    },
    {
        question: "What is the typical ROI for a NAIMS INTERIOR franchise?",
        answer: "The return on investment depends on various factors, including your location, operational efficiency, and local market conditions. We will share financial performance details during the discovery phase."
    }
];

export default function FranchisePage() {
    return (
        <div>
             {/* Hero Section */}
            <section className="relative h-[60vh] w-full">
                <Image
                    src="https://placehold.co/1600x800.png"
                    alt="NAIMS INTERIOR team in a meeting"
                    fill
                    className="z-0 object-cover"
                    data-ai-hint="business meeting office"
                    priority
                />
                <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black/50 text-center text-white p-4">
                    <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl">
                        Become a NAIMS INTERIOR Partner
                    </h1>
                    <p className="mt-4 max-w-2xl text-lg md:text-xl">
                        Join us in our mission to bring beautiful, functional design to homes across the country.
                    </p>
                </div>
            </section>

             {/* Why Partner With Us Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl">Why Partner With NAIMS INTERIOR?</h2>
                    <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                        We provide you with the brand, tools, and support to build a thriving interior design business.
                    </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {partnershipBenefits.map((item, index) => (
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
             <section className="bg-muted py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="font-headline text-3xl md:text-4xl">Your Path to Partnership</h2>
                    </div>
                    <div className="relative">
                        {/* Desktop view */}
                        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-border -translate-x-1/2"></div>
                        
                        {franchiseProcess.map((step, index) => (
                            <div key={step.step} className="flex md:items-center mb-8 md:mb-0 relative">
                                <div className="flex md:w-1/2 md:justify-end md:pr-16">
                                    <Card className={`w-full md:w-3/4 ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                                        <CardHeader>
                                            <CardTitle>{step.step}. {step.title}</CardTitle>
                                            <CardDescription>{step.description}</CardDescription>
                                        </CardHeader>
                                    </Card>
                                </div>
                                <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                                    {step.step}
                                </div>
                                <div className="md:w-1/2"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Inquiry Form Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                     <div className="text-center mb-12">
                        <h2 className="font-headline text-3xl md:text-4xl">Start Your Journey Today</h2>
                        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                            Take the first step towards owning a NAIMS INTERIOR franchise. Fill out the form below.
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto">
                        <FranchiseForm />
                    </div>
                </div>
            </section>

             {/* FAQ Section */}
            <section className="bg-muted py-16 md:py-24">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="font-headline text-3xl md:text-4xl">Frequently Asked Questions</h2>
                    </div>
                     <div className="max-w-3xl mx-auto">
                        <Accordion type="single" collapsible className="w-full">
                            {faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className="border-b">
                                    <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="pt-2">
                                        <p className="text-base text-muted-foreground">{faq.answer}</p>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
            </section>
        </div>
    );
}
