import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, IndianRupee, Clock, CheckCircle2, AlertCircle, Download, ArrowUpRight } from 'lucide-react';
import GlowCard from '@/components/GlowCard';
import { revenueData, tenants, formatCurrency } from '@/lib/mockData';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

// Recent payment activity
const recentPayments = [
  { id: 'p1', tenant: 'Rahul Sharma', avatar: 'RS', color: '#FF5A5F', unit: 'B-402', amount: 45000, date: 'May 15, 2026', status: 'paid', method: 'Auto-Pay' },
  { id: 'p2', tenant: 'Priya Verma', avatar: 'PV', color: '#00B81C', unit: 'A-201', amount: 62000, date: 'May 14, 2026', status: 'paid', method: 'UPI' },
  { id: 'p3', tenant: 'Aman Singh', avatar: 'AS', color: '#F7B801', unit: 'C-105', amount: 28000, date: 'May 10, 2026', status: 'overdue', method: 'Pending' },
  { id: 'p4', tenant: 'Neha Patel', avatar: 'NP', color: '#E63946', unit: 'D-306', amount: 78000, date: 'May 18, 2026', status: 'pending', method: 'NEFT' },
  { id: 'p5', tenant: 'Kavya Mehta', avatar: 'KM', color: '#0066CC', unit: 'E-501', amount: 35000, date: 'May 12, 2026', status: 'paid', method: 'Auto-Pay' },
  { id: 'p6', tenant: 'Arjun Reddy', avatar: 'AR', color: '#9333EA', unit: 'B-203', amount: 42000, date: 'May 11, 2026', status: 'paid', method: 'UPI' },
];

const STATUS_META: Record<string, { label: string; color: string; bg: string; icon: typeof CheckCircle2 }> = {
  paid: { label: 'Paid', color: '#00B81C', bg: 'rgba(0,184,28,0.08)', icon: CheckCircle2 },
  pending: { label: 'Pending', color: '#F7B801', bg: 'rgba(247,184,1,0.08)', icon: Clock },
  overdue: { label: 'Overdue', color: '#E63946', bg: 'rgba(230,57,70,0.08)', icon: AlertCircle },
};

// Chart data — last 6 months only for clarity
const chartData = revenueData.slice(6).map(d => ({
  ...d,
  revenue: Math.round(d.revenue / 100000),
  target: Math.round(d.target / 100000),
}));

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <Box sx={{ background: '#fff', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '10px', p: 1.5, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', minWidth: 140 }}>
      <Typography sx={{ fontSize: '0.72rem', color: '#aaa', fontWeight: 600, mb: 0.8 }}>{label}</Typography>
      {payload.map((p: any) => (
        <Stack key={p.dataKey} direction="row" justifyContent="space-between" spacing={2}>
          <Typography sx={{ fontSize: '0.78rem', color: '#555', fontWeight: 500 }}>{p.dataKey === 'revenue' ? 'Collected' : 'Target'}</Typography>
          <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: p.color }}>₹{p.value}L</Typography>
        </Stack>
      ))}
    </Box>
  );
};

