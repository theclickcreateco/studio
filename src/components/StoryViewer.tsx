'use client';

import { useState } from 'react';
import type { Story } from '@/lib/stories';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { BookmarkButton } from './BookmarkButton';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type Page = Story['pages'][0];

interface StoryViewerProps {
  story: Story;
  page: Page;
}

const InteractiveWord = ({ word, text }: { word: string; text: string }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const parts = text.split(new RegExp(`(${word})`, 'gi'));

  const handleClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600); // match animation duration
  };

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === word.toLowerCase() ? (
          <span
            key={i}
            onClick={handleClick}
            className={cn(
              'inline-block cursor-pointer font-bold text-primary transition-transform hover:scale-110',
              isAnimating && 'word-bounce'
            )}
          >
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
};

export function StoryViewer({ story, page }: StoryViewerProps) {
  const totalPages = story.pages.length;
  const isFirstPage = page.pageNumber === 1;
  const isLastPage = page.pageNumber === totalPages;
  
  const placeholder = PlaceHolderImages.find((p) => p.id === page.imageId);
  const imageUrl = placeholder?.imageUrl || "https://picsum.photos/seed/default/900/1600";
  const imageHint = placeholder?.imageHint || 'story page';

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 sm:p-8 bg-background page-transition">
      <div className="w-full max-w-6xl bg-card rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 relative">
        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
           <BookmarkButton storyId={story.id} />
           <Link href="/" passHref>
             <Button variant="ghost" size="icon" aria-label="Back to Library">
                <Home className="w-6 h-6 text-primary" />
             </Button>
           </Link>
        </div>

        <div className="md:w-1/3 flex items-center justify-center">
            <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={`Illustration for page ${page.pageNumber}`}
                    fill
                    className="object-cover"
                    data-ai-hint={imageHint}
                />
            </div>
        </div>
        
        <div className="md:w-2/3 flex flex-col justify-between">
            <div className="text-center text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground flex-grow flex items-center justify-center">
                <p>
                    {page.interactiveElement ? (
                    <InteractiveWord word={page.interactiveElement.word} text={page.text} />
                    ) : (
                    page.text
                    )}
                </p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <Link href={`/story/${story.id}/${page.pageNumber - 1}`} passHref>
                <Button variant="outline" size="lg" disabled={isFirstPage} aria-label="Previous Page">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Previous
                </Button>
              </Link>
              <div className="text-lg font-bold text-muted-foreground">
                {page.pageNumber} / {totalPages}
              </div>
              <Link href={`/story/${story.id}/${page.pageNumber + 1}`} passHref>
                <Button variant="outline" size="lg" disabled={isLastPage} aria-label="Next Page">
                  Next
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
}
