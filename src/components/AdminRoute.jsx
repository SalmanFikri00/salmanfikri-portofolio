import { Navigate, Outlet } from 'react-router-dom';
import { useAdminSession } from '../context/AdminSessionContext';

const AdminRoute = () => {
  const { user, isLoading, error } = useAdminSession();

  console.log('[AdminRoute] State:', { user: !!user, isLoading, error: !!error });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Checking credentials...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-50 flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-red-400">Authentication error</p>
          <p className="mt-3 text-sm text-zinc-400">
            {error.message ?? 'Unable to verify admin session. Please try signing in again.'}
          </p>
        </div>
      </div>
    );
  }

  if (user) {
    console.log('[AdminRoute] Access granted, rendering Outlet');
    return <Outlet />;
  }

  console.log('[AdminRoute] Access denied, redirecting to login');
  return <Navigate to="/admin/00/login" replace />;
};

export default AdminRoute;
