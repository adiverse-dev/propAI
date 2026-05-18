import { Box, Container, Stack, Typography, Button, Avatar } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { VIEWPORT_ONCE } from '@/lib/animations';

const avatarData = [
  { initials: 'VM', color: '#FF5A5F' },
  { initials: 'SK', color: '#F7B801' },
  { initials: 'RA', color: '#0066CC' },
  { initials: 'KP', color: '#00B81C' },
];

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: { xs: 10, md: 16 }, position: 'relative', overflow: 'hidden', background: '#FAFAFA' }}>
      {/* Floating blobs */}
      <Box component={motion.div} animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.25, 0.12] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        sx={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,90,95,0.18), transparent 65%)', filter: 'blur(80px)', left: '10%', top: '-15%', pointerEvents: 'none' }} />
      <Box component={motion.div} animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.18, 0.08] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        sx={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,184,1,0.15), transparent 65%)', filter: 'blur(80px)', right: '8%', bottom: '-15%', pointerEvents: 'none' }} />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={VIEWPORT_ONCE}>
          <Stack spacing={4} alignItems="center">

            {/* Badge */}
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2.5, py: 1, borderRadius: '100px', background: '#fff', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
              <Sparkles size={14} color="#FF5A5F" />
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#111' }}>Get Started Today</Typography>
            </Box>

            <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '1.9rem', sm: '2.4rem', md: '3rem' }, color: '#0A0A0A', letterSpacing: '-0.045em', lineHeight: 1.08 }}>
              The future of rental operations is here.
            </Typography>

            <Typography sx={{ color: '#717171', maxWidth: 400, lineHeight: 1.65, fontSize: '1.05rem' }}>
              Join 500+ property teams across India using Hivelvy to manage smarter and scale faster.
            </Typography>

            {/* Social proof avatars */}
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Stack direction="row" sx={{ '& > *:not(:first-child)': { ml: -1 } }}>
                {avatarData.map((a) => (
                  <Avatar key={a.initials} sx={{ width: 28, height: 28, fontSize: '0.55rem', fontWeight: 800, background: a.color, border: '2px solid #FAFAFA' }}>{a.initials}</Avatar>
                ))}
              </Stack>
              <Typography sx={{ fontSize: '0.8rem', color: '#888', fontWeight: 500 }}>Trusted by 500+ teams</Typography>
            </Stack>

            {/* CTAs */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ pt: 1 }}>
              <Button component={motion.button} whileHover={{ y: -2, boxShadow: '0 14px 36px rgba(0,0,0,0.16)' }} whileTap={{ scale: 0.98 }}
                variant="contained" size="large" endIcon={<ArrowRight size={17} />} onClick={() => navigate('/signup')}
                sx={{ px: 5, py: 1.8, fontSize: '1rem', borderRadius: '12px', background: '#111', color: '#fff', textTransform: 'none', fontWeight: 600, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', '&:hover': { background: '#000' } }}>
                Start Free Trial
              </Button>
              <Button component={motion.button} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}
                variant="outlined" size="large" onClick={() => navigate('/login')}
                sx={{ px: 5, py: 1.8, fontSize: '1rem', borderRadius: '12px', borderColor: 'rgba(0,0,0,0.1)', color: '#111', textTransform: 'none', fontWeight: 600, background: '#fff', '&:hover': { background: '#F5F5F5', borderColor: 'rgba(0,0,0,0.15)' } }}>
                View Demo
              </Button>
            </Stack>

          </Stack>
        </motion.div>
      </Container>
    </Box>
  );
}
