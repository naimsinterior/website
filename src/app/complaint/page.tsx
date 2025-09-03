
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
import { ShieldAlert, Upload, Camera } from 'lucide-react';
import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CameraCapture } from "@/components/CameraCapture";

const complaintFormSchema = z.object({
  name: z.string().min(2, { message: "Name is required." }),
  email: z.string().email({ message: "A valid email is required." }),
  phone: z.string().min(10, { message: "Please enter a valid 10-digit phone number." }),
  projectName: z.string().min(2, { message: "Project name or ID is required." }),
  complaintDetails: z.string().min(20, { message: "Please provide detailed information about your complaint (at least 20 characters)." }),
  desiredResolution: z.string().min(10, { message: "Please describe your desired resolution (at least 10 characters)." }),
  image: z.any().optional(),
});

type ComplaintFormValues = z.infer<typeof complaintFormSchema>;

export default function ComplaintPage() {
    const { toast } = useToast();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);

    const form = useForm<ComplaintFormValues>({
        resolver: zodResolver(complaintFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            projectName: "",
            complaintDetails: "",
            desiredResolution: "",
        },
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            form.setValue('image', file);
        }
    };
    
    const dataURLtoFile = (dataurl: string, filename: string): File => {
        const arr = dataurl.split(',');
        const mimeMatch = arr[0].match(/:(.*?);/);
        if (!mimeMatch) {
            throw new Error('Invalid data URL');
        }
        const mime = mimeMatch[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    const handlePhotoTaken = (dataUri: string) => {
        setImagePreview(dataUri);
        const file = dataURLtoFile(dataUri, `complaint-${Date.now()}.jpg`);
        setImageFile(file);
        form.setValue('image', file);
        setIsCameraOpen(false);
    }

    function onSubmit(data: ComplaintFormValues) {
        console.log("Complaint Submitted:", data);
        toast({
            title: "Complaint Lodged Successfully",
            description: "Thank you for your feedback. Our team will review your complaint and get back to you within 48 hours.",
            variant: "default",
        });
        form.reset();
        setImageFile(null);
        setImagePreview(null);
    }

    return (
        <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
            <div className="text-center">
                <ShieldAlert className="mx-auto h-12 w-12 text-destructive" />
                <h1 className="mt-4 font-headline text-4xl md:text-5xl">Lodge a Complaint</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                    We are sorry to hear that you had a problem. Please use the form below to tell us what went wrong.
                </p>
            </div>
            <div className="mt-12 max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Complaint Form</CardTitle>
                        <CardDescription>Please provide as much detail as possible.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl><Input placeholder="Enter your full name" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl><Input type="email" placeholder="you@example.com" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="phone"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone Number</FormLabel>
                                            <FormControl><Input type="tel" placeholder="Your 10-digit phone number" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="projectName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Project Name / ID</FormLabel>
                                            <FormControl><Input placeholder="e.g., Greenview Residence, Flat 501" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="complaintDetails"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Complaint Details</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    rows={6}
                                                    placeholder="Please describe the issue in detail. Include dates, names, and any other relevant information."
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="desiredResolution"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Desired Resolution</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    rows={3}
                                                    placeholder="How would you like us to resolve this issue?"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormItem>
                                    <FormLabel>Attach an Image (Optional)</FormLabel>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 space-y-4">
                                            <Input id="photo-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
                                            <Button asChild variant="outline" className="w-full">
                                              <label htmlFor="photo-upload" className="cursor-pointer">
                                                <Upload className="mr-2 h-4 w-4" />
                                                Upload from Device
                                              </label>
                                            </Button>
                                            
                                            <Dialog open={isCameraOpen} onOpenChange={setIsCameraOpen}>
                                                <DialogTrigger asChild>
                                                   <Button variant="outline" className="w-full">
                                                     <Camera className="mr-2 h-4 w-4" />
                                                     Use Camera
                                                   </Button>
                                                </DialogTrigger>
                                                <DialogContent className="max-w-2xl">
                                                    <DialogHeader>
                                                        <DialogTitle>Capture a Photo</DialogTitle>
                                                    </DialogHeader>
                                                    <CameraCapture onPhotoTaken={handlePhotoTaken} />
                                                </DialogContent>
                                            </Dialog>
                                            
                                            <p className="text-xs text-muted-foreground">PNG, JPG, WEBP</p>
                                        </div>
                                        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                                          {imagePreview ? (
                                            <Image src={imagePreview} alt="Complaint preview" fill className="object-cover" />
                                          ) : (
                                            <div className="flex h-full w-full items-center justify-center text-muted-foreground text-sm">
                                              Image Preview
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    <FormMessage />
                                </FormItem>
                                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                    {form.formState.isSubmitting ? 'Submitting...' : 'Submit Complaint'}
                                </Button>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
