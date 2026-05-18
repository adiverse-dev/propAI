import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, ResponsiveContainer } from 'recharts';
import GlowCard from '@/components/GlowCard';
import { revenueData, formatCurrency } from '@/lib/mockData';

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <Box sx={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 2, p: 1.5, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', mb: 0.5 }}>{label}</Typography>
        <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: '#FF5A5F' }}>{formatCurrency(payload[0].value)}</Typography>
      </Box>
    );
  }
  return null;
}

export default function RevenueChart() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
      <GlowCard sx={{ p: 3, height: 360 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>Revenue Overview</Typography>
            <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>Monthly revenue vs target — FY 2024</Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Chip label="Revenue" size="small" sx={{ background: 'rgba(255,90,95,0.08)', color: '#FF5A5F', border: '1px solid rgba(255,90,95,0.2)', fontSize: '0.65rem' }} />
            <Chip label="Target" size="small" sx={{ background: 'rgba(0,184,28,0.06)', color: '#00B81C', border: '1px solid rgba(0,184,28,0.15)', fontSize: '0.65rem' }} />
          </Stack>
        </Stack>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF5A5F" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#FF5A5F" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00B81C" stopOpacity={0.12} />
                <stop offset="100%" stopColor="#00B81C" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
            <XAxis dataKey="month" tick={{ fill: '#9E9E9E', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#9E9E9E', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
            <RechartTooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="target" stroke="#00B81C" strokeWidth={1.5} strokeDasharray="4 4" fill="url(#targetGrad)" dot={false} />
            <Area type="monotone" dataKey="revenue" stroke="#FF5A5F" strokeWidth={2.5} fill="url(#revGrad)" dot={false} activeDot={{ r: 5, fill: '#FF5A5F' }} />
          </AreaChart>
        </ResponsiveContainer>
      </GlowCard>
    </motion.div>
  );
}
