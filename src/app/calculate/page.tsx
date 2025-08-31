
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { DollarSign } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";

const calculatorSchema = z.object({
    propertyType: z.string({ required_error: "Please select a property type." }),
    scope: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    finishLevel: z.enum(["basic", "mid", "high"], { required_error: "Please select a finish level." }),
});

type CalculatorFormValues = z.infer<typeof calculatorSchema>;

// Pricing factors per room/item
const scopeCosts = {
    kitchen: 75000,
    living_room: 50000,
    bedroom: 45000,
    bathroom: 60000,
    study_room: 35000,
    balcony: 20000,
    wardrobes: 40000,
    tv_unit: 15000,
    false_ceiling: 30000,
    painting: 25000,
};

const finishLevelMultiplier = {
    basic: 1,
    mid: 1.5,
    high: 2.5,
};

const propertyTypeBaseSqft = {
    "1rk": 300,
    "1bhk": 500,
    "2bhk": 800,
    "3bhk": 1200,
    "4bhk": 1600,
    "4+bhk": 2000,
};

const propertyTypes = [
    { id: "1rk", label: "1RK" },
    { id: "1bhk", label: "1BHK" },
    { id: "2bhk", label: "2BHK" },
    { id: "3bhk", label: "3BHK" },
    { id: "4bhk", label: "4BHK" },
    { id: "4+bhk", label: "4+BHK" },
];

const scopeOfWork = [
    { id: "kitchen", label: "Kitchen" },
    { id: "living_room", label: "Living Room" },
    { id: "bedroom", label: "Bedroom(s)" },
    { id: "bathroom", label: "Bathroom(s)" },
    { id: "study_room", label: "Study Room" },
    { id: "balcony", label: "Balcony" },
    { id: "wardrobes", label: "Wardrobes" },
    { id: "tv_unit", label: "TV Unit" },
    { id: "false_ceiling", label: "False Ceiling" },
    { id: "painting", label: "Painting" },
];

const finishLevels = [
    { id: "basic", label: "Basic", description: "Functional and stylish essentials." },
    { id: "mid", label: "Mid-Range", description: "High-quality materials and some custom pieces." },
    { id: "high", label: "High-End", description: "Luxury finishes and bespoke furniture." },
];

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

const STEPS = [
    { id: 1, name: "Property Type" },
    { id: 2, name: "Scope of Work" },
    { id: 3, name: "Finish Level" },
];

