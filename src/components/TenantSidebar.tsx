import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { Home, FileText, MessageSquare, Bell, Sparkles, Building2, Settings, LogOut, ExternalLink } from 'lucide-react';

const navItems = [
  { icon: Home, label: 'Dashboard', tab: 'home' },
  { icon: FileText, label: 'My Lease', tab: 'lease' },
  { icon: MessageSquare, label: 'Messages', tab: 'messages', badge: 2 },
  { icon: Bell, label: 'Notifications', tab: 'notifications', badge: 2 },
  { icon: Sparkles, label: 'HiveAI Help', tab: 'ai', special: true },
];

interface TenantSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function TenantSidebar({ activeTab, onTabChange }: TenantSidebarProps) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

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
        left: 0, top: 0,
        background: '#FFFFFF',
        borderRight: '1px solid rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 3, py: 2.5, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2.5 }}>
          <Box sx={{ width: 28, height: 28, borderRadius: '8px', background: 'linear-gradient(135deg,#FF5A5F,#FF7B82)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(255,90,95,0.25)', flexShrink: 0 }}>
            <Building2 size={14} color="#fff" />
          </Box>
          <Box>
            <Typography sx={{ fontWeight: 800, fontSize: '1rem', color: '#111', lineHeight: 1.2, letterSpacing: '-0.025em' }}>Hivelvy</Typography>
            <Typography sx={{ fontSize: '0.6rem', color: '#bbb', fontWeight: 500 }}>Tenant Portal</Typography>
          </Box>
        </Stack>

        {/* Role badge */}
        <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.8, px: 1.5, py: 0.6, borderRadius: '8px', background: 'rgba(0,102,204,0.06)', border: '1px solid rgba(0,102,204,0.1)', mb: 2 }}>
          <Box sx={{ width: 5, height: 5, borderRadius: '50%', background: '#0066CC' }} />
          <Typography sx={{ fontSize: '0.62rem', fontWeight: 700, color: '#0066CC', letterSpacing: '0.04em' }}>TENANT VIEW</Typography>
        </Box>

        {/* Tenant card */}
        <Box sx={{ p: 1.5, borderRadius: '12px', background: '#F8F8F8', border: '1px solid rgba(0,0,0,0.05)' }}>
          <Stack direction="row" alignItems="center" spacing={1.2}>
            <Avatar sx={{ width: 30, height: 30, background: 'linear-gradient(135deg,#FF5A5F,#FF7B82)', color: '#fff', fontSize: '0.65rem', fontWeight: 800, flexShrink: 0 }}>RS</Avatar>
            <Box>
              <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#111', lineHeight: 1.2 }}>Rahul Sharma</Typography>
              <Typography sx={{ fontSize: '0.62rem', color: '#aaa' }}>Unit B-402</Typography>
            </Box>
          </Stack>
          <Box sx={{ mt: 1.5 }}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
              <Typography sx={{ fontSize: '0.6rem', color: '#bbb', fontWeight: 500 }}>Profile complete</Typography>
              <Typography sx={{ fontSize: '0.6rem', color: '#FF5A5F', fontWeight: 700 }}>80%</Typography>
            </Stack>
            <LinearProgress variant="determinate" value={80} sx={{ height: 3, borderRadius: 10, bgcolor: 'rgba(0,0,0,0.06)', '& .MuiLinearProgress-bar': { bgcolor: '#FF5A5F', borderRadius: 10 } }} />
          </Box>
        </Box>
      </Box>

      {/* Nav items */}
      <Box sx={{ flex: 1, px: 2, py: 2, overflow: 'auto' }}>
        <Typography sx={{ px: 1.5, fontSize: '0.6rem', fontWeight: 700, color: '#ccc', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 1 }}>My Space</Typography>
        {navItems.map((item) => {
          const isActive = activeTab === item.tab;
          return (
            <Box key={item.tab} component={motion.div} whileHover={{ x: 2 }} transition={{ duration: 0.15 }}>
              <Box
                onClick={() => onTabChange(item.tab)}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1.5,
                  px: 1.5, py: 1, borderRadius: '9px', mb: 0.4,
                  cursor: 'pointer',
                  background: isActive ? 'rgba(255,90,95,0.07)' : 'transparent',
                  borderLeft: isActive ? '2px solid #FF5A5F' : '2px solid transparent',
                  transition: 'all 0.15s ease',
                  '&:hover': { background: isActive ? 'rgba(255,90,95,0.07)' : 'rgba(0,0,0,0.03)' },
                }}
              >
                {item.special ? (
                  <Box sx={{ width: 18, height: 18, borderRadius: '5px', background: 'linear-gradient(135deg,#FF5A5F,#F7B801)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={11} color="#fff" />
                  </Box>
                ) : (
                  <item.icon size={15} color={isActive ? '#FF5A5F' : '#ccc'} />
                )}
                <Typography sx={{ fontSize: '0.85rem', fontWeight: isActive ? 600 : 500, color: isActive ? '#FF5A5F' : '#888', flex: 1 }}>
                  {item.label}
                </Typography>
                {item.badge && (
                  <Box sx={{ px: 0.7, py: 0.15, borderRadius: '6px', background: 'linear-gradient(135deg,#FF5A5F,#FF7B82)', minWidth: 16, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '0.58rem', fontWeight: 800, color: '#fff' }}>{item.badge}</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Footer actions */}
      <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        <Stack spacing={0.4}>
          <Stack component={motion.div} whileHover={{ x: 2 }} direction="row" alignItems="center" spacing={1.5}
            onClick={() => navigate('/')}
            sx={{ px: 1.5, py: 1, borderRadius: '9px', cursor: 'pointer', '&:hover': { background: 'rgba(0,0,0,0.03)' }, transition: 'all 0.15s' }}>
            <ExternalLink size={14} color="#ccc" />
            <Typography sx={{ fontSize: '0.82rem', fontWeight: 500, color: '#aaa' }}>Back to Website</Typography>
          </Stack>
          <Stack component={motion.div} whileHover={{ x: 2 }} direction="row" alignItems="center" spacing={1.5}
            onClick={() => onTabChange('settings')}
            sx={{ px: 1.5, py: 1, borderRadius: '9px', cursor: 'pointer', '&:hover': { background: 'rgba(0,0,0,0.03)' }, transition: 'all 0.15s' }}>
            <Settings size={14} color="#ccc" />
            <Typography sx={{ fontSize: '0.82rem', fontWeight: 500, color: '#aaa' }}>Settings</Typography>
          </Stack>
          <Stack component={motion.div} whileHover={{ x: 2 }} direction="row" alignItems="center" spacing={1.5}
            onClick={handleLogout}
            sx={{ px: 1.5, py: 1, borderRadius: '9px', cursor: 'pointer', '&:hover': { background: 'rgba(255,90,95,0.04)' }, transition: 'all 0.15s' }}>
            <LogOut size={14} color="#FF5A5F" />
            <Typography sx={{ fontSize: '0.82rem', fontWeight: 500, color: '#FF5A5F' }}>Log out</Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
