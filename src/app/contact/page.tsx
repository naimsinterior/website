
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
            <div className="container mx-auto px-4 py-16 md:px-6 md:py-24" ref={formRef}>
                <div className="text-center mb-16">
                    <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl">
                        Contact Us
                    </h1>
                </div>
                 <div className="mb-16">
                    <div>
                        <h2 className="font-headline text-2xl">Company Base</h2>
                        <p className="mt-2 text-muted-foreground">
                            Our head registered office is located at: H-77, Silai Bara Gaon, Milak, Rampur, Uttar Pradesh (244701).
                        </p>
                    </div>
                     <div className="mt-8">
                        <h2 className="font-headline text-2xl">Company Working</h2>
                        <p className="mt-2 text-muted-foreground">
                            NAIMS INTERIOR is a full-service interior design firm specializing in high-end residential and commercial projects. We create spaces that are both functional and inspiring, reflecting the unique style of our clients. Our services include residential design, kitchen and bathroom interiors, customized furniture, space planning, home renovations, and 3D visualization. We work closely with our clients to create personalized spaces that stand the test of time.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <Card>
                        <a href="mailto:headoffice@naimsinterior.com" className="h-full block hover:bg-muted transition-colors">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Mail className="h-8 w-8 text-primary"/>
                                <div>
                                    <CardTitle>Email Us</CardTitle>
                                    <CardDescription>headoffice@naimsinterior.com</CardDescription>
                                </div>
                            </CardHeader>
                        </a>
                    </Card>
                    <Card>
                        <a href="tel:18001208230" className="h-full block hover:bg-muted transition-colors">
                            <CardHeader className="flex flex-row items-center gap-4">
                                <Phone className="h-8 w-8 text-primary"/>
                                <div>
                                    <CardTitle>Call Us (Toll-Free)</CardTitle>
                                    <CardDescription>1800-120-8230</CardDescription>
                                </div>
                            </CardHeader>
                        </a>
                    </Card>
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

    