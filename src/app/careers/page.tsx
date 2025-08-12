
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Image from 'next/image';
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const applicationFormSchema = z.object({
  // Personal Details
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  dob: z.date().optional(),
  gender: z.string().optional(),
  
  // Position Details
  applyingFor: z.string({ required_error: "Please select a position." }),
  preferredLocation: z.string().optional(),
  expectedSalary: z.string().min(1, { message: "Please provide an expected salary."}),
  availableFrom: z.date({ required_error: "Please select your availability date."}),

  // Education & Skills
  highestQualification: z.string({ required_error: "Please select your highest qualification."}),
  specialization: z.string().min(2, { message: "Specialization is required."}),
  keySkills: z.string().min(3, { message: "Please list at least one skill."}),

  // Experience Details
  workExperience: z.string({ required_error: "Please select your work experience."}),
  lastCompany: z.string().optional(),
  lastJobTitle: z.string().optional(),
  noticePeriod: z.string().optional(),

  // Document Upload
  resume: z.any().refine(files => files?.length === 1, 'Resume is required.'),
  portfolio: z.any().optional(),
  photo: z.any().refine(files => files?.length === 1, 'Photo is required.'),

  // Additional Information
  whyHire: z.string().min(20, { message: "This field requires at least 20 characters."}),
  linkedin: z.string().url().optional().or(z.literal('')),
  reference: z.string().optional(),

  // Consent
  declaration: z.boolean().refine(value => value === true, { message: "You must agree to the declaration." }),
});

type ApplicationFormValues = z.infer<typeof applicationFormSchema>;

const jobOpenings = [
    { title: "Senior Interior Designer", location: "New York, NY" },
    { title: "Project Manager", location: "Remote" },
    { title: "Junior Designer", location: "New York, NY" },
];

