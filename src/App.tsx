import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './lib/theme';
import { AuthProvider } from './lib/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import AdminDashboard from './pages/AdminDashboard';
import TenantPortal from './pages/TenantPortal';
import AdminMessages from './pages/AdminMessages';
import Profile from './pages/Profile';
import SettingsPlaceholder from './pages/SettingsPlaceholder';
import PropertiesPage from './pages/PropertiesPage';
import TenantsPage from './pages/TenantsPage';
import PaymentsPage from './pages/PaymentsPage';
import HiveAIConcierge from './components/HiveAIConcierge';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* ─── Public Landing Page ─────────────────────────── */}
            <Route path="/" element={<LandingPage />} />

            {/* ─── Public Auth Routes ───────────────────────────── */}
            <Route element={<PublicLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Route>

            {/* ─── Protected Admin Routes ───────────────────────── */}
            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path="/app" element={<ProtectedLayout />}>
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="properties" element={<PropertiesPage />} />
                <Route path="tenants" element={<TenantsPage />} />
                <Route path="payments" element={<PaymentsPage />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="settings" element={<SettingsPlaceholder />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>

            {/* ─── Protected Tenant Routes ──────────────────────── */}
            <Route element={<ProtectedRoute requiredRole="tenant" />}>
              <Route path="/tenant" element={<TenantPortal />} />
            </Route>

            {/* ─── 404 ─────────────────────────────────────────── */}
            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
          <HiveAIConcierge />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
