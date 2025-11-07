import { stories } from '@/lib/stories';
import { notFound, redirect } from 'next/navigation';
import { StoryViewer } from '@/components/StoryViewer';

export default function StoryPage({ params }: { params: { id: string; pageNumber: string } }) {
  const story = stories.find((s) => s.id === params.id);
  const pageNumber = parseInt(params.pageNumber, 10);

  if (!story || isNaN(pageNumber)) {
    notFound();
  }

  const page = story.pages.find((p) => p.pageNumber === pageNumber);

  if (!page) {
    if (pageNumber > 0 && pageNumber <= story.pages.length) {
      // This should not happen if data is consistent
      redirect(`/story/${story.id}/1`);
    } else {
      notFound();
    }
  }

  return <StoryViewer story={story} page={page} />;
}