export default function CalculatePage() {
    const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
    const [currentStep, setCurrentStep] = useState(1);

    const form = useForm<CalculatorFormValues>({
        resolver: zodResolver(calculatorSchema),
        defaultValues: {
            scope: [],
        },
    });

    const handleNext = async () => {
        let fieldsToValidate: (keyof CalculatorFormValues)[] = [];
        if (currentStep === 1) fieldsToValidate.push('propertyType');
        if (currentStep === 2) fieldsToValidate.push('scope');
        if (currentStep === 3) fieldsToValidate.push('finishLevel');

        const isValid = await form.trigger(fieldsToValidate);
        if (isValid) {
            if (currentStep < 3) {
                setCurrentStep(currentStep + 1);
            } else {
                onSubmit(form.getValues());
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };
    
    function onSubmit(data: CalculatorFormValues) {
        let baseCost = 0;
        data.scope.forEach(item => {
            baseCost += scopeCosts[item as keyof typeof scopeCosts] || 0;
        });

        const finishMultiplier = finishLevelMultiplier[data.finishLevel];
        const propertyMultiplier = (propertyTypeBaseSqft[data.propertyType as keyof typeof propertyTypeBaseSqft] || 1000) / 1000;
        
        const totalCost = baseCost * finishMultiplier * propertyMultiplier;
        setEstimatedCost(totalCost);
        setCurrentStep(4); // Move to result step
    }

    const progress = ((currentStep - 1) / (STEPS.length)) * 100;

    return (
        <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
            <div className="text-center">
                <h1 className="font-headline text-4xl md:text-5xl">Project Cost Calculator</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Get a rough estimate for your interior design project in just a few steps.
                </p>
            </div>
            <div className="mt-12 max-w-4xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline text-center">Estimate Your Cost</CardTitle>
                        {currentStep <= STEPS.length && (
                            <div className="pt-4">
                                <Progress value={progress} />
                                <p className="text-center text-sm text-muted-foreground mt-2">
                                    Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].name}
                                </p>
                            </div>
                        )}
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">
                                
                                {currentStep === 1 && (
                                    <FormField
                                        control={form.control}
                                        name="propertyType"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <FormLabel className="text-lg font-semibold text-center block">What is your property type?</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="grid grid-cols-2 md:grid-cols-3 gap-4"
                                                    >
                                                        {propertyTypes.map((type) => (
                                                             <FormItem key={type.id} className="w-full">
                                                                <FormControl>
                                                                    <RadioGroupItem value={type.id} id={type.id} className="sr-only" />
                                                                </FormControl>
                                                                <Label
                                                                    htmlFor={type.id}
                                                                    className={cn(
                                                                        "flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer hover:bg-accent hover:text-accent-foreground",
                                                                        field.value === type.id ? "border-primary bg-primary/5" : "border-muted"
                                                                    )}
                                                                >
                                                                    <span className="font-bold text-lg">{type.label}</span>
                                                                </Label>
                                                            </FormItem>
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage className="text-center" />
                                            </FormItem>
                                        )}
                                    />
                                )}

                                {currentStep === 2 && (
                                    <FormField
                                        control={form.control}
                                        name="scope"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel className="text-lg font-semibold text-center block">What is the scope of work?</FormLabel>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                                    {scopeOfWork.map((item) => (
                                                        <FormField
                                                            key={item.id}
                                                            control={form.control}
                                                            name="scope"
                                                            render={({ field }) => {
                                                                return (
                                                                    <FormItem key={item.id} className="w-full">
                                                                        <FormControl>
                                                                             <Checkbox
                                                                                checked={field.value?.includes(item.id)}
                                                                                onCheckedChange={(checked) => {
                                                                                    return checked
                                                                                    ? field.onChange([...(field.value || []), item.id])
                                                                                    : field.onChange(
                                                                                        field.value?.filter(
                                                                                            (value) => value !== item.id
                                                                                        )
                                                                                    )
                                                                                }}
                                                                                id={item.id}
                                                                                className="sr-only"
                                                                            />
                                                                        </FormControl>
                                                                         <Label
                                                                            htmlFor={item.id}
                                                                            className={cn(
                                                                                "flex flex-col items-center justify-center text-center p-4 border-2 rounded-lg cursor-pointer hover:bg-accent hover:text-accent-foreground",
                                                                                field.value?.includes(item.id) ? "border-primary bg-primary/5" : "border-muted"
                                                                            )}
                                                                        >
                                                                            <span className="font-semibold">{item.label}</span>
                                                                        </Label>
                                                                    </FormItem>
                                                                )
                                                            }}
                                                        />
                                                    ))}
                                                </div>
                                                <FormMessage className="text-center" />
                                            </FormItem>
                                        )}
                                    />
                                )}

                                {currentStep === 3 && (
                                    <FormField
                                        control={form.control}
                                        name="finishLevel"
                                        render={({ field }) => (
                                            <FormItem className="space-y-3">
                                                <FormLabel className="text-lg font-semibold text-center block">What's your desired finish level?</FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="grid grid-cols-1 md:grid-cols-3 gap-4"
                                                    >
                                                        {finishLevels.map(level => (
                                                             <FormItem key={level.id} className="w-full">
                                                                <FormControl>
                                                                    <RadioGroupItem value={level.id} id={level.id} className="sr-only" />
                                                                </FormControl>
                                                                <Label
                                                                    htmlFor={level.id}
                                                                    className={cn(
                                                                        "flex flex-col items-center justify-center text-center p-4 border-2 rounded-lg cursor-pointer h-full hover:bg-accent hover:text-accent-foreground",
                                                                        field.value === level.id ? "border-primary bg-primary/5" : "border-muted"
                                                                    )}
                                                                >
                                                                    <span className="font-bold text-lg">{level.label}</span>
                                                                    <p className="text-xs text-muted-foreground mt-1">{level.description}</p>
                                                                </Label>
                                                            </FormItem>
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage className="text-center" />
                                            </FormItem>
                                        )}
                                    />
                                )}
                                
                                {currentStep === 4 && estimatedCost !== null && (
                                    <div className="text-center">
                                        <p className="text-muted-foreground">Estimated Project Cost</p>
                                        <p className="font-headline text-4xl font-bold flex items-center justify-center">
                                            <DollarSign className="h-8 w-8 mr-2 text-primary" />
                                            {estimatedCost.toLocaleString('en-IN', {
                                                style: 'currency',
                                                currency: 'INR',
                                                minimumFractionDigits: 0,
                                                maximumFractionDigits: 0,
                                            })}
                                        </p>
                                        <FormDescription className="mt-2">
                                            This is a preliminary estimate. Actual costs may vary.
                                        </FormDescription>
                                        <Button onClick={() => { setCurrentStep(1); setEstimatedCost(null); form.reset(); }} className="mt-6">
                                            Calculate Again
                                        </Button>
                                    </div>
                                )}
                                
                                {currentStep <= 3 && (
                                    <div className={cn("flex justify-between pt-4", currentStep === 1 && "justify-end")}>
                                        {currentStep > 1 && (
                                            <Button type="button" variant="outline" onClick={handleBack}>Back</Button>
                                        )}
                                        <Button type="button" onClick={handleNext}>
                                            {currentStep === 3 ? "Calculate Estimate" : "Next"}
                                        </Button>
                                    </div>
                                )}
                            </form>
                        </Form>
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
