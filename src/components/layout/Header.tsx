import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch as useAppDispatchHook } from '@/hooks/useAppDispatch';
import { logout } from '@/store/slices/auth.slice';
import { logout as logoutApi } from '@/features/auth/api/auth';
import { Button } from '@/components/shared/Button';
import { ConfirmModal } from '@/components/shared/ConfirmModal';
import { LogOut, Link as LinkIcon, User } from 'lucide-react';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/errorUtils';

export const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatchHook();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleHomeClick = () => {
    // Only navigate if not already on dashboard, and always replace to avoid history stacking
    if (location.pathname !== '/dashboard') {
      navigate('/dashboard');
    }
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutApi();
      dispatch(logout());
      toast.success('Logged out successfully');
      setIsLogoutModalOpen(false);
    } catch (error: unknown) {
      toast.error(getErrorMessage(error, 'Failed to logout'));
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between mx-auto md:px-8 px-4">
          <button 
            onClick={handleHomeClick}
            className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity"
          >
            <LinkIcon className="h-6 w-6 text-primary" />
            <span>ShortURL</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="hidden md:inline">{user?.name}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsLogoutModalOpen(true)}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <ConfirmModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        description="Are you sure you want to log out? You will need to sign in again to access your dashboard."
        confirmText="Logout"
        cancelText="Cancel"
        isLoading={isLoggingOut}
        variant="destructive"
      />
    </>
  );
};
