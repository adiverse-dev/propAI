import { Box, Container, Stack, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Brain, FileText, Bell, CreditCard, ShieldCheck, Wrench } from 'lucide-react';
import { staggerContainer, staggerItem, VIEWPORT_ONCE } from '@/lib/animations';

const features = [
  { icon: ShieldCheck, title: 'AI Tenant Risk Analysis', desc: 'Evaluate applications using 40+ financial and identity data points instantly.', color: '#FF5A5F', bg: 'rgba(255,90,95,0.07)' },
  { icon: FileText, title: 'Smart Lease Summaries', desc: 'HiveAI reads 50-page leases and summarizes key clauses, renewals, and penalties.', color: '#0066CC', bg: 'rgba(0,102,204,0.07)' },
  { icon: Bell, title: 'AI-Generated Reminders', desc: 'Predictive messaging nudges tenants about rent and renewals before overdue.', color: '#F7B801', bg: 'rgba(247,184,1,0.08)' },
  { icon: CreditCard, title: 'Automated Payment Tracking', desc: 'Auto-reconciliation of rent payments to the correct unit and bank account.', color: '#00B81C', bg: 'rgba(0,184,28,0.07)' },
  { icon: Brain, title: 'Document Verification', desc: 'Real-time extraction and verification of Aadhaar, PAN, and income docs.', color: '#9333EA', bg: 'rgba(147,51,234,0.07)' },
  { icon: Wrench, title: 'Smart Maintenance', desc: 'AI categorizes requests by urgency and routes them to available vendors.', color: '#EC489A', bg: 'rgba(236,72,154,0.07)' },
];

export default function AISection() {
  return (
    <Box sx={{ py: { xs: 10, md: 16 }, background: '#FAFAFA', borderTop: '1px solid rgba(0,0,0,0.04)' }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, lg: 10 }} alignItems="flex-start">

          {/* Left — sticky copy */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT_ONCE}
              transition={{ duration: 0.55 }}
              sx={{ position: { lg: 'sticky' }, top: 128 }}
            >
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.9, borderRadius: '100px', background: 'rgba(247,184,1,0.1)', border: '1px solid rgba(247,184,1,0.18)', mb: 3 }}>
                <Brain size={13} color="#C48B00" />
                <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#C48B00', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Built-in AI</Typography>
              </Box>
              <Typography variant="h2" sx={{ fontSize: { xs: '1.9rem', sm: '2.4rem', md: '2.8rem' }, fontWeight: 800, mb: 2.5, letterSpacing: '-0.04em', color: '#0A0A0A', lineHeight: 1.1 }}>
                A property manager that never sleeps.
              </Typography>
              <Typography sx={{ color: '#717171', fontSize: '1.02rem', lineHeight: 1.65 }}>
                HiveAI takes action — from chasing rent to drafting leases — so you can scale efficiently.
              </Typography>
            </Box>
          </Grid>

          {/* Right — feature cards */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Box
              component={motion.div}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
            >
              <Grid container spacing={2.5}>
                {features.map((feature) => (
                  <Grid size={{ xs: 12, sm: 6 }} key={feature.title}>
                    <Box
                      component={motion.div}
                      variants={staggerItem}
                      whileHover={{ y: -5, boxShadow: `0 20px 56px rgba(0,0,0,0.07)` }}
                      sx={{
                        p: 3.5, borderRadius: '18px', background: '#fff',
                        border: '1px solid rgba(0,0,0,0.05)', height: '100%',
                        boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
                        transition: 'all 0.25s cubic-bezier(0.25,0.46,0.45,0.94)',
                        cursor: 'default',
                      }}
                    >
                      <Box sx={{ width: 44, height: 44, borderRadius: '12px', background: feature.bg, border: `1px solid ${feature.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2.5 }}>
                        <feature.icon size={22} color={feature.color} />
                      </Box>
                      <Typography sx={{ fontSize: '1.02rem', fontWeight: 700, color: '#111', mb: 1, letterSpacing: '-0.01em' }}>{feature.title}</Typography>
                      <Typography sx={{ fontSize: '0.88rem', color: '#777', lineHeight: 1.62 }}>{feature.desc}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>

        </Grid>
      </Container>
    </Box>
  );
}
