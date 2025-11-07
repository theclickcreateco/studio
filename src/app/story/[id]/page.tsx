import { redirect } from 'next/navigation';

export default function StoryPage({ params }: { params: { id: string } }) {
  redirect(`/story/${params.id}/1`);
}
