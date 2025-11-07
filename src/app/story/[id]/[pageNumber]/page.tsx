'use client';

import { notFound, redirect } from 'next/navigation';
import { StoryViewer } from '@/components/StoryViewer';
import { useDoc, useMemoFirebase } from '@/firebase';
import { useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import type { Story } from '@/lib/stories';
import { Skeleton } from '@/components/ui/skeleton';

export default function StoryPage({ params }: { params: { id: string; pageNumber: string } }) {
  const firestore = useFirestore();
  const storyRef = useMemoFirebase(
    () => (firestore ? doc(firestore, 'stories', params.id) : null),
    [firestore, params.id]
  );
  const { data: story, isLoading } = useDoc<Story>(storyRef);
  const pageNumber = parseInt(params.pageNumber, 10);

  if (isLoading) {
    return (
       <div className="flex flex-col items-center justify-center h-full p-8">
         <div className="w-full max-w-6xl flex md:flex-row flex-col gap-8">
            <Skeleton className="md:w-1/3 w-full aspect-[9/16] rounded-lg" />
            <div className="md:w-2/3 w-full flex flex-col gap-4">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-1/2 mx-auto" />
               <div className="flex justify-between">
                <Skeleton className="h-12 w-32" />
                <Skeleton className="h-12 w-32" />
              </div>
            </div>
         </div>
       </div>
    )
  }

  if (!story || isNaN(pageNumber)) {
    notFound();
  }

  const page = story.pages.find((p) => p.pageNumber === pageNumber);

  if (!page) {
    if (pageNumber > 0 && pageNumber <= story.pages.length) {
      redirect(`/story/${story.id}/1`);
    } else {
      notFound();
    }
  }

  return <StoryViewer story={story} page={page} />;
}
