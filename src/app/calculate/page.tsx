
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type FieldName } from "react-hook-form";
import * as z from "zod";
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Info, Plus, Minus, CheckCircle, MailCheck, Volume2, VolumeX } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LeadForm } from "@/components/LeadForm";


const scopeObjectSchema = z.record(z.string(), z.number().min(0).optional());

const calculatorSchema = z.object({
    propertyType: z.string({ required_error: "Please select a property type." }),
    scope: scopeObjectSchema,
    finishLevel: z.enum(["basic", "mid", "high"], { required_error: "Please select a finish level." }),
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    propertyName: z.string().optional(),
});

const contactSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }),
    propertyName: z.string().min(2, { message: "Property name is required." }),
});


type CalculatorFormValues = z.infer<typeof calculatorSchema>;

const scopeCosts = {
    wardrobe: 34000,
    modular_kitchen: 970,
    tv_unit: 970,
    crockery_unit: 970,
    study_table: 970,
    pooja_unit: 15000,
    bed_with_storage: 28000,
    side_tables: 4000,
    shoe_rack: 8500,
    bookshelf: 970,
    painting: 27,
    false_ceiling: 99,
    wall_paneling: 350,
    wallpaper: 120,
    curtains: 50,
    flooring: 400,
    sofa_set: 15000,
    dining_table: 24000,
    coffee_table: 8000,
    accent_chairs: 8000,
    decor_lighting: 1200,
    art_decor: 12000,
    electrical_fittings: 150,
    plumbing: 150,
    loft_storage: 770,
    partition_units: 670,
    glass_work: 800,
    misc_decor: 8000,
};

const finishLevelMultiplier = {
    basic: 1,
    mid: 1.3,
    high: 1.69,
};

const Icon1RK = () => (
    <svg width="60" height="40" viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2">
        <rect x="5" y="5" width="90" height="90" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="50" y="55" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14" fontWeight="bold">Room</text>
        <rect x="105" y="5" width="40" height="40" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="125" y="30" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14" fontWeight="bold">Kit</text>
        <rect x="105" y="55" width="40" height="40" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="125" y="80" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14" fontWeight="bold">Bath</text>
    </svg>
);

const Icon1BHK = () => (
    <svg width="60" height="40" viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2">
        <rect x="5" y="5" width="80" height="50" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="45" y="35" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">Living</text>
        <rect x="5" y="65" width="80" height="30" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="45" y="85" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">Bed</text>
        <rect x="95" y="5" width="50" height="40" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="120" y="30" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">Kitchen</text>
        <rect x="95" y="55" width="50" height="40" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="120" y="80" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">Bath</text>
    </svg>
);

const Icon2BHK = () => (
    <svg width="60" height="40" viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2">
        <rect x="5" y="5" width="80" height="40" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="45" y="30" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">Living</text>
        <rect x="5" y="55" width="37" height="40" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="23" y="80" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">B1</text>
         <rect x="48" y="55" width="37" height="40" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="66" y="80" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">B2</text>
        <rect x="95" y="5" width="50" height="40" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="120" y="30" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">Kit</text>
        <rect x="95" y="55" width="50" height="40" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="120" y="80" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">Bath</text>
    </svg>
);

const Icon3BHK = () => (
    <svg width="60" height="40" viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2">
        <rect x="5" y="5" width="80" height="30" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="45" y="23" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">Living</text>
        <rect x="5" y="40" width="37" height="25" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="23" y="55" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontWeight="bold">B1</text>
         <rect x="48" y="40" width="37" height="25" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="66" y="55" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontWeight="bold">B2</text>
        <rect x="5" y="70" width="80" height="25" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="45" y="85" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontWeight="bold">B3</text>
        <rect x="95" y="5" width="50" height="40" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="120" y="30" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">Kit</text>
        <rect x="95" y="55" width="50" height="40" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="120" y="80" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">Bath</text>
    </svg>
);

