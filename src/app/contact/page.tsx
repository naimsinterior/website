
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

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const locations = [
    {
        name: 'Head Office',
        address: 'H-77, Silai Bara Gaon, Milak, Rampur, Uttar Pradesh (244701)',
        email: 'headoffice@naimsinterior.com',
        phone: '(+91) 987-654-3210',
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3475.253634312898!2d79.0270923151009!3d29.42145398211239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390a475b7a1e1b7b%3A0x8e8e8e8e8e8e8e8e!2sRampur%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1622546777893!5m2!1sen!2sin"
    },
    {
        name: 'Noida',
        address: 'Sector 62, Noida, Uttar Pradesh 201309',
        email: 'noida@naimsinterior.com',
        phone: '(+91) 987-654-3211',
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.220899320291!2d77.3712563150818!3d28.59318198243325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cef7d5f5f5f5f%3A0x3f3f3f3f3f3f3f3f!2sSector%2062%2C%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1622546888999!5m2!1sen!2sin"
    },
    {
        name: 'Gurgaon',
        address: 'DLF Cyber City, Gurgaon, Haryana 122002',
        email: 'gurgaon@naimsinterior.com',
        phone: '(+91) 987-654-3212',
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.962551528628!2d77.0864349150787!3d28.45055098248983!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1f5d5f5f5f5f%3A0x1f1f1f1f1f1f1f1f!2sDLF%20Cyber%20City%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1622546999000!5m2!1sen!2sin"
    },
    {
        name: 'Chennai',
        address: 'T. Nagar, Chennai, Tamil Nadu 600017',
        email: 'chennai@naimsinterior.com',
        phone: '(+91) 987-654-3213',
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.620197732049!2d80.2315189148227!3d13.06041699079717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266988f5f5f5f%3A0x9f9f9f9f9f9f9f9f!2sT.%20Nagar%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1622547111222!5m2!1sen!2sin"
    },
    {
        name: 'OMR',
        address: 'Old Mahabalipuram Road, Chennai, Tamil Nadu 600119',
        email: 'omr@naimsinterior.com',
        phone: '(+91) 987-654-3214',
        mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.995977926189!2d80.2209736148212!3d12.90799699089823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d5d5f5f5f5f%3A0x7f7f7f7f7f7f7f7f!2sOld%20Mahabalipuram%20Road%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1622547222333!5m2!1sen!2sin"
    }
];

export default function ContactPage() {
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
    return (
        <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
            <div className="text-center">
                <h1 className="font-headline text-4xl md:text-5xl">Get In Touch</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
                    Have a project in mind, a question about our services, or just want to say hello? We'd love to hear from you. Reach out via the form below or contact one of our offices directly.
                </p>
            </div>
            
            <div className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2">
                <div>
                     <h2 className="font-headline text-3xl mb-8">Our Offices</h2>
                     <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                        {locations.map((loc, index) => (
                            <AccordionItem key={loc.name} value={`item-${index}`}>
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
    );
}

    