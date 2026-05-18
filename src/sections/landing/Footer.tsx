import { Box, Container, Stack, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { VIEWPORT_ONCE } from '@/lib/animations';

const footerLinks = [
  { title: 'Product', links: ['Features', 'AI Assistant', 'Pricing', 'Changelog'] },
  { title: 'Resources', links: ['Documentation', 'Blog', 'Help Center', 'API Reference'] },
  { title: 'Company', links: ['About', 'Careers', 'Contact', 'Partners'] },
  { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Security'] },
];

const socials = ['Twitter', 'LinkedIn', 'GitHub'];

export default function Footer() {
  return (
    <Box sx={{ pt: { xs: 8, md: 12 }, pb: 4, background: '#0A0A0A', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle top gradient */}
      <Box sx={{ position: 'absolute', top: 0, left: '30%', width: '40%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,90,95,0.4), transparent)' }} />
      {/* Grid overlay */}
      <Box sx={{ position: 'absolute', inset: 0, opacity: 0.015, backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '48px 48px', pointerEvents: 'none' }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 4, md: 8 }} sx={{ mb: { xs: 6, md: 10 } }}>

          {/* Brand */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box component={motion.div} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT_ONCE} transition={{ duration: 0.5 }}>
              <Stack spacing={2.5}>
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box sx={{ width: 28, height: 28, borderRadius: '8px', background: 'linear-gradient(135deg, #FF5A5F, #FF7B82)', boxShadow: '0 3px 10px rgba(255,90,95,0.3)' }} />
                  <Typography sx={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>Hivelvy</Typography>
                </Stack>
                <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: 280 }}>
                  The AI workspace for modern property management. Automate leasing, rent, and operations.
                </Typography>
                <Stack direction="row" spacing={2.5} sx={{ pt: 0.5 }}>
                  {socials.map((s) => (
                    <Typography key={s} sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontWeight: 500, '&:hover': { color: 'rgba(255,255,255,0.75)' }, transition: 'color 0.2s' }}>{s}</Typography>
                  ))}
                </Stack>
              </Stack>
            </Box>
          </Grid>

          {/* Links */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Grid container spacing={3}>
              {footerLinks.map((section, i) => (
                <Grid size={{ xs: 6, sm: 3 }} key={section.title}>
                  <Box component={motion.div} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={VIEWPORT_ONCE} transition={{ duration: 0.4, delay: i * 0.07 }}>
                    <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)', mb: 2.5, letterSpacing: '0.01em' }}>{section.title}</Typography>
                    <Stack spacing={1.8}>
                      {section.links.map((link) => (
                        <Typography key={link} sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.35)', cursor: 'pointer', fontWeight: 400, '&:hover': { color: '#FF5A5F' }, transition: 'color 0.2s' }}>{link}</Typography>
                      ))}
                    </Stack>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>

        {/* Bottom bar */}
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.05)', pt: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography sx={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.25)' }}>
            © {new Date().getFullYear()} Hivelvy Inc. All rights reserved.
          </Typography>
          <Typography sx={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.15)', fontWeight: 500, letterSpacing: '0.1em' }}>
            DESIGNED & DEVELOPED BY ADITYA SINGH
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
