
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Twitter, Facebook, Linkedin, Heart, List, Bookmark } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardTitle, CardDescription, CardHeader } from '@/components/ui/card';
import { blogs, Blog } from '../blogs';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = blogs.find((p) => p.slug === params.slug);
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  
  if (!post) {
    notFound();
  }
  
  const relatedPosts = blogs.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 2);

  const shareOnSocial = (platform: 'twitter' | 'facebook' | 'linkedin') => {
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;
    let shareUrl = '';
    
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.description)}`;
    }
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
        title: isLiked ? "Unliked!" : "Liked!",
        description: isLiked ? "You've removed this post from your likes." : "You've liked this post.",
    });
  }

  return (
    <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="grid lg:grid-cols-4 gap-12">
        <article className="lg:col-span-3">
            <header className="mb-12">
                <p className="text-primary font-semibold">{post.category}</p>
                <h1 className="font-headline text-4xl md:text-6xl mt-2">{post.title}</h1>
                 <p className="mt-4 text-lg text-muted-foreground">{post.longDescription}</p>
            </header>
            
            <div className="relative h-96 md:h-[500px] w-full mb-12 rounded-lg overflow-hidden">
                <Image
                    src={post.images[0]}
                    alt={post.title}
                    fill
                    className="object-cover"
                    data-ai-hint={post.aiHint}
                    priority
                />
            </div>
            
            <div 
              className="prose prose-lg max-w-none mx-auto text-foreground"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            <Separator className="my-12" />

            <Card className="bg-muted">
                <CardHeader>
                    <div className="flex items-start gap-6">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src={post.authorImage} alt={post.author} data-ai-hint="author headshot" />
                            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm text-muted-foreground">Written by</p>
                            <CardTitle className="font-headline text-2xl mt-1">{post.author}</CardTitle>
                            <p className="text-primary">{post.authorRole}</p>
                            <p className="text-sm text-muted-foreground mt-2">Published on {post.date}</p>
                        </div>
                    </div>
                </CardHeader>
            </Card>

        </article>

        <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                           <List className="h-5 w-5" /> Table of Contents
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-muted-foreground hover:text-primary">Section 1</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary">Section 2</a></li>
                            <li><a href="#" className="text-muted-foreground hover:text-primary">Section 3</a></li>
                        </ul>
                    </CardContent>
                </Card>

                <div>
                    <p className="font-semibold mb-2">Actions</p>
                    <div className="flex flex-col gap-2">
                        <Button variant="outline" onClick={handleLike}>
                            <Heart className={`mr-2 h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                            {isLiked ? 'Liked' : 'Like'}
                        </Button>
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline">Share Post</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                               <DropdownMenuItem onClick={() => shareOnSocial('twitter')}>
                                 <Twitter className="mr-2 h-4 w-4" /> Twitter
                               </DropdownMenuItem>
                               <DropdownMenuItem onClick={() => shareOnSocial('facebook')}>
                                 <Facebook className="mr-2 h-4 w-4" /> Facebook
                               </DropdownMenuItem>
                               <DropdownMenuItem onClick={() => shareOnSocial('linkedin')}>
                                 <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                               </DropdownMenuItem>
                            </DropdownMenuContent>
                         </DropdownMenu>
                    </div>
                </div>
            </div>
        </aside>

      </div>

      {relatedPosts.length > 0 && (
        <div className="mt-24">
          <Separator className="my-12" />
          <h2 className="text-center font-headline text-3xl md:text-4xl">Related Posts</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {relatedPosts.map((relatedPost) => (
               <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group block">
                <Card className="flex flex-col overflow-hidden h-full">
                    <CardHeader className="p-0 relative">
                      <div className="relative h-60 w-full">
                          <Image
                              src={relatedPost.images[0]}
                              alt={relatedPost.title}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                              data-ai-hint={relatedPost.aiHint}
                          />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <CardTitle className="font-headline text-2xl group-hover:text-primary transition-colors">{relatedPost.title}</CardTitle>
                      <CardDescription className="mt-2 text-base">{relatedPost.description}</CardDescription>
                    </CardContent>
                </Card>
               </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Dummy Dropdown components to satisfy the compiler
const DropdownMenu: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="relative inline-block text-left">{children}</div>;
const DropdownMenuTrigger: React.FC<{ children: React.ReactNode; asChild?: boolean }> = ({ children }) => <div>{children}</div>;
const DropdownMenuContent: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-background ring-1 ring-black ring-opacity-5 focus:outline-none">{children}</div>;
const DropdownMenuItem: React.FC<{ children: React.ReactNode; onClick: () => void; }> = ({ children, onClick }) => <div onClick={onClick} className="cursor-pointer px-4 py-2 text-sm text-foreground hover:bg-muted flex items-center">{children}</div>;

