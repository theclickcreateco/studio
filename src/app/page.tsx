'use client';

import { StoryCard } from '@/components/StoryCard';
import { useCollection, useMemoFirebase } from '@/firebase';
import { useFirestore } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import type { Story } from '@/lib/stories';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
  const firestore = useFirestore();
  const storiesQuery = useMemoFirebase(
    () => (firestore ? query(collection(firestore, 'stories'), orderBy('title')) : null),
    [firestore]
  );
  const { data: stories, isLoading } = useCollection<Story>(storiesQuery);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold font-headline mb-8 text-center text-primary">
        Story Library
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {isLoading && Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
             <Skeleton className="h-[400px] w-full rounded-xl" />
             <div className="space-y-2">
               <Skeleton className="h-4 w-3/4" />
               <Skeleton className="h-4 w-1/2" />
             </div>
           </div>
        ))}
        {stories?.map((story: Story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}
