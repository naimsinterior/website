
'use client';

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { blogs, Blog } from "./blogs";

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const handleViewMore = () => {
    setVisibleCount(prevCount => prevCount + POSTS_PER_PAGE);
  };

  return (
    <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="text-center mb-16">
        <h1 className="font-headline text-4xl md:text-5xl">From the Drawing Board</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Insights, inspiration, and ideas from the world of interior design.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.slice(0, visibleCount).map((post) => {
          return (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
              <Card className="flex flex-col overflow-hidden h-full">
                <CardHeader className="p-0 relative">
                  <div className="relative h-60 w-full">
                      <Image
                          src={post.images[0]}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint={post.aiHint}
                      />
                  </div>
                   <Badge variant="secondary" className="absolute top-3 left-3 z-10">{post.category}</Badge>
                </CardHeader>
                <CardContent className="flex-grow p-6">
                  <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{post.title}</CardTitle>
                  <CardDescription className="mt-2 text-base">{post.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={post.authorImage} alt={post.author} data-ai-hint="author headshot"/>
                        <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{post.author}</p>
                        <p className="text-sm text-muted-foreground">{post.date}</p>
                    </div>
                </CardFooter>
              </Card>
            </Link>
          )
        })}
      </div>
      
      {visibleCount < blogs.length && (
        <div className="mt-12 text-center">
          <Button onClick={handleViewMore} size="lg">
            View More
          </Button>
        </div>
      )}
    </div>
  );
}
