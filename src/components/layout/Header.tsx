import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector'; // Corrected import source in actual file
import { useAppDispatch as useAppDispatchHook } from '@/hooks/useAppDispatch';
import { logout } from '@/store/slices/auth.slice';
import { logout as logoutApi } from '@/features/auth/api/auth';
import { Button } from '@/components/shared/Button';
import { LogOut, Link as LinkIcon, User } from 'lucide-react';
import { toast } from 'sonner';

export const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatchHook();

  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(logout());
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between mx-auto md:px-8 px-4">
        <div className="flex items-center gap-2 font-bold text-xl">
          <LinkIcon className="h-6 w-6 text-primary" />
          <Link to="/">ShortURL</Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span className="hidden md:inline">{user?.name}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
};
