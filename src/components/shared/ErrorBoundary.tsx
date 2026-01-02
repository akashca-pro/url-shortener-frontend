import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCw, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/shared/Button';

export const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = 'Something went wrong';
  let description = 'An unexpected error occurred. Please try again.';
  let statusCode: number | null = null;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    switch (error.status) {
      case 404:
        title = 'Page not found';
        description = "The page you're looking for doesn't exist or has been moved.";
        break;
      case 401:
        title = 'Unauthorized';
        description = 'You need to be logged in to access this page.';
        break;
      case 403:
        title = 'Access denied';
        description = "You don't have permission to access this resource.";
        break;
      case 500:
        title = 'Server error';
        description = 'Our servers are having issues. Please try again later.';
        break;
      default:
        title = `Error ${error.status}`;
        description = error.statusText || 'An error occurred.';
    }
  } else if (error instanceof Error) {
    description = error.message;
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/dashboard', { replace: true });
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Error Icon */}
        <div className="relative">
          <div className="absolute inset-0 bg-destructive/20 blur-3xl rounded-full" />
          <div className="relative inline-flex items-center justify-center w-24 h-24 rounded-full bg-destructive/10 border border-destructive/20">
            <AlertTriangle className="w-12 h-12 text-destructive" />
          </div>
        </div>

        {/* Status Code */}
        {statusCode && (
          <div className="text-7xl font-bold text-muted-foreground/30">
            {statusCode}
          </div>
        )}

        {/* Error Message */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Button variant="outline" onClick={handleGoBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button onClick={handleGoHome}>
            <Home className="w-4 h-4 mr-2" />
            Go Home
          </Button>
        </div>

        {/* Dev Info */}
        {import.meta.env.DEV && error instanceof Error && (
          <details className="mt-8 text-left">
            <summary className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors">
              Developer Details
            </summary>
            <pre className="mt-4 p-4 rounded-lg bg-muted text-xs overflow-auto max-h-48 text-muted-foreground">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
};