export default function PaymentsPage() {
  const totalCollected = recentPayments.filter(p => p.status === 'paid').reduce((s, p) => s + p.amount, 0);
  const totalPending = recentPayments.filter(p => p.status !== 'paid').reduce((s, p) => s + p.amount, 0);
  const paidCount = recentPayments.filter(p => p.status === 'paid').length;
  const overdueCount = recentPayments.filter(p => p.status === 'overdue').length;

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible">
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>

        {/* Header */}
        <motion.div variants={item}>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} justifyContent="space-between" gap={2} sx={{ mb: 4 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#111', letterSpacing: '-0.025em', mb: 0.3 }}>Payments</Typography>
              <Typography sx={{ color: '#aaa', fontSize: '0.85rem' }}>May 2026 · ₹{(totalCollected / 1000).toFixed(0)}K collected this month</Typography>
            </Box>
            <Button variant="outlined" startIcon={<Download size={15} />}
              sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, color: '#555', borderColor: 'rgba(0,0,0,0.1)', fontSize: '0.88rem', px: 2.5, '&:hover': { background: '#F5F5F5' } }}>
              Export Report
            </Button>
          </Stack>
        </motion.div>

        {/* Summary cards */}
        <motion.div variants={item}>
          <Grid container spacing={2.5} sx={{ mb: 4 }}>
            {[
              { label: 'Collected This Month', value: formatCurrency(totalCollected), icon: CheckCircle2, color: '#00B81C', bg: 'rgba(0,184,28,0.08)', trend: '+18% vs last month' },
              { label: 'Pending Payments', value: formatCurrency(totalPending), icon: Clock, color: '#F7B801', bg: 'rgba(247,184,1,0.08)', trend: `${recentPayments.filter(p => p.status === 'pending').length} invoices` },
              { label: 'Overdue Amounts', value: formatCurrency(recentPayments.filter(p => p.status === 'overdue').reduce((s, p) => s + p.amount, 0)), icon: AlertCircle, color: '#E63946', bg: 'rgba(230,57,70,0.08)', trend: `${overdueCount} tenants` },
              { label: 'Collection Rate', value: `${Math.round((paidCount / recentPayments.length) * 100)}%`, icon: TrendingUp, color: '#0066CC', bg: 'rgba(0,102,204,0.08)', trend: 'This month' },
            ].map((s) => (
              <Grid key={s.label} size={{ xs: 6, lg: 3 }}>
                <GlowCard glowColor={s.color} sx={{ p: 2.5 }}>
                  <Stack direction="row" alignItems="flex-start" justifyContent="space-between" sx={{ mb: 1.5 }}>
                    <Box>
                      <Typography sx={{ fontSize: '0.65rem', color: '#aaa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.8 }}>{s.label}</Typography>
                      <Typography sx={{ fontSize: '1.6rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', lineHeight: 1 }}>{s.value}</Typography>
                    </Box>
                    <Box sx={{ width: 38, height: 38, borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <s.icon size={18} color={s.color} />
                    </Box>
                  </Stack>
                  <Typography sx={{ fontSize: '0.72rem', color: '#aaa', fontWeight: 500 }}>{s.trend}</Typography>
                </GlowCard>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        <Grid container spacing={3}>
          {/* Revenue chart */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <motion.div variants={item}>
              <GlowCard sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                  <Box>
                    <Typography sx={{ fontWeight: 700, color: '#111', fontSize: '1rem' }}>Revenue Collection</Typography>
                    <Typography sx={{ fontSize: '0.72rem', color: '#aaa', mt: 0.2 }}>Jul–Dec 2025 · Collected vs Target (₹ Lakhs)</Typography>
                  </Box>
                  <Stack direction="row" spacing={1.5}>
                    {[{ color: '#FF5A5F', label: 'Collected' }, { color: 'rgba(0,0,0,0.12)', label: 'Target' }].map(l => (
                      <Stack key={l.label} direction="row" alignItems="center" spacing={0.6}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: l.color }} />
                        <Typography sx={{ fontSize: '0.72rem', color: '#aaa', fontWeight: 500 }}>{l.label}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={chartData} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF5A5F" stopOpacity={0.15} />
                        <stop offset="100%" stopColor="#FF5A5F" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                    <XAxis dataKey="month" tick={{ fill: '#bbb', fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#bbb', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}L`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="target" stroke="rgba(0,0,0,0.1)" strokeWidth={2} fill="rgba(0,0,0,0.02)" dot={false} />
                    <Area type="monotone" dataKey="revenue" stroke="#FF5A5F" strokeWidth={2.5} fill="url(#colRev)" dot={{ fill: '#FF5A5F', r: 3, strokeWidth: 0 }} activeDot={{ r: 5 }} />
                  </AreaChart>
                </ResponsiveContainer>
              </GlowCard>
            </motion.div>
          </Grid>

          {/* Quick stats */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <motion.div variants={item}>
              <GlowCard sx={{ p: 3, height: '100%' }}>
                <Typography sx={{ fontWeight: 700, color: '#111', fontSize: '1rem', mb: 2.5 }}>Payment Methods</Typography>
                <Stack spacing={2}>
                  {[
                    { method: 'Auto-Pay', count: 2, amount: 80000, pct: 35, color: '#FF5A5F' },
                    { method: 'UPI', count: 2, amount: 104000, pct: 45, color: '#0066CC' },
                    { method: 'NEFT', count: 1, amount: 78000, pct: 20, color: '#F7B801' },
                  ].map(m => (
                    <Box key={m.method}>
                      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.6 }}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: m.color }} />
                          <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#333' }}>{m.method}</Typography>
                        </Stack>
                        <Stack direction="row" spacing={1.5}>
                          <Typography sx={{ fontSize: '0.8rem', color: '#888' }}>{m.count} txns</Typography>
                          <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#111' }}>₹{(m.amount / 1000).toFixed(0)}K</Typography>
                        </Stack>
                      </Stack>
                      <Box sx={{ height: 6, borderRadius: 10, bgcolor: 'rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${m.pct}%` }} transition={{ duration: 0.8, delay: 0.4 }}
                          style={{ height: '100%', background: m.color, borderRadius: 10 }} />
                      </Box>
                    </Box>
                  ))}
                </Stack>
                <Divider sx={{ my: 2.5 }} />
                <Box sx={{ p: 2, borderRadius: '12px', background: 'rgba(0,184,28,0.04)', border: '1px solid rgba(0,184,28,0.1)' }}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <ArrowUpRight size={16} color="#00B81C" />
                    <Typography sx={{ fontSize: '0.82rem', color: '#00B81C', fontWeight: 600 }}>₹{formatCurrency(totalCollected)} collected</Typography>
                  </Stack>
                  <Typography sx={{ fontSize: '0.72rem', color: '#aaa', mt: 0.4 }}>Collection rate: {Math.round((paidCount / recentPayments.length) * 100)}% · May 2026</Typography>
                </Box>
              </GlowCard>
            </motion.div>
          </Grid>

          {/* Payment activity */}
          <Grid size={12}>
            <motion.div variants={item}>
              <GlowCard sx={{ overflow: 'hidden' }}>
                <Box sx={{ px: 3, py: 2, borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography sx={{ fontWeight: 700, color: '#111', fontSize: '1rem' }}>Recent Transactions</Typography>
                    <Button variant="text" size="small" sx={{ fontSize: '0.78rem', color: '#888', textTransform: 'none', fontWeight: 600 }}>View All</Button>
                  </Stack>
                </Box>

                {/* Table header */}
                <Box sx={{ px: 3, py: 1.2, borderBottom: '1px solid rgba(0,0,0,0.04)', background: '#FAFAFA' }}>
                  <Grid container>
                    <Grid size={{ xs: 4, md: 3 }}><Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tenant</Typography></Grid>
                    <Grid size={{ xs: 0, md: 2 }} sx={{ display: { xs: 'none', md: 'block' } }}><Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Date</Typography></Grid>
                    <Grid size={{ xs: 3, md: 2 }}><Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Amount</Typography></Grid>
                    <Grid size={{ xs: 0, md: 2 }} sx={{ display: { xs: 'none', md: 'block' } }}><Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Method</Typography></Grid>
                    <Grid size={{ xs: 5, md: 3 }}><Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Status</Typography></Grid>
                  </Grid>
                </Box>

                {recentPayments.map((pay, i) => {
                  const sm = STATUS_META[pay.status];
                  return (
                    <Box key={pay.id}>
                      <Box component={motion.div} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 * i }}
                        sx={{ px: 3, py: 2, '&:hover': { background: '#FAFAFA' }, transition: 'background 0.15s', cursor: 'pointer' }}>
                        <Grid container alignItems="center">
                          <Grid size={{ xs: 4, md: 3 }}>
                            <Stack direction="row" alignItems="center" spacing={1.2}>
                              <Avatar sx={{ width: 30, height: 30, fontSize: '0.62rem', fontWeight: 800, background: pay.color + '20', color: pay.color, border: `1.5px solid ${pay.color}30`, flexShrink: 0 }}>{pay.avatar}</Avatar>
                              <Box sx={{ minWidth: 0 }}>
                                <Typography sx={{ fontSize: '0.82rem', fontWeight: 600, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pay.tenant}</Typography>
                                <Typography sx={{ fontSize: '0.65rem', color: '#bbb' }}>{pay.unit}</Typography>
                              </Box>
                            </Stack>
                          </Grid>
                          <Grid size={{ xs: 0, md: 2 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Typography sx={{ fontSize: '0.82rem', color: '#888' }}>{pay.date}</Typography>
                          </Grid>
                          <Grid size={{ xs: 3, md: 2 }}>
                            <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#111' }}>₹{(pay.amount / 1000).toFixed(0)}K</Typography>
                          </Grid>
                          <Grid size={{ xs: 0, md: 2 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Typography sx={{ fontSize: '0.82rem', color: '#888' }}>{pay.method}</Typography>
                          </Grid>
                          <Grid size={{ xs: 5, md: 3 }}>
                            <Chip
                              icon={<sm.icon size={11} color={sm.color} />}
                              label={sm.label}
                              size="small"
                              sx={{ background: sm.bg, color: sm.color, fontWeight: 700, fontSize: '0.72rem', height: 24, border: `1px solid ${sm.color}20`, '& .MuiChip-icon': { ml: 0.8 } }}
                            />
                          </Grid>
                        </Grid>
                      </Box>
                      {i < recentPayments.length - 1 && <Divider sx={{ opacity: 0.5 }} />}
                    </Box>
                  );
                })}
              </GlowCard>
            </motion.div>
          </Grid>
        </Grid>
      </Box>
    </motion.div>
  );
}
