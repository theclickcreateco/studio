"use client";

import { useState } from 'react';
import type { Story } from '@/lib/stories';
import Link from 'next/link';
import { Button } from './ui/button';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { BookmarkButton } from './BookmarkButton';
import { cn } from '@/lib/utils';

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

  return (
    <div className="flex flex-col items-center justify-center h-full p-4 sm:p-8 bg-background page-transition">
      <div className="w-full max-w-4xl bg-card rounded-2xl shadow-2xl p-8 sm:p-12 md:p-16 aspect-[4/3] flex flex-col justify-between relative">
        <div className="absolute top-4 right-4 flex items-center gap-2">
           <BookmarkButton storyId={story.id} />
           <Link href="/" passHref>
             <Button variant="ghost" size="icon" aria-label="Back to Library">
                <Home className="w-6 h-6 text-primary" />
             </Button>
           </Link>
        </div>
        
        <div className="text-center text-2xl md:text-3xl lg:text-4xl leading-relaxed text-foreground flex-grow flex items-center justify-center">
          <p>
            {page.interactiveElement ? (
              <InteractiveWord word={page.interactiveElement.word} text={page.text} />
            ) : (
              page.text
            )}
          </p>
        </div>

        <div className="flex justify-between items-center">
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
  );
}
