"use client";

import { useState, useEffect, useCallback } from 'react';
import { useToast } from './use-toast';

const BOOKMARKS_KEY = 'whimsyTalesBookmarks';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(BOOKMARKS_KEY);
      if (item) {
        setBookmarks(JSON.parse(item));
      }
    } catch (error) {
      console.error('Failed to load bookmarks from localStorage', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
      } catch (error) {
        console.error('Failed to save bookmarks to localStorage', error);
      }
    }
  }, [bookmarks, isLoaded]);

  const addBookmark = useCallback((storyId: string) => {
    setBookmarks((prev) => {
      if (prev.includes(storyId)) {
        return prev;
      }
      const newBookmarks = [...prev, storyId];
      toast({ title: 'Story Bookmarked!', description: "You can find it in your favorites." });
      return newBookmarks;
    });
  }, [toast]);

  const removeBookmark = useCallback((storyId: string) => {
    setBookmarks((prev) => {
      if (!prev.includes(storyId)) {
        return prev;
      }
      const newBookmarks = prev.filter((id) => id !== storyId);
      toast({ title: 'Bookmark Removed', variant: 'destructive' });
      return newBookmarks;
    });
  }, [toast]);

  const isBookmarked = useCallback((storyId: string) => {
    return bookmarks.includes(storyId);
  }, [bookmarks]);

  const toggleBookmark = useCallback((storyId: string) => {
    if (isBookmarked(storyId)) {
      removeBookmark(storyId);
    } else {
      addBookmark(storyId);
    }
  }, [isBookmarked, addBookmark, removeBookmark]);

  return { bookmarks, toggleBookmark, isBookmarked, isLoaded };
};
