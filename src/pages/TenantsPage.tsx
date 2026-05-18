import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Avatar from '@mui/material/Avatar';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { motion } from 'framer-motion';
import { Search, Plus, Filter, Mail, Phone, ChevronRight } from 'lucide-react';
import { tenants } from '@/lib/mockData';
import GlowCard from '@/components/GlowCard';
import StatusChip from '@/components/StatusChip';

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
};

const STATUS_FILTERS = ['All', 'Active', 'Renewal Due', 'Review', 'Onboarding'];

export default function TenantsPage() {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = tenants.filter(t => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.unit.toLowerCase().includes(search.toLowerCase()) ||
      t.property.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || t.status.replace('_', ' ').toLowerCase() === activeFilter.toLowerCase();
    return matchSearch && matchFilter;
  });

  const activeCount = tenants.filter(t => t.status === 'active').length;
  const renewalCount = tenants.filter(t => t.status === 'renewal_due').length;
  const avgScore = Math.round(tenants.reduce((s, t) => s + t.score, 0) / tenants.length);

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible">
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>

        {/* Header */}
        <motion.div variants={item}>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} justifyContent="space-between" gap={2} sx={{ mb: 4 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#111', letterSpacing: '-0.025em', mb: 0.3 }}>Tenants</Typography>
              <Typography sx={{ color: '#aaa', fontSize: '0.85rem' }}>{tenants.length} tenants · {activeCount} active</Typography>
            </Box>
            <Button variant="contained" startIcon={<Plus size={16} />}
              sx={{ background: '#111', color: '#fff', borderRadius: '10px', textTransform: 'none', fontWeight: 600, px: 2.5, '&:hover': { background: '#000' } }}>
              Add Tenant
            </Button>
          </Stack>
        </motion.div>

        {/* Summary */}
        <motion.div variants={item}>
          <Grid container spacing={2.5} sx={{ mb: 4 }}>
            {[
              { label: 'Total Tenants', value: tenants.length.toString(), color: '#FF5A5F' },
              { label: 'Active Leases', value: activeCount.toString(), color: '#00B81C' },
              { label: 'Renewals Due', value: renewalCount.toString(), color: '#F7B801' },
              { label: 'Avg AI Score', value: `${avgScore}`, color: '#0066CC' },
            ].map((s) => (
              <Grid key={s.label} size={{ xs: 6, lg: 3 }}>
                <GlowCard glowColor={s.color} sx={{ p: 2.5 }}>
                  <Typography sx={{ fontSize: '0.68rem', color: '#aaa', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.8 }}>{s.label}</Typography>
                  <Typography sx={{ fontSize: '1.9rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', lineHeight: 1 }}>{s.value}</Typography>
                </GlowCard>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* Search + Filter bar */}
        <motion.div variants={item}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} sx={{ mb: 3 }}>
            <TextField placeholder="Search tenants, units, properties…" size="small" value={search} onChange={e => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search size={15} color="#bbb" /></InputAdornment>, sx: { borderRadius: '10px', background: '#fff', fontSize: '0.88rem' } }}
              sx={{ flex: 1 }}
            />
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {STATUS_FILTERS.map(f => (
                <Button key={f} size="small" onClick={() => setActiveFilter(f)}
                  sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, fontSize: '0.78rem', px: 1.8, py: 0.7, background: activeFilter === f ? '#111' : 'transparent', color: activeFilter === f ? '#fff' : '#666', border: activeFilter === f ? 'none' : '1px solid rgba(0,0,0,0.1)', '&:hover': { background: activeFilter === f ? '#000' : '#F5F5F5' }, transition: 'all 0.15s', minWidth: 0 }}>
                  {f}
                </Button>
              ))}
            </Stack>
            <Button variant="outlined" startIcon={<Filter size={14} />} size="small"
              sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, color: '#555', borderColor: 'rgba(0,0,0,0.1)', fontSize: '0.82rem', px: 2, '&:hover': { background: '#F5F5F5' } }}>
              Filter
            </Button>
          </Stack>
        </motion.div>

        {/* Tenant Table */}
        <motion.div variants={item}>
          <GlowCard sx={{ overflow: 'hidden' }}>
            {/* Table header */}
            <Box sx={{ px: 3, py: 1.5, borderBottom: '1px solid rgba(0,0,0,0.05)', background: '#FAFAFA' }}>
              <Grid container alignItems="center" spacing={1}>
                <Grid size={{ xs: 4, md: 3 }}><Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tenant</Typography></Grid>
                <Grid size={{ xs: 0, md: 2 }} sx={{ display: { xs: 'none', md: 'block' } }}><Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Property</Typography></Grid>
                <Grid size={{ xs: 3, md: 2 }}><Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Rent</Typography></Grid>
                <Grid size={{ xs: 0, md: 2 }} sx={{ display: { xs: 'none', md: 'block' } }}><Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.06em' }}>AI Score</Typography></Grid>
                <Grid size={{ xs: 3, md: 2 }}><Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#bbb', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Status</Typography></Grid>
                <Grid size={{ xs: 2, md: 1 }} />
              </Grid>
            </Box>

            {/* Rows */}
            <motion.div variants={stagger} initial="hidden" animate="visible">
              {filtered.map((tenant, i) => (
                <Box key={tenant.id} component={motion.div} variants={item}>
                  <Box sx={{ px: 3, py: 2, '&:hover': { background: '#FAFAFA' }, transition: 'background 0.15s', cursor: 'pointer' }}>
                    <Grid container alignItems="center" spacing={1}>
                      {/* Tenant */}
                      <Grid size={{ xs: 4, md: 3 }}>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <Avatar sx={{ width: 34, height: 34, fontSize: '0.7rem', fontWeight: 800, background: tenant.color + '20', color: tenant.color, border: `1.5px solid ${tenant.color}30`, flexShrink: 0 }}>{tenant.avatar}</Avatar>
                          <Box sx={{ minWidth: 0 }}>
                            <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: '#111', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{tenant.name}</Typography>
                            <Typography sx={{ fontSize: '0.7rem', color: '#bbb' }}>{tenant.unit}</Typography>
                          </Box>
                        </Stack>
                      </Grid>
                      {/* Property */}
                      <Grid size={{ xs: 0, md: 2 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Typography sx={{ fontSize: '0.82rem', color: '#555', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tenant.property.split(',')[0]}</Typography>
                      </Grid>
                      {/* Rent */}
                      <Grid size={{ xs: 3, md: 2 }}>
                        <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#111' }}>₹{(tenant.rent / 1000).toFixed(0)}K</Typography>
                        <Typography sx={{ fontSize: '0.65rem', color: '#bbb' }}>/ month</Typography>
                      </Grid>
                      {/* AI Score */}
                      <Grid size={{ xs: 0, md: 2 }} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Box sx={{ maxWidth: 100 }}>
                          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.4 }}>
                            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: tenant.score >= 85 ? '#00B81C' : tenant.score >= 70 ? '#F7B801' : '#E63946' }}>{tenant.score}</Typography>
                          </Stack>
                          <LinearProgress variant="determinate" value={tenant.score}
                            sx={{ height: 4, borderRadius: 10, bgcolor: 'rgba(0,0,0,0.06)', '& .MuiLinearProgress-bar': { bgcolor: tenant.score >= 85 ? '#00B81C' : tenant.score >= 70 ? '#F7B801' : '#E63946', borderRadius: 10 } }} />
                        </Box>
                      </Grid>
                      {/* Status */}
                      <Grid size={{ xs: 3, md: 2 }}>
                        <StatusChip status={tenant.status} />
                      </Grid>
                      {/* Action */}
                      <Grid size={{ xs: 2, md: 1 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Box sx={{ width: 28, height: 28, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', '&:hover': { background: '#F0F0F0' }, transition: 'background 0.15s' }}>
                          <ChevronRight size={16} color="#ccc" />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  {i < filtered.length - 1 && <Divider sx={{ opacity: 0.5 }} />}
                </Box>
              ))}
            </motion.div>

            {filtered.length === 0 && (
              <Box sx={{ py: 8, textAlign: 'center' }}>
                <Typography sx={{ color: '#bbb', fontSize: '0.9rem' }}>No tenants match your search.</Typography>
              </Box>
            )}
          </GlowCard>
        </motion.div>

      </Box>
    </motion.div>
  );
}
