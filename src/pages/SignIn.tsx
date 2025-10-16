import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

export default function SignIn() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center">
          <img 
            src="/assets/logo.png" 
            alt="EDUMENTOR" 
            className="h-12 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-foreground">Welcome to EDUMENTOR</h1>
          <p className="text-muted-foreground mt-2">Connect with mentors and expand your learning</p>
        </div>

        {/* Sign-in Card */}
        <Card className="border shadow-lg">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-xl">Sign in to your account</CardTitle>
            <CardDescription>
              Use your Gmail account to access EDUMENTOR
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Gmail Sign-in Button */}
            <Button 
              className="w-full h-12 text-base font-medium" 
              variant="outline"
              size="lg"
            >
              <Mail className="h-5 w-5 mr-3" />
              Continue with Gmail
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Secure Authentication
                </span>
              </div>
            </div>

            {/* Privacy Note */}
            <div className="text-center text-sm text-muted-foreground">
              <p>
                By signing in, you agree to our{' '}
                <Link to="/terms" className="underline hover:text-primary">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="underline hover:text-primary">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <Link 
            to="/" 
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}