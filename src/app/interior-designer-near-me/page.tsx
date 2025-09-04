
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Phone, MapPin, Sparkles, Users, Ruler } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useRef } from "react";
import Image from "next/image";
import Link from 'next/link';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const locations = [
    {
        id: 'headoffice',
        name: 'Head Office',
        address: 'H-77, Silai Bara Gaon, Milak, Rampur, Uttar Pradesh (244701)',
        email: 'headoffice@naimsinterior.com',
        phone: '(+91) 987-654-3210',
        pageHref: "/contact",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55604.57684847901!2d79.0026363872999!3d28.8092348510808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a5add696144a1%3A0x2d87a7168b958937!2sRampur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1719488825852!5m2!1sen!2sin"
    },
    {
        id: 'noida',
        name: 'Noida',
        address: 'Sector 62, Noida, Uttar Pradesh 201309',
        email: 'noida@naimsinterior.com',
        phone: '(+91) 987-654-3211',
        pageHref: "/interior-design-noida",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.149595299837!2d77.36151909923838!3d28.608759600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce544da318685%3A0x62836b6901844893!2sSector%2062%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1719488924296!5m2!1sen!2sin"
    },
    {
        id: 'gurgaon',
        name: 'Gurgaon',
        address: 'DLF Cyber City, Gurgaon, Haryana 122002',
        email: 'gurgaon@naimsinterior.com',
        phone: '(+91) 987-654-3212',
        pageHref: "#",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14031.1194200159!2d77.0805335992225!3d28.4984242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d194473c4d42d%3A0x891435fc036e5229!2sDLF%20CyberHub%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1719489000185!5m2!1sen!2sin"
    },
    {
        id: 'chennai',
        name: 'Chennai',
        address: 'T. Nagar, Chennai, Tamil Nadu 600017',
        email: 'chennai@naimsinterior.com',
        phone: '(+91) 987-654-3213',
        pageHref: "#",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31093.003926019313!2d80.21985901309832!3d13.04586940801304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526674a2373307%3A0x356f955f01905380!2sT.%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1719489053531!5m2!1sen!2sin"
    },
    {
        id: 'omr',
        name: 'OMR',
        address: 'Old Mahabalipuram Road, Chennai, Tamil Nadu 600119',
        email: 'omr@naimsinterior.com',
        phone: '(+91) 987-654-3214',
        pageHref: "/interior-design-omr",
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124434.9080649547!2d80.12119934339486!3d12.898867372776489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525c3458448f47%3A0x959733477348981d!2sOld%20Mahabalipuram%20Rd%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1719489110196!5m2!1sen!2sin"
    }
];

const faqs = [
    {
        question: "How do I find a reputable interior designer near me?",
        answer: "Start by looking at portfolios to find a style that resonates with you. Read reviews and testimonials. Most importantly, schedule a consultation to ensure you connect with the designer. At NAIMS INTERIOR, we offer free initial consultations at all our locations to help you find the perfect match for your project."
    },
    {
        question: "What are the benefits of hiring a local interior designer?",
        answer: "A local designer has established relationships with local contractors, suppliers, and artisans, which can save you time and money. They also have a deep understanding of regional styles, building codes, and climate considerations, ensuring your design is both beautiful and practical for your area."
    },
    {
        question: "How much does it cost to hire an interior designer in my city?",
        answer: "Costs can vary based on the designer's experience and the project's scope. We offer transparent pricing and can work with you to create a plan that fits your budget. Use our online Cost Calculator for a preliminary estimate, or contact a local office for a detailed quote."
    },
    {
        question: "Can an interior designer work with a small budget?",
        answer: "Yes, a good designer can work with almost any budget. They are experts at knowing where to splurge and where to save, ensuring you get the most impact for your money. They can also help you avoid costly mistakes, which is a significant saving in itself."
    }
];

const localBenefits = [
    {
        icon: Sparkles,
        title: "Local Style Expertise",
        description: "Our designers have an in-depth understanding of your city's architectural styles and trends, ensuring a design that feels right at home."
    },
    {
        icon: Users,
        title: "Trusted Local Network",
        description: "We have strong relationships with the best local craftsmen, suppliers, and contractors, ensuring quality workmanship and materials."
    },
    {
        icon: Ruler,
        title: "On-Site Management",
        description: "Being local means we can provide hands-on project management and frequent site visits, ensuring your project runs smoothly and to the highest standard."
    }
]


function InteriorDesignerNearMePageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const office = searchParams.get('office') || 'headoffice';
    const formRef = useRef<HTMLDivElement>(null);

    const { toast } = useToast();
    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: { name: "", email: "", message: "" },
    });

    function onSubmit(data: ContactFormValues) {
        toast({
            title: "Message Sent!",
            description: "Thank you for reaching out. We'll get back to you soon.",
        });
        form.reset();
    }
    
    const scrollToForm = () => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    return (
        <>
            <section className="relative h-[60vh] w-full">
                <Image
                    src="https://placehold.co/1600x800"
                    alt="Map with location pins showing interior designers near you"
                    fill
                    className="z-0 object-cover"
                    data-ai-hint="map location pins"
                    priority
                />
                <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black/50 text-center text-white p-4">
                    <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl">
                        Find Top Interior Designers Near You
                    </h1>
                    <p className="mt-4 max-w-3xl text-lg md:text-xl">
                        Searching for the best "interior designer near me"? Look no further. NAIMS INTERIOR has offices across the country, ready to bring your design dreams to life.
                    </p>
                    <div className="mt-8">
                        <Button size="lg" onClick={scrollToForm}>Book a Free Consultation</Button>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-muted">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center">
                        <h2 className="font-headline text-3xl md:text-4xl">Why Choose a Local Designer?</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
                            Working with a local NAIMS INTERIOR designer offers unique advantages for your project's success.
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                        {localBenefits.map((benefit, index) => (
                            <Card key={index} className="text-center">
                                <CardHeader>
                                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                                        <benefit.icon className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle>{benefit.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{benefit.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16 md:px-6 md:py-24" ref={formRef}>
                <div className="text-center mb-16">
                    <h2 className="font-headline text-3xl">Transform Your Home with a Local Design Expert</h2>
                    <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">Finding a local interior designer means you get personalized service from someone who understands the style and nuances of your area. At NAIMS INTERIOR, our local teams combine regional expertise with world-class design standards to create a space that's uniquely yours.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                         <h2 className="font-headline text-3xl mb-8">Our Offices</h2>
                         <Carousel
                            opts={{
                              align: "start",
                              loop: true,
                            }}
                            className="w-full"
                          >
                            <CarouselContent>
                              {locations.map((loc) => (
                                <CarouselItem key={loc.id}>
                                  <div className="p-1">
                                    <Card>
                                      <CardHeader>
                                        <CardTitle className="font-headline text-xl">{loc.name}</CardTitle>
                                      </CardHeader>
                                      <CardContent className="space-y-4">
                                        <div className="aspect-video w-full overflow-hidden rounded-lg">
                                          <iframe
                                            src={loc.mapSrc}
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen={false}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                          ></iframe>
                                        </div>
                                        <div className="flex items-start gap-4">
                                          <MapPin className="h-5 w-5 mt-1 text-primary flex-shrink-0" />
                                          <p>{loc.address}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                          <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                                          <a href={`mailto:${loc.email}`} className="hover:text-primary transition-colors">{loc.email}</a>
                                        </div>
                                        <div className="flex items-center gap-4">
                                          <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                                          <a href={`tel:${loc.phone}`} className="hover:text-primary transition-colors">{loc.phone}</a>
                                        </div>
                                        <Button asChild variant="secondary" className="w-full" onClick={() => router.push(loc.pageHref)}>
                                          <Link href={loc.pageHref}>Explore {loc.name} Services</Link>
                                        </Button>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious className="left-2" />
                            <CarouselNext className="right-2" />
                          </Carousel>
                    </div>
                     <div>
                        <h2 className="font-headline text-3xl mb-8">Send us a message</h2>
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">Get a Free Consultation</CardTitle>
                                <CardDescription>Our team will get back to you within 24 hours.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                 <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Your Name</FormLabel>
                                                    <FormControl><Input placeholder="Full Name" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="message"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Message</FormLabel>
                                                    <FormControl><Textarea rows={6} placeholder="Your project details or question..." {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="w-full">Send Message</Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="mt-24">
                     <div className="text-center mb-8">
                        <h2 className="font-headline text-3xl md:text-4xl">Questions About Finding a Designer?</h2>
                    </div>
                    <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
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
        </>
    );
}


export default function InteriorDesignerNearMePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <InteriorDesignerNearMePageContent />
        </Suspense>
    )
}
