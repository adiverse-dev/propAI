import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Divider from '@mui/material/Divider';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartTooltip, ResponsiveContainer } from 'recharts';
import GlowCard from '@/components/GlowCard';
import { occupancyData, properties } from '@/lib/mockData';

export default function OccupancyChart() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
      <GlowCard sx={{ p: 3, height: 360 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Occupancy</Typography>
            <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>Monthly trend</Typography>
          </Box>
        </Stack>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={occupancyData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
            <XAxis dataKey="month" tick={{ fill: '#9E9E9E', fontSize: 10 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#9E9E9E', fontSize: 10 }} axisLine={false} tickLine={false} domain={[80, 100]} tickFormatter={(v) => `${v}%`} />
            <RechartTooltip contentStyle={{ background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.08)', borderRadius: 8, fontSize: '0.75rem', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
            <Bar dataKey="rate" fill="url(#occGrad)" radius={[4, 4, 0, 0]} />
            <defs>
              <linearGradient id="occGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF5A5F" />
                <stop offset="100%" stopColor="#F7B801" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
        <Divider sx={{ my: 2 }} />
        <Stack spacing={1.5}>
          {properties.slice(0, 3).map((prop) => {
            const rate = Math.round((prop.occupied / prop.units) * 100);
            return (
              <Box key={prop.id}>
                <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                  <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', fontWeight: 500 }}>{prop.name.split(' ').slice(0, 2).join(' ')}</Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: '#00B81C', fontWeight: 700 }}>{rate}%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={rate} sx={{ height: 4 }} />
              </Box>
            );
          })}
        </Stack>
      </GlowCard>
    </motion.div>
  );
}
