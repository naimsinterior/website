
'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { X, MapPin, Briefcase, Calendar, Search } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';


const jobs = [
    {
        id: 1,
        title: 'Interior Design Sales Executive',
        location: 'Remote',
        type: 'Work From Home',
        short: 'Handle inbound leads, present proposals and close deals remotely.',
        desc: 'We seek a motivated Sales Executive to manage leads, run virtual meetings and close sales. Familiarity with interior design terms is a plus.',
        skills: ['Sales', 'Communication', 'CRM'],
        images: ['https://placehold.co/800x500.png', 'https://placehold.co/800x500.png', 'https://placehold.co/800x500.png'],
        aiHint: 'office sales',
        posted: 'Aug 2025',
        responsibilities: [
            'Work closely with clients and internal teams to deliver projects',
            'Meet targets and maintain quality standards',
            'Prepare reports and update CRM regularly'
        ]
    },
    {
        id: 2,
        title: 'Junior Interior Designer',
        location: 'Chennai',
        type: 'Full-Time',
        short: 'Assist senior designers with drawings, moodboards and client coordination.',
        desc: 'Looking for a creative Junior Designer to help produce CAD drawings and prepare design presentations. 1-2 years experience preferred.',
        skills: ['AutoCAD', 'SketchUp', 'Creativity'],
        images: ['https://placehold.co/800x500.png', 'https://placehold.co/800x500.png'],
        aiHint: 'design desk',
        posted: 'July 2025',
        responsibilities: [
            'Produce detailed 2D and 3D drawings for client review',
            'Collaborate with senior designers on material and furniture selection',
            'Assist in creating compelling design presentations'
        ]
    },
    {
        id: 3,
        title: 'Site Supervisor',
        location: 'Bengaluru',
        type: 'Full-Time',
        short: 'Manage day-to-day site execution and vendor coordination.',
        desc: 'Experienced site supervisor to oversee fit-outs, quality checks and timelines. Prior experience in interior projects required.',
        skills: ['Site Management', 'Quality Control', 'Coordination'],
        images: ['https://placehold.co/800x500.png', 'https://placehold.co/800x500.png'],
        aiHint: 'construction site',
        posted: 'June 2025',
        responsibilities: [
            'Oversee on-site activities to ensure project timelines are met',
            'Conduct regular quality checks and ensure adherence to design specifications',
            'Coordinate with contractors, vendors, and the design team'
        ]
    },
    {
        id: 4,
        title: 'Project Manager',
        location: 'Chennai',
        type: 'Full-Time',
        short: 'Lead interior design projects from concept to completion.',
        desc: 'Seeking an organized Project Manager to handle project planning, budgeting, and client communication. Must have 3+ years of experience.',
        skills: ['Project Management', 'Budgeting', 'Client Relations'],
        images: ['https://placehold.co/800x500.png', 'https://placehold.co/800x500.png'],
        aiHint: 'project planning',
        posted: 'Aug 2025',
        responsibilities: [
            'Develop project plans, timelines, and budgets',
            'Serve as the primary point of contact for clients',
            'Ensure projects are delivered on time and within budget'
        ]
    },
     {
        id: 5,
        title: '3D Visualizer',
        location: 'Remote',
        type: 'Internship',
        short: 'Create stunning photorealistic 3D renders of interior spaces.',
        desc: 'A talented 3D Visualizer intern to create high-quality renders for client presentations and marketing materials.',
        skills: ['3ds Max', 'V-Ray', 'Photoshop'],
        images: ['https://placehold.co/800x500.png', 'https://placehold.co/800x500.png'],
        aiHint: '3d rendering',
        posted: 'July 2025',
        responsibilities: [
            'Model and render interior scenes based on designer specifications',
            'Post-process renders to enhance realism and visual appeal',
            'Work with the design team to accurately represent concepts'
        ]
    },
    {
        id: 6,
        title: 'Marketing Coordinator',
        location: 'Hyderabad',
        type: 'Full-Time',
        short: 'Manage social media, create content, and assist with marketing campaigns.',
        desc: 'A creative Marketing Coordinator to help grow our online presence and support our marketing initiatives.',
        skills: ['Social Media', 'Content Creation', 'SEO'],
        images: ['https://placehold.co/800x500.png', 'https://placehold.co/800x500.png'],
        aiHint: 'marketing strategy',
        posted: 'June 2025',
        responsibilities: [
            'Manage and grow our social media channels',
            'Write blog posts, case studies, and other marketing content',
            'Assist in the planning and execution of marketing campaigns'
        ]
    }
];

const uniqueLocations = Array.from(new Set(jobs.map(j => j.location)));
const uniqueTypes = Array.from(new Set(jobs.map(j => j.type)));

const applicationSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.string().email("A valid email is required"),
  phone: z.string().min(10, "A valid phone number is required"),
  currentCity: z.string().optional(),
  experience: z.string().optional(),
  resume: z.any().refine(files => files?.length == 1, "Resume is required."),
  portfolio: z.any().optional(),
  note: z.string().optional(),
  jobId: z.number()
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

