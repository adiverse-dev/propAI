import React, { useState } from 'react';
import { Box, Stack, Typography, Avatar, IconButton, Divider, Chip } from '@mui/material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/lib/AuthContext';
import {
  LayoutDashboard, Users, Home, Settings, LogOut, Bell, Search,
  MessageSquare, CreditCard, ChevronDown, ExternalLink, Building2
} from 'lucide-react';

export default function ProtectedLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems = [
    { label: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
    { label: 'Properties', path: '/app/properties', icon: Home },
    { label: 'Tenants', path: '/app/tenants', icon: Users },
    { label: 'Payments', path: '/app/payments', icon: CreditCard },
    { label: 'Messages', path: '/app/messages', icon: MessageSquare },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const userInitial = user?.name?.charAt(0).toUpperCase() || 'A';
  const displayName = user?.name || 'Admin';

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', background: '#F8F8F8' }}>

      {/* ── Sidebar ─────────────────────────────────────────── */}
      <Box sx={{
        width: 240, borderRight: '1px solid rgba(0,0,0,0.06)', background: '#FFFFFF',
        display: { xs: 'none', md: 'flex' }, flexDirection: 'column', flexShrink: 0,
        position: 'fixed', top: 0, bottom: 0, left: 0, zIndex: 20,
      }}>

        {/* Logo */}
        <Box sx={{ px: 3, py: 2.5, borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 28, height: 28, borderRadius: '8px', background: 'linear-gradient(135deg, #FF5A5F, #FF7B82)', boxShadow: '0 2px 6px rgba(255,90,95,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Building2 size={14} color="#fff" />
          </Box>
          <Box>
            <Typography sx={{ fontSize: '1rem', fontWeight: 800, color: '#111', letterSpacing: '-0.025em', lineHeight: 1.2 }}>Hivelvy</Typography>
            <Typography sx={{ fontSize: '0.6rem', color: '#bbb', fontWeight: 500 }}>Admin Portal</Typography>
          </Box>
        </Box>

        {/* Role badge */}
        <Box sx={{ px: 2.5, pt: 2, pb: 1 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.8, px: 1.5, py: 0.6, borderRadius: '8px', background: 'rgba(255,90,95,0.06)', border: '1px solid rgba(255,90,95,0.1)' }}>
            <Box sx={{ width: 5, height: 5, borderRadius: '50%', background: '#FF5A5F' }} />
            <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, color: '#FF5A5F', letterSpacing: '0.04em' }}>ADMIN VIEW</Typography>
          </Box>
        </Box>

        {/* Navigation */}
        <Stack spacing={0.4} sx={{ px: 2, flex: 1, pt: 1 }}>
          <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, color: '#ccc', textTransform: 'uppercase', letterSpacing: '0.08em', px: 1.5, mb: 0.5 }}>
            Main Menu
          </Typography>
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Stack
                key={item.label}
                component={motion.div}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                direction="row"
                alignItems="center"
                spacing={1.5}
                onClick={() => navigate(item.path)}
                sx={{
                  px: 1.5, py: 1, borderRadius: '9px', cursor: 'pointer',
                  background: isActive ? 'rgba(255,90,95,0.07)' : 'transparent',
                  borderLeft: isActive ? '2px solid #FF5A5F' : '2px solid transparent',
                  color: isActive ? '#FF5A5F' : '#717171',
                  '&:hover': { background: isActive ? 'rgba(255,90,95,0.07)' : 'rgba(0,0,0,0.03)', color: isActive ? '#FF5A5F' : '#111' },
                  transition: 'all 0.15s',
                }}
              >
                <item.icon size={16} color={isActive ? '#FF5A5F' : '#bbb'} />
                <Typography sx={{ fontSize: '0.85rem', fontWeight: isActive ? 600 : 500, color: 'inherit' }}>{item.label}</Typography>
              </Stack>
            );
          })}
        </Stack>

        {/* Bottom actions */}
        <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
          <Stack spacing={0.4}>
            {/* Back to Website */}
            <Stack
              component={motion.div} whileHover={{ x: 2 }}
              direction="row" alignItems="center" spacing={1.5}
              onClick={() => navigate('/')}
              sx={{ px: 1.5, py: 1, borderRadius: '9px', cursor: 'pointer', color: '#888', '&:hover': { background: 'rgba(0,0,0,0.03)', color: '#555' }, transition: 'all 0.15s' }}
            >
              <ExternalLink size={15} color="#ccc" />
              <Typography sx={{ fontSize: '0.82rem', fontWeight: 500, color: 'inherit' }}>Back to Website</Typography>
            </Stack>
            {/* Settings */}
            <Stack
              component={motion.div} whileHover={{ x: 2 }}
              direction="row" alignItems="center" spacing={1.5}
              onClick={() => navigate('/app/settings')}
              sx={{ px: 1.5, py: 1, borderRadius: '9px', cursor: 'pointer', color: '#888', '&:hover': { background: 'rgba(0,0,0,0.03)', color: '#555' }, transition: 'all 0.15s' }}
            >
              <Settings size={15} color="#ccc" />
              <Typography sx={{ fontSize: '0.82rem', fontWeight: 500, color: 'inherit' }}>Settings</Typography>
            </Stack>
            {/* Logout */}
            <Stack
              component={motion.div} whileHover={{ x: 2 }}
              direction="row" alignItems="center" spacing={1.5}
              onClick={handleLogout}
              sx={{ px: 1.5, py: 1, borderRadius: '9px', cursor: 'pointer', '&:hover': { background: 'rgba(255,90,95,0.04)' }, transition: 'all 0.15s' }}
            >
              <LogOut size={15} color="#FF5A5F" />
              <Typography sx={{ fontSize: '0.82rem', fontWeight: 500, color: '#FF5A5F' }}>Log out</Typography>
            </Stack>
          </Stack>

          {/* User card */}
          <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: 1.2, cursor: 'pointer' }} onClick={() => navigate('/app/profile')}>
            <Avatar sx={{ width: 30, height: 30, bgcolor: '#111', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0 }}>{userInitial}</Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#111', lineHeight: 1.2, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{displayName}</Typography>
              <Typography sx={{ fontSize: '0.62rem', color: '#bbb', textTransform: 'capitalize' }}>{user?.email || 'admin@hivelvy.com'}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* ── Main Content ────────────────────────────────────── */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', ml: { xs: 0, md: '240px' } }}>

        {/* Topbar */}
        <Box sx={{
          height: 58, borderBottom: '1px solid rgba(0,0,0,0.05)', background: 'rgba(255,255,255,0.92)',
          backdropFilter: 'blur(16px)', display: 'flex', alignItems: 'center', px: { xs: 2, md: 4 },
          justifyContent: 'space-between', zIndex: 10, flexShrink: 0, position: 'sticky', top: 0,
        }}>
          <Box sx={{ width: { xs: 160, md: 260 }, height: 32, borderRadius: '8px', background: '#F5F5F5', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', px: 1.5, gap: 1, cursor: 'text' }}>
            <Search size={13} color="#bbb" />
            <Typography sx={{ fontSize: '0.78rem', color: '#ccc' }}>Search anything…</Typography>
          </Box>

          <Stack direction="row" alignItems="center" spacing={1.5}>
            {/* Notifications */}
            <Box sx={{ position: 'relative' }}>
              <IconButton size="small" onClick={() => setShowNotifications(!showNotifications)}
                sx={{ width: 34, height: 34, borderRadius: '9px', background: showNotifications ? 'rgba(0,0,0,0.04)' : 'transparent', '&:hover': { background: 'rgba(0,0,0,0.04)' } }}>
                <Bell size={16} color="#888" />
              </IconButton>
              <Box sx={{ position: 'absolute', top: 7, right: 9, width: 6, height: 6, borderRadius: '50%', background: '#FF5A5F', border: '1.5px solid #fff' }} />
            </Box>

            <Divider orientation="vertical" flexItem sx={{ height: 18, my: 'auto', opacity: 0.2 }} />

            {/* User */}
            <Stack direction="row" alignItems="center" spacing={1} onClick={() => navigate('/app/profile')}
              sx={{ cursor: 'pointer', px: 1, py: 0.5, borderRadius: '8px', '&:hover': { background: 'rgba(0,0,0,0.03)' }, transition: 'background 0.15s' }}>
              <Avatar sx={{ width: 28, height: 28, bgcolor: '#111', fontSize: '0.72rem', fontWeight: 700 }}>{userInitial}</Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#111', lineHeight: 1.2 }}>{displayName}</Typography>
                <Typography sx={{ fontSize: '0.6rem', color: '#bbb' }}>Admin</Typography>
              </Box>
              <ChevronDown size={13} color="#bbb" />
            </Stack>
          </Stack>
        </Box>

        {/* Page content */}
        <Box sx={{ flex: 1, overflowY: 'auto', p: { xs: 2, md: 4 }, position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>

          {/* Notifications dropdown */}
          <AnimatePresence>
            {showNotifications && (
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                onClick={() => setShowNotifications(false)}
                sx={{
                  position: 'fixed', top: 66, right: { xs: 12, md: 32 }, width: 320, background: '#fff',
                  borderRadius: '14px', border: '1px solid rgba(0,0,0,0.06)',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.08)', zIndex: 200, overflow: 'hidden',
                }}
              >
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 2.5, py: 1.8, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#111' }}>Notifications</Typography>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: '#FF5A5F', cursor: 'pointer' }}>Mark all read</Typography>
                </Stack>
                <Box sx={{ maxHeight: 260, overflowY: 'auto' }}>
                  {[
                    { title: 'Rent Received', desc: 'Rahul Sharma paid ₹45,000 · B-402', time: '10m ago', dot: '#00B81C', unread: true },
                    { title: 'Maintenance Request', desc: 'AC not working in Unit C-105', time: '1h ago', dot: '#FF5A5F', unread: true },
                    { title: 'Lease Signed', desc: 'Kavya Mehta signed lease for E-501', time: '2h ago', dot: '#0066CC', unread: false },
                    { title: 'AI Risk Alert', desc: 'Neha Patel risk score dropped to 65', time: '4h ago', dot: '#F7B801', unread: false },
                  ].map((n, i) => (
                    <Stack key={i} direction="row" spacing={1.5}
                      sx={{ px: 2.5, py: 1.8, cursor: 'pointer', background: n.unread ? 'rgba(255,90,95,0.015)' : 'transparent', borderBottom: '1px solid rgba(0,0,0,0.03)', '&:hover': { background: '#FAFAFA' }, transition: 'background 0.15s' }}>
                      <Box sx={{ width: 7, height: 7, borderRadius: '50%', background: n.dot, mt: 0.6, flexShrink: 0, opacity: n.unread ? 1 : 0.35 }} />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: n.unread ? 600 : 500, color: '#111' }}>{n.title}</Typography>
                        <Typography sx={{ fontSize: '0.7rem', color: '#888', mt: 0.2 }}>{n.desc}</Typography>
                        <Typography sx={{ fontSize: '0.62rem', color: '#ccc', mt: 0.3 }}>{n.time}</Typography>
                      </Box>
                    </Stack>
                  ))}
                </Box>
              </Box>
            )}
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
}
