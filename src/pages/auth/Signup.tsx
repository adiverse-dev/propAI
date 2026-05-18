import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Link, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { motion } from 'framer-motion';
import { Mail, User, Lock, ArrowRight, Building2 } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.42, ease: [0.16, 1, 0.3, 1] } }),
};

export default function Signup() {
  const [role, setRole] = useState<'admin' | 'tenant'>('admin');
  const navigate = useNavigate();
  const { login } = useAuth();

  return (
    <Box>
      <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#0A0A0A', letterSpacing: '-0.04em', fontSize: { xs: '1.8rem', sm: '2rem' } }}>
          Create an account
        </Typography>
        <Typography sx={{ color: '#888', mb: 4, fontSize: '0.92rem', lineHeight: 1.55 }}>
          Join Hivelvy to manage properties with AI.
        </Typography>
      </motion.div>

      {/* Role toggle */}
      <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
        <Stack direction="row" spacing={0} sx={{ mb: 3.5, p: 0.6, background: '#F0F0F0', borderRadius: '12px' }}>
          {(['admin', 'tenant'] as const).map((r) => (
            <Box key={r} onClick={() => setRole(r)} sx={{
              flex: 1, py: 1, textAlign: 'center', borderRadius: '8px', cursor: 'pointer',
              background: role === r ? '#fff' : 'transparent',
              boxShadow: role === r ? '0 1px 6px rgba(0,0,0,0.08)' : 'none',
              transition: 'all 0.2s',
            }}>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: role === r ? 700 : 500, color: role === r ? '#111' : '#888', transition: 'all 0.2s' }}>
                {r === 'admin' ? '🏢 Property Manager' : '🏠 Tenant'}
              </Typography>
            </Box>
          ))}
        </Stack>
      </motion.div>

      <form onSubmit={(e) => {
        e.preventDefault();
        // Simulate account creation — auto login with selected role
        login(`demo@hivelvy.com`, role);
        if (role === 'tenant') navigate('/tenant');
        else navigate('/app/dashboard');
      }}>
        <Stack spacing={2.5}>
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
            <Stack direction="row" spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#333', mb: 0.8 }}>First Name</Typography>
                <TextField fullWidth size="small" placeholder="Rahul"
                  InputProps={{ startAdornment: <InputAdornment position="start"><User size={14} color="#bbb" /></InputAdornment>, sx: { borderRadius: '10px', background: '#fff', fontSize: '0.9rem' } }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#333', mb: 0.8 }}>Last Name</Typography>
                <TextField fullWidth size="small" placeholder="Sharma"
                  InputProps={{ sx: { borderRadius: '10px', background: '#fff', fontSize: '0.9rem' } }} />
              </Box>
            </Stack>
          </motion.div>

          {role === 'admin' && (
            <motion.div custom={2.5} variants={fadeUp} initial="hidden" animate="visible">
              <Box>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#333', mb: 0.8 }}>Company / Property Name</Typography>
                <TextField fullWidth size="small" placeholder="Prestige Realty"
                  InputProps={{ startAdornment: <InputAdornment position="start"><Building2 size={14} color="#bbb" /></InputAdornment>, sx: { borderRadius: '10px', background: '#fff', fontSize: '0.9rem' } }} />
              </Box>
            </motion.div>
          )}

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
            <Box>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#333', mb: 0.8 }}>Email Address</Typography>
              <TextField fullWidth size="small" placeholder="you@company.com"
                InputProps={{ startAdornment: <InputAdornment position="start"><Mail size={14} color="#bbb" /></InputAdornment>, sx: { borderRadius: '10px', background: '#fff', fontSize: '0.9rem' } }} />
            </Box>
          </motion.div>

          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible">
            <Box>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#333', mb: 0.8 }}>Password</Typography>
              <TextField fullWidth size="small" type="password" placeholder="Create a strong password"
                InputProps={{ startAdornment: <InputAdornment position="start"><Lock size={14} color="#bbb" /></InputAdornment>, sx: { borderRadius: '10px', background: '#fff', fontSize: '0.9rem' } }} />
            </Box>
          </motion.div>

          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible">
            <Button type="submit" fullWidth variant="contained" endIcon={<ArrowRight size={16} />}
              sx={{ py: 1.55, mt: 0.5, borderRadius: '11px', background: '#111', color: '#fff', textTransform: 'none', fontWeight: 600, fontSize: '0.95rem', boxShadow: '0 4px 14px rgba(0,0,0,0.12)', '&:hover': { background: '#000', boxShadow: '0 8px 24px rgba(0,0,0,0.18)', transform: 'translateY(-1px)' }, transition: 'all 0.2s ease' }}>
              Create Account
            </Button>
          </motion.div>

          <motion.div custom={6} variants={fadeUp} initial="hidden" animate="visible">
            <Typography sx={{ fontSize: '0.72rem', color: '#bbb', textAlign: 'center', lineHeight: 1.6 }}>
              By creating an account, you agree to our{' '}
              <Link underline="hover" sx={{ color: '#888', cursor: 'pointer' }}>Terms of Service</Link>{' '}and{' '}
              <Link underline="hover" sx={{ color: '#888', cursor: 'pointer' }}>Privacy Policy</Link>.
            </Typography>
          </motion.div>
        </Stack>
      </form>

      <motion.div custom={7} variants={fadeUp} initial="hidden" animate="visible">
        <Typography sx={{ mt: 3.5, textAlign: 'center', fontSize: '0.85rem', color: '#888' }}>
          Already have an account?{' '}
          <Link component="button" type="button" onClick={() => navigate('/login')} underline="hover" sx={{ fontWeight: 700, color: '#111' }}>Sign in</Link>
        </Typography>
      </motion.div>
    </Box>
  );
}
