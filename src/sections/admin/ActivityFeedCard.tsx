import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { motion } from 'framer-motion';
import { Activity, CircleCheck as CheckCircle2, FileText, Bell, Calendar, Shield, TrendingUp, CircleAlert as AlertCircle, Sparkles } from 'lucide-react';
import GlowCard from '@/components/GlowCard';
import { activityFeed } from '@/lib/mockData';

const activityTypeIcon: Record<string, typeof Sparkles> = {
  verify: CheckCircle2,
  lease: FileText,
  message: Bell,
  visit: Calendar,
  screening: Shield,
  payment: TrendingUp,
  alert: AlertCircle,
};

export default function ActivityFeedCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
      <GlowCard sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Activity size={18} color="#FF5A5F" />
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Activity Feed</Typography>
          </Stack>
          <Box component={motion.div} animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#00B81C' }} />
            <Typography sx={{ fontSize: '0.65rem', color: '#00B81C', fontWeight: 600 }}>Live</Typography>
          </Box>
        </Stack>
        <Stack spacing={0}>
          {activityFeed.slice(0, 5).map((item, i) => {
            const Icon = activityTypeIcon[item.type] || Activity;
            return (
              <Box key={item.id}>
                <Stack direction="row" alignItems="center" spacing={1.5} sx={{ py: 1.2 }}>
                  <Box sx={{ width: 30, height: 30, borderRadius: '8px', background: `${item.color}10`, border: `1px solid ${item.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={14} color={item.color} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: '0.78rem', color: 'text.primary', lineHeight: 1.4 }}>{item.text}</Typography>
                  </Box>
                  <Typography sx={{ fontSize: '0.65rem', color: '#BDBDBD', flexShrink: 0 }}>{item.time}</Typography>
                </Stack>
                {i < 4 && <Divider />}
              </Box>
            );
          })}
        </Stack>
      </GlowCard>
    </motion.div>
  );
}
