
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect } from "react";

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
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MailCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const contactFormSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }),
    propertyName: z.string().min(2, { message: "Address is required." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface SimpleContactFormProps {
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

const words = ["Modular Kitchen", "Full Home Interior", "Renovation"];

export function SimpleContactForm({ children, open, onOpenChange }: SimpleContactFormProps) {
    const [isInternalOpen, setIsInternalOpen] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [blink, setBlink] = useState(true);
    const [reverse, setReverse] = useState(false);

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            propertyName: "",
        },
    });

    const isControlled = open !== undefined && onOpenChange !== undefined;
    const currentOpen = isControlled ? open : isInternalOpen;
    const setCurrentOpen = isControlled ? onOpenChange : setIsInternalOpen;

    useEffect(() => {
        if (!currentOpen || isSubmitted) return;

        if (subIndex === words[index].length + 1 && !reverse) {
            setTimeout(() => setReverse(true), 1000);
            return;
        }

        if (subIndex === 0 && reverse) {
            setReverse(false);
            setIndex((prev) => (prev + 1) % words.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (reverse ? -1 : 1));
        }, reverse ? 75 : 150);

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, currentOpen, isSubmitted]);

    useEffect(() => {
        if (!currentOpen || isSubmitted) return;
        const blinkTimeout = setTimeout(() => {
            setBlink((prev) => !prev);
        }, 500);
        return () => clearTimeout(blinkTimeout);
    }, [blink, currentOpen, isSubmitted]);


    async function onSubmit(data: ContactFormValues) {
        console.log("Contact Form Submitted:", data);
        setIsSubmitted(true);
    }

    const handleOpenChange = (open: boolean) => {
        setCurrentOpen(open);
        if (!open) {
            setTimeout(() => {
                form.reset();
                setIsSubmitted(false);
            }, 300);
        }
    };
    
    return (
        <Dialog open={currentOpen} onOpenChange={handleOpenChange}>
            {children && (
              <DialogTrigger asChild>
                  {children}
              </DialogTrigger>
            )}
            <DialogContent className={cn("sm:max-w-md")}>
                {isSubmitted ? (
                    <div className="flex flex-col items-center justify-center text-center p-8">
                       <MailCheck className="h-16 w-16 text-green-500 mb-4" />
                       <DialogTitle className="font-headline text-2xl">Thank You!</DialogTitle>
                       <DialogDescription className="mt-2">
                           Your request has been sent successfully. Our team will get back to you shortly.
                       </DialogDescription>
                       <Button onClick={() => handleOpenChange(false)} className="mt-6">Close</Button>
                   </div>
                ) : (
                  <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <DialogHeader>
                            <DialogTitle>
                                Get in Touch for <span className="text-primary">{`${words[index].substring(0, subIndex)}${blink ? "|" : " "}`}</span>
                            </DialogTitle>
                            <DialogDescription>Please provide your contact information and we'll reach out.</DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem><FormControl><Input placeholder="Full Name" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="phone" render={({ field }) => (
                                <FormItem><FormControl><Input type="tel" placeholder="10-digit mobile number" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                             <FormField control={form.control} name="propertyName" render={({ field }) => (
                                <FormItem><FormControl><Input placeholder="Address; P-4 2003, Arihant Adobe, New Delhi" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </div>
                        <Button type="submit" className="w-full">Submit</Button>
                      </form>
                  </Form>
                )}
            </DialogContent>
        </Dialog>
    );
}
