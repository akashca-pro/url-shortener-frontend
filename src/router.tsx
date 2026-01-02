import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthLayout } from '@/features/layouts/AuthLayout';
import { DashboardLayout } from '@/features/layouts/DashboardLayout';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { PublicOnlyRoute } from '@/features/auth/components/PublicOnlyRoute';
import { LoginPage } from '@/features/auth/login/LoginPage';
import { SignupPage } from '@/features/auth/signup/SignupPage';
import { DashboardPage } from '@/features/dashboard/pages/DashboardPage';
import { ErrorBoundary } from '@/components/shared/ErrorBoundary';

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
                    element: <LoginPage />,
                },
                {
                    path: 'signup',
                    element: <SignupPage />,
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
            element: <DashboardPage />,
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

