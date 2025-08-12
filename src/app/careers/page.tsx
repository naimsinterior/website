
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from 'next/image';
import { format } from "date-fns";
import { CalendarIcon, MapPin, Briefcase, DollarSign, Clock, CheckCircle, Users, Trophy, Sparkles } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import React from 'react';

const applicationFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  resume: z.any().refine(files => files?.length === 1, 'Resume is required.'),
  portfolio: z.any().optional(),
  coverLetter: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal('')),
  startDate: z.date().optional(),
  expectedSalary: z.string().optional(),
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

const jobOpenings = [
    { 
        title: "Senior Interior Designer", 
        location: "New York, NY",
        department: "Design",
        responsibilities: [
            "Lead design projects from concept to completion.",
            "Develop and present design concepts to clients.",
            "Manage project timelines and budgets.",
            "Mentor junior designers."
        ],
        qualifications: [
            "5+ years of experience in high-end residential design.",
            "Proficiency in AutoCAD, SketchUp, and Adobe Creative Suite.",
            "Strong portfolio of completed projects.",
            "Excellent communication and presentation skills."
        ],
        benefits: ["Competitive salary", "Health insurance", "401(k) plan", "Paid time off"]
    },
    { 
        title: "Project Manager", 
        location: "Remote",
        department: "Operations",
        responsibilities: [
            "Coordinate and oversee all aspects of design projects.",
            "Liaise with clients, vendors, and contractors.",
            "Ensure projects are delivered on time and within budget.",
            "Track project progress and report to stakeholders."
        ],
        qualifications: [
            "3+ years of project management experience in the design or construction industry.",
            "Strong organizational and leadership skills.",
            "Excellent problem-solving abilities.",
            "Familiarity with project management software."
        ],
        benefits: ["Flexible work hours", "Health and wellness stipend", "Professional development opportunities"]
    },
    { 
        title: "Junior Designer", 
        location: "New York, NY",
        department: "Design",
        responsibilities: [
            "Assist senior designers in creating design concepts.",
            "Source materials and furnishings.",
            "Prepare drawings and presentations.",
            "Maintain project documentation."
        ],
        qualifications: [
            "Bachelor's degree in Interior Design or related field.",
            "1-2 years of experience or a strong internship portfolio.",
            "Eagerness to learn and a strong passion for design.",
            "Proficient in design software."
        ],
        benefits: ["Mentorship program", "Creative and collaborative work environment", "Health insurance"]
    },
];

const companyPerks = [
    { icon: <Trophy />, title: "Competitive Salaries", description: "We offer competitive compensation packages to attract and retain the best talent." },
    { icon: <CheckCircle />, title: "Comprehensive Benefits", description: "Our benefits include health, dental, and vision insurance, plus a robust 401(k) plan." },
    { icon: <Sparkles />, title: "Growth Opportunities", description: "We invest in our team's growth with professional development and mentorship programs." },
];

const employeeTestimonials = [
    {
        quote: "Working at Interiorscape has been an incredible journey. The creative freedom and supportive team have helped me grow so much as a designer.",
        author: "Alex Johnson",
        role: "Senior Designer",
        image: "https://placehold.co/100x100.png"
    },
    {
        quote: "The company culture here is amazing. There's a real sense of collaboration and everyone is passionate about creating beautiful spaces for our clients.",
        author: "Samantha Lee",
        role: "Project Manager",
        image: "https://placehold.co/100x100.png"
    }
]

