import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Building2, FileText, MessageSquare, ChartBar as BarChart3, Settings, Sparkles, Bell, Search, LogOut } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Tenants', path: '/dashboard/tenants' },
  { icon: Building2, label: 'Properties', path: '/dashboard/properties' },
  { icon: FileText, label: 'Leases', path: '/dashboard/leases' },
  { icon: MessageSquare, label: 'Messages', path: '/dashboard/messages', badge: 4 },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: Sparkles, label: 'HiveAI', path: '/dashboard/ai', special: true },
];

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const navigate = useNavigate();

  return (
    <Box
      component={motion.div}
      initial={{ x: -240 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      sx={{
        width: 240,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        background: '#FFFFFF',
        borderRight: '1px solid rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        overflow: 'hidden',
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 2.5, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ cursor: 'pointer' }} onClick={() => navigate('/')}>
          <Box sx={{
            width: 32, height: 32, borderRadius: '10px',
            background: 'linear-gradient(135deg, #FF5A5F, #FF7B82)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Building2 size={16} color="#fff" />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: '0.9rem', color: 'text.primary', lineHeight: 1.2 }}>HiveIvy</Typography>
            <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary', fontWeight: 500 }}>Admin Portal</Typography>
          </Box>
        </Stack>
      </Box>

      {/* Search */}
      <Box sx={{ px: 2, pt: 2, pb: 1 }}>
        <Box sx={{
          display: 'flex', alignItems: 'center', gap: 1,
          px: 1.5, py: 1, borderRadius: '10px',
          background: '#F5F5F5',
          border: '1px solid rgba(0,0,0,0.06)',
          cursor: 'text',
        }}>
          <Search size={14} color="#9E9E9E" />
          <Typography sx={{ fontSize: '0.78rem', color: '#BDBDBD' }}>Search... ⌘K</Typography>
        </Box>
      </Box>

      {/* Nav Items */}
      <Box sx={{ flex: 1, px: 1.5, py: 1, overflow: 'auto' }}>
        <Typography sx={{ px: 1, py: 0.5, fontSize: '0.6rem', fontWeight: 700, color: '#9E9E9E', letterSpacing: '0.1em', mb: 0.5 }}>WORKSPACE</Typography>
        {navItems.map((item) => {
          const isActive = activeTab === item.path;
          return (
            <Box
              key={item.path}
              component={motion.div}
              whileHover={{ x: 2 }}
              transition={{ duration: 0.15 }}
            >
              <Box
                onClick={() => onTabChange(item.path)}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1.5,
                  px: 1.5, py: 1, borderRadius: '10px', mb: 0.3,
                  cursor: 'pointer',
                  background: isActive ? 'rgba(255,90,95,0.08)' : 'transparent',
                  borderLeft: isActive ? '2px solid #FF5A5F' : '2px solid transparent',
                  transition: 'all 0.15s ease',
                  '&:hover': { background: isActive ? 'rgba(255,90,95,0.1)' : 'rgba(0,0,0,0.03)' },
                  position: 'relative',
                }}
              >
                {item.special ? (
                  <Box sx={{ width: 20, height: 20, borderRadius: '6px', background: 'linear-gradient(135deg,#FF5A5F,#F7B801)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <item.icon size={12} color="#fff" />
                  </Box>
                ) : (
                  <item.icon size={16} color={isActive ? '#FF5A5F' : '#9E9E9E'} />
                )}
                <Typography sx={{
                  fontSize: '0.82rem', fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#FF5A5F' : 'text.secondary',
                  flex: 1,
                }}>
                  {item.label}
                </Typography>
                {item.badge && (
                  <Box sx={{ px: 0.8, py: 0.2, borderRadius: '6px', background: 'linear-gradient(135deg,#FF5A5F,#FF7B82)', minWidth: 18, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '0.6rem', fontWeight: 800, color: '#fff' }}>{item.badge}</Typography>
                  </Box>
                )}
                {item.special && (
                  <Box component={motion.div} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} sx={{ width: 5, height: 5, borderRadius: '50%', background: '#F7B801' }} />
                )}
              </Box>
            </Box>
          );
        })}

        <Divider sx={{ my: 2 }} />
        <Typography sx={{ px: 1, py: 0.5, fontSize: '0.6rem', fontWeight: 700, color: '#9E9E9E', letterSpacing: '0.1em', mb: 0.5 }}>QUICK ACCESS</Typography>
        {[{ icon: Bell, label: 'Notifications', badge: 3 }, { icon: Settings, label: 'Settings' }].map((item) => (
          <Box
            key={item.label}
            sx={{
              display: 'flex', alignItems: 'center', gap: 1.5,
              px: 1.5, py: 1, borderRadius: '10px', mb: 0.3,
              cursor: 'pointer',
              '&:hover': { background: 'rgba(0,0,0,0.03)' },
            }}
          >
            <item.icon size={16} color="#9E9E9E" />
            <Typography sx={{ fontSize: '0.82rem', fontWeight: 500, color: 'text.secondary', flex: 1 }}>{item.label}</Typography>
            {item.badge && (
              <Box sx={{ px: 0.8, py: 0.2, borderRadius: '6px', background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.2)', minWidth: 18, textAlign: 'center' }}>
                <Typography sx={{ fontSize: '0.6rem', fontWeight: 800, color: '#E63946' }}>{item.badge}</Typography>
              </Box>
            )}
          </Box>
        ))}
      </Box>

      {/* User Profile */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar sx={{ width: 32, height: 32, background: 'linear-gradient(135deg,#FF5A5F,#FF7B82)', color: '#fff', fontSize: '0.75rem', fontWeight: 800 }}>SA</Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'text.primary', lineHeight: 1.2 }}>Suresh Anand</Typography>
            <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>Property Manager</Typography>
          </Box>
          <LogOut size={14} color="#9E9E9E" style={{ cursor: 'pointer', flexShrink: 0 }} />
        </Stack>
      </Box>
    </Box>
  );
}