export default function CareerPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [selectedJob, setSelectedJob] = useState<(typeof jobs[0]) | null>(null);
    
    const { toast } = useToast();

    const form = useForm<ApplicationFormValues>({
        resolver: zodResolver(applicationSchema),
    });
    
    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.short.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.skills.join(' ').toLowerCase().includes(searchQuery.toLowerCase());
            const matchesLocation = !locationFilter || job.location === locationFilter;
            const matchesType = !typeFilter || job.type === typeFilter;
            return matchesSearch && matchesLocation && matchesType;
        });
    }, [searchQuery, locationFilter, typeFilter]);

    const handleClearFilters = () => {
        setSearchQuery('');
        setLocationFilter('');
        setTypeFilter('');
    };

    const onSubmit: SubmitHandler<ApplicationFormValues> = (data) => {
        console.log("Form Submitted", data);
        toast({
            title: "Application Sent!",
            description: "Thank you for your interest. We will contact shortlisted candidates.",
        });
        form.reset();
        setSelectedJob(null);
    };

  return (
    <>
      <header className="bg-[#0f1724] text-white">
          <div className="container mx-auto px-4 py-16 md:px-6 text-center">
              <h1 className="font-headline text-4xl md:text-5xl">Careers at NAIMS INTERIOR</h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
                  Explore open roles, learn about our culture and apply in seconds.
              </p>
          </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-6">
        <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search jobs, e.g., Sales, Designer, Chennai" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>
            <div className="flex gap-4">
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">All locations</SelectItem>
                        {uniqueLocations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="">All types</SelectItem>
                        {uniqueTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Button variant="outline" onClick={handleClearFilters}>Clear</Button>
            </div>
        </div>
        
        {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map(job => (
                <Card key={job.id} className="flex flex-col">
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                      <Image src={job.images[0]} alt={job.title} layout="fill" objectFit="cover" className="rounded-t-lg" data-ai-hint={job.aiHint} />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                    <CardTitle className="font-headline text-xl">{job.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{job.location} • {job.type} • {job.posted}</p>
                    <CardDescription className="mt-2">{job.short}</CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 flex justify-between items-center">
                    <Badge variant="secondary">{job.skills[0]}</Badge>
                    <Button onClick={() => {
                        form.setValue('jobId', job.id);
                        setSelectedJob(job);
                    }}>View & Apply</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
        ) : (
             <div className="text-center py-20 border-2 border-dashed rounded-lg">
                <h2 className="font-headline text-2xl">No Jobs Found</h2>
                <p className="mt-2 text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
        )}
         <footer className="text-center text-muted-foreground text-sm mt-12">
            Can’t find the right role? Send your resume to{' '}
            <a href="mailto:careers@naimsinterior.com" className="font-semibold text-primary hover:underline">
                careers@naimsinterior.com
            </a>
        </footer>
      </main>

      <Dialog open={!!selectedJob} onOpenChange={() => setSelectedJob(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
          {selectedJob && (
            <>
              <DialogHeader className="pr-10">
                <DialogTitle className="font-headline text-3xl">{selectedJob.title}</DialogTitle>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-muted-foreground pt-2">
                    <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {selectedJob.location}</div>
                    <div className="flex items-center gap-2"><Briefcase className="h-4 w-4" /> {selectedJob.type}</div>
                    <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Posted: {selectedJob.posted}</div>
                </div>
              </DialogHeader>
              <div className="grid md:grid-cols-3 gap-8 overflow-y-auto pr-4 -mr-4">
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <h3 className="font-headline text-xl mb-2">Job Description</h3>
                        <p className="text-muted-foreground">{selectedJob.desc}</p>
                    </div>
                     <div>
                        <h3 className="font-headline text-xl mb-2">Responsibilities</h3>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                           {selectedJob.responsibilities.map((item, index) => <li key={index}>{item}</li>)}
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-headline text-xl mb-2">Key Skills</h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedJob.skills.map(skill => <Badge key={skill} variant="secondary">{skill}</Badge>)}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-headline text-xl mb-2">Gallery</h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedJob.images.map((img, i) => (
                                <Image key={i} src={img} alt={`${selectedJob.title} gallery ${i+1}`} width={120} height={80} className="rounded-md object-cover" data-ai-hint={selectedJob.aiHint}/>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="md:col-span-1 bg-muted/50 p-4 rounded-lg">
                   <h3 className="font-headline text-xl mb-4">Apply for this role</h3>
                   <Form {...form}>
                       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                           <FormField control={form.control} name="name" render={({ field }) => (
                               <FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                           )} />
                           <FormField control={form.control} name="email" render={({ field }) => (
                               <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                           )} />
                           <FormField control={form.control} name="phone" render={({ field }) => (
                               <FormItem><FormLabel>Phone</FormLabel><FormControl><Input type="tel" {...field} /></FormControl><FormMessage /></FormItem>
                           )} />
                           <FormField control={form.control} name="resume" render={({ field: { value, onChange, ...fieldProps} }) => (
                               <FormItem>
                                   <FormLabel>Resume</FormLabel>
                                   <FormControl><Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => onChange(e.target.files)} {...fieldProps} /></FormControl>
                                   <FormMessage />
                               </FormItem>
                           )} />
                            <FormField control={form.control} name="note" render={({ field }) => (
                               <FormItem>
                                   <FormLabel>Cover Note <span className="text-muted-foreground">(Optional)</span></FormLabel>
                                   <FormControl><Textarea rows={3} placeholder="Why should we hire you?" {...field} /></FormControl>
                                   <FormMessage />
                               </FormItem>
                           )} />
                           <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? 'Submitting...' : 'Submit Application'}
                           </Button>
                       </form>
                   </Form>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
