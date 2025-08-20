
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import { BarChartBig, Calendar, Target, Briefcase, Hourglass, CalendarCheck, CalendarClock } from "lucide-react";


const projectOverview = {
    progress: 0,
    startDate: "10/10/2023",
    targetDate: "28/11/2023",
    workingDays: 42,
    onHoldDays: 0,
    daysRemaining: 0,
    overDays: 631,
};


export default function ClientDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-headline text-4xl md:text-5xl">Client Dashboard</h1>
          <p className="mt-2 text-lg text-muted-foreground">Welcome back, Client!</p>
        </div>
        <Button asChild>
            <Link href="/projects/new">Start a New Project</Link>
        </Button>
      </div>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center text-2xl font-headline">
                    <BarChartBig className="mr-3 h-6 w-6 text-primary" />
                    Overview
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                 <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-muted-foreground">Task Progress</span>
                        <span className="text-sm font-bold">{projectOverview.progress}%</span>
                    </div>
                    <Progress value={projectOverview.progress} aria-label={`${projectOverview.progress}% task progress`} />
                </div>

                <ul className="space-y-4 text-sm">
                    <li className="flex items-center justify-between">
                        <span className="flex items-center text-muted-foreground">
                            <Calendar className="mr-2 h-4 w-4" /> Start Date
                        </span>
                        <span className="font-medium">{projectOverview.startDate}</span>
                    </li>
                    <li className="flex items-center justify-between">
                        <span className="flex items-center text-muted-foreground">
                            <Target className="mr-2 h-4 w-4" /> Target Date
                        </span>
                        <span className="font-medium">{projectOverview.targetDate}</span>
                    </li>
                     <li className="flex items-center justify-between">
                        <span className="flex items-center text-muted-foreground">
                            <Briefcase className="mr-2 h-4 w-4" /> Working Days
                        </span>
                        <span className="font-medium">{projectOverview.workingDays}</span>
                    </li>
                     <li className="flex items-center justify-between">
                        <span className="flex items-center text-muted-foreground">
                            <Hourglass className="mr-2 h-4 w-4" /> On Hold Days
                        </span>
                        <span className="font-medium">{projectOverview.onHoldDays}</span>
                    </li>
                    <li className="flex items-center justify-between">
                        <span className="flex items-center text-muted-foreground">
                            <CalendarCheck className="mr-2 h-4 w-4" /> Days Remaining
                        </span>
                        <span className="font-medium">{projectOverview.daysRemaining}</span>
                    </li>
                     <li className="flex items-center justify-between">
                        <span className="flex items-center text-muted-foreground">
                            <CalendarClock className="mr-2 h-4 w-4" /> Over Days
                        </span>
                        <span className="font-bold text-destructive">{projectOverview.overDays}</span>
                    </li>
                </ul>
            </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>My Moodboard</CardTitle>
            <CardDescription>Access your saved design inspirations.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You have 15 items in your moodboard.</p>
             <Button variant="outline" asChild className="mt-4">
                <Link href="/moodboard">View Moodboard</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Account Details</CardTitle>
            <CardDescription>Update your personal information and password.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Manage your account settings.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
