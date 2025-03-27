
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Calendar, Mail } from 'lucide-react';
import { toast } from 'sonner';
import useAuth from '@/hooks/useAuth';
import { Separator } from '@/components/ui/separator';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginWithGoogle, isLoading } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    try {
      const success = await login(email, password);
      if (success) {
        toast.success('Login successful');
        // No need to navigate here - useAuth hook will handle it
      }
    } catch (error) {
      toast.error('An error occurred during login');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const success = await loginWithGoogle();
      if (success) {
        toast.success('Google login successful');
      }
    } catch (error) {
      toast.error('An error occurred during Google login');
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
            <CardTitle className="text-2xl">Log in</CardTitle>
            <CardDescription>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full flex items-center justify-center gap-2" 
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                <path d="M17.9813 8.52263C17.2789 7.84789 16.4294 7.31439 15.4934 6.95598C14.5575 6.59758 13.5559 6.41965 12.545 6.4325C10.8654 6.41479 9.2251 6.93737 7.87971 7.91942C6.53432 8.90147 5.5527 10.2782 5.1017 11.8403C4.65069 13.4024 4.75729 15.0603 5.40235 16.555C6.04741 18.0498 7.19827 19.2931 8.66061 20.0818C10.123 20.8705 11.8035 21.1584 13.4512 20.9013C15.0989 20.6442 16.6197 19.8561 17.7875 18.6578" stroke="url(#paint0_linear)" strokeLinecap="round" />
                <path d="M12.3896 11.828L16.8035 7.41418" stroke="url(#paint1_linear)" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.3896 11.828L16.8035 7.41418" stroke="url(#paint1_linear)" strokeOpacity="0.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.3896 11.828L16.8035 7.41418" stroke="url(#paint1_linear)" strokeOpacity="0.2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12.3896 11.828L7.97571 7.41418" stroke="url(#paint3_linear)" strokeLinecap="round" strokeLinejoin="round" />
                <defs>
                  <linearGradient id="paint0_linear" x1="18.2868" y1="20.9861" x2="4.08021" y2="6.4325" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#4285F4" />
                    <stop offset="1" stopColor="#4285F4" />
                  </linearGradient>
                  <linearGradient id="paint1_linear" x1="14.5966" y1="9.62109" x2="14.5966" y2="9.62109" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#EA4335" />
                    <stop offset="1" stopColor="#EA4335" />
                  </linearGradient>
                  <linearGradient id="paint3_linear" x1="10.1827" y1="9.62109" x2="10.1827" y2="9.62109" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#34A853" />
                    <stop offset="1" stopColor="#34A853" />
                  </linearGradient>
                </defs>
              </svg>
              {isLoading ? 'Connecting...' : 'Continue with Google'}
            </Button>

            <div className="flex items-center gap-2">
              <div className="h-px bg-border flex-1"></div>
              <span className="text-xs text-muted-foreground">OR</span>
              <div className="h-px bg-border flex-1"></div>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Log in'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline">
                Sign up
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

export default Login;
