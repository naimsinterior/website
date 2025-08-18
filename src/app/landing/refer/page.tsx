
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Gift } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const referFormSchema = z.object({
  yourName: z.string().min(2, "Your name is required."),
  yourEmail: z.string().email("A valid email is required."),
  friendName: z.string().min(2, "Friend's name is required."),
  friendEmail: z.string().email("A valid email for your friend is required."),
});

type ReferFormValues = z.infer<typeof referFormSchema>;

export default function ReferLandingPage() {
  const { toast } = useToast();
  const form = useForm<ReferFormValues>({
    resolver: zodResolver(referFormSchema),
  });

  const onSubmit = (data: ReferFormValues) => {
    console.log("Referral Submitted", data);
    toast({
      title: "Referral Sent!",
      description: `Your referral has been sent to ${data.friendName}.`,
    });
    form.reset();
  };

  return (
    <div className="relative min-h-screen w-full lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md space-y-8">
            <div className="text-center">
                <Link href="/" className="inline-block mb-8">
                     <Image src="/Naims_interior_logo.PNG" alt="NAIMS INTERIOR Logo" width="200" height="53" className="object-contain" />
                </Link>
                <h1 className="font-headline text-3xl md:text-4xl">Refer a Friend, Get Rewarded</h1>
                <p className="mt-2 text-muted-foreground">
                    Share the love for great design. You'll get a <strong>₹5000 voucher</strong> and your friend gets <strong>15% off</strong> their first project.
                </p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Enter Your Friend's Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField control={form.control} name="yourName" render={({ field }) => (
                                    <FormItem><FormLabel>Your Name</FormLabel><FormControl><Input placeholder="Your Name" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="yourEmail" render={({ field }) => (
                                    <FormItem><FormLabel>Your Email</FormLabel><FormControl><Input type="email" placeholder="Your Email" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                               <FormField control={form.control} name="friendName" render={({ field }) => (
                                    <FormItem><FormLabel>Friend's Name</FormLabel><FormControl><Input placeholder="Friend's Name" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                                <FormField control={form.control} name="friendEmail" render={({ field }) => (
                                    <FormItem><FormLabel>Friend's Email</FormLabel><FormControl><Input type="email" placeholder="Friend's Email" {...field} /></FormControl><FormMessage /></FormItem>
                                )}/>
                            </div>
                            <Button type="submit" className="w-full">Send Referral</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            <p className="text-center text-xs text-muted-foreground">
                By submitting, you agree to our <Link href="/terms-and-conditions" target="_blank" className="underline">Terms & Conditions</Link>.
            </p>
        </div>
      </div>
      <div className="hidden lg:block relative">
        <Image
          src="https://placehold.co/1000x1200.png"
          alt="Beautifully designed interior"
          width={1000}
          height={1200}
          className="h-full w-full object-cover"
          data-ai-hint="elegant living room"
        />
      </div>
    </div>
  );
}
