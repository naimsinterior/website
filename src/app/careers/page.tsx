
'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search } from 'lucide-react';
import { jobs } from './jobs';
import Link from 'next/link';

const uniqueLocations = Array.from(new Set(jobs.map(j => j.location)));
const uniqueTypes = Array.from(new Set(jobs.map(j => j.type)));

export default function CareerPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [locationFilter, setLocationFilter] = useState('all-locations');
    const [typeFilter, setTypeFilter] = useState('all-types');
    
    const filteredJobs = useMemo(() => {
        return jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.short.toLowerCase().includes(searchQuery.toLowerCase()) ||
                job.skills.join(' ').toLowerCase().includes(searchQuery.toLowerCase());
            const matchesLocation = locationFilter === 'all-locations' || job.location === locationFilter;
            const matchesType = typeFilter === 'all-types' || job.type === typeFilter;
            return matchesSearch && matchesLocation && matchesType;
        });
    }, [searchQuery, locationFilter, typeFilter]);

    const handleClearFilters = () => {
        setSearchQuery('');
        setLocationFilter('all-locations');
        setTypeFilter('all-types');
    };
    
  return (
    <>
      <header className="bg-muted text-foreground">
          <div className="container mx-auto px-4 py-16 md:px-6 text-center">
              <h1 className="font-headline text-4xl md:text-5xl">Careers at Interiorscape</h1>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                  Explore open roles, learn about our culture and apply in seconds.
              </p>
          </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-6">
        <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search jobs, e.g., Sales, Designer, Chennai" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>
            <div className="flex gap-4">
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all-locations">All locations</SelectItem>
                        {uniqueLocations.map(loc => <SelectItem key={loc} value={loc}>{loc}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all-types">All types</SelectItem>
                        {uniqueTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Button variant="outline" onClick={handleClearFilters}>Clear</Button>
            </div>
        </div>
        
        {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map(job => (
                <Card key={job.id} className="flex flex-col">
                  <CardHeader className="p-0">
                    <div className="relative h-48 w-full">
                      <Image src={job.images[0]} alt={job.title} layout="fill" objectFit="cover" className="rounded-t-lg" data-ai-hint={job.aiHint} />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                    <CardTitle className="font-headline text-xl">{job.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{job.location} • {job.type} • {job.posted}</p>
                    <CardDescription className="mt-2">{job.short}</CardDescription>
                  </CardContent>
                  <CardFooter className="p-4 flex justify-between items-center">
                    <Badge variant="secondary">{job.skills[0]}</Badge>
                    <Button asChild>
                        <Link href={`/careers/${job.id}`}>View & Apply</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
        ) : (
             <div className="text-center py-20 border-2 border-dashed rounded-lg">
                <h2 className="font-headline text-2xl">No Jobs Found</h2>
                <p className="mt-2 text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
        )}
         <footer className="text-center text-muted-foreground text-sm mt-12">
            Can’t find the right role? Send your resume to{' '}
            <a href="mailto:careers@interiorscape.com" className="font-semibold text-primary hover:underline">
                careers@interiorscape.com
            </a>
        </footer>
      </main>
    </>
  );
}
