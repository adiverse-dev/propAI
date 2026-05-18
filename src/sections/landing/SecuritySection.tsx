import { Box, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Shield, Lock, Cloud, CheckCircle2 } from 'lucide-react';
import { staggerContainer, staggerItem, VIEWPORT_ONCE } from '@/lib/animations';

const features = [
  { icon: Lock, title: '256-bit Encryption', desc: 'All data is encrypted at rest and in transit using bank-grade AES-256 standards.' },
  { icon: Cloud, title: 'Secure Infrastructure', desc: 'Enterprise AWS architecture with automated backups and multi-region redundancy.' },
  { icon: CheckCircle2, title: 'SOC2 Compliant', desc: 'Strict access controls and compliance with international data privacy regulations.' },
];

export default function SecuritySection() {
  return (
    <Box sx={{ py: { xs: 10, md: 14 }, background: '#111', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* Grid pattern */}
      <Box sx={{ position: 'absolute', inset: 0, opacity: 0.025, backgroundImage: 'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />
      {/* Top glow */}
      <Box sx={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80%', height: '60%', background: 'radial-gradient(ellipse at top, rgba(255,90,95,0.13) 0%, transparent 55%)', pointerEvents: 'none' }} />
      {/* Animated orb */}
      <Box component={motion.div} animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        sx={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '50%', height: '80%', background: 'radial-gradient(circle, rgba(247,184,1,0.15) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Stack spacing={{ xs: 6, md: 8 }} alignItems="center">

          {/* Header */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.55 }}
            sx={{ textAlign: 'center', maxWidth: 560 }}
          >
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.9, borderRadius: '100px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.07)', mb: 3 }}>
              <Shield size={13} color="#FF5A5F" />
              <Typography sx={{ fontSize: '0.7rem', fontWeight: 600, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.07em', textTransform: 'uppercase' }}>Security & Compliance</Typography>
            </Box>
            <Typography variant="h2" sx={{ fontSize: { xs: '1.9rem', sm: '2.4rem', md: '2.9rem' }, fontWeight: 800, mb: 2.5, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
              Enterprise-grade security for your property data.
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: '1.02rem', lineHeight: 1.65 }}>
              Bank-level encryption and compliance standards. Total privacy, total control.
            </Typography>
          </Box>

          {/* Cards */}
          <Box
            component={motion.div}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT_ONCE}
            sx={{ width: '100%' }}
          >
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
              {features.map((feature) => (
                <Box
                  key={feature.title}
                  component={motion.div}
                  variants={staggerItem}
                  whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.12)', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
                  sx={{
                    flex: 1, p: { xs: 3, md: 3.5 }, borderRadius: '20px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Box sx={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(255,90,95,0.12)', border: '1px solid rgba(255,90,95,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2.5 }}>
                    <feature.icon size={22} color="#FF5A5F" />
                  </Box>
                  <Typography sx={{ fontSize: '1.06rem', fontWeight: 700, mb: 1, letterSpacing: '-0.01em' }}>{feature.title}</Typography>
                  <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', lineHeight: 1.65 }}>{feature.desc}</Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
