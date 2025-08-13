
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { blogs, Blog } from '../blogs';
import { LeadForm } from '@/components/LeadForm';
import { Facebook, Twitter, Linkedin, Link2, ArrowRight, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';


export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = blogs.find((p) => p.slug === params.slug);
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  
  if (!post) {
    notFound();
  }
  
  const relatedPosts = blogs
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const handleShare = async (platform: 'facebook' | 'twitter' | 'linkedin' | 'copy') => {
      const url = window.location.href;
      const text = `Check out this blog post: ${post.title}`;
      let shareUrl = '';

      switch(platform) {
          case 'facebook':
              shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
              break;
          case 'twitter':
              shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
              break;
          case 'linkedin':
              shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.description)}`;
              break;
          case 'copy':
              navigator.clipboard.writeText(url);
              toast({
                title: "Link Copied!",
                description: "Blog post link has been copied to your clipboard.",
              });
              return;
      }
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    toast({
        title: isLiked ? "Unliked!" : "Liked!",
        description: `You've ${isLiked ? 'unliked' : 'liked'} this post.`,
    });
  }

  return (
    <div>
      <section className="relative h-[50vh] w-full">
          <Image
              src={post.images[0]}
              alt={post.title}
              fill
              className="z-0 object-cover"
              data-ai-hint={post.aiHint}
              priority
          />
          <div className="relative z-10 flex h-full flex-col items-center justify-center bg-black/50 text-center text-white p-4">
              <h1 className="font-headline text-4xl md:text-6xl max-w-4xl">{post.title}</h1>
              <p className="mt-4 max-w-2xl text-lg md:text-xl">{post.description}</p>
          </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid lg:grid-cols-3 gap-12">
          <article className="lg:col-span-2">
              <header className="mb-8">
                  <Badge variant="destructive" className="mb-4 inline-block">{post.category}</Badge>
                   <p className="text-lg text-muted-foreground">{post.longDescription}</p>
              </header>
              
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

              <div className="my-8 flex items-center justify-between gap-2">
                  <Button variant="outline" size="icon" onClick={handleLike} aria-label="Like post">
                      <Heart className={cn("h-5 w-5", isLiked && "fill-destructive text-destructive")} />
                  </Button>
                  <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground mr-2">Share this post:</p>
                      <Button variant="outline" size="icon" onClick={() => handleShare('facebook')} aria-label="Share on Facebook">
                          <Facebook className="h-5 w-5" />
                      </Button>
                       <Button variant="outline" size="icon" onClick={() => handleShare('twitter')} aria-label="Share on Twitter">
                          <Twitter className="h-5 w-5" />
                      </Button>
                       <Button variant="outline" size="icon" onClick={() => handleShare('linkedin')} aria-label="Share on LinkedIn">
                          <Linkedin className="h-5 w-5" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={() => handleShare('copy')} aria-label="Copy Link">
                          <Link2 className="h-5 w-5" />
                      </Button>
                  </div>
              </div>
          </article>

          <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                  <LeadForm />

                  {relatedPosts.length > 0 && (
                      <div>
                          <h2 className="font-headline text-2xl md:text-3xl mb-4">Related Posts</h2>
                           <div className="space-y-4">
                              {relatedPosts.map((relatedPost) => (
                              <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`} className="group block">
                                  <Card className="p-4 hover:bg-muted transition-colors">
                                     <div className="flex items-center justify-between">
                                          <h3 className="font-headline text-lg group-hover:text-primary">{relatedPost.title}</h3>
                                          <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                                     </div>
                                  </Card>
                              </Link>
                              ))}
                          </div>
                      </div>
                  )}
              </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
