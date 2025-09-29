
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FieldName } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import React, { useState } from "react";
import { MailCheck } from "lucide-react";

const franchiseFormSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("A valid email is required."),
  phone: z.string().min(10, "A valid 10-digit phone number is required."),
  city: z.string().min(2, "City is required."),
  state: z.string().min(2, "State is required."),
  
  netWorth: z.string().min(1, "Please select your approximate net worth."),
  liquidCapital: z.string().min(1, "Please select your available liquid capital."),
  
  background: z.string().min(10, "Please briefly describe your professional background."),
  whyNaims: z.string().min(10, "Please tell us why you are interested in NAIMS INTERIOR."),
  
  howHeard: z.string().optional(),
});

type FranchiseFormValues = z.infer<typeof franchiseFormSchema>;

const STEPS = [
    {
        title: "Personal Information",
        fields: ["fullName", "email", "phone", "city", "state"]
    },
    {
        title: "Financial Information",
        fields: ["netWorth", "liquidCapital"]
    },
    {
        title: "Your Background",
        fields: ["background", "whyNaims", "howHeard"]
    },
];

const netWorthOptions = ["< ₹50 Lakh", "₹50 Lakh - ₹1 Crore", "₹1 Crore - ₹2 Crore", "₹2 Crore+"];
const liquidCapitalOptions = ["< ₹25 Lakh", "₹25 Lakh - ₹50 Lakh", "₹50 Lakh - ₹1 Crore", "₹1 Crore+"];

export function FranchiseForm() {
    const { toast } = useToast();
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<FranchiseFormValues>({
        resolver: zodResolver(franchiseFormSchema),
    });

    const handleNext = async () => {
        const fields = STEPS[currentStep].fields;
        const output = await form.trigger(fields as FieldName<FranchiseFormValues>[], { shouldFocus: true });
        
        if (!output) return;

        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };
    
    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }

    function onSubmit(data: FranchiseFormValues) {
        console.log("Franchise Inquiry Submitted:", data);
        setIsSubmitted(true);
    }

     if (isSubmitted) {
        return (
             <div className="text-center py-16">
                <MailCheck className="mx-auto h-12 w-12 text-primary" />
                <h2 className="mt-4 font-headline text-3xl">Inquiry Sent!</h2>
                <p className="mt-2 max-w-md mx-auto text-muted-foreground">
                    Thank you for your interest. A member of our franchise development team will be in touch with you shortly.
                </p>
            </div>
        )
    }

    return (
        <Card>
            <CardContent className="p-8">
                <div className="mb-8 space-y-2">
                    <Progress value={((currentStep + 1) / (STEPS.length + 1)) * 100} />
                    <p className="text-center text-sm font-medium text-muted-foreground">
                        Step {currentStep + 1} of {STEPS.length}: {STEPS[currentStep].title}
                    </p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        
                        {currentStep === 0 && (
                            <div className="space-y-4">
                                <FormField control={form.control} name="fullName" render={({ field }) => (
                                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                     <FormField control={form.control} name="email" render={({ field }) => (
                                        <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                     <FormField control={form.control} name="phone" render={({ field }) => (
                                        <FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" placeholder="10-digit number" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                     <FormField control={form.control} name="city" render={({ field }) => (
                                        <FormItem><FormLabel>Preferred City</FormLabel><FormControl><Input placeholder="e.g., Delhi" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    <FormField control={form.control} name="state" render={({ field }) => (
                                        <FormItem><FormLabel>State</FormLabel><FormControl><Input placeholder="e.g., Delhi" {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                </div>
                            </div>
                        )}

                        {currentStep === 1 && (
                             <div className="space-y-4">
                                <FormField control={form.control} name="netWorth" render={({ field }) => (
                                <FormItem><FormLabel>Approximate Net Worth</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        {netWorthOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                    </SelectContent>
                                    </Select>
                                <FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="liquidCapital" render={({ field }) => (
                                <FormItem><FormLabel>Available Liquid Capital for Investment</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        {liquidCapitalOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                                    </SelectContent>
                                    </Select>
                                <FormMessage /></FormItem>
                                )}/>
                             </div>
                        )}
                        
                        {currentStep === 2 && (
                            <div className="space-y-4">
                                <FormField control={form.control} name="background" render={({ field }) => (
                                    <FormItem><FormLabel>Professional Background</FormLabel><FormControl><Textarea rows={4} placeholder="Briefly describe your work experience, business ownership, etc." {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="whyNaims" render={({ field }) => (
                                    <FormItem><FormLabel>Why are you interested in a NAIMS INTERIOR franchise?</FormLabel><FormControl><Textarea rows={4} placeholder="What interests you about the interior design industry and our brand?" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                 <FormField control={form.control} name="howHeard" render={({ field }) => (
                                    <FormItem><FormLabel>How did you hear about us? (Optional)</FormLabel><FormControl><Input placeholder="e.g., Google, a friend, social media" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                        )}
                        
                        <div className="mt-8 pt-8 border-t flex justify-between">
                            {currentStep > 0 && (
                                <Button type="button" variant="outline" onClick={handlePrev}>
                                    Back
                                </Button>
                            )}
                            {currentStep < STEPS.length - 1 ? (
                                <Button type="button" onClick={handleNext} className={currentStep === 0 ? 'ml-auto' : ''}>
                                    Next
                                </Button>
                            ) : (
                                <Button type="submit">
                                    Submit Inquiry
                                </Button>
                            )}
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
