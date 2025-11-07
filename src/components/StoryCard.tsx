import Link from 'next/link';
import Image from 'next/image';
import type { Story } from '@/lib/stories';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookmarkButton } from './BookmarkButton';

interface StoryCardProps {
  story: Story;
}

export function StoryCard({ story }: StoryCardProps) {
  const placeholder = PlaceHolderImages.find((p) => p.id === story.coverImageId);
  const imageUrl = placeholder?.imageUrl || "https://picsum.photos/seed/default/600/800";
  const imageHint = placeholder?.imageHint || 'story cover';

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
      <Link href={`/story/${story.id}/1`} className="flex flex-col flex-grow">
        <CardHeader className="p-0 relative">
          <Image
            src={imageUrl}
            alt={`Cover for ${story.title}`}
            width={600}
            height={800}
            className="w-full h-auto object-cover aspect-[3/4]"
            data-ai-hint={imageHint}
          />
        </CardHeader>
        <CardContent className="flex-grow p-4">
          <CardTitle className="text-lg font-bold font-headline mb-1">{story.title}</CardTitle>
          <p className="text-sm text-muted-foreground">by {story.author}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 flex justify-end">
        <BookmarkButton storyId={story.id} />
      </CardFooter>
    </Card>
  );
}
