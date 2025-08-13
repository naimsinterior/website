
'use client';

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { blogs, Blog } from "./blogs";
import { ArrowRight } from "lucide-react";

const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const featuredPost = blogs[0];
  const otherPosts = blogs.slice(1);

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

      {/* Featured Post Section */}
      {featuredPost && (
        <section className="mb-16">
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
                <Card className="grid md:grid-cols-2 overflow-hidden">
                    <div className="relative h-80 md:h-full w-full">
                        <Image
                            src={featuredPost.images[0]}
                            alt={featuredPost.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={featuredPost.aiHint}
                            priority
                        />
                         <Badge variant="secondary" className="absolute top-4 left-4 z-10">Featured</Badge>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                        <p className="text-sm text-primary font-semibold mb-2">{featuredPost.category}</p>
                        <h2 className="font-headline text-3xl md:text-4xl group-hover:text-primary transition-colors">{featuredPost.title}</h2>
                        <p className="mt-4 text-muted-foreground text-lg">{featuredPost.description}</p>
                        <div className="mt-6 flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={featuredPost.authorImage} alt={featuredPost.author} data-ai-hint="author headshot"/>
                                <AvatarFallback>{featuredPost.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-semibold">{featuredPost.author}</p>
                                <p className="text-sm text-muted-foreground">{featuredPost.date}</p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center text-primary font-semibold">
                            Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                </Card>
            </Link>
        </section>
      )}


      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {otherPosts.slice(0, visibleCount).map((post) => {
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
      
      {visibleCount < otherPosts.length && (
        <div className="mt-12 text-center">
          <Button onClick={handleViewMore} size="lg">
            View More
          </Button>
        </div>
      )}
    </div>
  );
}
