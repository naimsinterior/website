
'use client';

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Progress } from "@/components/ui/progress";
import {
  Bell,
  MessageCircleQuestion,
  LayoutGrid,
  Users,
  DollarSign,
  History,
  LifeBuoy,
  User,
  MoreHorizontal,
  BarChart2,
  TrendingUp,
  CreditCard,
  ArrowUpRight,
  Download,
  Menu,
  Search
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';

const chartData = [
  { month: "January", referrals: 18, commission: 12000 },
  { month: "February", referrals: 22, commission: 15000 },
  { month: "March", referrals: 27, commission: 18000 },
  { month: "April", referrals: 32, commission: 21000 },
  { month: "May", referrals: 35, commission: 25000 },
  { month: "June", referrals: 41, commission: 30000 },
]

const chartConfig = {
  commission: {
    label: "Commission",
    color: "hsl(var(--primary))",
  },
  referrals: {
    label: "Referrals",
    color: "hsl(var(--secondary))",
  },
}

const referrals = [
    { name: "Rahul Verma", city: "Chennai", status: "Converted", commission: "₹8,000", date: "20 Aug 2025" },
    { name: "Anjali Sharma", city: "Bangalore", status: "In Progress", commission: "₹–", date: "18 Aug 2025" },
    { name: "Suresh Gupta", city: "Delhi", status: "Converted", commission: "₹12,000", date: "15 Aug 2025" },
    { name: "Priya Singh", city: "Noida", status: "Lead", commission: "₹–", date: "12 Aug 2025" },
];

const paymentHistory = [
    { date: "25 Aug 2025", amount: "₹10,000", status: "Paid", mode: "Bank Transfer" },
    { date: "15 Aug 2025", amount: "₹5,000", status: "Pending", mode: "–" },
    { date: "05 Aug 2025", amount: "₹7,500", status: "Paid", mode: "Bank Transfer" },
];

export default function AgentDashboardPage() {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <aside className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <h1 className="font-headline text-lg">NAIMS INTERIOR</h1>
            </Link>
          </div>
          <nav className="flex-1 overflow-auto px-2 text-sm font-medium lg:px-4">
            <a href="#" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
              <LayoutGrid className="h-4 w-4" />
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <Users className="h-4 w-4" />
              My Referrals
            </a>
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <DollarSign className="h-4 w-4" />
              Earnings
            </a>
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <History className="h-4 w-4" />
              Payment History
            </a>
            <a href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <LifeBuoy className="h-4 w-4" />
              Support
            </a>
          </nav>
        </div>
      </aside>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
           <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <h1 className="font-headline text-lg">NAIMS INTERIOR</h1>
                </Link>
                <a href="#" className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary">
                  <LayoutGrid className="h-5 w-5" />
                  Dashboard
                </a>
                 <a href="#" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                  <Users className="h-5 w-5" />
                  My Referrals
                </a>
                 <a href="#" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                  <DollarSign className="h-5 w-5" />
                  Earnings
                </a>
                 <a href="#" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                  <History className="h-5 w-5" />
                  Payment History
                </a>
                 <a href="#" className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground">
                  <LifeBuoy className="h-5 w-5" />
                  Support
                </a>
              </nav>
            </SheetContent>
          </Sheet>

          <div className="w-full flex-1">
             <h1 className="text-lg font-semibold md:text-2xl">Referral Agent Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
                <MessageCircleQuestion className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-9 w-9">
              <AvatarImage src="https://placehold.co/50x50.png" alt="Agent Avatar" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 lg:p-6 pb-20 md:pb-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">128</div>
                        <p className="text-xs text-muted-foreground">+10 since last month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Customers</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">3 conversions this month</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Commission Earned</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹1,25,430</div>
                        <p className="text-xs text-muted-foreground">Total earnings this year</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹18,500</div>
                        <p className="text-xs text-muted-foreground">To be paid next cycle</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle>Monthly Referrals vs Commission</CardTitle>
                        <CardDescription>You earned ₹30,000 from 41 referrals in June.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                                    <YAxis />
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    <Bar dataKey="referrals" fill="var(--color-referrals)" radius={4} />
                                    <Bar dataKey="commission" fill="var(--color-commission)" radius={4} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                
                <div className="lg:col-span-3 space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Referral Bonus</CardTitle>
                            <CardDescription>You are 2 referrals away from a ₹5,000 bonus!</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Progress value={60} aria-label="60% complete" />
                             <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                <span>3/5 Referrals</span>
                                <span>₹5,000 Bonus</span>
                             </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>My Referrals</CardTitle>
                            <Button asChild variant="link" className="text-sm">
                                <a href="#">View All</a>
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Commission</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {referrals.slice(0,2).map(r => (
                                        <TableRow key={r.name}>
                                            <TableCell>
                                                <div className="font-medium">{r.name}</div>
                                                <div className="text-sm text-muted-foreground">{r.city}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={r.status === 'Converted' ? 'default' : 'secondary'}>{r.status}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">{r.commission}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
             <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-2">
                 <Card>
                    <CardHeader>
                        <CardTitle>Payment History</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Mode</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paymentHistory.map((p, i) => (
                                    <TableRow key={i}>
                                        <TableCell>{p.date}</TableCell>
                                        <TableCell>{p.amount}</TableCell>
                                        <TableCell>
                                            <Badge variant={p.status === 'Paid' ? 'default' : 'destructive'} className="bg-green-500">{p.status}</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">{p.mode}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                         </Table>
                    </CardContent>
                 </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle>Support & Materials</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <div className="flex items-center justify-between p-3 rounded-lg border">
                            <p>Frequently Asked Questions</p>
                            <Button variant="outline" size="sm">View FAQ</Button>
                        </div>
                         <div className="flex items-center justify-between p-3 rounded-lg border">
                            <p>Download Marketing Kit</p>
                            <Button variant="outline" size="sm"><Download className="mr-2 h-4 w-4" />Download</Button>
                        </div>
                         <div className="flex items-center justify-between p-3 rounded-lg border">
                            <p>Contact Support</p>
                            <Button>Live Chat</Button>
                        </div>
                    </CardContent>
                 </Card>
            </div>

        </main>
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 p-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-full items-center justify-around">
                <a href="#" className="flex flex-col items-center gap-1 text-xs text-primary transition-colors hover:text-primary">
                    <LayoutGrid className="h-5 w-5" />
                    <span>Dashboard</span>
                </a>
                 <a href="#" className="flex flex-col items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary">
                    <Users className="h-5 w-5" />
                    <span>Referrals</span>
                </a>
                 <a href="#" className="flex flex-col items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary">
                    <DollarSign className="h-5 w-5" />
                    <span>Earnings</span>
                </a>
                <button className="flex flex-col items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary">
                    <MoreHorizontal className="h-5 w-5" />
                    <span>More</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}

    