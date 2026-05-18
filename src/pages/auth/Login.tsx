import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Checkbox, FormControlLabel, Link, InputAdornment, IconButton, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, Building2, Home } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.42, ease: [0.16, 1, 0.3, 1] } }),
};

const DEMO_ACCOUNTS = [
  {
    label: 'Admin Demo',
    role: 'admin' as const,
    email: 'admin@hivelvy.com',
    password: 'admin123',
    icon: Building2,
    color: '#FF5A5F',
    bg: 'rgba(255,90,95,0.06)',
    border: 'rgba(255,90,95,0.15)',
    desc: 'Property Manager view',
  },
  {
    label: 'Tenant Demo',
    role: 'tenant' as const,
    email: 'tenant@hivelvy.com',
    password: 'tenant123',
    icon: Home,
    color: '#0066CC',
    bg: 'rgba(0,102,204,0.06)',
    border: 'rgba(0,102,204,0.15)',
    desc: 'Tenant portal view',
  },
];

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent, overrideEmail?: string, overridePassword?: string, overrideRole?: 'admin' | 'tenant') => {
    e.preventDefault();
    const finalEmail = overrideEmail ?? email;
    const finalPassword = overridePassword ?? password;

    if (!finalEmail || !finalPassword) { setError('Please fill in all fields'); return; }
    setError('');
    setIsLoading(true);

    // Determine role: demo accounts have fixed roles, otherwise use 'admin' default
    const role = overrideRole ?? (finalEmail.includes('tenant') ? 'tenant' : 'admin');

    setTimeout(() => {
      login(finalEmail, role);
      if (role === 'tenant') {
        navigate('/tenant');
      } else {
        navigate('/app/dashboard');
      }
      setIsLoading(false);
    }, 600);
  };

  const handleDemoLogin = (demo: typeof DEMO_ACCOUNTS[0]) => {
    setEmail(demo.email);
    setPassword(demo.password);
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      login(demo.email, demo.role);
      if (demo.role === 'tenant') {
        navigate('/tenant');
      } else {
        navigate('/app/dashboard');
      }
      setIsLoading(false);
    }, 600);
  };

  return (
    <Box>
      {/* Header */}
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#0A0A0A', letterSpacing: '-0.04em', fontSize: { xs: '1.8rem', sm: '2rem' } }}>
          Welcome back
        </Typography>
        <Typography sx={{ color: '#888', mb: 4, fontSize: '0.92rem', lineHeight: 1.55 }}>
          Enter your details to access your dashboard.
        </Typography>
      </motion.div>

      {/* Demo Access Panel */}
      <motion.div custom={0.5} variants={fadeUp} initial="hidden" animate="visible">
        <Box sx={{ mb: 3.5, p: 2, borderRadius: '14px', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.06)' }}>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <Sparkles size={13} color="#FF5A5F" />
            <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, color: '#555', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Quick Demo Access
            </Typography>
          </Stack>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
            {DEMO_ACCOUNTS.map((demo) => (
              <Box
                key={demo.role}
                component={motion.div}
                whileHover={{ scale: 1.01, boxShadow: `0 4px 16px ${demo.color}14` }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleDemoLogin(demo)}
                sx={{
                  flex: 1, p: 1.5, borderRadius: '10px',
                  background: demo.bg,
                  border: `1px solid ${demo.border}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1.2} sx={{ mb: 0.8 }}>
                  <Box sx={{ width: 26, height: 26, borderRadius: '7px', background: demo.color + '18', border: `1px solid ${demo.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <demo.icon size={13} color={demo.color} />
                  </Box>
                  <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#111' }}>{demo.label}</Typography>
                </Stack>
                <Typography sx={{ fontSize: '0.68rem', color: '#888', mb: 0.5 }}>{demo.desc}</Typography>
                <Typography sx={{ fontSize: '0.65rem', color: demo.color, fontWeight: 600 }}>Click to login →</Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </motion.div>

      {/* Divider */}
      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3 }}>
          <Divider sx={{ flex: 1 }} />
          <Typography sx={{ fontSize: '0.72rem', color: '#ccc', fontWeight: 500 }}>or sign in manually</Typography>
          <Divider sx={{ flex: 1 }} />
        </Stack>
      </motion.div>

      {/* Error */}
      {error && (
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <Box sx={{ p: 1.5, mb: 2.5, borderRadius: '10px', background: 'rgba(255,90,95,0.07)', border: '1px solid rgba(255,90,95,0.2)' }}>
            <Typography sx={{ color: '#FF5A5F', fontSize: '0.82rem', fontWeight: 600 }}>{error}</Typography>
          </Box>
        </motion.div>
      )}

      <form onSubmit={handleLogin}>
        <Stack spacing={2.5}>
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
            <Box>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#333', mb: 0.8 }}>Email Address</Typography>
              <TextField fullWidth size="small" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)}
                InputProps={{ startAdornment: <InputAdornment position="start"><Mail size={15} color="#bbb" /></InputAdornment>, sx: { borderRadius: '10px', background: '#fff', fontSize: '0.9rem' } }} />
            </Box>
          </motion.div>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
            <Box>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.8 }}>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#333' }}>Password</Typography>
                <Link component="button" type="button" onClick={() => navigate('/forgot-password')} underline="hover" sx={{ fontSize: '0.75rem', color: '#888', fontWeight: 500 }}>
                  Forgot password?
                </Link>
              </Stack>
              <TextField fullWidth size="small" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><Lock size={15} color="#bbb" /></InputAdornment>,
                  endAdornment: <InputAdornment position="end"><IconButton size="small" onClick={() => setShowPassword(p => !p)} edge="end" sx={{ color: '#bbb' }}>{showPassword ? <EyeOff size={15} /> : <Eye size={15} />}</IconButton></InputAdornment>,
                  sx: { borderRadius: '10px', background: '#fff', fontSize: '0.9rem' }
                }} />
            </Box>
          </motion.div>

          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible">
            <FormControlLabel control={<Checkbox size="small" sx={{ color: 'rgba(0,0,0,0.15)', '&.Mui-checked': { color: '#FF5A5F' } }} />}
              label={<Typography sx={{ fontSize: '0.82rem', color: '#666' }}>Remember for 30 days</Typography>} />
          </motion.div>

          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible">
            <Button type="submit" fullWidth variant="contained" disabled={isLoading} endIcon={!isLoading && <ArrowRight size={16} />}
              sx={{ py: 1.55, borderRadius: '11px', background: '#111', color: '#fff', textTransform: 'none', fontWeight: 600, fontSize: '0.95rem', boxShadow: '0 4px 14px rgba(0,0,0,0.12)', '&:hover': { background: '#000', boxShadow: '0 8px 24px rgba(0,0,0,0.18)', transform: 'translateY(-1px)' }, transition: 'all 0.2s ease' }}>
              {isLoading ? 'Signing in…' : 'Sign in'}
            </Button>
          </motion.div>
        </Stack>
      </form>

      <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible">
        <Typography sx={{ mt: 3.5, textAlign: 'center', fontSize: '0.85rem', color: '#888' }}>
          Don't have an account?{' '}
          <Link component="button" type="button" onClick={() => navigate('/signup')} underline="hover" sx={{ fontWeight: 700, color: '#111' }}>Sign up free</Link>
        </Typography>
      </motion.div>
    </Box>
  );
}
