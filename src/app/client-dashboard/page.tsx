
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
        <Card>
          <CardHeader>
            <CardTitle>My Projects</CardTitle>
            <CardDescription>View and manage your ongoing and past projects.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You have 2 active projects.</p>
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
