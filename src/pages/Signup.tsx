
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Calendar, Check } from 'lucide-react';
import { toast } from 'sonner';
import useAuth from '@/hooks/useAuth';
import SocialLoginButtons from '@/components/SocialLoginButtons';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, isLoading } = useAuth();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      const success = await signup(name, email, password);
      if (success) {
        toast.success('Account created successfully!');
      }
    } catch (error) {
      toast.error('An error occurred during signup');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-background flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-semibold text-foreground tracking-tight">Flow Tasks</h1>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md border-border/30 bg-card/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Sign up</CardTitle>
            <CardDescription>
              Create an account to start organizing your tasks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SocialLoginButtons />

            <div className="flex items-center gap-2">
              <div className="h-px bg-border flex-1"></div>
              <span className="text-xs text-muted-foreground">OR</span>
              <div className="h-px bg-border flex-1"></div>
            </div>
            
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create account'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </div>
            <Link to="/" className="text-sm text-center text-muted-foreground hover:underline w-full">
              <Button variant="ghost" className="w-full flex items-center gap-1">
                <ArrowLeft className="h-4 w-4" />
                Back to home
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
};

export default Signup;