const Icon4BHK = () => (
    <svg width="60" height="40" viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2">
        <rect x="5" y="5" width="80" height="25" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="45" y="20" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">Living</text>
        <rect x="5" y="35" width="37" height="28" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="23" y="52" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontWeight="bold">B1</text>
        <rect x="48" y="35" width="37" height="28" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="66" y="52" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontWeight="bold">B2</text>
        <rect x="5" y="68" width="37" height="28" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="23" y="85" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontWeight="bold">B3</text>
        <rect x="48" y="68" width="37" height="28" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="66" y="85" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10" fontWeight="bold">B4</text>
        <rect x="95" y="5" width="50" height="40" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="120" y="30" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">Kit</text>
        <rect x="95" y="55" width="50" height="40" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="120" y="80" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12" fontWeight="bold">Bath</text>
    </svg>
);
const IconVilla = () => (
    <svg width="60" height="40" viewBox="0 0 150 100" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-2">
         <rect x="5" y="5" width="140" height="90" fill="hsl(var(--muted))" stroke="hsl(var(--foreground))" strokeWidth="2"/>
        <text x="75" y="55" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="14" fontWeight="bold">Villa</text>
    </svg>
);


const propertyTypes = [
    { id: "1rk", label: "1RK", icon: Icon1RK },
    { id: "1bhk", label: "1BHK", icon: Icon1BHK },
    { id: "2bhk", label: "2BHK", icon: Icon2BHK },
    { id: "3bhk", label: "3BHK", icon: Icon3BHK },
    { id: "4bhk", label: "4BHK", icon: Icon4BHK },
    { id: "villa", label: "Villa/Other", icon: IconVilla },
];


