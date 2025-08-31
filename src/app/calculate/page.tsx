
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Info, Plus, Minus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


const scopeObjectSchema = z.record(z.string(), z.number().min(0).optional());

const calculatorSchema = z.object({
    propertyType: z.string({ required_error: "Please select a property type." }),
    scope: scopeObjectSchema,
    finishLevel: z.enum(["basic", "mid", "high"], { required_error: "Please select a finish level." }),
});

type CalculatorFormValues = z.infer<typeof calculatorSchema>;

const scopeCosts = {
    wardrobe: 1200,
    modular_kitchen: 1800,
    tv_unit: 800,
    crockery_unit: 900,
    study_table: 700,
    pooja_unit: 15000,
    bed_with_storage: 25000,
    side_tables: 3000,
    shoe_rack: 5000,
    bookshelf: 600,
    painting: 35,
    false_ceiling: 90,
    wall_paneling: 150,
    wallpaper: 50,
    curtains: 300,
    flooring: 120,
    sofa_set: 40000,
    dining_table: 20000,
    coffee_table: 5000,
    accent_chairs: 8000,
    decor_lighting: 2000,
    art_decor: 10000,
    electrical_fittings: 500,
    plumbing: 2500,
    loft_storage: 400,
    partition_units: 100,
    glass_work: 450,
    misc_decor: 15000,
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

const scopeOfWork = {
    "Carpentry & Storage": [
        { id: "wardrobe", label: "Wardrobe", unit: "Unit" },
        { id: "modular_kitchen", label: "Modular Kitchen", unit: "Sqft", description: "Base + Wall units" },
        { id: "tv_unit", label: "TV Unit / Entertainment Unit", unit: "Sqft" },
        { id: "crockery_unit", label: "Crockery Unit / Bar Unit", unit: "Sqft" },
        { id: "study_table", label: "Study Table / Workstation", unit: "Sqft" },
        { id: "pooja_unit", label: "Pooja Unit", unit: "Unit" },
        { id: "bed_with_storage", label: "Bed with Storage", unit: "Unit" },
        { id: "side_tables", label: "Side Tables", unit: "Pcs" },
        { id: "shoe_rack", label: "Shoe Rack", unit: "Unit" },
        { id: "bookshelf", label: "Bookshelf / Storage Cabinet", unit: "Sqft" },
    ],
    "Surface & Finishing": [
        { id: "painting", label: "Painting", unit: "Sqft", description: "Emulsion / Texture" },
        { id: "false_ceiling", label: "False Ceiling", unit: "Sqft", description: "Gypsum / POP" },
        { id: "wall_paneling", label: "Wall Paneling", unit: "Sqft", description: "Laminate / Stone Cladding" },
        { id: "wallpaper", label: "Wallpaper", unit: "Sqft" },
        { id: "curtains", label: "Curtains & Blinds", unit: "Sqft / Running feet" },
        { id: "flooring", label: "Flooring", unit: "Sqft", description: "Wooden / Vinyl / Tiles / Marble polish" },
    ],
    "Furniture & Decor": [
        { id: "sofa_set", label: "Sofa Set", unit: "Unit" },
        { id: "dining_table", label: "Dining Table & Chairs", unit: "Unit" },
        { id: "coffee_table", label: "Coffee Table / Center Table", unit: "Pcs" },
        { id: "accent_chairs", label: "Accent Chairs / Lounge Chairs", unit: "Pcs" },
        { id: "decor_lighting", label: "Decor Lighting", unit: "Pcs", description: "Chandelier / Hanging" },
        { id: "art_decor", label: "Art & Wall Decor Items", unit: "Pcs / Lump sum" },
    ],
    "Utility & Miscellaneous": [
        { id: "electrical_fittings", label: "Electrical Fittings", unit: "Point", description: "Switchboards, Lights" },
        { id: "plumbing", label: "Plumbing", unit: "Point", description: "Bathroom / Kitchen related" },
        { id: "loft_storage", label: "Loft Storage / Overhead Cabinets", unit: "Sqft" },
        { id: "partition_units", label: "Partition / Divider Units", unit: "Sqft" },
        { id: "glass_work", label: "Glass Work / Sliding Doors", unit: "Sqft" },
        { id: "misc_decor", label: "Misc. Decor", unit: "Lump sum", description: "Carpets, Accessories, Plants" },
    ]
};


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
            scope: {},
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
        Object.entries(data.scope).forEach(([item, quantity]) => {
            if (quantity && quantity > 0) {
                const itemCost = scopeCosts[item as keyof typeof scopeCosts] || 0;
                baseCost += itemCost * quantity;
            }
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
                                                                        "flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors",
                                                                        field.value === type.id 
                                                                            ? "bg-primary text-primary-foreground border-primary" 
                                                                            : "text-foreground bg-background hover:bg-accent hover:text-accent-foreground"
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
                                    <FormItem>
                                        <FormLabel className="text-lg font-semibold text-center block">What is the scope of work?</FormLabel>
                                        <FormDescription className="text-center">Enter the quantity or area for each item.</FormDescription>
                                        <TooltipProvider>
                                            <div className="space-y-6 pt-4 max-h-[50vh] overflow-y-auto px-2">
                                                {Object.entries(scopeOfWork).map(([category, items]) => (
                                                    <div key={category}>
                                                        <h3 className="font-headline text-lg mb-3 sticky top-0 bg-background py-1">{category}</h3>
                                                        <div className="space-y-4">
                                                            {items.map((item) => (
                                                                <FormField
                                                                    key={item.id}
                                                                    control={form.control}
                                                                    name={`scope.${item.id}`}
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <Card className="p-4">
                                                                                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                                                                    <div className="flex items-center gap-2 w-full sm:w-auto">
                                                                                        <Label htmlFor={`scope-${item.id}`} className="font-semibold text-base">
                                                                                            {item.label}
                                                                                        </Label>
                                                                                        {item.description && (
                                                                                            <Tooltip>
                                                                                                <TooltipTrigger asChild>
                                                                                                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                                                                                                </TooltipTrigger>
                                                                                                <TooltipContent>
                                                                                                    <p>{item.description}</p>
                                                                                                </TooltipContent>
                                                                                            </Tooltip>
                                                                                        )}
                                                                                    </div>
                                                                                    <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
                                                                                        <FormControl>
                                                                                            <div className="flex items-center gap-2">
                                                                                                <Button
                                                                                                    type="button"
                                                                                                    variant="outline"
                                                                                                    size="icon"
                                                                                                    className="h-8 w-8"
                                                                                                    onClick={() => field.onChange(Math.max(0, (field.value || 0) - 1))}
                                                                                                >
                                                                                                    <Minus className="h-4 w-4" />
                                                                                                </Button>
                                                                                                <Input
                                                                                                    id={`scope-${item.id}`}
                                                                                                    type="number"
                                                                                                    placeholder="0"
                                                                                                    className="w-20 text-center"
                                                                                                    {...field}
                                                                                                    onChange={e => field.onChange(e.target.valueAsNumber || 0)}
                                                                                                    value={field.value || 0}
                                                                                                />
                                                                                                <Button
                                                                                                    type="button"
                                                                                                    variant="outline"
                                                                                                    size="icon"
                                                                                                    className="h-8 w-8"
                                                                                                    onClick={() => field.onChange((field.value || 0) + 1)}
                                                                                                >
                                                                                                    <Plus className="h-4 w-4" />
                                                                                                </Button>
                                                                                            </div>
                                                                                        </FormControl>
                                                                                        <span className="text-sm text-muted-foreground w-24 text-left">{item.unit}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <FormMessage className="pt-2"/>
                                                                            </Card>
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </TooltipProvider>
                                         <FormMessage className="text-center">{form.formState.errors.scope?.message}</FormMessage>
                                    </FormItem>
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
                                
                                {currentStep <= 3 && (
                                    <div className={cn("flex pt-4", currentStep === 1 ? "justify-end" : "justify-between")}>
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
                         {currentStep === 4 && estimatedCost !== null && (
                            <div className="text-center">
                                <p className="text-muted-foreground">Estimated Project Cost</p>
                                <p className="font-headline text-4xl font-bold">
                                    {estimatedCost.toLocaleString('en-IN', {
                                        style: 'currency',
                                        currency: 'INR',
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    })}
                                </p>
                                <p className="text-sm text-muted-foreground mt-2">
                                    This is a preliminary estimate. Actual costs may vary.
                                </p>
                                <Button onClick={() => { setCurrentStep(1); setEstimatedCost(null); form.reset(); }} className="mt-6">
                                    Calculate Again
                                </Button>
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

    

    