export default function CareersPage() {
    const { toast } = useToast();
    const form = useForm<ApplicationFormValues>({
        resolver: zodResolver(applicationFormSchema)
    });

    function onSubmit(data: ApplicationFormValues) {
        toast({
            title: "Application Submitted!",
            description: `Thank you for your interest. We will be in touch shortly.`,
        });
        console.log(data);
        form.reset();
    }

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[50vh] w-full bg-muted">
                 <Image
                    src="https://placehold.co/1600x600.png"
                    alt="A modern and collaborative office space"
                    fill
                    className="z-0 object-cover"
                    data-ai-hint="modern office"
                />
                 <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black/50 text-center text-white">
                    <h1 className="font-headline text-4xl md:text-6xl">Join Our Team</h1>
                    <p className="mt-4 max-w-2xl text-lg md:text-xl">
                        Help us craft beautiful spaces and shape the future of design.
                    </p>
                </div>
            </section>
            
            {/* Main Content */}
            <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-3">
                    {/* Left Column: Job Listings */}
                    <div className="lg:col-span-2">
                        <h2 className="font-headline text-3xl md:text-4xl">Current Openings</h2>
                        <div className="mt-8 space-y-4">
                            <Accordion type="single" collapsible className="w-full">
                                {jobOpenings.map((job, index) => (
                                    <AccordionItem key={index} value={`item-${index}`}>
                                        <AccordionTrigger className="hover:no-underline">
                                            <div className="flex flex-col items-start text-left">
                                                <h3 className="font-headline text-xl text-primary">{job.title}</h3>
                                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
                                                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {job.location}</div>
                                                    <div className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> {job.department}</div>
                                                </div>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="p-4">
                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="font-semibold mb-2">Responsibilities:</h4>
                                                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                                        {job.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)}
                                                    </ul>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold mb-2">Qualifications:</h4>
                                                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                                        {job.qualifications.map((qual, i) => <li key={i}>{qual}</li>)}
                                                    </ul>
                                                </div>
                                                 <div>
                                                    <h4 className="font-semibold mb-2">Benefits:</h4>
                                                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                                                        {job.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
                                                    </ul>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>

                    {/* Right Column: Application Form */}
                    <div>
                        <h2 className="font-headline text-3xl md:text-4xl">Apply Now</h2>
                        <Card className="mt-8">
                            <CardContent className="p-6">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField control={form.control} name="fullName" render={({ field }) => (
                                            <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={form.control} name="email" render={({ field }) => (
                                            <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={form.control} name="phone" render={({ field }) => (
                                            <FormItem><FormLabel>Mobile Number</FormLabel><FormControl><Input placeholder="+1 123-456-7890" {...field} /></FormControl><FormMessage /></FormItem>
                                        )} />
                                        <FormField control={form.control} name="resume" render={({ field }) => (
                                             <FormItem><FormLabel>Upload Resume (PDF/DOC)</FormLabel><FormControl><Input type="file" {...form.register("resume")} /></FormControl><FormMessage /></FormItem>
                                        )}/>
                                        <FormField control={form.control} name="portfolio" render={({ field }) => (
                                             <FormItem><FormLabel>Portfolio/Work Samples (Optional)</FormLabel><FormControl><Input type="file" {...form.register("portfolio")} /></FormControl><FormMessage /></FormItem>
                                        )}/>
                                        <FormField control={form.control} name="coverLetter" render={({ field }) => (
                                            <FormItem><FormLabel>Cover Letter (Optional)</FormLabel><FormControl><Textarea rows={4} placeholder="Tell us why you're a great fit..." {...field} /></FormControl><FormMessage /></FormItem>
                                        )}/>
                                        <FormField control={form.control} name="linkedin" render={({ field }) => (
                                            <FormItem><FormLabel>LinkedIn Profile (Optional)</FormLabel><FormControl><Input placeholder="https://linkedin.com/in/..." {...field} /></FormControl><FormMessage /></FormItem>
                                        )}/>
                                        <FormField control={form.control} name="startDate" render={({ field }) => (
                                             <FormItem className="flex flex-col"><FormLabel>Preferred Start Date (Optional)</FormLabel><Popover><PopoverTrigger asChild>
                                                <FormControl><Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl>
                                             </PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>
                                        )} />
                                         <FormField control={form.control} name="expectedSalary" render={({ field }) => (
                                            <FormItem><FormLabel>Expected Salary (Optional)</FormLabel><FormControl><Input placeholder="e.g., $80,000 per year" {...field} /></FormControl><FormMessage /></FormItem>
                                        )}/>
                                        <Button type="submit" className="w-full">Submit Application</Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Company Culture Section */}
                <div className="mt-24">
                     <div className="text-center">
                        <h2 className="font-headline text-3xl md:text-4xl">Life at Interiorscape</h2>
                        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                           We foster a collaborative, creative, and inspiring environment where great ideas flourish.
                        </p>
                    </div>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="relative h-96 w-full rounded-lg overflow-hidden">
                             <Image
                                src="https://placehold.co/600x400.png"
                                alt="Team members collaborating in a bright, modern office"
                                fill
                                className="object-cover"
                                data-ai-hint="team collaboration"
                            />
                        </div>
                        <div className="space-y-6">
                            {companyPerks.map((perk, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="flex-shrink-0 mt-1">{React.cloneElement(perk.icon, { className: "h-8 w-8 text-primary" })}</div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{perk.title}</h3>
                                        <p className="text-muted-foreground">{perk.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Employee Testimonials */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {employeeTestimonials.map((testimonial, index) => (
                           <Card key={index} className="bg-muted border-l-4 border-primary">
                                <CardContent className="p-6 flex items-start gap-6">
                                     <Image src={testimonial.image} alt={testimonial.author} width={80} height={80} className="rounded-full mt-1" data-ai-hint="portrait person" />
                                    <div>
                                        <blockquote className="italic text-foreground mb-4">"{testimonial.quote}"</blockquote>
                                        <p className="font-bold">{testimonial.author}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

            </div>
        </>
    );
}

    