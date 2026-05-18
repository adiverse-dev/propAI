import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Bell, CircleAlert as AlertCircle, CircleCheck as CheckCircle2 } from 'lucide-react';
import GlowCard from '@/components/GlowCard';
import { tenantNotifications } from '@/lib/mockData';

const notifTypeConfig: Record<string, { color: string; bg: string; icon: typeof Bell }> = {
  action: { color: '#FF5A5F', bg: 'rgba(255,90,95,0.08)', icon: AlertCircle },
  success: { color: '#00B81C', bg: 'rgba(0,184,28,0.08)', icon: CheckCircle2 },
  info: { color: '#F7B801', bg: 'rgba(247,184,1,0.08)', icon: Bell },
};

export default function NotificationsTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Stack spacing={2} sx={{ maxWidth: 600 }}>
        <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', fontWeight: 600, letterSpacing: '0.08em' }}>RECENT</Typography>
        {tenantNotifications.map((notif, i) => {
          const config = notifTypeConfig[notif.type] || notifTypeConfig.info;
          return (
            <motion.div key={notif.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
              <GlowCard sx={{ p: 2.5 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Box sx={{ width: 36, height: 36, borderRadius: '10px', background: config.bg, border: `1px solid ${config.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mt: 0.3 }}>
                    <config.icon size={16} color={config.color} />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: '0.85rem', fontWeight: notif.read ? 500 : 700, color: notif.read ? 'text.secondary' : 'text.primary', lineHeight: 1.4 }}>
                      {notif.title}
                    </Typography>
                    <Typography sx={{ fontSize: '0.7rem', color: '#BDBDBD', mt: 0.5 }}>{notif.time}</Typography>
                  </Box>
                  {!notif.read && <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5A5F', mt: 1, flexShrink: 0 }} />}
                </Stack>
              </GlowCard>
            </motion.div>
          );
        })}
      </Stack>
    </motion.div>
  );
}
