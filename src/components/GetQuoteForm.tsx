
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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Checkbox } from "./ui/checkbox";
import { MailCheck } from "lucide-react";

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
const scopeItems = [
    { id: 'wardrobe', label: 'Wardrobe' },
    { id: 'kitchen', label: 'Modular Kitchen' },
    { id: 'painting', label: 'Painting' },
    { id: 'ceiling', label: 'False Ceiling' },
    { id: 'furniture', label: 'Furniture' },
    { id: 'decor', label: 'Home Decor' },
]

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
        let isValid = false;
        if (step === 1) {
            isValid = await form.trigger("purpose");
        } else if (step === 2) {
            isValid = await form.trigger("propertyType");
        } else if (step === 3) {
            isValid = await form.trigger("scope");
        }
        
        if (isValid) {
            setStep(step + 1);
        }
    }
    
    const handleBack = () => {
        if(step > 1 && step < 5) {
            setStep(step - 1);
        }
    }

    function onSubmit(data: QuoteFormValues) {
        console.log("Quote Request Submitted:", data);
        setStep(5); // Go to success step
        toast({
            title: "Quote Request Sent!",
            description: `Thank you, ${data.name}. We'll be in touch shortly.`,
        });
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
                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-4">
                                            {purposes.map(type => (
                                                <FormItem key={type}>
                                                    <FormControl>
                                                        <RadioGroupItem value={type} id={type} className="sr-only peer" />
                                                    </FormControl>
                                                    <label htmlFor={type} className="flex text-xs items-center justify-center rounded-md border-2 border-muted bg-popover p-4 font-normal hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-accent peer-data-[state=checked]:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer">
                                                        {type}
                                                    </label>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
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
                                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-4">
                                            {propertyTypes.map(type => (
                                                <FormItem key={type} className="flex-1">
                                                    <FormControl>
                                                        <RadioGroupItem value={type} id={type} className="sr-only peer" />
                                                    </FormControl>
                                                    <label htmlFor={type} className="flex text-xs items-center justify-center rounded-md border-2 border-muted bg-popover p-4 font-normal hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-accent peer-data-[state=checked]:text-accent-foreground [&:has([data-state=checked])]:border-primary cursor-pointer text-center h-full">
                                                        {type}
                                                    </label>
                                                </FormItem>
                                            ))}
                                        </RadioGroup>
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
                              <div className="grid grid-cols-2 gap-4">
                                {scopeItems.map((item) => (
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
                                            <Checkbox
                                              checked={field.value?.includes(item.id)}
                                              onCheckedChange={(checked) => {
                                                const updatedValue = checked
                                                  ? [...(field.value || []), item.id]
                                                  : field.value?.filter(
                                                      (value) => value !== item.id
                                                    );
                                                field.onChange(updatedValue);
                                              }}
                                            />
                                          </FormControl>
                                          <label className="font-normal text-sm">
                                            {item.label}
                                          </label>
                                        </FormItem>
                                      )
                                    }}
                                  />
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
                            <FormItem><FormControl><Input placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
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
                    <Button type="submit">Submit Request</Button>
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
            <DialogContent className="sm:max-w-[480px]">
                {step < 5 && (
                  <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
