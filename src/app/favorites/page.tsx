'use client';

import { useBookmarks } from '@/hooks/useBookmarks';
import { stories, type Story } from '@/lib/stories';
import { StoryCard } from '@/components/StoryCard';
import { Heart } from 'lucide-react';

export default function FavoritesPage() {
  const { bookmarks, isLoaded } = useBookmarks();

  const favoriteStories = stories.filter((story) => bookmarks.includes(story.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-headline mb-8 text-center text-primary">
        Favorite Stories
      </h1>
      {!isLoaded ? (
        <p className="text-center text-muted-foreground">Loading your favorites...</p>
      ) : favoriteStories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favoriteStories.map((story: Story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Heart className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
          <h2 className="text-2xl font-bold">No Favorites Yet</h2>
          <p className="text-muted-foreground mt-2">
            Click the bookmark icon on a story to add it to your favorites!
          </p>
        </div>
      )}
    </div>
  );
}
