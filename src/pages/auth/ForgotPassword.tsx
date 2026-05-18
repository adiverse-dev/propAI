import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Stack, Link, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.42, ease: [0.16, 1, 0.3, 1] } }),
};

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setIsSubmitted(true);
  };

  return (
    <Box>
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
            <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#0A0A0A', letterSpacing: '-0.04em', fontSize: { xs: '1.8rem', sm: '2rem' } }}>
                Reset password
              </Typography>
              <Typography sx={{ color: '#888', mb: 4, fontSize: '0.92rem', lineHeight: 1.55 }}>
                Enter your email and we'll send you a link to reset your password.
              </Typography>
            </motion.div>

            <form onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <motion.div custom={1} variants={fadeUp} initial="hidden" animate="visible">
                  <Box>
                    <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#333', mb: 0.8 }}>Email Address</Typography>
                    <TextField fullWidth size="small" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)}
                      InputProps={{ startAdornment: <InputAdornment position="start"><Mail size={15} color="#bbb" /></InputAdornment>, sx: { borderRadius: '10px', background: '#fff', fontSize: '0.9rem' } }} />
                  </Box>
                </motion.div>

                <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
                  <Button type="submit" fullWidth variant="contained"
                    sx={{ py: 1.55, borderRadius: '11px', background: '#111', color: '#fff', textTransform: 'none', fontWeight: 600, fontSize: '0.95rem', boxShadow: '0 4px 14px rgba(0,0,0,0.12)', '&:hover': { background: '#000', boxShadow: '0 8px 24px rgba(0,0,0,0.18)', transform: 'translateY(-1px)' }, transition: 'all 0.2s ease' }}>
                    Send reset link
                  </Button>
                </motion.div>
              </Stack>
            </form>

            <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
              <Typography sx={{ mt: 4, textAlign: 'center', fontSize: '0.85rem', color: '#888' }}>
                Remember your password?{' '}
                <Link component="button" type="button" onClick={() => navigate('/login')} underline="hover" sx={{ fontWeight: 700, color: '#111' }}>Sign in</Link>
              </Typography>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            <Stack alignItems="center" spacing={3} sx={{ py: 2, textAlign: 'center' }}>
              <Box component={motion.div} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring', stiffness: 260, damping: 20 }}
                sx={{ width: 64, height: 64, borderRadius: '18px', background: 'rgba(0,184,28,0.08)', border: '1px solid rgba(0,184,28,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckCircle2 size={30} color="#00B81C" />
              </Box>

              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: '1.4rem', color: '#0A0A0A', letterSpacing: '-0.03em', mb: 1 }}>Check your inbox</Typography>
                <Typography sx={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  We've sent a recovery link to <Box component="span" sx={{ fontWeight: 600, color: '#333' }}>{email}</Box>. Check your inbox and follow the instructions.
                </Typography>
              </Box>

              <Button fullWidth variant="outlined" onClick={() => navigate('/login')} startIcon={<ArrowLeft size={15} />}
                sx={{ py: 1.4, borderRadius: '11px', borderColor: 'rgba(0,0,0,0.1)', color: '#333', textTransform: 'none', fontWeight: 600, fontSize: '0.9rem', background: '#fff', '&:hover': { background: '#F5F5F5', borderColor: 'rgba(0,0,0,0.15)' } }}>
                Back to sign in
              </Button>

              <Typography sx={{ fontSize: '0.78rem', color: '#bbb' }}>
                Didn't receive it?{' '}
                <Link component="button" type="button" onClick={() => setIsSubmitted(false)} underline="hover" sx={{ color: '#888', fontWeight: 600 }}>Try again</Link>
              </Typography>
            </Stack>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
}
