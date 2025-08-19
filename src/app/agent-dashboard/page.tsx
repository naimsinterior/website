
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AgentDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
       <div className="flex justify-between items-center mb-8">
            <div>
                 <h1 className="font-headline text-4xl md:text-5xl">Agent Dashboard</h1>
                 <p className="mt-2 text-lg text-muted-foreground">Welcome, Agent!</p>
            </div>
        </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>New Leads</CardTitle>
            <CardDescription>View and manage new client inquiries.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You have 5 new leads.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>Track progress on all active projects.</CardDescription>
          </CardHeader>
          <CardContent>
             <p>12 projects are currently active.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Performance</CardTitle>
            <CardDescription>Review your sales and project metrics.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>View your performance dashboard.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
