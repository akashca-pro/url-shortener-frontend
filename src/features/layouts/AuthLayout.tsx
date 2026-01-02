import { Outlet } from 'react-router-dom';
import { Link as LinkIcon } from 'lucide-react';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center items-center bg-muted p-10 text-muted-foreground">
        <div className="max-w-md space-y-4 text-center">
            <div className="flex justify-center mb-8">
                <div className="p-4 bg-background rounded-2xl shadow-lg">
                    <LinkIcon className="h-12 w-12 text-primary" />
                </div>
            </div>
          <h1 className="text-4xl font-bold text-foreground">Shorten Your Links</h1>
          <p className="text-lg">
            Create short, memorable links in seconds. Track clicks and manage your URLs with ease.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-full max-w-sm space-y-6">
            <div className="lg:hidden flex items-center gap-2 font-bold text-xl mb-8">
                <LinkIcon className="h-6 w-6 text-primary" />
                <span>ShortURL</span>
            </div>
            <Outlet />
        </div>
      </div>
    </div>
  );
};
