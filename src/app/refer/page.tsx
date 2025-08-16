
'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Gift, Mail, Share2, Twitter, Linkedin, Facebook } from "lucide-react";
import Image from "next/image";

const referFormSchema = z.object({
  yourName: z.string().min(2, "Your name is required."),
  yourEmail: z.string().email("A valid email is required."),
  friendName: z.string().min(2, "Friend's name is required."),
  friendEmail: z.string().email("A valid email for your friend is required."),
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
  });

  const referralLink = "https://naimsinterior.com/signup?ref=123XYZ";

  const onSubmit = (data: ReferFormValues) => {
    console.log("Referral Submitted", data);
    toast({
      title: "Referral Sent!",
      description: `Your referral has been sent to ${data.friendName}.`,
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

  return (
    <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="text-center">
        <Gift className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 font-headline text-4xl md:text-5xl">Refer a Friend & Earn Rewards</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Love our designs? Share NAIMS INTERIOR with your friends and you both get rewarded. It's a win-win!
        </p>
      </div>

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
         <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center">
                <CardTitle className="font-headline text-3xl">Refer Your Friend</CardTitle>
                <CardDescription>Enter your friend's details below or share your link.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-6 p-4 bg-muted rounded-lg text-center">
                    <p className="text-sm text-muted-foreground mb-2">Your unique referral link:</p>
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
                <div className="flex items-center my-6">
                    <div className="flex-grow border-t"></div>
                    <span className="flex-shrink mx-4 text-muted-foreground text-sm">OR</span>
                    <div className="flex-grow border-t"></div>
                </div>

                 <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <FormField control={form.control} name="yourName" render={({ field }) => (
                                <FormItem><FormLabel>Your Name</FormLabel><FormControl><Input placeholder="Your Name" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={form.control} name="yourEmail" render={({ field }) => (
                                <FormItem><FormLabel>Your Email</FormLabel><FormControl><Input type="email" placeholder="Your Email" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
      </div>

    </div>
  );
}
