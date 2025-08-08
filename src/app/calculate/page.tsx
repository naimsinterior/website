
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
        </div>
    );
}
