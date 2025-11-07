'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useAuth, initiateEmailSignIn, initiateEmailSignUp } from '@/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { getAuth, onAuthStateChanged, AuthError } from 'firebase/auth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  
  useState(() => {
    if(!auth) return;
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        toast({ title: "Signed in successfully!"});
        router.push('/admin');
      }
    }, (error: AuthError) => {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error.message || "Could not sign in.",
        });
    });
    return () => unsubscribe();
  }, [auth, router, toast])

  if (isUserLoading) {
    return <p>Loading...</p>;
  }
  
  if(user) {
    router.push('/admin');
    return null;
  }

  const handleAuthAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSigningUp) {
      initiateEmailSignUp(auth, email, password);
    } else {
      initiateEmailSignIn(auth, email, password);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-full py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-center">{isSigningUp ? 'Create an Account' : 'Sign In'}</CardTitle>
          <CardDescription className="text-center">
            {isSigningUp ? 'to manage your stories' : 'to access the admin dashboard'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAuthAction} className="space-y-6">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <Button type="submit" className="w-full">
                {isSigningUp ? 'Sign Up' : 'Sign In'}
              </Button>
            </div>
          </form>
          <div className="text-center mt-4">
            <Button variant="link" onClick={() => setIsSigningUp(!isSigningUp)}>
              {isSigningUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
