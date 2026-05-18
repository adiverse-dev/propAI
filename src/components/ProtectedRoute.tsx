import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';

/**
 * ProtectedRoute — guards authenticated routes.
 *
 * Optional `requiredRole` prop:
 * - 'admin' → only admin users can access; tenants are redirected to /tenant
 * - 'tenant' → only tenant users can access; admins are redirected to /app/dashboard
 * - undefined → any authenticated user may access
 */
interface ProtectedRouteProps {
  requiredRole?: 'admin' | 'tenant';
}

export default function ProtectedRoute({ requiredRole }: ProtectedRouteProps = {}) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  // Not logged in → redirect to login, saving intended destination
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role mismatch guards
  if (requiredRole === 'admin' && user?.role === 'tenant') {
    return <Navigate to="/tenant" replace />;
  }
  if (requiredRole === 'tenant' && user?.role === 'admin') {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <Outlet />;
}
