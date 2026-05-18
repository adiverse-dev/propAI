import { Box, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Upload, Brain, CheckCircle2, CreditCard, Home } from 'lucide-react';
import { staggerContainer, staggerItem, VIEWPORT_ONCE } from '@/lib/animations';

const steps = [
  { icon: Upload, title: 'Application', desc: 'Tenant uploads ID & documents securely.', color: '#0066CC', bg: 'rgba(0,102,204,0.08)', num: '01' },
  { icon: Brain, title: 'AI Verification', desc: 'HiveAI verifies identity and financial risk instantly.', color: '#F7B801', bg: 'rgba(247,184,1,0.08)', num: '02' },
  { icon: CheckCircle2, title: 'Lease Approval', desc: 'Auto-generated lease is digitally signed.', color: '#00B81C', bg: 'rgba(0,184,28,0.08)', num: '03' },
  { icon: CreditCard, title: 'Rent Collection', desc: 'Automated deposit and rent via auto-pay.', color: '#FF5A5F', bg: 'rgba(255,90,95,0.08)', num: '04' },
  { icon: Home, title: 'Move-in', desc: 'Digital key handover and welcome kit.', color: '#111', bg: 'rgba(17,17,17,0.05)', num: '05' },
];

export default function WorkflowSection() {
  return (
    <Box sx={{ py: { xs: 10, md: 14 }, background: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle top/bottom divider gradients */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.04) 30%, rgba(0,0,0,0.04) 70%, transparent)' }} />

      <Container maxWidth="lg">
        <Stack spacing={{ xs: 6, md: 8 }} alignItems="center">

          {/* Header — precisely centered */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT_ONCE}
            transition={{ duration: 0.55 }}
            sx={{ textAlign: 'center', maxWidth: 560, mx: 'auto', width: '100%' }}
          >
            <Typography variant="h2" sx={{
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem' },
              fontWeight: 800, mb: 2, letterSpacing: '-0.04em', color: '#0A0A0A',
              lineHeight: 1.1, textAlign: 'center',
            }}>
              From lead to lease{' '}
              <br />
              in minutes, not days.
            </Typography>
            <Typography sx={{ color: '#888', fontSize: { xs: '0.95rem', md: '1.02rem' }, lineHeight: 1.65, textAlign: 'center', mx: 'auto', maxWidth: 440 }}>
              A fully digital workflow that connects the dots so you can focus on scaling your portfolio.
            </Typography>
          </Box>

          {/* Steps */}
          <Box sx={{ position: 'relative', width: '100%' }}>
            {/* Connecting line — desktop only */}
            <Box sx={{
              position: 'absolute', top: 32, left: '10%', right: '10%', height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.06) 15%, rgba(0,0,0,0.06) 85%, transparent)',
              display: { xs: 'none', md: 'block' }, zIndex: 0,
            }} />

            <Box
              component={motion.div}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
            >
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 3.5, md: 0 }} justifyContent="center" sx={{ position: 'relative', zIndex: 1 }}>
                {steps.map((step, idx) => (
                  <Box key={step.num} component={motion.div} variants={staggerItem} sx={{ flex: 1, maxWidth: { md: 200 }, mx: 'auto' }}>
                    <Stack
                      spacing={1.8}
                      alignItems="center"
                      sx={{ textAlign: 'center', px: { xs: 2, md: 1 } }}
                    >
                      <Box
                        component={motion.div}
                        whileHover={{ scale: 1.08, y: -3 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        sx={{
                          width: 60, height: 60, borderRadius: '16px',
                          background: step.bg,
                          border: `1px solid ${step.color}15`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                          position: 'relative',
                          cursor: 'default',
                        }}
                      >
                        <step.icon size={22} color={step.color} />
                        <Box sx={{
                          position: 'absolute', top: -6, right: -6, width: 18, height: 18,
                          borderRadius: '6px', background: '#111',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                        }}>
                          <Typography sx={{ fontSize: '0.48rem', fontWeight: 800, color: '#fff' }}>{step.num}</Typography>
                        </Box>
                      </Box>
                      <Typography sx={{ fontSize: '0.92rem', fontWeight: 700, color: '#111', letterSpacing: '-0.01em' }}>{step.title}</Typography>
                      <Typography sx={{ fontSize: '0.82rem', color: '#888', lineHeight: 1.55, maxWidth: 180 }}>{step.desc}</Typography>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>

        </Stack>
      </Container>
    </Box>
  );
}
