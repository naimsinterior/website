'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
    return (
        <div className="flex min-h-[80vh] items-center justify-center bg-muted/40 px-4 py-12">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="font-headline text-2xl">Welcome Back</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="m@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full">Login</Button>
                    </form>
                    <div className="mt-4 text-center text-sm">
                        Don't have an account?{' '}
                        <Link href="/signup" className="underline hover:text-primary">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
