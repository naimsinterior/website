
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { MessageSquarePlus, Star } from 'lucide-react';
import { cn } from "@/lib/utils";

const feedbackFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "A valid email is required." }),
  projectName: z.string().min(2, { message: "Project name or address is required." }),
  
  whyChoose: z.string().optional(),
  designProcessSatisfaction: z.number().min(1).max(5).optional(),
  needsUnderstanding: z.enum(["yes", "no", "somewhat"]).optional(),
  finalDesignRating: z.number().min(1).max(5).optional(),
  onTimeHandover: z.enum(["yes", "no", "delayed"]).optional(),
  qualityRating: z.number().min(1).max(5).optional(),
  communicationSatisfaction: z.number().min(1).max(5).optional(),
  valueForMoney: z.enum(["yes", "no", "neutral"]).optional(),
  improvementSuggestion: z.string().optional(),
  wouldRecommend: z.enum(["yes", "no", "maybe"]).optional(),
  howHeard: z.string().optional(),
  designerComfort: z.enum(["yes", "no", "neutral"]).optional(),
  designFlexibility: z.enum(["yes", "no", "somewhat"]).optional(),
  challengesFaced: z.string().optional(),
  experienceInOneWord: z.string().optional(),
  favoritePart: z.string().optional(),
  workWithUsAgain: z.enum(["yes", "no", "maybe"]).optional(),
  referralLikelihood: z.number().min(1).max(10).optional(),
  fairPricing: z.enum(["yes", "no", "neutral"]).optional(),
  additionalComments: z.string().optional(),
});

type FeedbackFormValues = z.infer<typeof feedbackFormSchema>;

const ratingLabels: { [key: number]: string } = {
  1: "Very Dissatisfied",
  2: "Dissatisfied",
  3: "Neutral",
  4: "Satisfied",
  5: "Very Satisfied"
};

const qualityLabels: { [key: number]: string } = {
  1: "Poor",
  2: "Fair",
  3: "Good",
  4: "Very Good",
  5: "Excellent"
};

