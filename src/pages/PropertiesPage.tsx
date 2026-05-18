import { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import { motion } from 'framer-motion';
import { Search, Plus, Building2, Users, TrendingUp, MapPin, Filter, ArrowUpRight, Eye, Star } from 'lucide-react';
import { properties, formatCurrency } from '@/lib/mockData';
import GlowCard from '@/components/GlowCard';

/* ── Realistic property photos via Unsplash ──────── */
const PROPERTY_IMAGES: Record<string, string> = {
  p1: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=280&fit=crop&auto=format',
  p2: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&h=280&fit=crop&auto=format',
  p3: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&h=280&fit=crop&auto=format',
  p4: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=280&fit=crop&auto=format',
};

const PROPERTY_COLORS: Record<string, string> = {
  p1: '#FF5A5F', p2: '#0066CC', p3: '#F7B801', p4: '#00B81C',
};

const TYPE_COLORS: Record<string, { bg: string; color: string }> = {
  'Premium Residential': { bg: 'rgba(255,90,95,0.08)', color: '#FF5A5F' },
  'Corporate Residential': { bg: 'rgba(0,102,204,0.08)', color: '#0066CC' },
  'Mid-Range Residential': { bg: 'rgba(247,184,1,0.08)', color: '#C48B00' },
  'Luxury Residential': { bg: 'rgba(0,184,28,0.08)', color: '#00B81C' },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.42, ease: [0.16, 1, 0.3, 1] } },
};

