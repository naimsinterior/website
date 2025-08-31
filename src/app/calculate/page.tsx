
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { DollarSign } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";


const calculatorSchema = z.object({
    roomType: z.string({ required_error: "Please select a room type." }),
    sqft: z.coerce.number().min(50, { message: "Minimum 50 sqft required." }),
    finishLevel: z.enum(["basic", "mid", "high"], { required_error: "Please select a finish level." }),
});

type CalculatorFormValues = z.infer<typeof calculatorSchema>;

// Pricing factors (per sqft)
const roomTypeMultiplier = {
    living_room: 1,
    bedroom: 0.9,
    kitchen: 1.5,
    bathroom: 1.8,
    office: 1.1,
};

const finishLevelMultiplier = {
    basic: 100,
    mid: 175,
    high: 300,
};

const faqs = [
    {
        question: "Is this calculator accurate?",
        answer: "This calculator provides a preliminary estimate to help you budget. The final cost can vary based on material choices, complexity, and specific site conditions. For a precise quote, please contact us for a detailed consultation."
    },
    {
        question: "What does the 'finish level' mean?",
        answer: "The finish level determines the quality and cost of materials. 'Basic' includes standard, good-quality materials. 'Mid-Range' offers a mix of high-quality and premium materials. 'High-End' uses luxury materials and bespoke finishes for a premium result."
    },
    {
        question: "Are design fees included in this estimate?",
        answer: "No, this estimate covers the approximate cost of materials and labor for the project itself. Our design fees are separate and will be discussed during your consultation."
    },
    {
        question: "How can I get a detailed quote?",
        answer: "The best way to get a detailed quote is to fill out our contact form or call us to schedule a free consultation with one of our designers. We'll discuss your project in detail and provide a comprehensive proposal."
    }
];

export default function CalculatePage() {
    const [estimatedCost, setEstimatedCost] = useState<number | null>(null);

    const form = useForm<CalculatorFormValues>({
        resolver: zodResolver(calculatorSchema),
        defaultValues: {
            sqft: 150,
        },
    });

    function onSubmit(data: CalculatorFormValues) {
        const baseCost = finishLevelMultiplier[data.finishLevel];
        const roomMultiplier = roomTypeMultiplier[data.roomType as keyof typeof roomTypeMultiplier] || 1;
        const totalCost = baseCost * data.sqft * roomMultiplier;
        setEstimatedCost(totalCost);
    }

    return (
        <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
            <div className="text-center">
                <h1 className="font-headline text-4xl md:text-5xl">Project Cost Calculator</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Get a rough estimate for your interior design project. For a detailed quote, please contact us.
                </p>
            </div>
            <div className="mt-12 max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Estimate Your Cost</CardTitle>
                        <CardDescription>Fill in the details below to see an instant estimate.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="roomType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Room Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select a room" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="living_room">Living Room</SelectItem>
                                                    <SelectItem value="bedroom">Bedroom</SelectItem>
                                                    <SelectItem value="kitchen">Kitchen</SelectItem>
                                                    <SelectItem value="bathroom">Bathroom</SelectItem>
                                                    <SelectItem value="office">Home Office</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <FormField
                                    control={form.control}
                                    name="sqft"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Area (in square feet)</FormLabel>
                                            <FormControl>
                                                <Input type="number" placeholder="e.g., 200" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="finishLevel"
                                    render={({ field }) => (
                                        <FormItem className="space-y-3">
                                            <FormLabel>Desired Finish Level</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex flex-col space-y-1"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl><RadioGroupItem value="basic" /></FormControl>
                                                        <FormLabel className="font-normal">
                                                            Basic - Functional and stylish essentials.
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl><RadioGroupItem value="mid" /></FormControl>
                                                        <FormLabel className="font-normal">
                                                            Mid-Range - High-quality materials and some custom pieces.
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl><RadioGroupItem value="high" /></FormControl>
                                                        <FormLabel className="font-normal">
                                                            High-End - Luxury finishes and bespoke furniture.
                                                        </FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                 <Button type="submit" className="w-full">Calculate Estimate</Button>
                            </form>
                        </Form>

                        {estimatedCost !== null && (
                            <div className="mt-8">
                                <Separator />
                                <div className="mt-8 text-center">
                                    <p className="text-muted-foreground">Estimated Project Cost</p>
                                    <p className="font-headline text-4xl font-bold flex items-center justify-center">
                                        <DollarSign className="h-8 w-8 mr-2 text-primary" />
                                        {estimatedCost.toLocaleString('en-US', {
                                            minimumFractionDigits: 0,
                                            maximumFractionDigits: 0,
                                        })}
                                    </p>
                                    <FormDescription className="mt-2">
                                        This is a preliminary estimate. Actual costs may vary.
                                    </FormDescription>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <div className="mt-16 max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="font-headline text-3xl md:text-4xl">Frequently Asked Questions</h2>
                </div>
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b-0">
                            <Card>
                                <AccordionTrigger className="p-6 text-lg text-left hover:no-underline font-headline">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6">
                                    <p className="text-base text-muted-foreground">{faq.answer}</p>
                                </AccordionContent>
                            </Card>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
