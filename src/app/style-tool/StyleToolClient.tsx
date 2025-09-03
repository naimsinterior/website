
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { suggestStyle, type SuggestStyleOutput } from '@/ai/flows/suggest-style';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Upload, Wand2, Loader2, ArrowRight } from 'lucide-react';
import { inspirations } from '../design/inspirations';
import { Separator } from '@/components/ui/separator';

export function StyleToolClient() {
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<SuggestStyleOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setSuggestions(null);
    }
  };

  const handleSubmit = async () => {
    if (!photoFile) {
      toast({
        title: "No photo selected",
        description: "Please upload a photo of your room first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setSuggestions(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(photoFile);
      reader.onload = async (e) => {
        const photoDataUri = e.target?.result as string;
        if (!photoDataUri) {
             throw new Error("Failed to read file");
        }
        const result = await suggestStyle({ photoDataUri });
        setSuggestions(result);
      };
      reader.onerror = (error) => {
        console.error("File reading error:", error);
        throw new Error("Failed to read file");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred",
        description: "Failed to get style suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8">
              <label htmlFor="photo-upload" className="cursor-pointer text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 font-semibold">
                  {photoFile ? 'Change Photo' : 'Click to upload a photo'}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">PNG, JPG, WEBP</p>
              </label>
              <Input id="photo-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
            </div>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
              {photoPreview ? (
                <Image src={photoPreview} alt="Room preview" fill className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                  Your photo will appear here
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <Button onClick={handleSubmit} disabled={!photoFile || isLoading} size="lg">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-5 w-5" />
                  Suggest Styles
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="mt-8 text-center">
           <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
           <p className="mt-4 text-muted-foreground">Our AI is analyzing your space...</p>
        </div>
      )}

      {suggestions && (
        <div className="mt-12">
          <Card className="p-6">
             <CardHeader className="p-0 text-center">
               <CardTitle className="font-headline text-3xl">AI Analysis Complete</CardTitle>
             </CardHeader>
             <CardContent className="p-0 mt-6">
               <div className="text-center">
                  <p className="text-sm uppercase tracking-widest text-muted-foreground">IDENTIFIED ROOM TYPE</p>
                  <p className="font-headline text-2xl">{suggestions.roomType}</p>
               </div>
               <div className="mt-6 text-left">
                  <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">WRITTEN SUGGESTIONS</p>
                  <p className="text-base text-foreground leading-relaxed">{suggestions.writtenSuggestions}</p>
               </div>

                {suggestions.suggestedStyles.length > 0 && (
                  <>
                    <Separator className="my-6" />
                    <div>
                      <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">DESIGN INSPIRATION</p>
                      <div className="grid gap-4 md:grid-cols-2">
                        {suggestions.suggestedStyles.map((style, index) => (
                          <div key={index}>
                            <h4 className="font-headline text-lg mb-2">{style.styleName}</h4>
                            <ul className="space-y-2">
                              {style.projectLinks.map((link, linkIndex) => {
                                const slug = link.split('/').pop();
                                const project = inspirations.find(p => p.slug === slug);
                                return (
                                  <li key={linkIndex}>
                                    <Link href={link} className="flex items-center justify-between rounded-md p-3 hover:bg-muted border">
                                      <div className="flex items-center gap-4">
                                          {project && <Image src={project.images[0]} alt={project.title} width={64} height={48} className="rounded-md object-cover" />}
                                          <span>{project ? project.title : 'View Project'}</span>
                                      </div>
                                      <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0"/>
                                    </Link>
                                  </li>
                                )
                              })}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
             </CardContent>
          </Card>
        </div>
      )}


       {suggestions && suggestions.suggestedStyles.length === 0 && !isLoading && (
          <div className="mt-12 text-center">
             <p className="text-muted-foreground">We couldn't determine a specific style. Try a different image for better results.</p>
          </div>
       )}
    </div>
  );
}
