import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0.6, 0.92]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.08]);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box
      component={motion.nav}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      sx={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
    >
      <motion.div style={{ backgroundColor: `rgba(255,255,255,${bgOpacity})`, borderBottom: `1px solid rgba(0,0,0,${borderOpacity})` }}>
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 1.8 }}>
            {/* Logo */}
            <Stack
              direction="row" alignItems="center" spacing={1.5}
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <Box sx={{
                width: 32, height: 32, borderRadius: '10px',
                background: 'linear-gradient(135deg, #FF5A5F, #FF7B82)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(255,90,95,0.25)',
              }}>
                <Typography sx={{ color: '#fff', fontWeight: 900, fontSize: '0.85rem' }}>H</Typography>
              </Box>
              <Typography sx={{ fontWeight: 800, color: '#111', fontSize: '1.15rem', letterSpacing: '-0.03em' }}>Hivelvy</Typography>
            </Stack>

            {/* Nav Links — Desktop */}
            <Stack direction="row" alignItems="center" spacing={1} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {['Platform', 'Features', 'Pricing', 'Enterprise'].map((item) => (
                <Button
                  key={item}
                  variant="text"
                  size="small"
                  sx={{
                    color: '#555', fontSize: '0.88rem', fontWeight: 500,
                    textTransform: 'none', px: 2, borderRadius: '8px',
                    '&:hover': { color: '#111', background: 'rgba(0,0,0,0.03)' },
                    transition: 'all 0.2s',
                  }}
                >
                  {item}
                </Button>
              ))}
            </Stack>

            {/* CTA — Desktop */}
            <Stack direction="row" spacing={1.5} sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Button
                variant="text"
                onClick={() => navigate('/login')}
                sx={{
                  color: '#555', fontSize: '0.88rem', fontWeight: 600,
                  textTransform: 'none', px: 2, borderRadius: '8px',
                  '&:hover': { color: '#111' },
                }}
              >
                Log in
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/signup')}
                endIcon={<ArrowRight size={16} />}
                sx={{
                  background: '#111', color: '#fff', fontSize: '0.88rem', fontWeight: 600,
                  textTransform: 'none', px: 3, py: 1, borderRadius: '10px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  '&:hover': { background: '#000', boxShadow: '0 4px 16px rgba(0,0,0,0.18)', transform: 'translateY(-1px)' },
                  transition: 'all 0.2s',
                }}
              >
                Get started
              </Button>
            </Stack>

            {/* Mobile menu toggle */}
            <Box
              onClick={() => setMobileOpen(!mobileOpen)}
              sx={{ display: { xs: 'flex', md: 'none' }, cursor: 'pointer', p: 1 }}
            >
              {mobileOpen ? <X size={22} color="#111" /> : <Menu size={22} color="#111" />}
            </Box>
          </Stack>
        </Container>
      </motion.div>

      {/* Mobile menu */}
      {mobileOpen && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          sx={{
            display: { md: 'none' },
            background: 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(0,0,0,0.06)',
            px: 3, py: 3,
          }}
        >
          <Stack spacing={2}>
            {['Platform', 'Features', 'Pricing', 'Enterprise'].map((item) => (
              <Typography key={item} sx={{ fontSize: '1rem', fontWeight: 500, color: '#555', cursor: 'pointer', '&:hover': { color: '#111' } }}>{item}</Typography>
            ))}
            <Box sx={{ pt: 2, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <Stack spacing={1.5}>
                <Button fullWidth variant="outlined" onClick={() => { navigate('/login'); setMobileOpen(false); }} sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, borderColor: 'rgba(0,0,0,0.1)', color: '#111' }}>Log in</Button>
                <Button fullWidth variant="contained" onClick={() => { navigate('/signup'); setMobileOpen(false); }} sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, background: '#111', '&:hover': { background: '#000' } }}>Get started free</Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