export default function FeedbackPage() {
    const { toast } = useToast();
    const form = useForm<FeedbackFormValues>({
        resolver: zodResolver(feedbackFormSchema),
        defaultValues: {
            name: "",
            email: "",
            projectName: "",
        },
    });

    function onSubmit(data: FeedbackFormValues) {
        console.log(data);
        toast({
            title: "Feedback Submitted!",
            description: `Thank you for taking the time to share your thoughts, ${data.name}. We appreciate it!`,
        });
        form.reset();
    }

    return (
        <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
            <div className="text-center">
                <MessageSquarePlus className="mx-auto h-12 w-12 text-primary" />
                <h1 className="mt-4 font-headline text-4xl md:text-5xl">Share Your Experience</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    Your feedback is invaluable to us. It helps us improve our services and continue to create spaces our clients love.
                </p>
            </div>
            <div className="mt-12 max-w-3xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Client Satisfaction Survey</CardTitle>
                        <CardDescription>Please take a few moments to answer the following questions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <div className="space-y-4 p-4 border rounded-lg">
                                  <h3 className="font-semibold">Your Information</h3>
                                  <FormField control={form.control} name="name" render={({ field }) => (
                                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="Enter your full name" {...field} /></FormControl><FormMessage /></FormItem>
                                  )}/>
                                  <FormField control={form.control} name="email" render={({ field }) => (
                                      <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                                  )}/>
                                  <FormField control={form.control} name="projectName" render={({ field }) => (
                                      <FormItem><FormLabel>Project Name / Address</FormLabel><FormControl><Input placeholder="e.g., Greenview Residence, Flat 501" {...field} /></FormControl><FormMessage /></FormItem>
                                  )}/>
                                </div>
                                
                                <div className="space-y-6">
                                    <FormField control={form.control} name="whyChoose" render={({ field }) => (
                                        <FormItem><FormLabel>Why did you choose NAIMS INTERIOR?</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    
                                    <FormField control={form.control} name="designProcessSatisfaction" render={({ field }) => (
                                      <FormItem><FormLabel>How satisfied are you with our design process (1 to 5)?</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center gap-4">
                                                <Slider defaultValue={[3]} min={1} max={5} step={1} onValueChange={(val) => field.onChange(val[0])}/>
                                                <span className="w-32 text-center text-sm text-muted-foreground">{ratingLabels[field.value || 3]}</span>
                                            </div>
                                        </FormControl>
                                      </FormItem>
                                    )}/>

                                    <FormField control={form.control} name="needsUnderstanding" render={({ field }) => (
                                        <FormItem><FormLabel>Did our team understand your needs and preferences well?</FormLabel><FormControl>
                                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4"><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="no" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="somewhat" /></FormControl><FormLabel className="font-normal">Somewhat</FormLabel></FormItem></RadioGroup>
                                        </FormControl><FormMessage /></FormItem>
                                    )}/>

                                    <FormField control={form.control} name="finalDesignRating" render={({ field }) => (
                                        <FormItem><FormLabel>How practical and beautiful do you find the final design?</FormLabel>
                                            <FormControl>
                                              <div className="flex items-center gap-4">
                                                  <Slider defaultValue={[3]} min={1} max={5} step={1} onValueChange={(val) => field.onChange(val[0])}/>
                                                  <span className="w-32 text-center text-sm text-muted-foreground">{qualityLabels[field.value || 3]}</span>
                                              </div>
                                            </FormControl>
                                        </FormItem>
                                    )}/>

                                    <FormField control={form.control} name="onTimeHandover" render={({ field }) => (
                                      <FormItem><FormLabel>Was the project handed over on time?</FormLabel><FormControl>
                                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4"><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="no" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="delayed" /></FormControl><FormLabel className="font-normal">Slightly Delayed</FormLabel></FormItem></RadioGroup>
                                      </FormControl><FormMessage /></FormItem>
                                    )}/>

                                    <FormField control={form.control} name="qualityRating" render={({ field }) => (
                                        <FormItem><FormLabel>How do you rate the quality of materials and finishing?</FormLabel>
                                            <FormControl>
                                              <div className="flex items-center gap-4">
                                                  <Slider defaultValue={[3]} min={1} max={5} step={1} onValueChange={(val) => field.onChange(val[0])}/>
                                                  <span className="w-32 text-center text-sm text-muted-foreground">{qualityLabels[field.value || 3]}</span>
                                              </div>
                                            </FormControl>
                                        </FormItem>
                                    )}/>

                                    <FormField control={form.control} name="communicationSatisfaction" render={({ field }) => (
                                        <FormItem><FormLabel>How satisfied are you with our communication and updates?</FormLabel>
                                            <FormControl>
                                              <div className="flex items-center gap-4">
                                                  <Slider defaultValue={[3]} min={1} max={5} step={1} onValueChange={(val) => field.onChange(val[0])}/>
                                                  <span className="w-32 text-center text-sm text-muted-foreground">{ratingLabels[field.value || 3]}</span>
                                              </div>
                                            </FormControl>
                                        </FormItem>
                                    )}/>
                                    
                                    <FormField control={form.control} name="valueForMoney" render={({ field }) => (
                                        <FormItem><FormLabel>Do you feel our service provided good value for your budget?</FormLabel><FormControl>
                                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4"><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="no" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="neutral" /></FormControl><FormLabel className="font-normal">It was fair</FormLabel></FormItem></RadioGroup>
                                        </FormControl><FormMessage /></FormItem>
                                    )}/>

                                    <FormField control={form.control} name="improvementSuggestion" render={({ field }) => (
                                        <FormItem><FormLabel>If there is one thing we can improve, what would it be?</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>

                                    <FormField control={form.control} name="wouldRecommend" render={({ field }) => (
                                      <FormItem><FormLabel>Would you recommend NAIMS INTERIOR to your friends and family?</FormLabel><FormControl>
                                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4"><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="no" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="maybe" /></FormControl><FormLabel className="font-normal">Maybe</FormLabel></FormItem></RadioGroup>
                                      </FormControl><FormMessage /></FormItem>
                                    )}/>

                                    <FormField control={form.control} name="howHeard" render={({ field }) => (
                                      <FormItem><FormLabel>How did you first hear about NAIMS INTERIOR?</FormLabel><FormControl>
                                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                                              <SelectTrigger><SelectValue placeholder="Select an option" /></SelectTrigger>
                                              <SelectContent><SelectItem value="social-media">Social Media</SelectItem><SelectItem value="referral">Referral</SelectItem><SelectItem value="website">Website/Google</SelectItem><SelectItem value="builder">Builder/Architect</SelectItem><SelectItem value="advertisement">Advertisement</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent>
                                          </Select>
                                      </FormControl><FormMessage /></FormItem>
                                    )}/>

                                    <FormField control={form.control} name="designerComfort" render={({ field }) => (
                                      <FormItem><FormLabel>Did you feel comfortable and confident during discussions with our designers?</FormLabel><FormControl>
                                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4"><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="no" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="neutral" /></FormControl><FormLabel className="font-normal">Neutral</FormLabel></FormItem></RadioGroup>
                                      </FormControl><FormMessage /></FormItem>
                                    )}/>
                                    
                                    <FormField control={form.control} name="designFlexibility" render={({ field }) => (
                                      <FormItem><FormLabel>Were the design options flexible and aligned with your lifestyle?</FormLabel><FormControl>
                                          <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4"><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="no" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="somewhat" /></FormControl><FormLabel className="font-normal">Somewhat</FormLabel></FormItem></RadioGroup>
                                      </FormControl><FormMessage /></FormItem>
                                    )}/>

                                    <FormField control={form.control} name="challengesFaced" render={({ field }) => (
                                        <FormItem><FormLabel>Did you face any challenges during the project? If yes, please specify.</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>

                                    <FormField control={form.control} name="experienceInOneWord" render={({ field }) => (
                                        <FormItem><FormLabel>How would you describe your overall experience in one word?</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>

                                    <FormField control={form.control} name="favoritePart" render={({ field }) => (
                                        <FormItem><FormLabel>What was your favorite part of the design journey with us?</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                    
                                    <FormField control={form.control} name="workWithUsAgain" render={({ field }) => (
                                      <FormItem><FormLabel>Would you consider working with NAIMS INTERIOR again for future projects?</FormLabel><FormControl>
                                          <RadioGroup onValuechange={field.onChange} defaultValue={field.value} className="flex gap-4"><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="no" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="maybe" /></FormControl><FormLabel className="font-normal">Maybe</FormLabel></FormItem></RadioGroup>
                                      </FormControl><FormMessage /></FormItem>
                                    )}/>

                                    <FormField control={form.control} name="referralLikelihood" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>On a scale of 1 to 10, how likely are you to refer us to others?</FormLabel>
                                            <FormControl>
                                                <div className="flex items-center gap-4">
                                                    <Slider defaultValue={[7]} min={1} max={10} step={1} onValueChange={(val) => field.onChange(val[0])} />
                                                    <span className="w-20 text-center text-lg font-bold text-primary">{field.value || 7}</span>
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}/>

                                    <FormField control={form.control} name="fairPricing" render={({ field }) => (
                                        <FormItem><FormLabel>Do you think our pricing is fair compared to the quality delivered?</FormLabel><FormControl>
                                            <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4"><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="yes" /></FormControl><FormLabel className="font-normal">Yes</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="no" /></FormControl><FormLabel className="font-normal">No</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="neutral" /></FormControl><FormLabel className="font-normal">It's reasonable</FormLabel></FormItem></RadioGroup>
                                        </FormControl><FormMessage /></FormItem>
                                    )}/>

                                    <FormField control={form.control} name="additionalComments" render={({ field }) => (
                                        <FormItem><FormLabel>Any additional comments or suggestions you’d like to share?</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl><FormMessage /></FormItem>
                                    )}/>
                                </div>
                                
                                <Button type="submit" className="w-full">Submit Feedback</Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
    