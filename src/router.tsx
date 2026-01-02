import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/features/layouts/AuthLayout';
import { DashboardLayout } from '@/features/layouts/DashboardLayout';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { PublicOnlyRoute } from '@/features/auth/components/PublicOnlyRoute';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';
import { Loader2 } from 'lucide-react';

const LoginPage = lazy(() => import('@/features/auth/login/LoginPage').then(m => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import('@/features/auth/signup/SignupPage').then(m => ({ default: m.SignupPage })));
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage').then(m => ({ default: m.DashboardPage })));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>
);

const withSuspense = (Component: React.LazyExoticComponent<React.ComponentType>) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
    errorElement: <ErrorBoundary />,
  },
  {
    element: <PublicOnlyRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: withSuspense(LoginPage),
          },
          {
            path: 'signup',
            element: withSuspense(SignupPage),
          },
        ]
      }
    ]
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: 'dashboard',
            element: withSuspense(DashboardPage),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <ErrorBoundary />,
  }
]);
