import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Sparkles, RefreshCw, Calendar, AlertTriangle, ArrowUpRight, Clock, IndianRupee } from 'lucide-react';
import MetricCards from '@/sections/admin/MetricCards';
import RevenueChart from '@/sections/admin/RevenueChart';
import OccupancyChart from '@/sections/admin/OccupancyChart';
import AIInsightsCard from '@/sections/admin/AIInsightsCard';
import TenantListCard from '@/sections/admin/TenantListCard';
import ActivityFeedCard from '@/sections/admin/ActivityFeedCard';
import GlowCard from '@/components/GlowCard';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
};

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

// Quick action widgets for dashboard density
const UPCOMING_PAYMENTS = [
  { tenant: 'Aman Singh', avatar: 'AS', color: '#F7B801', amount: '₹28K', due: '2 days', status: 'warning' },
  { tenant: 'Neha Patel', avatar: 'NP', color: '#E63946', amount: '₹78K', due: 'Overdue', status: 'critical' },
  { tenant: 'Kavya Mehta', avatar: 'KM', color: '#0066CC', amount: '₹35K', due: '5 days', status: 'normal' },
];

const LEASE_ALERTS = [
  { unit: 'C-105', tenant: 'Aman Singh', daysLeft: 12, color: '#F7B801' },
  { unit: 'D-306', tenant: 'Neha Patel', daysLeft: 8, color: '#E63946' },
  { unit: 'A-108', tenant: 'Rohit Kumar', daysLeft: 14, color: '#F7B801' },
];

