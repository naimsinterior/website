
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Gift, Mail, Share2, Twitter, Linkedin, Facebook, PlusCircle, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const friendSchema = z.object({
    name: z.string().min(2, "Friend's name is required."),
    email: z.string().email("A valid email is required."),
    phone: z.string().min(10, "A valid 10-digit phone number is required."),
    address: z.string().min(5, "Friend's address is required."),
});

const referFormSchema = z.object({
  yourName: z.string().min(2, "Your name is required."),
  yourEmail: z.string().email("A valid email is required."),
  yourPhone: z.string().min(10, "Your 10-digit phone number is required."),
  yourAddress: z.string().min(5, "Your address is required."),
  friends: z.array(friendSchema).min(1, "You must refer at least one friend."),
});

type ReferFormValues = z.infer<typeof referFormSchema>;

const referralSteps = [
    {
        step: 1,
        title: "Share Your Link",
        description: "Share your unique referral link with your friends via email or social media.",
    },
    {
        step: 2,
        title: "Friend Gets a Discount",
        description: "Your friend gets 15% off their first design consultation when they sign up using your link.",
    },
    {
        step: 3,
        title: "You Get Rewarded",
        description: "Once your friend completes their first project with us, you'll receive a ₹5000 voucher!",
    },
];

export default function ReferPage() {
  const { toast } = useToast();
  const form = useForm<ReferFormValues>({
    resolver: zodResolver(referFormSchema),
    defaultValues: {
      friends: [{ name: '', email: '', phone: '', address: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "friends",
  });

  const referralLink = "https://naimsinterior.com/signup?ref=123XYZ";

  const onSubmit = (data: ReferFormValues) => {
    console.log("Referral Submitted", data);
    toast({
      title: "Referral Sent!",
      description: `Your referral has been sent. Thank you!`,
    });
    form.reset();
  };
  
  const handleShare = async (platform: 'email' | 'twitter' | 'linkedin' | 'facebook' | 'copy') => {
    const text = `I love NAIMS INTERIOR! Use my link to get a discount on your first interior design project.`;
    let shareUrl = '';

    switch(platform) {
        case 'email':
            shareUrl = `mailto:?subject=${encodeURIComponent("Check out NAIMS INTERIOR")}&body=${encodeURIComponent(text + "\n" + referralLink)}`;
            window.location.href = shareUrl;
            return;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(referralLink)}&title=${encodeURIComponent("NAIMS INTERIOR Referral")}&summary=${encodeURIComponent(text)}`;
            break;
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
            break;
        case 'copy':
            navigator.clipboard.writeText(referralLink);
            toast({ title: "Link Copied!", description: "Referral link copied to clipboard." });
            return;
    }
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const watchedFriends = form.watch('friends');
  const isLastFriendIncomplete = (() => {
    if (!watchedFriends || watchedFriends.length === 0) return true;
    const lastFriend = watchedFriends[watchedFriends.length - 1];
    return !lastFriend.name || !lastFriend.email || !lastFriend.phone || !lastFriend.address;
  })();

  return (
    <>
        <header className="relative h-64 md:h-80 w-full">
            <Image
                src="https://placehold.co/1600x400.png"
                alt="Friends enjoying a well-designed living room"
                layout="fill"
                objectFit="cover"
                className="z-0"
                data-ai-hint="friends living room"
            />
            <div className="absolute inset-0 bg-black/50 z-10" />
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white p-4">
                 <Gift className="mx-auto h-12 w-12" />
                <h1 className="mt-4 font-headline text-4xl md:text-5xl">Refer a Friend & Earn Rewards</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-background/90">
                Love our designs? Share NAIMS INTERIOR with your friends and you both get rewarded. It's a win-win!
                </p>
            </div>
        </header>
        <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-square w-full">
                    <Image 
                        src="https://placehold.co/600x600.png"
                        alt="Friends enjoying a beautiful living room"
                        fill
                        className="object-cover rounded-lg"
                        data-ai-hint="friends living room"
                    />
                </div>
                <div className="space-y-8">
                    <h2 className="font-headline text-3xl">How It Works</h2>
                    {referralSteps.map((item) => (
                        <div key={item.step} className="flex items-start gap-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-xl flex-shrink-0">
                                {item.step}
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">{item.title}</h3>
                                <p className="text-muted-foreground">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="mt-24">
                <Card className="max-w-4xl mx-auto">
                    <CardHeader className="text-center">
                        <CardTitle className="font-headline text-3xl">Refer Your Friend</CardTitle>
                        <CardDescription>Enter your friend's details below or share your link.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Your Details</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <FormField control={form.control} name="yourName" render={({ field }) => (
                                            <FormItem><FormControl><Input placeholder="Your Name" {...field} /></FormControl><FormMessage /></FormItem>
                                        )}/>
                                         <FormField control={form.control} name="yourPhone" render={({ field }) => (
                                            <FormItem><FormControl><Input type="tel" placeholder="Your Mobile Number" {...field} /></FormControl><FormMessage /></FormItem>
                                        )}/>
                                        <FormField control={form.control} name="yourEmail" render={({ field }) => (
                                            <FormItem className="sm:col-span-2"><FormControl><Input type="email" placeholder="Your Email Address" {...field} /></FormControl><FormMessage /></FormItem>
                                        )}/>
                                        <FormField control={form.control} name="yourAddress" render={({ field }) => (
                                            <FormItem className="sm:col-span-2"><FormControl><Input placeholder="Your Address" {...field} /></FormControl><FormMessage /></FormItem>
                                        )}/>
                                    </div>
                                </div>

                                <div className="border-t pt-8">
                                     <h3 className="text-lg font-semibold mb-4">Friend's Details</h3>
                                    {fields.map((field, index) => (
                                        <div key={field.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-b pb-6 mb-6 relative">
                                            <FormField control={form.control} name={`friends.${index}.name`} render={({ field }) => (
                                                <FormItem><FormControl><Input placeholder="Friend's Name" {...field} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                            <FormField control={form.control} name={`friends.${index}.phone`} render={({ field }) => (
                                                <FormItem><FormControl><Input type="tel" placeholder="Friend's Mobile Number" {...field} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                            <FormField control={form.control} name={`friends.${index}.email`} render={({ field }) => (
                                                <FormItem className="sm:col-span-2"><FormControl><Input type="email" placeholder="Friend's Email Address" {...field} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                            <FormField control={form.control} name={`friends.${index}.address`} render={({ field }) => (
                                                <FormItem className="sm:col-span-2"><FormControl><Input placeholder="Friend's Address" {...field} /></FormControl><FormMessage /></FormItem>
                                            )}/>
                                            {fields.length > 1 && (
                                                <Button type="button" variant="ghost" size="icon" className="absolute -top-2 right-0" onClick={() => remove(index)}>
                                                    <Trash2 className="h-4 w-4 text-destructive"/>
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                     <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <span tabIndex={0}>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        onClick={() => append({ name: '', email: '', phone: '', address: '' })}
                                                        disabled={isLastFriendIncomplete}
                                                    >
                                                        <PlusCircle className="mr-2 h-4 w-4" /> Add Another Friend
                                                    </Button>
                                                </span>
                                            </TooltipTrigger>
                                            {isLastFriendIncomplete && (
                                                <TooltipContent>
                                                    <p>Please fill all details for the last friend before adding another.</p>
                                                </TooltipContent>
                                            )}
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                
                                <Button type="submit" className="w-full">Send Referrals</Button>
                            </form>
                        </Form>

                        <div className="flex items-center my-6">
                            <div className="flex-grow border-t"></div>
                            <span className="flex-shrink mx-4 text-muted-foreground text-sm">OR</span>
                            <div className="flex-grow border-t"></div>
                        </div>

                        <div className="p-4 bg-muted rounded-lg text-center">
                            <p className="text-sm text-muted-foreground mb-2">Share your unique referral link:</p>
                            <div className="flex items-center justify-center p-2 border border-dashed rounded-md bg-background">
                                <p className="font-mono text-sm truncate">{referralLink}</p>
                            </div>
                            <div className="mt-4 flex justify-center flex-wrap gap-2">
                                <Button variant="outline" size="sm" onClick={() => handleShare('copy')}><Share2 className="mr-2 h-4 w-4" /> Copy Link</Button>
                                <Button variant="outline" size="sm" onClick={() => handleShare('email')}><Mail className="mr-2 h-4 w-4" /> Email</Button>
                                <Button variant="outline" size="sm" onClick={() => handleShare('twitter')}><Twitter className="mr-2 h-4 w-4" /> Twitter</Button>
                                <Button variant="outline" size="sm" onClick={() => handleShare('linkedin')}><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</Button>
                            </div>
                        </div>
                        <p className="text-xs text-muted-foreground text-center mt-4">
                            By submitting this form, you agree to our{' '}
                            <Link href="/terms-and-conditions" className="underline hover:text-primary">
                                Terms & Conditions
                            </Link>.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    </>
  );
}

