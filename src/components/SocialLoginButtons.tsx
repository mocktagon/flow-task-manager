
import React from 'react';
import { Button } from '@/components/ui/button';
import useAuth from '@/hooks/useAuth';
import { toast } from 'sonner';

interface SocialLoginButtonsProps {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ 
  onSuccess = () => {}, 
  onError = () => {}
}) => {
  const { loginWithGoogle, isLoading } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const success = await loginWithGoogle();
      if (success) {
        toast.success('Google login successful');
        onSuccess();
      } else {
        const errorMessage = 'Google login failed';
        toast.error(errorMessage);
        onError(errorMessage);
      }
    } catch (error) {
      const errorMessage = 'An error occurred during Google login';
      toast.error(errorMessage);
      onError(errorMessage);
    }
  };

  return (
    <div className="space-y-3">
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
    </div>
  );
};

export default SocialLoginButtons;
