
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
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { MailCheck, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";

const quoteFormSchema = z.object({
    purpose: z.string({ required_error: "Please select a purpose." }),
    propertyType: z.string({ required_error: "Please select a property type." }),
    scope: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

interface GetQuoteFormProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: React.ReactNode;
}

const purposes = ["For Rent", "For Own Use", "Resale", "Other"];
const propertyTypes = ["1 BHK", "2 BHK", "3 BHK", "4 BHK+", "Villa / Bungalow", "Penthouse"];

const scopeItems = {
    "Core Interior": [
        { id: 'kitchen', label: 'Modular Kitchen', description: 'Cabinets, chimney, hob, sink setup' },
        { id: 'wardrobe', label: 'Wardrobe', description: 'Storage for clothes' },
        { id: 'furniture', label: 'Furniture', description: 'Sofa, bed, dining, chairs, tables' },
        { id: 'storage', label: 'Storage Units', description: 'Crockery unit, shoe rack, bookshelves' },
        { id: 'tv_unit', label: 'TV & Entertainment Unit', description: 'Wall-mounted units, storage cabinets' },
        { id: 'pooja_unit', label: 'Pooja Unit', description: 'Mandir setup' },
    ],
    "Finishes": [
        { id: 'painting', label: 'Painting & Wall Finishes', description: 'Emulsion, texture, wallpaper' },
        { id: 'flooring', label: 'Flooring', description: 'Tiles, wooden flooring, marble, vinyl' },
        { id: 'ceiling', label: 'False Ceiling', description: 'POP, gypsum, wooden ceiling designs' },
        { id: 'wall_paneling', label: 'Wall Paneling & Cladding', description: 'Wooden/stone panels' },
    ],
    "Fittings & Fixtures": [
        { id: 'lighting', label: 'Lighting', description: 'Ceiling lights, chandeliers, spotlights, wall lights' },
        { id: 'electrical', label: 'Electrical & Switchboards', description: 'Modular switches, concealed wiring' },
        { id: 'bathroom', label: 'Bathroom Fittings', description: 'Vanity units, shower partitions, storage' },
        { id: 'doors', label: 'Doors & Windows', description: 'Wooden doors, sliding glass, UPVC windows' },
    ],
    "Decor & Furnishings": [
        { id: 'decor', label: 'Home Décor', description: 'Showpieces, rugs, lamps, wall art' },
        { id: 'furnishings', label: 'Soft Furnishings', description: 'Curtains, blinds, cushions, bedsheets' },
        { id: 'partitions', label: 'Partitions & Panels', description: 'Wooden/Glass partitions, room dividers' },
        { id: 'balcony', label: 'Balcony Setup', description: 'Seating, artificial grass, planters' },
    ]
}


export function GetQuoteForm({ open, onOpenChange, children }: GetQuoteFormProps) {
    const [step, setStep] = useState(1);
    
    const { toast } = useToast();
    const form = useForm<QuoteFormValues>({
        resolver: zodResolver(quoteFormSchema),
        defaultValues: {
            scope: [],
            name: "",
            email: "",
            phone: ""
        },
    });

    const handleNext = async () => {
        let fieldsToValidate: (keyof QuoteFormValues)[] = [];
        switch (step) {
            case 1:
                fieldsToValidate = ['purpose'];
                break;
            case 2:
                fieldsToValidate = ['propertyType'];
                break;
            case 3:
                fieldsToValidate = ['scope'];
                break;
        }

        const isValid = await form.trigger(fieldsToValidate);
        
        if (isValid) {
            setStep(step + 1);
        }
    }
    
    const handleBack = () => {
        if(step > 1 && step < 5) {
            setStep(step - 1);
        }
    }

    async function onSubmit(data: QuoteFormValues) {
        const isValid = await form.trigger(["name", "email", "phone"]);
        if (!isValid) return;
        
        console.log("Quote Request Submitted:", data);
        setStep(5);
    }

    const resetAndClose = () => {
      setStep(1);
      form.reset();
      onOpenChange?.(false);
    }

    const handleOpenChange = (isOpen: boolean) => {
        if (!isOpen) {
          setTimeout(() => {
            setStep(1);
            form.reset();
          }, 500)
        }
        onOpenChange?.(isOpen);
    }
    
    const renderContent = () => {
        switch (step) {
            case 1:
                return (
                     <>
                        <DialogHeader>
                            <DialogTitle>What is the purpose?</DialogTitle>
                            <DialogDescription>Let us know how you plan to use this property.</DialogDescription>
                        </DialogHeader>
                        <FormField
                            control={form.control}
                            name="purpose"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="grid grid-cols-2 gap-4">
                                            {purposes.map(type => (
                                                <div 
                                                    key={type}
                                                    onClick={() => field.onChange(type)}
                                                    className={cn(
                                                        "flex flex-row items-center justify-between p-3 border rounded-md cursor-pointer transition-all text-sm h-full w-full",
                                                        field.value === type ? "border-primary bg-primary/5" : "bg-background hover:bg-muted"
                                                    )}
                                                >
                                                    <Label htmlFor={`purpose-${type}`} className="font-normal cursor-pointer">{type}</Label>
                                                    <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0", field.value === type ? "border-primary bg-primary" : "border-muted-foreground/50")}>
                                                        {field.value === type && <CheckCircle className="h-4 w-4 text-primary-foreground" />}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                     </>
                );
            case 2:
                return (
                     <>
                        <DialogHeader>
                            <DialogTitle>Tell us about your property</DialogTitle>
                            <DialogDescription>This helps us understand the size of your space.</DialogDescription>
                        </DialogHeader>
                        <FormField
                            control={form.control}
                            name="propertyType"
                             render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                         <div className="grid grid-cols-2 gap-4">
                                            {propertyTypes.map(type => (
                                                 <div 
                                                    key={type}
                                                    onClick={() => field.onChange(type)}
                                                    className={cn(
                                                        "flex flex-row items-center justify-between p-3 border rounded-md cursor-pointer transition-all text-sm h-full w-full",
                                                        field.value === type ? "border-primary bg-primary/5" : "bg-background hover:bg-muted"
                                                    )}
                                                >
                                                    <Label htmlFor={`property-${type}`} className="font-normal cursor-pointer">{type}</Label>
                                                    <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0", field.value === type ? "border-primary bg-primary" : "border-muted-foreground/50")}>
                                                        {field.value === type && <CheckCircle className="h-4 w-4 text-primary-foreground" />}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                     </>
                );
            case 3:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>What do you need?</DialogTitle>
                            <DialogDescription>Select all that apply. This helps us tailor your quote.</DialogDescription>
                        </DialogHeader>
                        <FormField
                            control={form.control}
                            name="scope"
                            render={() => (
                                <FormItem>
                                    <div className="max-h-72 overflow-y-auto p-1 space-y-4">
                                        {Object.entries(scopeItems).map(([category, items]) => (
                                            <div key={category}>
                                                <p className="font-semibold mb-2 text-sm">{category}</p>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                    {items.map((item) => (
                                                        <FormField
                                                            key={item.id}
                                                            control={form.control}
                                                            name="scope"
                                                            render={({ field }) => {
                                                                return (
                                                                <FormItem
                                                                    key={item.id}
                                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                                >
                                                                    <FormControl>
                                                                    <div
                                                                        className={cn(
                                                                            "flex flex-col p-3 border rounded-md cursor-pointer transition-all text-sm h-full w-full",
                                                                            field.value?.includes(item.id) ? "border-primary bg-primary/5" : "bg-background hover:bg-muted"
                                                                        )}
                                                                        onClick={() => {
                                                                            const newScope = field.value?.includes(item.id)
                                                                                ? field.value?.filter(value => value !== item.id)
                                                                                : [...(field.value ?? []), item.id];
                                                                            field.onChange(newScope);
                                                                        }}
                                                                    >
                                                                        <div className="flex items-start justify-between gap-2">
                                                                            <Label htmlFor={item.id} className="font-medium cursor-pointer">{item.label}</Label>
                                                                            <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5", field.value?.includes(item.id) ? "border-primary bg-primary" : "border-muted-foreground/50")}>
                                                                                {field.value?.includes(item.id) && <CheckCircle className="h-4 w-4 text-primary-foreground" />}
                                                                            </div>
                                                                        </div>
                                                                         <p className="text-xs text-muted-foreground mt-1 cursor-pointer">{item.description}</p>
                                                                    </div>
                                                                    </FormControl>
                                                                </FormItem>
                                                                )
                                                            }}
                                                            />
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </>
                );
            case 4:
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle>Almost there!</DialogTitle>
                            <DialogDescription>Please provide your contact information.</DialogDescription>
                        </DialogHeader>
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormItem><FormControl><Input placeholder="Full Name" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="email" render={({ field }) => (
                            <FormItem><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                        <FormField control={form.control} name="phone" render={({ field }) => (
                            <FormItem><FormControl><Input type="tel" placeholder="10-digit mobile number" {...field} /></FormControl><FormMessage /></FormItem>
                        )}/>
                    </>
                );
            case 5:
                return (
                   <div className="flex flex-col items-center justify-center text-center p-8">
                       <MailCheck className="h-16 w-16 text-green-500 mb-4" />
                       <DialogTitle className="font-headline text-2xl">Thank You!</DialogTitle>
                       <DialogDescription className="mt-2">
                           Your quote request has been sent successfully. Our team will get back to you shortly.
                       </DialogDescription>
                       <Button onClick={resetAndClose} className="mt-6">Close</Button>
                   </div>
                )
            default:
                return null;
        }
    }

    const renderFooter = () => {
        if (step < 4) {
            return (
                <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handleBack} disabled={step === 1}>Back</Button>
                    <Button type="button" onClick={handleNext}>Next</Button>
                </div>
            )
        }
        if (step === 4) {
            return (
                 <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={handleBack}>Back</Button>
                    <Button type="button" onClick={form.handleSubmit(onSubmit)}>Submit Request</Button>
                </div>
            )
        }
        return null;
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {children ? children : <Button>Get a Quote</Button>}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[480px] md:sm:max-w-[600px]">
                {step < 5 && (
                  <Form {...form}>
                      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                          {renderContent()}
                          <div className="mt-6">
                              {renderFooter()}
                          </div>
                      </form>
                  </Form>
                )}
                {step === 5 && renderContent()}
            </DialogContent>
        </Dialog>
    );
}
