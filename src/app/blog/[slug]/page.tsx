
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { blogs, Blog } from '../blogs';

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = blogs.find((p) => p.slug === params.slug);
  
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

  return (
    <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <article className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
            <p className="text-primary font-semibold">{post.category}</p>
            <h1 className="font-headline text-4xl md:text-6xl mt-2">{post.title}</h1>
            <div className="flex items-center justify-center gap-4 mt-6">
                <Avatar>
                    <AvatarImage src={post.authorImage} alt={post.author} data-ai-hint="author headshot" />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{post.author}</p>
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                </div>
            </div>
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

        <footer className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="font-semibold">Share this post:</p>
            <div className="flex gap-2">
                <Button variant="outline" size="icon" onClick={() => shareOnSocial('twitter')}><Twitter className="h-5 w-5" /></Button>
                <Button variant="outline" size="icon" onClick={() => shareOnSocial('facebook')}><Facebook className="h-5 w-5" /></Button>
                <Button variant="outline" size="icon" onClick={() => shareOnSocial('linkedin')}><Linkedin className="h-5 w-5" /></Button>
            </div>
        </footer>
      </article>

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
