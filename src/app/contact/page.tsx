
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Phone, MapPin } from 'lucide-react';
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
import { useSearchParams } from "next/navigation";
import { Suspense, useRef } from "react";
import Image from "next/image";

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
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55604.57684847901!2d79.0026363872999!3d28.8092348510808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a5add696144a1%3A0x2d87a7168b958937!2sRampur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1719488825852!5m2!1sen!2sin"
    },
    {
        id: 'noida',
        name: 'Noida',
        address: 'Sector 62, Noida, Uttar Pradesh 201309',
        email: 'noida@naimsinterior.com',
        phone: '(+91) 987-654-3211',
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.149595299837!2d77.36151909923838!3d28.608759600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce544da318685%3A0x62836b6901844893!2sSector%2062%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1719488924296!5m2!1sen!2sin"
    },
    {
        id: 'gurgaon',
        name: 'Gurgaon',
        address: 'DLF Cyber City, Gurgaon, Haryana 122002',
        email: 'gurgaon@naimsinterior.com',
        phone: '(+91) 987-654-3212',
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14031.1194200159!2d77.0805335992225!3d28.4984242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d194473c4d42d%3A0x891435fc036e5229!2sDLF%20CyberHub%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1719489000185!5m2!1sen!2sin"
    },
    {
        id: 'chennai',
        name: 'Chennai',
        address: 'T. Nagar, Chennai, Tamil Nadu 600017',
        email: 'chennai@naimsinterior.com',
        phone: '(+91) 987-654-3213',
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31093.003926019313!2d80.21985901309832!3d13.04586940801304!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526674a2373307%3A0x356f955f01905380!2sT.%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1719489053531!5m2!1sen!2sin"
    },
    {
        id: 'omr',
        name: 'OMR',
        address: 'Old Mahabalipuram Road, Chennai, Tamil Nadu 600119',
        email: 'omr@naimsinterior.com',
        phone: '(+91) 987-654-3214',
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124434.9080649547!2d80.12119934339486!3d12.898867372776489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525c3458448f47%3A0x959733477348981d!2sOld%20Mahabalipuram%20Rd%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1719489110196!5m2!1sen!2sin"
    }
];

function ContactPageContent() {
    const searchParams = useSearchParams();
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
                    src="https://placehold.co/1600x800.png"
                    alt="Contact NAIMS INTERIOR"
                    fill
                    className="z-0 object-cover"
                    data-ai-hint="modern office reception"
                    priority
                />
                <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black/50 text-center text-white p-4">
                    <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl">
                        Get In Touch
                    </h1>
                    <p className="mt-4 max-w-3xl text-lg md:text-xl">
                        Have a project in mind, a question about our services, or just want to say hello? We'd love to hear from you. Reach out via the form below or contact one of our offices directly.
                    </p>
                    <div className="mt-8">
                        <Button size="lg" onClick={scrollToForm}>Send us a message</Button>
                    </div>
                </div>
            </section>
            <div className="container mx-auto px-4 py-16 md:px-6 md:py-24" ref={formRef}>
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                    <div>
                         <h2 className="font-headline text-3xl mb-8">Our Offices</h2>
                         <Accordion type="single" collapsible defaultValue={office} className="w-full">
                            {locations.map((loc) => (
                                <AccordionItem key={loc.id} value={loc.id}>
                                    <AccordionTrigger>
                                        <span className="font-headline text-xl">{loc.name}</span>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div>
                                                <div className="space-y-4">
                                                    <div className="flex items-start gap-4">
                                                        <MapPin className="h-5 w-5 mt-1 text-primary flex-shrink-0"/>
                                                        <p>{loc.address}</p>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <Mail className="h-5 w-5 text-primary flex-shrink-0"/>
                                                        <a href={`mailto:${loc.email}`} className="hover:text-primary transition-colors">{loc.email}</a>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <Phone className="h-5 w-5 text-primary flex-shrink-0"/>
                                                        <a href={`tel:${loc.phone}`} className="hover:text-primary transition-colors">{loc.phone}</a>
                                                    </div>
                                                </div>
                                            </div>
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
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                     <div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-3xl">Send us a message</CardTitle>
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
            </div>
        </>
    );
}


export default function ContactPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ContactPageContent />
        </Suspense>
    )
}

    