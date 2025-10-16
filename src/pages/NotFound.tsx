import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6 space-y-6">
            {/* 404 Illustration */}
            <div className="space-y-4">
              <div className="text-6xl font-bold text-primary">404</div>
              <h1 className="text-2xl font-semibold">Page Not Found</h1>
              <p className="text-muted-foreground">
                Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or you entered the wrong URL.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link to="/dashboard">
                  <Home className="h-4 w-4 mr-2" />
                  Go to Dashboard
                </Link>
              </Button>
              
              <Button variant="outline" onClick={() => window.history.back()} className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Go Back
              </Button>
            </div>

            {/* Help Text */}
            <div className="pt-4 border-t">
              <p className="text-sm text-muted-foreground">
                Need help? Contact our support team or visit the{' '}
                <Link to="/dashboard" className="text-primary hover:underline">
                  dashboard
                </Link>
                {' '}to get started.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
