import { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { TrendingUp, Building2, Users, FileText, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import GlowCard from '@/components/GlowCard';

function CountUp({ target, prefix = '', suffix = '', delay = 0 }: { target: number; prefix?: string; suffix?: string; delay?: number }) {
  const val = useMotionValue(0);
  const rounded = useTransform(val, (v) => {
    if (target < 100 && String(target).includes('.')) return v.toFixed(1);
    return Math.round(v);
  });

  useEffect(() => {
    const c = animate(val, target, { duration: 1.6, delay, ease: 'easeOut' });
    return c.stop;
  }, [val, target, delay]);

  return <motion.span>{prefix}<motion.span>{rounded}</motion.span>{suffix}</motion.span>;
}

const metricCards = [
  { title: 'Total Revenue', value: 2.4, display: '₹2.4Cr', change: '+18.2%', trend: 'up', sub: 'This month', icon: TrendingUp, color: '#FF5A5F', glow: 'rgba(255,90,95,0.1)', prefix: '₹', suffix: 'Cr', target: 2.4 },
  { title: 'Occupancy Rate', value: 96.4, display: '96.4%', change: '+2.1%', trend: 'up', sub: 'vs last month', icon: Building2, color: '#00B81C', glow: 'rgba(0,184,28,0.1)', prefix: '', suffix: '%', target: 96.4 },
  { title: 'Active Tenants', value: 284, display: '284', change: '+12', trend: 'up', sub: 'New this month', icon: Users, color: '#F7B801', glow: 'rgba(247,184,1,0.1)', prefix: '', suffix: '', target: 284 },
  { title: 'Leases Expiring', value: 8, display: '8', change: '-3', trend: 'down', sub: 'In next 30 days', icon: FileText, color: '#E63946', glow: 'rgba(230,57,70,0.1)', prefix: '', suffix: '', target: 8 },
];

export default function MetricCards() {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {metricCards.map((card, i) => (
        <Grid key={card.title} size={{ xs: 12, sm: 6, xl: 3 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlowCard glowColor={card.color} sx={{ p: 3 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2.5 }}>
                <Box>
                  <Typography sx={{ fontSize: '0.68rem', color: 'text.secondary', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', mb: 1.2 }}>
                    {card.title}
                  </Typography>
                  <Typography sx={{ fontWeight: 900, color: 'text.primary', fontSize: '1.9rem', lineHeight: 1, letterSpacing: '-0.04em' }}>
                    <CountUp target={card.target} prefix={card.prefix} suffix={card.suffix} delay={0.2 + i * 0.1} />
                  </Typography>
                </Box>
                <Box sx={{
                  width: 42, height: 42, borderRadius: '12px',
                  background: card.glow,
                  border: `1px solid ${card.color}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <card.icon size={20} color={card.color} />
                </Box>
              </Stack>
              <Stack direction="row" alignItems="center" spacing={0.6}>
                {card.trend === 'up'
                  ? <ArrowUpRight size={14} color="#00B81C" />
                  : <ArrowDownRight size={14} color="#E63946" />}
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: card.trend === 'up' ? '#00B81C' : '#E63946' }}>
                  {card.change}
                </Typography>
                <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>{card.sub}</Typography>
              </Stack>
            </GlowCard>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}
