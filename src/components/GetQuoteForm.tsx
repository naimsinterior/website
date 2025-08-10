
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import React from "react";

const quoteFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

interface GetQuoteFormProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function GetQuoteForm({ open, onOpenChange }: GetQuoteFormProps) {
    const { toast } = useToast();
    const form = useForm<QuoteFormValues>({
        resolver: zodResolver(quoteFormSchema),
        defaultValues: { name: "", email: "" },
    });

    function onSubmit(data: QuoteFormValues) {
        toast({
            title: "Quote Request Sent!",
            description: `Thank you, ${data.name}. We'll be in touch shortly.`,
        });
        form.reset();
        onOpenChange?.(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button>Get a Quote</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Request a Quote</DialogTitle>
                    <DialogDescription>
                        Fill out the form below and we'll get back to you as soon as possible.
                    </DialogDescription>
                </DialogHeader>
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
                        <Button type="submit" className="w-full">Submit Request</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
