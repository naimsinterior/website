
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Hourglass, Camera, FileText, MessageSquare } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const projectProgress = {
    totalProgress: 65,
    stages: [
        { name: 'Planning & Design', status: 'completed', date: '2023-10-20' },
        { name: 'Civil Work', status: 'completed', date: '2023-11-15' },
        { name: 'Electrical & Plumbing', status: 'in-progress', date: 'Ongoing' },
        { name: 'Woodwork & Finishes', status: 'pending', date: 'Upcoming' },
        { name: 'Handover', status: 'pending', date: 'Upcoming' },
    ],
    gallery: [
        { src: 'https://placehold.co/600x400.png', hint: 'foundation work', date: '2023-11-01', description: 'Foundation and initial structure complete.' },
        { src: 'https://placehold.co/600x400.png', hint: 'wall plastering', date: '2023-11-10', description: 'Interior walls being plastered.' },
        { src: 'https://placehold.co/600x400.png', hint: 'wiring progress', date: '2023-11-20', description: 'Electrical wiring in progress for the living room.' },
        { src: 'https://placehold.co/600x400.png', hint: 'kitchen wiring', date: '2023-11-22', description: 'Kitchen area wiring and conduit setup.' },
    ],
    documents: [
        { name: 'Floor Plan.pdf', href: '#' },
        { name: 'Electrical Layout.pdf', href: '#' },
        { name: 'Project Contract.pdf', href: '#' },
    ]
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'completed':
            return <CheckCircle className="h-6 w-6 text-green-500" />;
        case 'in-progress':
            return <Hourglass className="h-6 w-6 text-yellow-500 animate-pulse" />;
        case 'pending':
            return <Circle className="h-6 w-6 text-muted-foreground/50" />;
        default:
            return null;
    }
}

export default function SiteProgressPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="font-headline text-4xl md:text-5xl">Site Progress</h1>
          <p className="mt-2 text-lg text-muted-foreground">Stay updated with the latest developments on your project.</p>
        </div>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
            <Progress value={projectProgress.totalProgress} className="h-4" />
            <p className="text-right mt-2 text-lg font-bold text-primary">{projectProgress.totalProgress}% Complete</p>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center"><Camera className="mr-3 h-6 w-6 text-primary" /> Progress Gallery</CardTitle>
                    <CardDescription>Visual updates from the project site.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projectProgress.gallery.map((photo, index) => (
                        <div key={index} className="space-y-2">
                           <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                                <Image src={photo.src} alt={photo.description} layout="fill" objectFit="cover" data-ai-hint={photo.hint} />
                           </div>
                           <p className="text-sm text-muted-foreground">{photo.date}: <span className="font-medium text-foreground">{photo.description}</span></p>
                        </div>
                    ))}
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center"><FileText className="mr-3 h-6 w-6 text-primary" /> Project Documents</CardTitle>
                    <CardDescription>Access all your important project files in one place.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="divide-y divide-border">
                        {projectProgress.documents.map((doc, index) => (
                            <li key={index} className="py-3 flex items-center justify-between">
                                <span className="font-medium">{doc.name}</span>
                                <Button variant="outline" size="sm" asChild>
                                    <a href={doc.href} download>Download</a>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1 space-y-8">
             <Card className="sticky top-24">
                <CardHeader>
                    <CardTitle>Project Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative">
                        <div className="absolute left-3 top-3 bottom-3 w-0.5 bg-border" />
                        <ul className="space-y-8">
                            {projectProgress.stages.map((stage, index) => (
                                <li key={index} className="flex items-start gap-4 pl-8 relative">
                                    <div className="absolute left-0 top-0 h-6 w-6 bg-background flex items-center justify-center">
                                       {getStatusIcon(stage.status)}
                                    </div>
                                    <div>
                                        <p className="font-semibold">{stage.name}</p>
                                        <p className="text-sm text-muted-foreground">{stage.date}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center"><MessageSquare className="mr-3 h-6 w-6 text-primary" /> Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">Have a question? Get in touch with your project manager.</p>
                    <Button className="w-full">Contact Project Manager</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
