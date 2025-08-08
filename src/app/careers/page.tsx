'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from 'next/image';

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

const applicationFormSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  position: z.string(),
  coverLetter: z.string().min(10, { message: "Cover letter must be at least 10 characters." }),
  resume: z.any().refine(files => files?.length === 1, 'Resume is required.'),
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

const jobOpenings = [
    { title: "Senior Interior Designer", location: "New York, NY" },
    { title: "Project Manager", location: "Remote" },
    { title: "Junior Designer", location: "New York, NY" },
];

export default function CareersPage() {
    const { toast } = useToast();
    const form = useForm<ApplicationFormValues>({
        resolver: zodResolver(applicationFormSchema),
        defaultValues: {
            fullName: "",
            email: "",
            position: jobOpenings[0].title,
            coverLetter: "",
        },
    });

    function onSubmit(data: ApplicationFormValues) {
        toast({
            title: "Application Submitted!",
            description: `Thank you for applying for the ${data.position} role. We will be in touch shortly.`,
        });
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

            <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                    <div>
                        <h2 className="font-headline text-3xl md:text-4xl">Open Positions</h2>
                        <div className="mt-8 space-y-6">
                            {jobOpenings.map((job) => (
                                <Card key={job.title}>
                                    <CardHeader>
                                        <CardTitle className="font-headline">{job.title}</CardTitle>
                                        <CardDescription>{job.location}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">We're looking for a passionate individual to join our growing team. If you have a keen eye for detail and a love for design, we'd love to hear from you.</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="font-headline text-3xl md:text-4xl">Apply Now</h2>
                        <Card className="mt-8">
                            <CardContent className="p-6">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                        <FormField
                                            control={form.control}
                                            name="fullName"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Full Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John Doe" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email Address</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="you@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="resume"
                                            render={({ field }) => (
                                                 <FormItem>
                                                    <FormLabel>Resume/CV</FormLabel>
                                                    <FormControl>
                                                        <Input type="file" {...form.register("resume")} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="coverLetter"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Cover Letter</FormLabel>
                                                    <FormControl>
                                                        <Textarea placeholder="Tell us why you're a great fit..." {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="w-full">Submit Application</Button>
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
