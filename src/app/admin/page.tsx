'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { getAuth, signOut } from 'firebase/auth';

export default function AdminPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return <p className="text-center p-8">Loading...</p>;
  }

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold font-headline text-primary">
          Admin Dashboard
        </h1>
        <Button onClick={handleSignOut} variant="outline">Sign Out</Button>
      </div>
      <p>Welcome, {user.email}! This is where you'll manage your stories.</p>
      {/* Story management UI will go here */}
    </div>
  );
}