export default function PropertiesPage() {
  const [search, setSearch] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const totalRevenue = properties.reduce((s, p) => s + p.revenue, 0);
  const totalUnits = properties.reduce((s, p) => s + p.units, 0);
  const totalOccupied = properties.reduce((s, p) => s + p.occupied, 0);
  const avgOccupancy = Math.round((totalOccupied / totalUnits) * 100);

  const filtered = properties.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible">
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>

        {/* ── Header ─────────────────────────────────── */}
        <motion.div variants={item}>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} justifyContent="space-between" gap={2} sx={{ mb: 3.5 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#111', letterSpacing: '-0.03em', mb: 0.2 }}>Properties</Typography>
              <Typography sx={{ color: '#bbb', fontSize: '0.82rem' }}>{properties.length} properties · {totalUnits} total units</Typography>
            </Box>
            <Button variant="contained" startIcon={<Plus size={15} />}
              sx={{ background: '#111', color: '#fff', borderRadius: '10px', textTransform: 'none', fontWeight: 600, px: 2.5, py: 0.9, fontSize: '0.85rem', '&:hover': { background: '#000', transform: 'translateY(-1px)' }, transition: 'all 0.2s', boxShadow: '0 2px 10px rgba(0,0,0,0.12)' }}>
              Add Property
            </Button>
          </Stack>
        </motion.div>

        {/* ── Summary Cards ──────────────────────────── */}
        <motion.div variants={item}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {[
              { label: 'Total Properties', value: properties.length.toString(), icon: Building2, color: '#FF5A5F', bg: 'rgba(255,90,95,0.07)', trend: '+1 this quarter' },
              { label: 'Total Units', value: totalUnits.toString(), icon: Users, color: '#0066CC', bg: 'rgba(0,102,204,0.07)', trend: '+16 added' },
              { label: 'Portfolio Revenue', value: formatCurrency(totalRevenue), icon: TrendingUp, color: '#00B81C', bg: 'rgba(0,184,28,0.07)', trend: '+18% MoM' },
              { label: 'Avg Occupancy', value: `${avgOccupancy}%`, icon: Building2, color: '#F7B801', bg: 'rgba(247,184,1,0.07)', trend: '+2.1% vs last' },
            ].map((s) => (
              <Grid key={s.label} size={{ xs: 6, lg: 3 }}>
                <GlowCard glowColor={s.color} sx={{ p: 2.5 }}>
                  <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
                    <Box>
                      <Typography sx={{ fontSize: '0.62rem', color: '#bbb', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.8 }}>{s.label}</Typography>
                      <Typography sx={{ fontSize: '1.6rem', fontWeight: 900, color: '#111', letterSpacing: '-0.04em', lineHeight: 1 }}>{s.value}</Typography>
                      <Stack direction="row" alignItems="center" spacing={0.4} sx={{ mt: 1 }}>
                        <ArrowUpRight size={10} color="#00B81C" />
                        <Typography sx={{ fontSize: '0.62rem', color: '#00B81C', fontWeight: 600 }}>{s.trend}</Typography>
                      </Stack>
                    </Box>
                    <Box sx={{ width: 36, height: 36, borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <s.icon size={17} color={s.color} />
                    </Box>
                  </Stack>
                </GlowCard>
              </Grid>
            ))}
          </Grid>
        </motion.div>

        {/* ── Search + Filter ────────────────────────── */}
        <motion.div variants={item}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mb: 3 }}>
            <TextField
              placeholder="Search properties or locations…" size="small" value={search} onChange={e => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search size={14} color="#ccc" /></InputAdornment>, sx: { borderRadius: '10px', background: '#fff', fontSize: '0.85rem', '& fieldset': { borderColor: 'rgba(0,0,0,0.08)' }, '&:hover fieldset': { borderColor: 'rgba(0,0,0,0.15) !important' } } }}
              sx={{ flex: 1 }}
            />
            <Button variant="outlined" startIcon={<Filter size={14} />}
              sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, color: '#777', borderColor: 'rgba(0,0,0,0.08)', fontSize: '0.82rem', px: 2, '&:hover': { background: '#F5F5F5', borderColor: 'rgba(0,0,0,0.15)' } }}>
              Filter
            </Button>
          </Stack>
        </motion.div>

        {/* ── Property Cards ─────────────────────────── */}
        <Grid container spacing={2.5}>
          {filtered.map((prop) => {
            const occupancy = Math.round((prop.occupied / prop.units) * 100);
            const accentColor = PROPERTY_COLORS[prop.id] || '#FF5A5F';
            const typeStyle = TYPE_COLORS[prop.type] || { bg: 'rgba(0,0,0,0.05)', color: '#555' };
            const imgUrl = PROPERTY_IMAGES[prop.id];
            const isHovered = hoveredId === prop.id;

            return (
              <Grid key={prop.id} size={{ xs: 12, md: 6 }}>
                <Box
                  component={motion.div}
                  variants={item}
                  whileHover={{ y: -5 }}
                  onHoverStart={() => setHoveredId(prop.id)}
                  onHoverEnd={() => setHoveredId(null)}
                  sx={{
                    borderRadius: '16px', background: '#fff', border: '1px solid rgba(0,0,0,0.06)',
                    overflow: 'hidden', cursor: 'pointer',
                    boxShadow: isHovered ? '0 20px 60px rgba(0,0,0,0.1)' : '0 1px 8px rgba(0,0,0,0.04)',
                    transition: 'box-shadow 0.3s ease',
                  }}
                >
                  {/* Property image */}
                  <Box sx={{ height: 160, position: 'relative', overflow: 'hidden' }}>
                    {/* Real image with zoom hover */}
                    <Box
                      component={motion.div}
                      animate={{ scale: isHovered ? 1.06 : 1 }}
                      transition={{ duration: 0.5 }}
                      sx={{
                        position: 'absolute', inset: 0,
                        backgroundImage: `url(${imgUrl})`,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                      }}
                    />
                    {/* Dark overlay */}
                    <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 100%)' }} />

                    {/* Overlay chips */}
                    <Box sx={{ position: 'absolute', top: 12, left: 14 }}>
                      <Box sx={{ px: 1.2, py: 0.4, borderRadius: '7px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', display: 'inline-flex', alignItems: 'center', gap: 0.6, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                        <Box sx={{ width: 5, height: 5, borderRadius: '50%', background: occupancy >= 90 ? '#00B81C' : occupancy >= 75 ? '#F7B801' : '#FF5A5F' }} />
                        <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: '#111' }}>{occupancy}% Occupied</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ position: 'absolute', top: 12, right: 14 }}>
                      <Chip label={prop.type} size="small" sx={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', color: typeStyle.color, fontWeight: 700, fontSize: '0.62rem', height: 22, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} />
                    </Box>

                    {/* Bottom overlay info */}
                    <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, px: 2, pb: 1.5, pt: 3, background: 'linear-gradient(transparent, rgba(0,0,0,0.5))' }}>
                      <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>{prop.name}</Typography>
                      <Stack direction="row" alignItems="center" spacing={0.5}>
                        <MapPin size={10} color="rgba(255,255,255,0.7)" />
                        <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)' }}>{prop.location}</Typography>
                      </Stack>
                    </Box>

                    {/* Rating badge */}
                    <Box sx={{ position: 'absolute', bottom: 12, right: 14, px: 1, py: 0.3, borderRadius: '6px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', gap: 0.4, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                      <Star size={10} color="#F7B801" fill="#F7B801" />
                      <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: '#111' }}>4.8</Typography>
                    </Box>
                  </Box>

                  {/* Card body */}
                  <Box sx={{ p: 2.5 }}>
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      {[
                        { label: 'Units', value: `${prop.occupied}/${prop.units}` },
                        { label: 'Monthly Revenue', value: formatCurrency(prop.revenue) },
                        { label: 'Vacant', value: `${prop.units - prop.occupied} units` },
                      ].map((stat) => (
                        <Grid key={stat.label} size={4}>
                          <Typography sx={{ fontSize: '0.58rem', color: '#ccc', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', mb: 0.3 }}>{stat.label}</Typography>
                          <Typography sx={{ fontSize: '0.88rem', fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>{stat.value}</Typography>
                        </Grid>
                      ))}
                    </Grid>

                    {/* Occupancy bar */}
                    <Box sx={{ mb: 2 }}>
                      <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
                        <Typography sx={{ fontSize: '0.65rem', color: '#bbb', fontWeight: 500 }}>Occupancy rate</Typography>
                        <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: occupancy >= 90 ? '#00B81C' : '#F7B801' }}>{occupancy}%</Typography>
                      </Stack>
                      <Box sx={{ height: 4, borderRadius: 10, bgcolor: 'rgba(0,0,0,0.04)', overflow: 'hidden' }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${occupancy}%` }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          style={{ height: '100%', background: occupancy >= 90 ? '#00B81C' : occupancy >= 75 ? '#F7B801' : '#FF5A5F', borderRadius: 10 }} />
                      </Box>
                    </Box>

                    {/* Actions */}
                    <Stack direction="row" spacing={1.5} sx={{ pt: 2, borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                      <Button variant="outlined" size="small" fullWidth startIcon={<Eye size={13} />}
                        sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, fontSize: '0.75rem', borderColor: 'rgba(0,0,0,0.08)', color: '#777', py: 0.7, '&:hover': { background: '#F8F8F8', borderColor: 'rgba(0,0,0,0.15)' } }}>
                        Details
                      </Button>
                      <Button variant="contained" size="small" fullWidth
                        sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600, fontSize: '0.75rem', background: '#111', color: '#fff', py: 0.7, '&:hover': { background: '#000' } }}>
                        Manage
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </motion.div>
  );
}