export default function CareersPage() {
    const { toast } = useToast();
    const form = useForm<ApplicationFormValues>({
        resolver: zodResolver(applicationFormSchema),
        defaultValues: {
            fullName: "",
            email: "",
            applyingFor: jobOpenings[0].title,
            declaration: false,
        },
    });

    function onSubmit(data: ApplicationFormValues) {
        toast({
            title: "Application Submitted!",
            description: `Thank you for applying for the ${data.applyingFor} role. We will be in touch shortly.`,
        });
        console.log(data);
        form.reset();
    }

    return (
        <>
            {/* Hero Section */}
            <section className="relative h-[50vh] w-full bg-muted">
                 <Image
                    src="https://placehold.co/1600x600.png"
                    alt="A modern and collaborative office space"
                    fill
                    className="z-0 object-cover"
                    data-ai-hint="modern office"
                />
                 <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black/50 text-center text-white">
                    <h1 className="font-headline text-4xl md:text-6xl">Join Our Team</h1>
                    <p className="mt-4 max-w-2xl text-lg md:text-xl">
                        Help us craft beautiful spaces and shape the future of design.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                    <div>
                        <h2 className="font-headline text-3xl md:text-4xl">Open Positions</h2>
                        <div className="mt-8 space-y-6">
                            {jobOpenings.map((job) => (
                                <Card key={job.title}>
                                    <CardHeader>
                                        <CardTitle className="font-headline">{job.title}</CardTitle>
                                        <CardDescription>{job.location}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">We're looking for a passionate individual to join our growing team. If you have a keen eye for detail and a love for design, we'd love to hear from you.</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h2 className="font-headline text-3xl md:text-4xl">Apply Now</h2>
                        <Card className="mt-8">
                            <CardContent className="p-6">
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                        
                                        {/* Personal Details */}
                                        <div className="space-y-4">
                                            <h3 className="font-headline text-xl">Personal Details</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField control={form.control} name="fullName" render={({ field }) => (
                                                    <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
                                                )} />
                                                <FormField control={form.control} name="email" render={({ field }) => (
                                                    <FormItem><FormLabel>Email Address</FormLabel><FormControl><Input placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                                                )} />
                                                <FormField control={form.control} name="phone" render={({ field }) => (
                                                    <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input placeholder="+91 1234567890" {...field} /></FormControl><FormMessage /></FormItem>
                                                )} />
                                                <FormField control={form.control} name="dob" render={({ field }) => (
                                                     <FormItem className="flex flex-col"><FormLabel>Date of Birth (Optional)</FormLabel><Popover><PopoverTrigger asChild>
                                                        <FormControl><Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl>
                                                     </PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>
                                                )} />
                                            </div>
                                            <FormField control={form.control} name="gender" render={({ field }) => (
                                                <FormItem><FormLabel>Gender (Optional)</FormLabel><FormControl><RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4"><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="male" /></FormControl><FormLabel className="font-normal">Male</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="female" /></FormControl><FormLabel className="font-normal">Female</FormLabel></FormItem><FormItem className="flex items-center space-x-2"><FormControl><RadioGroupItem value="other" /></FormControl><FormLabel className="font-normal">Other</FormLabel></FormItem></RadioGroup></FormControl><FormMessage /></FormItem>
                                            )} />
                                        </div>

                                        {/* Position Details */}
                                        <div className="space-y-4">
                                             <h3 className="font-headline text-xl">Position Details</h3>
                                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField control={form.control} name="applyingFor" render={({ field }) => (
                                                    <FormItem><FormLabel>Applying For</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a position" /></SelectTrigger></FormControl><SelectContent>{jobOpenings.map(job => (<SelectItem key={job.title} value={job.title}>{job.title}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>
                                                )}/>
                                                <FormField control={form.control} name="preferredLocation" render={({ field }) => (
                                                    <FormItem><FormLabel>Preferred Location</FormLabel><FormControl><Input placeholder="e.g., Remote, New York" {...field} /></FormControl><FormMessage /></FormItem>
                                                )}/>
                                                <FormField control={form.control} name="expectedSalary" render={({ field }) => (
                                                    <FormItem><FormLabel>Expected Salary</FormLabel><FormControl><Input placeholder="e.g., $80,000" {...field} /></FormControl><FormMessage /></FormItem>
                                                )}/>
                                                <FormField control={form.control} name="availableFrom" render={({ field }) => (
                                                    <FormItem className="flex flex-col"><FormLabel>Available From</FormLabel><Popover><PopoverTrigger asChild>
                                                       <FormControl><Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? (format(field.value, "PPP")) : (<span>Pick a date</span>)}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl>
                                                    </PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover><FormMessage /></FormItem>
                                                )}/>
                                             </div>
                                        </div>

                                        {/* Education and Skills */}
                                        <div className="space-y-4">
                                            <h3 className="font-headline text-xl">Education & Skills</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField control={form.control} name="highestQualification" render={({ field }) => (
                                                    <FormItem><FormLabel>Highest Qualification</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select qualification" /></SelectTrigger></FormControl><SelectContent><SelectItem value="10th">10th</SelectItem><SelectItem value="12th">12th</SelectItem><SelectItem value="diploma">Diploma</SelectItem><SelectItem value="graduate">Graduate</SelectItem><SelectItem value="post-graduate">Post Graduate</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                                                )}/>
                                                <FormField control={form.control} name="specialization" render={({ field }) => (
                                                    <FormItem><FormLabel>Specialization / Stream</FormLabel><FormControl><Input placeholder="e.g., B.Des, Architecture" {...field} /></FormControl><FormMessage /></FormItem>
                                                )}/>
                                            </div>
                                            <FormField control={form.control} name="keySkills" render={({ field }) => (
                                                <FormItem><FormLabel>Key Skills</FormLabel><FormControl><Input placeholder="e.g., AutoCAD, SketchUp, Photoshop" {...field} /></FormControl><FormDescription>Please separate skills with a comma.</FormDescription><FormMessage /></FormItem>
                                            )}/>
                                        </div>
                                        
                                        {/* Experience Details */}
                                        <div className="space-y-4">
                                            <h3 className="font-headline text-xl">Experience Details</h3>
                                            <FormField control={form.control} name="workExperience" render={({ field }) => (
                                                <FormItem><FormLabel>Total Work Experience</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select experience level" /></SelectTrigger></FormControl><SelectContent><SelectItem value="fresher">Fresher</SelectItem><SelectItem value="0-1">0-1 year</SelectItem><SelectItem value="1-3">1-3 years</SelectItem><SelectItem value="3+">3+ years</SelectItem></SelectContent></Select><FormMessage /></FormItem>
                                            )}/>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                 <FormField control={form.control} name="lastCompany" render={({ field }) => (
                                                    <FormItem><FormLabel>Last Company Name</FormLabel><FormControl><Input placeholder="Company Inc." {...field} /></FormControl><FormMessage /></FormItem>
                                                 )}/>
                                                 <FormField control={form.control} name="lastJobTitle" render={({ field }) => (
                                                    <FormItem><FormLabel>Last Job Title</FormLabel><FormControl><Input placeholder="e.g., Junior Designer" {...field} /></FormControl><FormMessage /></FormItem>
                                                 )}/>
                                                 <FormField control={form.control} name="noticePeriod" render={({ field }) => (
                                                    <FormItem><FormLabel>Notice Period</FormLabel><FormControl><Input placeholder="e.g., 30 days" {...field} /></FormControl><FormMessage /></FormItem>
                                                 )}/>
                                            </div>
                                        </div>

                                        {/* Document Upload */}
                                        <div className="space-y-4">
                                            <h3 className="font-headline text-xl">Document Upload</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField control={form.control} name="resume" render={({ field }) => (
                                                     <FormItem><FormLabel>Upload Resume (PDF/DOC)</FormLabel><FormControl><Input type="file" {...form.register("resume")} /></FormControl><FormMessage /></FormItem>
                                                )}/>
                                                <FormField control={form.control} name="portfolio" render={({ field }) => (
                                                     <FormItem><FormLabel>Upload Portfolio (Optional)</FormLabel><FormControl><Input type="file" {...form.register("portfolio")} /></FormControl><FormMessage /></FormItem>
                                                )}/>
                                                <FormField control={form.control} name="photo" render={({ field }) => (
                                                     <FormItem><FormLabel>Upload Passport Size Photo</FormLabel><FormControl><Input type="file" {...form.register("photo")} /></FormControl><FormMessage /></FormItem>
                                                )}/>
                                            </div>
                                        </div>

                                        {/* Additional Information */}
                                        <div className="space-y-4">
                                            <h3 className="font-headline text-xl">Additional Information</h3>
                                            <FormField control={form.control} name="whyHire" render={({ field }) => (
                                                <FormItem><FormLabel>Why Should We Hire You?</FormLabel><FormControl><Textarea rows={5} placeholder="Tell us why you're a great fit for this role..." {...field} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <FormField control={form.control} name="linkedin" render={({ field }) => (
                                                    <FormItem><FormLabel>LinkedIn Profile (Optional)</FormLabel><FormControl><Input placeholder="https://linkedin.com/in/..." {...field} /></FormControl><FormMessage /></FormItem>
                                                )}/>
                                                <FormField control={form.control} name="reference" render={({ field }) => (
                                                    <FormItem><FormLabel>Any Reference? (Optional)</FormLabel><FormControl><Input placeholder="Reference name or contact" {...field} /></FormControl><FormMessage /></FormItem>
                                                )}/>
                                            </div>
                                        </div>
                                        
                                        {/* Declaration */}
                                         <FormField
                                            control={form.control}
                                            name="declaration"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                                    <FormControl>
                                                        <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                                                    </FormControl>
                                                    <div className="space-y-1 leading-none">
                                                        <FormLabel>
                                                           I hereby declare that the above information is true to the best of my knowledge.
                                                        </FormLabel>
                                                    </div>
                                                     <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <Button type="submit" className="w-full">Submit Application</Button>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}

    