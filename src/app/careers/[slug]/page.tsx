
'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, MapPin, Briefcase, Calendar as CalendarIcon, ArrowLeft } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { jobs } from '../jobs';
import { notFound, useRouter } from 'next/navigation';

const applicationSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  email: z.string().email("A valid email is required."),
  phone: z.string().min(10, "A valid 10-digit phone number is required."),
  dob: z.date().optional(),
  gender: z.string().optional(),
  
  jobTitle: z.string(),
  preferredLocation: z.string().optional(),
  expectedSalary: z.string().optional(),
  availableFrom: z.date().optional(),
  
  highestQualification: z.string().min(1, "Highest qualification is required."),
  specialization: z.string().optional(),
  keySkills: z.string().optional(),
  
  totalExperience: z.string().min(1, "Work experience is required."),
  lastCompany: z.string().optional(),
  lastJobTitle: z.string().optional(),
  noticePeriod: z.string().optional(),

  resume: z.any().refine(files => files?.length == 1, "Resume is required."),
  portfolio: z.any().optional(),
  photo: z.any().optional(),

  whyHire: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal('')),
  reference: z.string().optional(),

  declaration: z.boolean().refine(val => val === true, {
    message: "You must agree to the declaration."
  }),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;


export default function JobDetailPage({ params }: { params: { slug: string } }) {
    const router = useRouter();
    const job = jobs.find(j => String(j.id) === params.slug);
    
    const { toast } = useToast();

    const form = useForm<ApplicationFormValues>({
        resolver: zodResolver(applicationSchema),
        defaultValues: {
            jobTitle: job?.title,
            declaration: false,
        }
    });

    if (!job) {
        notFound();
    }
    
    const onSubmit: SubmitHandler<ApplicationFormValues> = (data) => {
        console.log("Form Submitted", data);
        toast({
            title: "Application Sent!",
            description: "Thank you for your interest. We will contact shortlisted candidates.",
        });
        form.reset();
        router.push('/careers');
    };

    return (
        <div className="container mx-auto py-16 px-4 md:px-6">
            <div className="mb-8">
                <Button variant="outline" onClick={() => router.back()}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to all openings
                </Button>
            </div>
            
            <header className="mb-12">
                <h1 className="font-headline text-3xl md:text-4xl">{job.title}</h1>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-muted-foreground pt-2 mt-2">
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {job.location}</div>
                    <div className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> {job.type}</div>
                    <div className="flex items-center gap-2"><CalendarIcon className="h-4 w-4" /> Posted: {job.posted}</div>
                </div>
            </header>
            
            <div className="grid lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                    {job.images[0] && (
                        <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                            <Image src={job.images[0]} alt={`${job.title} main image`} layout="fill" objectFit="cover" data-ai-hint={job.aiHint}/>
                        </div>
                    )}
                    <div>
                        <h2 className="font-headline text-2xl mb-3">Job Description</h2>
                        <p className="text-muted-foreground leading-relaxed">{job.desc}</p>
                    </div>
                     {job.images.length > 1 && (
                        <div className="grid grid-cols-2 gap-4">
                            {job.images[1] && (
                                <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                                     <Image src={job.images[1]} alt={`${job.title} gallery 1`} layout="fill" objectFit="cover" data-ai-hint={job.aiHint}/>
                                </div>
                            )}
                             {job.images[2] && (
                                <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                                     <Image src={job.images[2]} alt={`${job.title} gallery 2`} layout="fill" objectFit="cover" data-ai-hint={job.aiHint}/>
                                </div>
                            )}
                        </div>
                    )}
                     <div>
                        <h2 className="font-headline text-2xl mb-3">Responsibilities</h2>
                        <ul className="list-disc list-inside text-muted-foreground space-y-2">
                           {job.responsibilities.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h2 className="font-headline text-2xl mb-3">Key Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                   <div className="sticky top-24 bg-muted/50 p-6 rounded-lg">
                       <h3 className="font-headline text-xl mb-4">Apply for this role</h3>
                       <Form {...form}>
                           <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <p className="font-semibold text-sm">1. Personal Details</p>
                                <FormField control={form.control} name="fullName" render={({ field }) => (
                                   <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="email" render={({ field }) => (
                                   <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="phone" render={({ field }) => (
                                    <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="dob" render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Date of Birth (Optional)</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="gender" render={({ field }) => (
                                   <FormItem><FormLabel>Gender (Optional)</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="male">Male</SelectItem>
                                            <SelectItem value="female">Female</SelectItem>
                                            <SelectItem value="other">Other</SelectItem>
                                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                                        </SelectContent>
                                    </Select>
                                   <FormMessage /></FormItem>
                                )}/>

                                <p className="font-semibold pt-4 text-sm">2. Position Details</p>
                                <FormField control={form.control} name="jobTitle" render={({ field }) => (
                                   <FormItem><FormLabel>Applying For</FormLabel><FormControl><Input {...field} disabled /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="preferredLocation" render={({ field }) => (
                                   <FormItem><FormLabel>Preferred Location</FormLabel><FormControl><Input {...field} placeholder="e.g. Chennai, Remote"/></FormControl><FormMessage /></FormItem>
                                )}/>
                                 <FormField control={form.control} name="expectedSalary" render={({ field }) => (
                                   <FormItem><FormLabel>Expected Salary (Annual)</FormLabel><FormControl><Input {...field} placeholder="e.g. 5,00,000" /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="availableFrom" render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                        <FormLabel>Available From</FormLabel>
                                         <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0" align="start">
                                                <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}/>

                                 <p className="font-semibold pt-4 text-sm">3. Education & Skills</p>
                                 <FormField control={form.control} name="highestQualification" render={({ field }) => (
                                   <FormItem><FormLabel>Highest Qualification</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Select Qualification" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="post-graduate">Post Graduate</SelectItem>
                                            <SelectItem value="graduate">Graduate</SelectItem>
                                            <SelectItem value="diploma">Diploma</SelectItem>
                                            <SelectItem value="12th">12th</SelectItem>
                                            <SelectItem value="10th">10th</SelectItem>
                                        </SelectContent>
                                    </Select>
                                   <FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="specialization" render={({ field }) => (
                                   <FormItem><FormLabel>Specialization / Stream</FormLabel><FormControl><Input {...field} placeholder="e.g. B.Tech in Civil" /></FormControl><FormMessage /></FormItem>
                                )}/>
                                 <FormField control={form.control} name="keySkills" render={({ field }) => (
                                   <FormItem><FormLabel>Key Skills</FormLabel><FormControl><Input {...field} placeholder="e.g. AutoCAD, Sales, Project Management" /></FormControl><FormMessage /></FormItem>
                                )}/>

                                <p className="font-semibold pt-4 text-sm">4. Experience Details</p>
                                <FormField control={form.control} name="totalExperience" render={({ field }) => (
                                   <FormItem><FormLabel>Total Work Experience</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Select Experience Level" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="fresher">Fresher</SelectItem>
                                            <SelectItem value="0-1">0-1 year</SelectItem>
                                            <SelectItem value="1-3">1-3 years</SelectItem>
                                            <SelectItem value="3-5">3-5 years</SelectItem>
                                            <SelectItem value="5+">5+ years</SelectItem>
                                        </SelectContent>
                                    </Select>
                                   <FormMessage /></FormItem>
                                )}/>
                                 <FormField control={form.control} name="lastCompany" render={({ field }) => (
                                   <FormItem><FormLabel>Last Company Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                 <FormField control={form.control} name="lastJobTitle" render={({ field }) => (
                                   <FormItem><FormLabel>Last Job Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="noticePeriod" render={({ field }) => (
                                   <FormItem><FormLabel>Notice Period</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Select Notice Period" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="immediate">Immediate</SelectItem>
                                            <SelectItem value="15-days">15 Days</SelectItem>
                                            <SelectItem value="1-month">1 Month</SelectItem>
                                            <SelectItem value="2-months">2 Months</SelectItem>
                                            <SelectItem value="3-months">3+ Months</SelectItem>
                                        </SelectContent>
                                    </Select>
                                   <FormMessage /></FormItem>
                                )}/>

                                <p className="font-semibold pt-4 text-sm">5. Document Upload</p>
                                <FormField control={form.control} name="resume" render={({ field: { value, onChange, ...fieldProps} }) => (
                                   <FormItem>
                                       <FormLabel>Upload Resume</FormLabel>
                                       <FormControl><Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => onChange(e.target.files)} {...fieldProps} /></FormControl>
                                       <FormMessage />
                                   </FormItem>
                               )}/>
                               <FormField control={form.control} name="portfolio" render={({ field: { value, onChange, ...fieldProps} }) => (
                                   <FormItem>
                                       <FormLabel>Upload Portfolio (Optional)</FormLabel>
                                       <FormControl><Input type="file" accept="image/*,.pdf" onChange={(e) => onChange(e.target.files)} {...fieldProps} /></FormControl>
                                       <FormMessage />
                                   </FormItem>
                               )}/>
                                <FormField control={form.control} name="photo" render={({ field: { value, onChange, ...fieldProps} }) => (
                                   <FormItem>
                                       <FormLabel>Upload Passport Size Photo (Optional)</FormLabel>
                                       <FormControl><Input type="file" accept="image/jpeg,image/png" onChange={(e) => onChange(e.target.files)} {...fieldProps} /></FormControl>
                                       <FormMessage />
                                   </FormItem>
                               )}/>

                               <p className="font-semibold pt-4 text-sm">6. Additional Information</p>
                               <FormField control={form.control} name="whyHire" render={({ field }) => (
                                   <FormItem>
                                       <FormLabel>Why should we hire you? (Optional)</FormLabel>
                                       <FormControl><Textarea rows={3} placeholder="Tell us about your strengths" {...field} /></FormControl>
                                       <FormMessage />
                                   </FormItem>
                               )}/>
                               <FormField control={form.control} name="linkedin" render={({ field }) => (
                                   <FormItem><FormLabel>LinkedIn Profile (Optional)</FormLabel><FormControl><Input {...field} placeholder="https://linkedin.com/in/..."/></FormControl><FormMessage /></FormItem>
                               )}/>
                               <FormField control={form.control} name="reference" render={({ field }) => (
                                   <FormItem><FormLabel>Any Reference? (Optional)</FormLabel><FormControl><Input {...field} placeholder="Reference name and contact" /></FormControl><FormMessage /></FormItem>
                               )}/>


                               <p className="font-semibold pt-4 text-sm">7. Final Step</p>
                                <FormField
                                    control={form.control}
                                    name="declaration"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 bg-background">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>
                                            I hereby declare that the above information is true to the best of my knowledge.
                                            </FormLabel>
                                            <FormMessage />
                                        </div>
                                        </FormItem>
                                    )}
                                />

                               <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? 'Submitting...' : 'Submit Application'}
                               </Button>
                           </form>
                       </Form>
                   </div>
                </div>
            </div>
        </div>
    );
}
