import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography, Container, Grid, Button, Avatar, LinearProgress } from '@mui/material';
import { motion, MotionValue, useMotionValue, useTransform, animate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Play, Shield, Zap, Search, Bell, Home, Users, FileText, Settings, BarChart2, CheckCircle2, Sparkles, TrendingUp } from 'lucide-react';

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.11 } },
};

/* ── Animated counter ─────────────────────────────── */
function Counter({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
  const val = useMotionValue(0);
  const rounded = useTransform(val, Math.round);
  useEffect(() => {
    const c = animate(val, to, { duration: 1.6, delay: 1.0, ease: 'easeOut' });
    return c.stop;
  }, [val, to]);
  return <motion.span>{prefix}<motion.span>{rounded}</motion.span>{suffix}</motion.span>;
}

/* ── Animated mini sparkline ──────────────────────── */
function MiniSparkline({ color }: { color: string }) {
  const points = [20, 35, 25, 45, 38, 55, 48, 62, 55, 70];
  const max = Math.max(...points), min = Math.min(...points);
  const h = 36, w = 90;
  const toY = (v: number) => h - ((v - min) / (max - min)) * (h - 4) - 2;
  const toX = (i: number) => (i / (points.length - 1)) * w;
  const d = points.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`).join(' ');

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <motion.path
        d={d}
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.9, ease: 'easeInOut' }}
      />
    </svg>
  );
}

/* ── Live Activity Ticker ─────────────────────────── */
const ACTIVITIES = [
  { text: 'Rahul Sharma — AI verified ✓', color: '#00B81C' },
  { text: 'Lease auto-drafted for A-102', color: '#0066CC' },
  { text: 'Rent ₹45,000 received', color: '#FF5A5F' },
  { text: 'Sneha Patel onboarding 68%', color: '#F7B801' },
];

function ActivityTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % ACTIVITIES.length), 2800);
    return () => clearInterval(t);
  }, []);
  const item = ACTIVITIES[idx];
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 0.8, borderRadius: '8px', background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.04)' }}>
      <Box component={motion.div} animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.4, repeat: Infinity }} sx={{ width: 6, height: 6, borderRadius: '50%', background: item.color, flexShrink: 0 }} />
      <Box sx={{ overflow: 'hidden', flex: 1 }}>
        <motion.div key={idx} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.3 }}>
          <Typography sx={{ fontSize: '0.62rem', color: '#555', fontWeight: 500, whiteSpace: 'nowrap' }}>{item.text}</Typography>
        </motion.div>
      </Box>
    </Box>
  );
}

/* ── Dashboard Preview ────────────────────────────── */
function DashboardPreview() {
  const tenants = [
    { name: 'Rahul Sharma', unit: 'Prestige A-102', status: 'AI Verified', progress: 100, color: '#00B81C', avatar: 'RS' },
    { name: 'Sneha Patel', unit: 'Elysian B-304', status: 'Pending Docs', progress: 65, color: '#F7B801', avatar: 'SP' },
    { name: 'Amit Kumar', unit: 'Oasis C-201', status: 'Lease Review', progress: 85, color: '#0066CC', avatar: 'AK' },
  ];

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 56, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.05, delay: 0.35, ease: EASE_OUT }}
      sx={{
        width: '100%', maxWidth: 760,
        height: { xs: 370, sm: 450, md: 510 },
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(24px)',
        borderRadius: '20px',
        border: '1px solid rgba(0,0,0,0.07)',
        boxShadow: '0 0 0 1px rgba(0,0,0,0.02), 0 4px 8px rgba(0,0,0,0.02), 0 16px 40px rgba(0,0,0,0.06), 0 48px 100px rgba(0,0,0,0.08)',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        position: 'relative', zIndex: 10,
      }}
    >
      {/* macOS title bar */}
      <Stack direction="row" alignItems="center" sx={{ px: 2.5, py: 1.4, borderBottom: '1px solid rgba(0,0,0,0.05)', background: 'rgba(248,248,248,0.9)', flexShrink: 0 }}>
        <Stack direction="row" spacing={0.7}>
          {['#FF5F56', '#FFBD2E', '#27C93F'].map(c => <Box key={c} sx={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
        </Stack>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ width: 220, height: 22, borderRadius: '6px', background: '#EBEBEB', display: 'flex', alignItems: 'center', px: 1.2, gap: 0.7 }}>
            <Search size={10} color="#999" />
            <Typography sx={{ fontSize: '0.6rem', color: '#aaa', fontWeight: 500 }}>app.hivelvy.com</Typography>
          </Box>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{ position: 'relative' }}>
            <Bell size={13} color="#888" />
            <Box sx={{ position: 'absolute', top: -2, right: -2, width: 5, height: 5, borderRadius: '50%', background: '#FF5A5F' }} />
          </Box>
          <Avatar sx={{ width: 20, height: 20, fontSize: '0.55rem', bgcolor: '#111', fontWeight: 700 }}>A</Avatar>
        </Stack>
      </Stack>

      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar */}
        <Stack spacing={2} sx={{ width: 52, borderRight: '1px solid rgba(0,0,0,0.05)', py: 2.5, alignItems: 'center', background: 'rgba(250,250,250,0.7)', flexShrink: 0 }}>
          <Box component={motion.div} animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
            sx={{ width: 28, height: 28, borderRadius: '8px', background: 'linear-gradient(135deg, #FF5A5F, #FF7B82)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1, boxShadow: '0 3px 8px rgba(255,90,95,0.3)' }}>
            <Home size={13} color="#fff" />
          </Box>
          {[BarChart2, Users, FileText].map((Icon, i) => <Icon key={i} size={15} color="#ccc" />)}
          <Box sx={{ flex: 1 }} />
          <Settings size={15} color="#ccc" />
        </Stack>

        {/* Main content */}
        <Box sx={{ flex: 1, p: { xs: 1.5, md: 2.5 }, display: 'flex', flexDirection: 'column', gap: 2, overflow: 'hidden' }}>
          {/* Header */}
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography sx={{ fontSize: { xs: '0.9rem', md: '1.05rem' }, fontWeight: 800, color: '#111', letterSpacing: '-0.025em' }}>Property Overview</Typography>
              <Typography sx={{ fontSize: '0.6rem', color: '#aaa', mt: 0.2 }}>AI-driven insights · 4 properties</Typography>
            </Box>
            <Button size="small" sx={{ background: '#111', color: '#fff', borderRadius: '7px', px: 1.5, py: 0.5, fontSize: '0.65rem', fontWeight: 600, textTransform: 'none', minWidth: 'auto', '&:hover': { background: '#333' } }}>+ New</Button>
          </Stack>

          {/* Metric cards */}
          <Stack direction="row" spacing={1.2}>
            {[
              { label: 'Monthly Rent', value: 42, prefix: '₹', suffix: 'L', sparkColor: '#FF5A5F', trend: '+12%', trendColor: '#00B81C' },
              { label: 'Occupancy', value: 94, suffix: '%', sparkColor: '#0066CC', trend: '+2%', trendColor: '#00B81C' },
              { label: 'Renewals Due', value: 8, sparkColor: '#F7B801', trend: 'Action', trendColor: '#FF5A5F' },
            ].map((m, i) => (
              <Box key={m.label} component={motion.div} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 + i * 0.1 }}
                sx={{ flex: 1, p: { xs: 1, md: 1.4 }, borderRadius: '10px', border: '1px solid rgba(0,0,0,0.05)', background: '#FAFAFA' }}>
                <Typography sx={{ fontSize: '0.55rem', color: '#bbb', mb: 0.4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{m.label}</Typography>
                <Stack direction="row" alignItems="baseline" justifyContent="space-between">
                  <Typography sx={{ fontSize: { xs: '0.9rem', md: '1.1rem' }, fontWeight: 800, color: '#111', letterSpacing: '-0.03em' }}>
                    <Counter to={m.value} prefix={m.prefix || ''} suffix={m.suffix || ''} />
                  </Typography>
                  <Typography sx={{ fontSize: '0.55rem', fontWeight: 700, color: m.trendColor }}>{m.trend}</Typography>
                </Stack>
                <Box sx={{ mt: 0.5 }}><MiniSparkline color={m.sparkColor} /></Box>
              </Box>
            ))}
          </Stack>

          {/* Bottom: tenant list + AI panel */}
          <Stack direction="row" spacing={2} sx={{ flex: 1, minHeight: 0 }}>
            <Box sx={{ flex: 1.4, display: 'flex', flexDirection: 'column', gap: 0.8, minWidth: 0 }}>
              <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: '#111' }}>Recent Onboarding</Typography>
              <Box sx={{ border: '1px solid rgba(0,0,0,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                {tenants.map((t, idx) => (
                  <React.Fragment key={t.name}>
                    <Box component={motion.div} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.95 + idx * 0.09 }}>
                      <Stack direction="row" alignItems="center" sx={{ px: 1.2, py: 1, '&:hover': { background: '#FAFAFA' }, transition: 'background 0.15s', gap: 1 }}>
                        <Avatar sx={{ width: 24, height: 24, fontSize: '0.55rem', bgcolor: t.color + '20', color: t.color, border: `1px solid ${t.color}30`, fontWeight: 700, flexShrink: 0 }}>{t.avatar}</Avatar>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography sx={{ fontSize: '0.65rem', fontWeight: 600, color: '#111' }}>{t.name}</Typography>
                          <Typography sx={{ fontSize: '0.55rem', color: '#bbb', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.unit}</Typography>
                        </Box>
                        <Box sx={{ width: 70, flexShrink: 0 }}>
                          <Typography sx={{ fontSize: '0.5rem', color: '#999', fontWeight: 600, textAlign: 'right', mb: 0.3 }}>{t.status}</Typography>
                          <LinearProgress variant="determinate" value={t.progress} sx={{ height: 3, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.04)', '& .MuiLinearProgress-bar': { bgcolor: t.color, borderRadius: 2 } }} />
                        </Box>
                      </Stack>
                    </Box>
                    {idx < 2 && <Box sx={{ height: '1px', background: 'rgba(0,0,0,0.04)' }} />}
                  </React.Fragment>
                ))}
              </Box>
              <ActivityTicker />
            </Box>

            {/* AI Panel */}
            <Box sx={{ flex: 1, display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', minWidth: 0 }}>
              <Box component={motion.div} initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.1 }}
                sx={{ flex: 1, p: 1.8, borderRadius: '12px', background: 'linear-gradient(160deg, #FFF5F5 0%, #FFFCF0 100%)', border: '1px solid rgba(255,90,95,0.08)', display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                <Stack direction="row" alignItems="center" spacing={0.8}>
                  <Box component={motion.div} animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                    sx={{ p: 0.5, borderRadius: '5px', background: 'linear-gradient(135deg, #FF5A5F, #FF7B82)', display: 'flex' }}>
                    <Sparkles size={9} color="#fff" />
                  </Box>
                  <Typography sx={{ fontSize: '0.68rem', fontWeight: 800, color: '#111' }}>HiveAI Insights</Typography>
                  <Box component={motion.div} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} sx={{ width: 5, height: 5, borderRadius: '50%', background: '#FF5A5F', ml: 'auto' }} />
                </Stack>
                {[
                  { icon: CheckCircle2, color: '#00B81C', title: 'Risk Analysis', desc: 'Amit Kumar: 98% reliability score.' },
                  { icon: TrendingUp, color: '#0066CC', title: 'Revenue Forecast', desc: '+14% MoM growth projected.' },
                ].map((ins, i) => (
                  <Box key={i} sx={{ p: 1.2, borderRadius: '8px', background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.04)' }}>
                    <Stack direction="row" alignItems="center" spacing={0.6} sx={{ mb: 0.3 }}>
                      <ins.icon size={9} color={ins.color} />
                      <Typography sx={{ fontSize: '0.58rem', fontWeight: 700, color: '#111' }}>{ins.title}</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: '0.55rem', color: '#999', lineHeight: 1.4 }}>{ins.desc}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}

/* ── Hero Section ─────────────────────────────────── */
interface HeroSectionProps {
  heroY: MotionValue<number>;
  heroOpacity: MotionValue<number>;
}

export default function HeroSection({ heroY, heroOpacity }: HeroSectionProps) {
  const navigate = useNavigate();

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', background: 'linear-gradient(180deg, #F8F8F8 0%, #FAFAFA 100%)' }}>
      {/* Background layer */}
      <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, opacity: 0.35, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
      <Box component={motion.div} animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        sx={{ position: 'absolute', top: '-20%', left: '-10%', width: '55%', height: '70%', background: 'radial-gradient(ellipse at center, rgba(255,90,95,0.09) 0%, transparent 65%)', filter: 'blur(80px)', zIndex: 0 }} />
      <Box component={motion.div} animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        sx={{ position: 'absolute', bottom: '-20%', right: '-5%', width: '55%', height: '65%', background: 'radial-gradient(ellipse at center, rgba(247,184,1,0.06) 0%, transparent 65%)', filter: 'blur(80px)', zIndex: 0 }} />

      <Container maxWidth="lg" sx={{ pt: { xs: 14, md: 17 }, pb: { xs: 8, md: 10 }, position: 'relative', zIndex: 1 }}>
        <Box component={motion.div} style={{ y: heroY, opacity: heroOpacity }}>
          <Grid container spacing={{ xs: 6, lg: 7 }} alignItems="center">

            {/* Left — Copy */}
            <Grid size={{ xs: 12, lg: 5 }}>
              <motion.div variants={stagger} initial="hidden" animate="visible">
                <Stack spacing={3.5}>
                  {/* Badge */}
                  <motion.div variants={fadeUp}>
                    <Box component={motion.div} whileHover={{ scale: 1.03 }} sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2.5, py: 1, borderRadius: '100px', background: '#fff', border: '1px solid rgba(0,0,0,0.07)', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', cursor: 'pointer' }}>
                      <Box component={motion.div} animate={{ scale: [1, 1.5, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.8, repeat: Infinity }} sx={{ width: 7, height: 7, borderRadius: '50%', background: '#FF5A5F' }} />
                      <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#111' }}>HiveAI 2.0 is live</Typography>
                      <ArrowRight size={13} color="#aaa" />
                    </Box>
                  </motion.div>

                  {/* Headline */}
                  <motion.div variants={fadeUp}>
                    <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', sm: '3.1rem', md: '3.7rem', lg: '4.1rem' }, fontWeight: 900, lineHeight: 1.04, color: '#0A0A0A', letterSpacing: '-0.045em' }}>
                      The AI Workspace
                      <br />for Modern Property
                      <br />
                      <Box component="span" sx={{ background: 'linear-gradient(135deg, #FF5A5F 20%, #D94045 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                        Management.
                      </Box>
                    </Typography>
                  </motion.div>

                  {/* Sub */}
                  <motion.div variants={fadeUp}>
                    <Typography sx={{ color: '#555', fontWeight: 400, maxWidth: 430, lineHeight: 1.65, fontSize: { xs: '1rem', md: '1.08rem' } }}>
                      One intelligent platform for screening, leasing, payments, and communication. Built for modern property teams.
                    </Typography>
                  </motion.div>

                  {/* CTAs */}
                  <motion.div variants={fadeUp}>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <Button component={motion.button} whileHover={{ y: -2, boxShadow: '0 14px 32px rgba(0,0,0,0.16)' }} whileTap={{ scale: 0.98 }}
                        variant="contained" size="large" onClick={() => navigate('/signup')} endIcon={<ArrowRight size={17} />}
                        sx={{ background: '#111', color: '#fff', px: 4, py: 1.8, fontSize: '0.97rem', borderRadius: '12px', textTransform: 'none', fontWeight: 600, boxShadow: '0 8px 24px rgba(0,0,0,0.12)', '&:hover': { background: '#000' }, transition: 'all 0.2s ease' }}>
                        Start for free
                      </Button>
                      <Button component={motion.button} whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}
                        variant="outlined" size="large" startIcon={<Play size={16} />} onClick={() => navigate('/login')}
                        sx={{ borderColor: 'rgba(0,0,0,0.1)', color: '#111', px: 4, py: 1.8, fontSize: '0.97rem', borderRadius: '12px', textTransform: 'none', fontWeight: 600, background: '#fff', '&:hover': { background: '#F5F5F5', borderColor: 'rgba(0,0,0,0.15)' }, transition: 'all 0.2s ease' }}>
                        Watch demo
                      </Button>
                    </Stack>
                  </motion.div>

                  {/* Trust */}
                  <motion.div variants={fadeUp}>
                    <Stack direction="row" spacing={3.5} alignItems="center" sx={{ pt: 0.5 }}>
                      {[{ text: 'SOC2 Compliant', icon: Shield }, { text: 'Instant Setup', icon: Zap }].map(item => (
                        <Stack key={item.text} direction="row" alignItems="center" spacing={0.8}>
                          <item.icon size={14} color="#aaa" />
                          <Typography sx={{ fontSize: '0.82rem', color: '#888', fontWeight: 500 }}>{item.text}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </motion.div>
                </Stack>
              </motion.div>
            </Grid>

            {/* Right — Dashboard */}
            <Grid size={{ xs: 12, lg: 7 }} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
              <Box component={motion.div} animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.85, 0.5] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '85%', height: '85%', background: 'radial-gradient(circle, rgba(255,90,95,0.10) 0%, rgba(247,184,1,0.05) 45%, transparent 70%)', filter: 'blur(55px)', borderRadius: '50%', zIndex: 0 }} />
              <DashboardPreview />
            </Grid>

          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
