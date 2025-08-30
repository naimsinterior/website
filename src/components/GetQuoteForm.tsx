
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Check, MailCheck } from "lucide-react";

const quoteFormSchema = z.object({
    propertyType: z.string({ required_error: "Please select a property type." }),
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

interface GetQuoteFormProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const propertyTypes = ["1 BHK", "2 BHK", "3 BHK", "4 BHK+", "Villa / Bungalow", "Commercial Space"];

export function GetQuoteForm({ open, onOpenChange }: GetQuoteFormProps) {
    const [step, setStep] = useState(1);
    
    const { toast } = useToast();
    const form = useForm<QuoteFormValues>({
        resolver: zodResolver(quoteFormSchema),
        defaultValues: { name: "", email: "", phone: "" },
    });

    const handleNext = async () => {
        let isValid = false;
        if (step === 1) {
            isValid = await form.trigger("propertyType");
        }
        
        if (isValid) {
            setStep(step + 1);
        }
    }
    
    const handleBack = () => {
        if(step > 1 && step < 3) {
            setStep(step - 1);
        }
    }

    function onSubmit(data: QuoteFormValues) {
        console.log("Quote Request Submitted:", data);
        setStep(3); // Go to success step
        form.reset();
        toast({
            title: "Quote Request Sent!",
            description: `Thank you, ${data.name}. We'll be in touch shortly.`,
        });
    }

    const resetAndClose = () => {
      setStep(1);
      onOpenChange?.(false);
    }

    const handleOpenChange = (isOpen: boolean) => {
        if (isOpen) {
          setStep(1);
          form.reset();
        }
        onOpenChange?.(isOpen);
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button>Get a Quote</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px]">
                {step === 1 && (
                     <>
                        <DialogHeader>
                            <DialogTitle>Let's Get Started</DialogTitle>
                            <DialogDescription>
                                To begin, please tell us about your property.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                           <form>
                               <FormField
                                    control={form.control}
                                    name="propertyType"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel className="font-semibold">Select your property type:</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="grid grid-cols-2 gap-4"
                                                >
                                                    {propertyTypes.map(type => (
                                                      <FormItem key={type} className="flex-1">
                                                          <FormControl>
                                                            <RadioGroupItem value={type} className="sr-only" />
                                                          </FormControl>
                                                          <FormLabel className="flex items-center justify-center rounded-md border-2 border-muted bg-popover p-4 font-normal hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer">
                                                              {type}
                                                          </FormLabel>
                                                      </FormItem>
                                                    ))}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="mt-6 flex justify-end">
                                    <Button type="button" onClick={handleNext}>Next</Button>
                                </div>
                           </form>
                        </Form>
                     </>
                )}
                {step === 2 && (
                    <>
                        <DialogHeader>
                            <DialogTitle>Just a Few More Details</DialogTitle>
                            <DialogDescription>
                               Please provide your contact information so we can get in touch.
                            </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl><Input type="tel" placeholder="10-digit mobile number" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="flex justify-between">
                                    <Button type="button" variant="outline" onClick={handleBack}>Back</Button>
                                    <Button type="submit">Submit Request</Button>
                                </div>
                            </form>
                        </Form>
                    </>
                )}
                {step === 3 && (
                    <div className="flex flex-col items-center justify-center text-center p-8">
                       <MailCheck className="h-16 w-16 text-green-500 mb-4" />
                       <DialogTitle className="font-headline text-2xl">Thank You!</DialogTitle>
                       <DialogDescription className="mt-2">
                           Your quote request has been sent successfully. Our team will get back to you shortly.
                       </DialogDescription>
                       <Button onClick={resetAndClose} className="mt-6">Close</Button>
                   </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
