
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const leadFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }),
  propertyName: z.string().min(5, { message: "Please enter a valid address." }),
});

type LeadFormValues = z.infer<typeof leadFormSchema>;

export function LeadForm() {
    const { toast } = useToast();
    const form = useForm<LeadFormValues>({
        resolver: zodResolver(leadFormSchema),
        defaultValues: { name: "", email: "", phone: "", propertyName: "" },
    });

    function onSubmit(data: LeadFormValues) {
        toast({
            title: "Request Sent!",
            description: `Thank you, ${data.name}. We'll be in touch shortly.`,
        });
        form.reset();
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Ready to Start?</CardTitle>
                <CardDescription>Get a free consultation from our design experts.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
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
                                    <FormControl><Input type="tel" placeholder="10-digit mobile number" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="propertyName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl><Input placeholder="Address; P-4 2003, Arihant Adobe, New Delhi" {...field} /></FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Request a Callback</Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
