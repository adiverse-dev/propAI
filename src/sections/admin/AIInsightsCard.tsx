import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, CircleAlert as AlertCircle, Shield, Zap, CircleCheck as CheckCircle2, ChartBar as BarChart3 } from 'lucide-react';
import GlowCard from '@/components/GlowCard';
import AIBadge from '@/components/AIBadge';
import { aiInsights } from '@/lib/mockData';

const insightTypeConfig: Record<string, { color: string; bg: string; border: string; icon: typeof Sparkles }> = {
  urgent: { color: '#E63946', bg: 'rgba(230,57,70,0.06)', border: 'rgba(230,57,70,0.15)', icon: AlertCircle },
  warning: { color: '#F7B801', bg: 'rgba(247,184,1,0.06)', border: 'rgba(247,184,1,0.15)', icon: Shield },
  alert: { color: '#E63946', bg: 'rgba(230,57,70,0.06)', border: 'rgba(230,57,70,0.15)', icon: Zap },
  info: { color: '#FF5A5F', bg: 'rgba(255,90,95,0.06)', border: 'rgba(255,90,95,0.15)', icon: BarChart3 },
  success: { color: '#00B81C', bg: 'rgba(0,184,28,0.06)', border: 'rgba(0,184,28,0.15)', icon: CheckCircle2 },
};

export default function AIInsightsCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
      <GlowCard sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box sx={{ width: 32, height: 32, borderRadius: '10px', background: 'linear-gradient(135deg,#FF5A5F,#F7B801)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={16} color="#fff" />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.95rem' }}>AI Insights</Typography>
              <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>Updated 2 min ago</Typography>
            </Box>
          </Stack>
          <AIBadge label="HiveAI" size="sm" />
        </Stack>
        <AnimatePresence>
          <Stack spacing={1.5}>
            {aiInsights.map((insight, i) => {
              const config = insightTypeConfig[insight.type];
              return (
                <motion.div key={insight.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                  <Box sx={{
                    p: 2, borderRadius: '12px',
                    background: config.bg,
                    border: `1px solid ${config.border}`,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': { transform: 'translateX(2px)', boxShadow: `0 4px 20px ${config.color}10` },
                  }}>
                    <Stack direction="row" spacing={1.5} alignItems="flex-start">
                      <config.icon size={16} color={config.color} style={{ marginTop: 1, flexShrink: 0 }} />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: 'text.primary', mb: 0.5, lineHeight: 1.3 }}>{insight.title}</Typography>
                        <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', lineHeight: 1.5, mb: 1 }}>{insight.description}</Typography>
                        <Button size="small" sx={{ fontSize: '0.7rem', color: config.color, p: 0, height: 'auto', minWidth: 0, fontWeight: 600, '&:hover': { background: 'transparent', opacity: 0.8 } }} endIcon={<ChevronRight size={12} />}>
                          {insight.action}
                        </Button>
                      </Box>
                    </Stack>
                  </Box>
                </motion.div>
              );
            })}
          </Stack>
        </AnimatePresence>
      </GlowCard>
    </motion.div>
  );
}
