"use client";

import { useBookmarks } from '@/hooks/useBookmarks';
import { Button } from '@/components/ui/button';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface BookmarkButtonProps {
  storyId: string;
}

export function BookmarkButton({ storyId }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark, isLoaded } = useBookmarks();

  if (!isLoaded) {
    return (
      <Button variant="ghost" size="icon" disabled className="text-muted-foreground/50">
        <Bookmark className="w-6 h-6" />
      </Button>
    );
  }

  const bookmarked = isBookmarked(storyId);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              toggleBookmark(storyId);
            }}
            aria-label={bookmarked ? 'Remove from favorites' : 'Add to favorites'}
            className="text-accent hover:text-primary"
          >
            <Bookmark
              className={cn(
                'w-6 h-6 transition-all duration-300',
                bookmarked ? 'fill-current' : 'fill-none'
              )}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{bookmarked ? 'Remove bookmark' : 'Bookmark story'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
