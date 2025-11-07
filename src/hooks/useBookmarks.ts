"use client";

import { useState, useEffect, useCallback } from 'react';
import { useToast } from './use-toast';
import { useUser, useFirestore } from '@/firebase';
import { doc, onSnapshot, setDoc, deleteDoc } from 'firebase/firestore';
import { setDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  useEffect(() => {
    if (user && firestore) {
      setIsLoaded(false);
      const bookmarksColRef = doc(firestore, 'users', user.uid);
      const unsubscribe = onSnapshot(bookmarksColRef, (snapshot) => {
        if (snapshot.exists() && snapshot.data().bookmarks) {
          setBookmarks(snapshot.data().bookmarks);
        } else {
          setBookmarks([]);
        }
        setIsLoaded(true);
      });
      return () => unsubscribe();
    } else if (!user) {
      // Handle logged out state
      try {
        const item = window.localStorage.getItem('whimsyTalesBookmarks_guest');
        if (item) {
          setBookmarks(JSON.parse(item));
        } else {
          setBookmarks([]);
        }
      } catch (error) {
        console.error('Failed to load bookmarks from localStorage', error);
        setBookmarks([]);
      }
      setIsLoaded(true);
    }
  }, [user, firestore]);

  useEffect(() => {
    if (!user && isLoaded) {
      try {
        window.localStorage.setItem('whimsyTalesBookmarks_guest', JSON.stringify(bookmarks));
      } catch (error) {
        console.error('Failed to save bookmarks to localStorage', error);
      }
    }
  }, [bookmarks, isLoaded, user]);

  const addBookmark = useCallback((storyId: string) => {
    if (user && firestore) {
      const userDocRef = doc(firestore, 'users', user.uid);
      const newBookmarks = [...bookmarks, storyId];
      setDocumentNonBlocking(userDocRef, { bookmarks: newBookmarks }, { merge: true });
      toast({ title: 'Story Bookmarked!', description: "You can find it in your favorites." });
    } else {
      setBookmarks(prev => [...prev, storyId]);
      toast({ title: 'Story Bookmarked!', description: "Sign in to save your favorites across devices." });
    }
  }, [user, firestore, bookmarks, toast]);

  const removeBookmark = useCallback((storyId: string) => {
    if (user && firestore) {
      const userDocRef = doc(firestore, 'users', user.uid);
      const newBookmarks = bookmarks.filter(id => id !== storyId);
      setDocumentNonBlocking(userDocRef, { bookmarks: newBookmarks }, { merge: true });
      toast({ title: 'Bookmark Removed', variant: 'destructive' });
    } else {
      setBookmarks(prev => prev.filter(id => id !== storyId));
      toast({ title: 'Bookmark Removed', variant: 'destructive' });
    }
  }, [user, firestore, bookmarks, toast]);

  const isBookmarked = useCallback((storyId: string) => {
    return bookmarks.includes(storyId);
  }, [bookmarks]);

  const toggleBookmark = useCallback((storyId: string) => {
    setBookmarks(prevBookmarks => {
      const isCurrentlyBookmarked = prevBookmarks.includes(storyId);
      if (isCurrentlyBookmarked) {
        if (user && firestore) {
          const userDocRef = doc(firestore, 'users', user.uid);
          const newBookmarks = prevBookmarks.filter(id => id !== storyId);
          setDocumentNonBlocking(userDocRef, { bookmarks: newBookmarks }, { merge: true });
        }
        toast({ title: 'Bookmark Removed', variant: 'destructive' });
        return prevBookmarks.filter(id => id !== storyId);
      } else {
        if (user && firestore) {
          const userDocRef = doc(firestore, 'users', user.uid);
          const newBookmarks = [...prevBookmarks, storyId];
          setDocumentNonBlocking(userDocRef, { bookmarks: newBookmarks }, { merge: true });
        }
        toast({ title: 'Story Bookmarked!', description: user ? "You can find it in your favorites." : "Sign in to save your favorites across devices." });
        return [...prevBookmarks, storyId];
      }
    });
  }, [user, firestore, toast]);

  return { bookmarks, toggleBookmark, isBookmarked, isLoaded };
};