const scopeOfWork = {
    "Carpentry & Storage": [
        { id: "wardrobe", label: "Wardrobe", unit: "Unit", type: 'unit' },
        { id: "modular_kitchen", label: "Modular Kitchen", unit: "Sqft", description: "Base + Wall units", type: 'sqft' },
        { id: "tv_unit", label: "TV Unit / Entertainment Unit", unit: "Sqft", type: 'sqft' },
        { id: "crockery_unit", label: "Crockery Unit / Bar Unit", unit: "Sqft", type: 'sqft' },
        { id: "study_table", label: "Study Table / Workstation", unit: "Sqft", type: 'sqft' },
        { id: "pooja_unit", label: "Pooja Unit", unit: "Unit", type: 'lump' },
        { id: "bed_with_storage", label: "Bed with Storage", unit: "Unit", type: 'unit' },
        { id: "side_tables", label: "Side Tables", unit: "Pcs", type: 'unit' },
        { id: "shoe_rack", label: "Shoe Rack", unit: "Unit", type: 'lump' },
        { id: "bookshelf", label: "Bookshelf / Storage Cabinet", unit: "Sqft", type: 'sqft' },
    ],
    "Surface & Finishing": [
        { id: "painting", label: "Painting", unit: "Sqft", description: "Emulsion / Texture", type: 'sqft' },
        { id: "false_ceiling", label: "False Ceiling", unit: "Sqft", description: "Gypsum / POP", type: 'sqft' },
        { id: "wall_paneling", label: "Wall Paneling", unit: "Sqft", description: "Laminate / Stone Cladding", type: 'sqft' },
        { id: "wallpaper", label: "Wallpaper", unit: "Sqft", type: 'sqft' },
        { id: "curtains", label: "Curtains & Blinds", unit: "Sqft / Running feet", type: 'sqft' },
        { id: "flooring", label: "Flooring", unit: "Sqft", description: "Wooden / Vinyl / Tiles / Marble polish", type: 'sqft' },
    ],
    "Furniture & Decor": [
        { id: "sofa_set", label: "Sofa Set", unit: "Unit", type: 'lump' },
        { id: "dining_table", label: "Dining Table & Chairs", unit: "Unit", type: 'lump' },
        { id: "coffee_table", label: "Coffee Table / Center Table", unit: "Pcs", type: 'unit' },
        { id: "accent_chairs", label: "Accent Chairs / Lounge Chairs", unit: "Pcs", type: 'unit' },
        { id: "decor_lighting", label: "Decor Lighting", unit: "Pcs", description: "Chandelier / Hanging", type: 'unit' },
        { id: "art_decor", label: "Art & Wall Decor Items", unit: "Pcs / Lump sum", type: 'lump' },
    ],
    "Utility & Miscellaneous": [
        { id: "electrical_fittings", label: "Electrical Fittings", unit: "Point", description: "Switchboards, Lights", type: 'unit' },
        { id: "plumbing", label: "Plumbing", unit: "Point", description: "Bathroom / Kitchen related", type: 'unit' },
        { id: "loft_storage", label: "Loft Storage / Overhead Cabinets", unit: "Sqft", type: 'sqft' },
        { id: "partition_units", label: "Partition / Divider Units", unit: "Sqft", type: 'sqft' },
        { id: "glass_work", label: "Glass Work / Sliding Doors", unit: "Sqft", type: 'sqft' },
        { id: "misc_decor", label: "Misc. Decor", unit: "Lump sum", description: "Carpets, Accessories, Plants", type: 'lump' },
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

const CircularProgress = ({ progress, children }: { progress: number, children: React.ReactNode }) => {
    const radius = 20;
    const stroke = 4;
    const normalizedRadius = radius - stroke;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center" style={{ width: radius * 2, height: radius * 2 }}>
            <svg
                height={radius * 2}
                width={radius * 2}
                className="transform -rotate-90"
            >
                <circle
                    stroke="hsl(var(--secondary))"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke="hsl(var(--primary))"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="transition-all duration-500 ease-in-out"
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
                {children}
            </div>
        </div>
    );
};

export default function CalculatePage() {
    const [estimatedCost, setEstimatedCost] = useState<number | null>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const { toast } = useToast();
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isMuted, setIsMuted] = useState(false);


    const form = useForm<CalculatorFormValues>({
        resolver: zodResolver(calculatorSchema),
        defaultValues: {
            scope: {},
            name: "",
            email: "",
            phone: "",
            propertyName: ""
        },
    });

    const propertyType = form.watch("propertyType");

    useEffect(() => {
        if (estimatedCost !== null && audioRef.current) {
            const timer = setTimeout(() => {
                if (isMuted) {
                    audioRef.current.pause();
                    audioRef.current.currentTime = 0;
                } else {
                    audioRef.current.play().catch(error => {
                        console.warn("Audio autoplay was prevented.", error);
                        toast({
                            title: "Audio blocked",
                            description: "Your browser prevented audio from playing automatically. Click the unmute button to hear the announcement.",
                        });
                    });
                }
            }, 2000); // 2 seconds delay

            return () => clearTimeout(timer); // Cleanup the timer
        }
    }, [estimatedCost, isMuted, toast]);

    useEffect(() => {
        const resetScope = () => {
             const currentScope = form.getValues('scope');
             const newScope = Object.keys(currentScope).reduce((acc, key) => {
                acc[key] = 0;
                return acc;
            }, {} as Record<string, number | undefined>);
            form.setValue('scope', newScope);
        }

        resetScope();

        if (propertyType === '1rk') {
            form.setValue('scope.wardrobe', 1);
            form.setValue('scope.modular_kitchen', 60);
            form.setValue('scope.bed_with_storage', 1);
            form.setValue('scope.false_ceiling', 120);
            form.setValue('scope.decor_lighting', 2);
        }
        
        if (propertyType === '1bhk') {
            form.setValue('scope.wardrobe', 1);
            form.setValue('scope.modular_kitchen', 60);
            form.setValue('scope.bed_with_storage', 1);
            form.setValue('scope.tv_unit', 25);
            form.setValue('scope.side_tables', 2);
            form.setValue('scope.false_ceiling', 240);
            form.setValue('scope.sofa_set', 1);
            form.setValue('scope.decor_lighting', 4);
        }

        if (propertyType === '2bhk') {
            form.setValue('scope.wardrobe', 2);
            form.setValue('scope.modular_kitchen', 84);
            form.setValue('scope.bed_with_storage', 2);
            form.setValue('scope.tv_unit', 48);
            form.setValue('scope.side_tables', 4);
            form.setValue('scope.false_ceiling', 440);
            form.setValue('scope.sofa_set', 1);
            form.setValue('scope.decor_lighting', 6);
            form.setValue('scope.crockery_unit', 24);
            form.setValue('scope.study_table', 8);
            form.setValue('scope.pooja_unit', 1);
            form.setValue('scope.shoe_rack', 1);
            form.setValue('scope.bookshelf', 12);
            form.setValue('scope.wall_paneling', 120);
        }
        
    }, [propertyType, form]);


    const calculateCost = (data: CalculatorFormValues) => {
        let totalBaseCost = 0;
        
        Object.entries(data.scope).forEach(([itemId, quantity]) => {
            if (quantity && quantity > 0) {
                const itemCost = scopeCosts[itemId as keyof typeof scopeCosts] || 0;
                totalBaseCost += itemCost * quantity;
            }
        });

        const finishMultiplier = finishLevelMultiplier[data.finishLevel];
        const totalCost = totalBaseCost * finishMultiplier;

        setEstimatedCost(totalCost);
        setCurrentStep(4); // Move to result step
    };

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
                 calculateCost(form.getValues());
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };
    
    const progress = Math.round(((currentStep - 1) / STEPS.length) * 100);

    return (
        <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
            <audio ref={audioRef} src="/estimate_voice.mp3" preload="auto" muted={isMuted} />
            <div className="text-center">
                <h1 className="font-headline text-4xl md:text-5xl">Project Cost Calculator</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Get a rough estimate for your interior design project in just a few steps.
                </p>
            </div>
            <div className="mt-12 max-w-4xl mx-auto">
                <Card>
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle className="font-headline text-2xl md:text-3xl">Estimate Your Cost</CardTitle>
                        {currentStep <= STEPS.length && (
                            <CircularProgress progress={progress}>
                                <span className="text-sm font-bold text-primary">{currentStep}</span>
                            </CircularProgress>
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
                                                                        "flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-colors",
                                                                        field.value === type.id 
                                                                            ? "bg-primary/5 border-primary" 
                                                                            : "text-foreground bg-background"
                                                                    )}
                                                                >
                                                                    <type.icon />
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
                                                                                    {item.type === 'lump' ? (
                                                                                        <div className="flex items-center gap-2 justify-end w-full sm:w-auto sm:min-w-[170px]">
                                                                                             <span className="text-sm text-muted-foreground">No</span>
                                                                                             <FormControl>
                                                                                                 <Switch
                                                                                                    checked={!!field.value && field.value > 0}
                                                                                                    onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                                                                                                 />
                                                                                             </FormControl>
                                                                                             <span className="text-sm text-muted-foreground">Yes</span>
                                                                                        </div>
                                                                                    ) : (
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
                                                                                    )}
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
                                                                        "flex flex-col items-center justify-center text-center p-4 border-2 rounded-lg cursor-pointer h-full transition-all",
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
                                            {currentStep < 3 ? 'Next' : 'Calculate Estimate'}
                                        </Button>
                                    </div>
                                )}

                                {currentStep === 4 && estimatedCost !== null && (
                                    <div className="text-center">
                                        <div className="p-6 bg-muted rounded-lg relative">
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
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={toggleMute}
                                                className="absolute top-2 right-2"
                                                aria-label={isMuted ? "Unmute" : "Mute"}
                                            >
                                                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                                            </Button>
                                        </div>
                                        <div className="mt-8 flex justify-center items-center gap-4">
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button>Get Personalized Estimate</Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <LeadForm />
                                                </DialogContent>
                                            </Dialog>

                                            <button 
                                                onClick={() => { setCurrentStep(1); setEstimatedCost(null); form.reset(); }}
                                                className="p-2 rounded-full hover:bg-muted/50 transition-colors"
                                                aria-label="Start Over"
                                            >
                                                <svg fill="currentColor" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-47.73 -47.73 462.60 462.60" xmlSpace="preserve">
                                                    <path d="M185.262,1.694c-34.777,0-68.584,9.851-97.768,28.488C59.1,48.315,36.318,73.884,21.613,104.126l26.979,13.119 c25.661-52.77,78.03-85.551,136.67-85.551c83.743,0,151.874,68.13,151.874,151.874s-68.131,151.874-151.874,151.874 c-49.847,0-96.44-24.9-124.571-65.042l53.219-52.964H0v113.365l39.14-38.953c13.024,17.561,29.147,32.731,47.731,44.706 c29.33,18.898,63.353,28.888,98.391,28.888c100.286,0,181.874-81.588,181.874-181.874S285.548,1.694,185.262,1.694z"></path>
                                                </svg>
                                            </button>
                                        </div>
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
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b">
                            <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="pt-2">
                                <p className="text-base text-muted-foreground">{faq.answer}</p>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