export default function AdminDashboard() {
  const [processingAI, setProcessingAI] = useState(false);
  const [liveRev, setLiveRev] = useState(24.2);

  const handleRefreshAI = () => {
    setProcessingAI(true);
    setTimeout(() => setProcessingAI(false), 2000);
  };

  // Simulate live revenue tick
  useEffect(() => {
    const t = setInterval(() => {
      setLiveRev(v => Math.round((v + (Math.random() * 0.1)) * 10) / 10);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible">
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>

        {/* ─── Page Header ──────────────────────────────── */}
        <motion.div variants={item}>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} justifyContent="space-between" gap={2} sx={{ mb: 3.5 }}>
            <Box>
              <Typography sx={{ fontSize: '0.72rem', color: '#bbb', fontWeight: 500, mb: 0.4, letterSpacing: '0.02em' }}>
                {getGreeting()} 👋
              </Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#111', letterSpacing: '-0.03em', mb: 0.2 }}>
                Operations Dashboard
              </Typography>
              <Typography sx={{ color: '#bbb', fontSize: '0.82rem' }}>
                {dateStr} · 4 properties · 284 tenants
              </Typography>
            </Box>
            <Stack direction="row" spacing={1.5}>
              <Button
                variant="outlined"
                startIcon={
                  processingAI
                    ? <Box component={motion.div} animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><RefreshCw size={14} /></Box>
                    : <Sparkles size={14} />
                }
                onClick={handleRefreshAI}
                sx={{
                  fontSize: '0.82rem', fontWeight: 600, color: '#111',
                  borderColor: 'rgba(0,0,0,0.1)', borderRadius: '10px',
                  textTransform: 'none', px: 2.5, py: 0.9,
                  '&:hover': { background: '#F5F5F5', borderColor: 'rgba(0,0,0,0.18)' },
                  flexShrink: 0,
                }}
              >
                {processingAI ? 'Analyzing…' : 'Refresh AI'}
              </Button>
            </Stack>
          </Stack>
        </motion.div>

        {/* ─── Metrics ──────────────────────────────────── */}
        <motion.div variants={item}>
          <MetricCards />
        </motion.div>

        {/* ─── Charts Row ───────────────────────────────── */}
        <motion.div variants={item}>
          <Grid container spacing={2.5} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, lg: 8 }}><RevenueChart /></Grid>
            <Grid size={{ xs: 12, lg: 4 }}><OccupancyChart /></Grid>
          </Grid>
        </motion.div>

        {/* ─── Quick Widgets Row ─────────────────────────── */}
        <motion.div variants={item}>
          <Grid container spacing={2.5} sx={{ mb: 3 }}>

            {/* Upcoming Payments */}
            <Grid size={{ xs: 12, md: 4 }}>
              <GlowCard glowColor="#F7B801" sx={{ p: 2.5, height: '100%' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IndianRupee size={14} color="#F7B801" />
                    <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#111' }}>Upcoming Payments</Typography>
                  </Stack>
                  <Typography sx={{ fontSize: '0.68rem', color: '#bbb', fontWeight: 500 }}>This week</Typography>
                </Stack>
                <Stack spacing={1.5}>
                  {UPCOMING_PAYMENTS.map((p) => (
                    <Stack key={p.tenant} direction="row" alignItems="center" spacing={1.2}>
                      <Avatar sx={{ width: 26, height: 26, fontSize: '0.58rem', fontWeight: 800, background: p.color + '18', color: p.color, border: `1px solid ${p.color}25`, flexShrink: 0 }}>{p.avatar}</Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#111' }}>{p.tenant}</Typography>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <Clock size={9} color="#ccc" />
                          <Typography sx={{ fontSize: '0.62rem', color: p.status === 'critical' ? '#E63946' : p.status === 'warning' ? '#C48B00' : '#bbb', fontWeight: p.status !== 'normal' ? 600 : 400 }}>{p.due}</Typography>
                        </Stack>
                      </Box>
                      <Typography sx={{ fontSize: '0.82rem', fontWeight: 800, color: '#111', flexShrink: 0 }}>{p.amount}</Typography>
                    </Stack>
                  ))}
                </Stack>
              </GlowCard>
            </Grid>

            {/* Lease Expiry Alerts */}
            <Grid size={{ xs: 12, md: 4 }}>
              <GlowCard glowColor="#E63946" sx={{ p: 2.5, height: '100%' }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Calendar size={14} color="#E63946" />
                    <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#111' }}>Lease Expiry</Typography>
                  </Stack>
                  <Box sx={{ px: 1, py: 0.2, borderRadius: '6px', background: 'rgba(230,57,70,0.08)', border: '1px solid rgba(230,57,70,0.15)' }}>
                    <Typography sx={{ fontSize: '0.6rem', fontWeight: 700, color: '#E63946' }}>{LEASE_ALERTS.length} expiring</Typography>
                  </Box>
                </Stack>
                <Stack spacing={1.2}>
                  {LEASE_ALERTS.map((l) => (
                    <Box key={l.unit} sx={{ p: 1.2, borderRadius: '10px', background: l.daysLeft <= 10 ? 'rgba(230,57,70,0.04)' : 'rgba(247,184,1,0.04)', border: `1px solid ${l.daysLeft <= 10 ? 'rgba(230,57,70,0.1)' : 'rgba(247,184,1,0.1)'}` }}>
                      <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <Box>
                          <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#111' }}>{l.tenant}</Typography>
                          <Typography sx={{ fontSize: '0.62rem', color: '#bbb' }}>Unit {l.unit}</Typography>
                        </Box>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography sx={{ fontSize: '0.88rem', fontWeight: 800, color: l.color }}>{l.daysLeft}d</Typography>
                          <Typography sx={{ fontSize: '0.55rem', color: '#bbb' }}>remaining</Typography>
                        </Box>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </GlowCard>
            </Grid>

            {/* Portfolio Health */}
            <Grid size={{ xs: 12, md: 4 }}>
              <GlowCard glowColor="#00B81C" sx={{ p: 2.5, height: '100%' }}>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                  <ArrowUpRight size={14} color="#00B81C" />
                  <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#111' }}>Portfolio Health</Typography>
                </Stack>
                <Stack spacing={2}>
                  {[
                    { label: 'Collection Rate', value: 96, color: '#00B81C' },
                    { label: 'Tenant Satisfaction', value: 92, color: '#0066CC' },
                    { label: 'Maintenance SLA', value: 88, color: '#F7B801' },
                  ].map((m) => (
                    <Box key={m.label}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
                        <Typography sx={{ fontSize: '0.75rem', color: '#777', fontWeight: 500 }}>{m.label}</Typography>
                        <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: m.color }}>{m.value}%</Typography>
                      </Stack>
                      <Box sx={{ height: 5, borderRadius: 10, bgcolor: 'rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${m.value}%` }} transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                          style={{ height: '100%', background: m.color, borderRadius: 10 }} />
                      </Box>
                    </Box>
                  ))}
                </Stack>
                <Box sx={{ mt: 2, pt: 2, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                  <Stack direction="row" alignItems="center" spacing={0.8}>
                    <Box component={motion.div} animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} sx={{ width: 6, height: 6, borderRadius: '50%', background: '#00B81C', flexShrink: 0 }} />
                    <Typography sx={{ fontSize: '0.7rem', color: '#aaa' }}>
                      Live revenue: <Box component="span" sx={{ fontWeight: 700, color: '#00B81C' }}>₹{liveRev}L</Box> today
                    </Typography>
                  </Stack>
                </Box>
              </GlowCard>
            </Grid>

          </Grid>
        </motion.div>

        {/* ─── Bottom Row ────────────────────────────────── */}
        <motion.div variants={item}>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, lg: 5 }}><AIInsightsCard /></Grid>
            <Grid size={{ xs: 12, lg: 7 }}>
              <Stack spacing={2.5}>
                <TenantListCard />
                <ActivityFeedCard />
              </Stack>
            </Grid>
          </Grid>
        </motion.div>

      </Box>
    </motion.div>
  );
}
