"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Library, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUser } from '@/firebase';

export function Header() {
  const pathname = usePathname();
  const { user } = useUser();

  const navLinks = [
    { href: '/', label: 'Library', icon: Library },
    { href: '/favorites', label: 'Favorites', icon: Heart },
  ];

  return (
    <header className="bg-card shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold font-headline text-primary">
          <Sparkles className="w-8 h-8 text-accent" />
          <span>WhimsyTales</span>
        </Link>
        <nav className="flex items-center gap-4">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                pathname === href
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-secondary'
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
           <Link
              href={user ? "/admin" : "/login"}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                pathname === '/admin' || pathname === '/login'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-secondary'
              )}
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{user ? 'Admin' : 'Login'}</span>
            </Link>
        </nav>
      </div>
    </header>
  );
}
