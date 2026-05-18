import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import GlowCard from '@/components/GlowCard';

export default function LeaseTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Grid container spacing={3}>
        <Grid  size={{ xs: 12, lg: 8 }}>
          <GlowCard sx={{ p: 3.5 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>Lease Agreement</Typography>
                <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>Unit B-402 · Prestige Elysian, Bengaluru</Typography>
              </Box>
              <Chip label="Under Review" size="small" sx={{ background: 'rgba(247,184,1,0.08)', color: '#F7B801', border: '1px solid rgba(247,184,1,0.2)' }} />
            </Stack>

            {[
              { label: 'Tenant', value: 'Rahul Sharma' },
              { label: 'Property', value: 'B-402, Prestige Elysian, Whitefield, Bengaluru' },
              { label: 'Lease Period', value: 'Feb 1, 2024 – Jan 31, 2025 (12 months)' },
              { label: 'Monthly Rent', value: '₹45,000 (payable by 5th of each month)' },
              { label: 'Security Deposit', value: '₹90,000 (2 months rent)' },
              { label: 'Property Manager', value: 'Suresh Anand, HiveIvy Properties' },
            ].map((item) => (
              <Box key={item.label}>
                <Grid container sx={{ py: 1.5 }}>
                  <Grid  size={{ xs: 4 }}>
                    <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary', fontWeight: 600 }}>{item.label}</Typography>
                  </Grid>
                  <Grid  size={{ xs: 8 }}>
                    <Typography sx={{ fontSize: '0.82rem', color: 'text.primary' }}>{item.value}</Typography>
                  </Grid>
                </Grid>
                <Divider />
              </Box>
            ))}

            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button variant="contained" endIcon={<ArrowRight size={16} />} sx={{ flex: 1 }}>
                Sign Digitally
              </Button>
              <Button variant="outlined" sx={{ flex: 1 }}>
                Download PDF
              </Button>
            </Stack>
          </GlowCard>
        </Grid>
        <Grid  size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            <GlowCard glowColor="#00B81C" sx={{ p: 3 }}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <Sparkles size={18} color="#00B81C" />
                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>AI Lease Summary</Typography>
              </Stack>
              <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary', lineHeight: 1.7 }}>
                Your lease is a standard 11-month residential agreement. Rent increases by 5% upon renewal. Notice period is 30 days. No subletting allowed without written consent.
              </Typography>
              <Box sx={{ mt: 2, p: 1.5, borderRadius: '8px', background: 'rgba(0,184,28,0.06)', border: '1px solid rgba(0,184,28,0.12)' }}>
                <Typography sx={{ fontSize: '0.72rem', color: '#00B81C', fontWeight: 600 }}>No unusual clauses detected by AI</Typography>
              </Box>
            </GlowCard>
            <GlowCard sx={{ p: 3 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', mb: 2 }}>Important Dates</Typography>
              {[
                { label: 'Lease Start', value: 'Feb 1, 2024', color: '#00B81C' },
                { label: 'Lease End', value: 'Jan 31, 2025', color: '#F7B801' },
                { label: 'Next Rent Due', value: 'Jun 5, 2024', color: '#FF5A5F' },
                { label: 'Renewal Notice', value: 'Dec 31, 2024', color: '#E63946' },
              ].map((item) => (
                <Stack key={item.label} direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                  <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>{item.label}</Typography>
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: item.color }}>{item.value}</Typography>
                </Stack>
              ))}
            </GlowCard>
          </Stack>
        </Grid>
      </Grid>
    </motion.div>
  );
}
