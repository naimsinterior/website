
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

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const post = blogs.find((p) => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }
  
  const relatedPosts = blogs.filter(p => p.category === post.category && p.slug !== post.slug).slice(0, 2);

  return (
    <div className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <div className="grid lg:grid-cols-3 gap-12">
        <article className="lg:col-span-2">
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

            {relatedPosts.length > 0 && (
                <div className="mt-24">
                <h2 className="font-headline text-3xl md:text-4xl">Related Posts</h2>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
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
                            <p className="mt-2 text-base text-muted-foreground">{relatedPost.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                    ))}
                </div>
                </div>
            )}

        </article>

        <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
                <LeadForm />
            </div>
        </aside>

      </div>
    </div>
  );
}
