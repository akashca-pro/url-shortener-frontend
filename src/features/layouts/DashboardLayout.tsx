import { Header } from '@/components/layout/Header';
import { Outlet } from 'react-router-dom';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-muted/40">
      <Header />
      <main className="container py-8 mx-auto md:px-8 px-4">
        <Outlet />
      </main>
    </div>
  );
};
