
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { ShieldAlert } from 'lucide-react';

const complaintFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "A valid email is required." }),
  phone: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }),
  projectName: z.string().min(2, { message: "Project name or ID is required." }),
  complaintDetails: z.string().min(20, { message: "Please provide detailed information about your complaint (at least 20 characters)." }),
  desiredResolution: z.string().min(10, { message: "Please describe your desired resolution (at least 10 characters)." }),
});

type ComplaintFormValues = z.infer<typeof complaintFormSchema>;

export default function ComplaintPage() {
    const { toast } = useToast();

    const form = useForm<ComplaintFormValues>({
        resolver: zodResolver(complaintFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            projectName: "",
            complaintDetails: "",
            desiredResolution: "",
        },
    });

    function onSubmit(data: ComplaintFormValues) {
        console.log("Complaint Submitted:", data);
        toast({
            title: "Complaint Lodged Successfully",
            description: "Thank you for your feedback. Our team will review your complaint and get back to you within 48 hours.",
            variant: "default",
        });
        form.reset();
    }

    return (
        <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
            <div className="text-center">
                <ShieldAlert className="mx-auto h-12 w-12 text-destructive" />
                <h1 className="mt-4 font-headline text-4xl md:text-5xl">Lodge a Complaint</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    We are sorry to hear that you had a problem. Please use the form below to tell us what went wrong.
                </p>
            </div>
            <div className="mt-12 max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Complaint Form</CardTitle>
                        <CardDescription>Please provide as much detail as possible.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl><Input placeholder="Enter your full name" {...field} /></FormControl>
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
                                            <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl><Input type="tel" placeholder="Your 10-digit phone number" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="projectName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project Name / ID</FormLabel>
                                            <FormControl><Input placeholder="e.g., Greenview Residence, Flat 501" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="complaintDetails"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Complaint Details</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    rows={6}
                                                    placeholder="Please describe the issue in detail. Include dates, names, and any other relevant information."
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="desiredResolution"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Desired Resolution</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    rows={3}
                                                    placeholder="How would you like us to resolve this issue?"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
