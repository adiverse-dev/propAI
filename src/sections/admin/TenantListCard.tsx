import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import GlowCard from '@/components/GlowCard';
import StatusChip from '@/components/StatusChip';
import { tenants } from '@/lib/mockData';

export default function TenantListCard() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
      <GlowCard sx={{ p: 3 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2.5 }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>Active Tenants</Typography>
          <Button variant="text" size="small" endIcon={<ChevronRight size={14} />} sx={{ fontSize: '0.75rem' }}>View All</Button>
        </Stack>
        <Stack spacing={0}>
          {tenants.slice(0, 4).map((tenant, i) => (
            <Box key={tenant.id}>
              <Stack direction="row" alignItems="center" spacing={2} sx={{ py: 1.5 }}>
                <Avatar sx={{ width: 36, height: 36, background: `${tenant.color}15`, color: tenant.color, fontSize: '0.75rem', fontWeight: 700, border: `1px solid ${tenant.color}25` }}>{tenant.avatar}</Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: 'text.primary' }}>{tenant.name}</Typography>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tenant.unit} • {tenant.property.split(',')[0]}</Typography>
                </Box>
                <Box sx={{ textAlign: 'right', flexShrink: 0 }}>
                  <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: '#FF5A5F' }}>₹{(tenant.rent / 1000).toFixed(0)}K</Typography>
                  <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>/ month</Typography>
                </Box>
                <Box sx={{ textAlign: 'center', flexShrink: 0 }}>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: tenant.score >= 85 ? '#00B81C' : tenant.score >= 70 ? '#F7B801' : '#E63946' }}>{tenant.score}</Typography>
                  <Typography sx={{ fontSize: '0.6rem', color: 'text.secondary' }}>Score</Typography>
                </Box>
                <StatusChip status={tenant.status} />
              </Stack>
              {i < 3 && <Divider />}
            </Box>
          ))}
        </Stack>
      </GlowCard>
    </motion.div>
  );
}
