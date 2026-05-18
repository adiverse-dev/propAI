import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';
import { Building2, Home, Users, Sparkles, Shield, Zap, BarChart2, CheckCircle2, TrendingUp } from 'lucide-react';

// Animated counter for the panel
function AnimatedNumber({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    const controls = animate(count, target, { duration: 1.8, ease: 'easeOut', delay: 0.4 });
    return controls.stop;
  }, [count, target]);

  return (
    <motion.span style={{ fontVariantNumeric: 'tabular-nums' }}>
      {prefix}<motion.span>{rounded}</motion.span>{suffix}
    </motion.span>
  );
}

// Decorative left panel — shown only on md+
function AuthPanel() {
  const features = [
    { icon: Shield, text: 'SOC2 Compliant Security' },
    { icon: Zap, text: 'Instant AI Screening' },
    { icon: BarChart2, text: 'Real-time Analytics' },
    { icon: CheckCircle2, text: 'Automated Rent Collection' },
  ];

  const stats = [
    { value: 500, suffix: '+', label: 'Property Teams' },
    { value: 94, suffix: '%', label: 'AI Accuracy' },
    { value: 48, suffix: 'hr', label: 'Avg Onboarding' },
  ];

  const recentActivity = [
    { avatar: 'RS', color: '#FF5A5F', text: 'Rahul Sharma — AI verified', time: '2m ago' },
    { avatar: 'SP', color: '#F7B801', text: 'Lease signed for B-304', time: '8m ago' },
    { avatar: 'AK', color: '#0066CC', text: 'Rent collected ₹45,000', time: '15m ago' },
  ];

  return (
    <Box
      sx={{
        width: { md: '45%', lg: '48%' },
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: { md: 5, lg: 6 },
        background: 'linear-gradient(160deg, #0f0f0f 0%, #1a1a1a 40%, #111 100%)',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Grid pattern */}
      <Box sx={{
        position: 'absolute', inset: 0, opacity: 0.035,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }} />
      {/* Glow orbs */}
      <Box component={motion.div}
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        sx={{ position: 'absolute', top: '-20%', left: '-10%', width: '70%', height: '70%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,90,95,0.2) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }}
      />
      <Box component={motion.div}
        animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        sx={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '60%', height: '60%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(247,184,1,0.15) 0%, transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }}
      />

      {/* Logo */}
      <Box component={motion.div} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} sx={{ position: 'relative', zIndex: 1 }}>
        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Box sx={{ width: 32, height: 32, borderRadius: '10px', background: 'linear-gradient(135deg, #FF5A5F, #FF7B82)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(255,90,95,0.35)' }}>
            <Building2 size={16} color="#fff" />
          </Box>
          <Typography sx={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem', letterSpacing: '-0.02em' }}>Hivelvy</Typography>
        </Stack>
      </Box>

      {/* Middle content */}
      <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} sx={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 4 }}>
        <Typography sx={{ fontSize: { md: '1.8rem', lg: '2.2rem' }, fontWeight: 800, color: '#fff', lineHeight: 1.1, letterSpacing: '-0.04em', mb: 2 }}>
          The AI workspace
          <br />
          for modern property
          <br />
          <Box component="span" sx={{ background: 'linear-gradient(135deg, #FF5A5F, #FF7B82)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>management.</Box>
        </Typography>
        <Typography sx={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: 320, mb: 4 }}>
          Join 500+ property teams automating screening, leasing, and operations with HiveAI.
        </Typography>

        {/* Features */}
        <Stack spacing={1.5} sx={{ mb: 4 }}>
          {features.map((f, i) => (
            <Box component={motion.div} key={f.text} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.08 }}>
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Box sx={{ width: 28, height: 28, borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <f.icon size={13} color="rgba(255,255,255,0.7)" />
                </Box>
                <Typography sx={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{f.text}</Typography>
              </Stack>
            </Box>
          ))}
        </Stack>

        {/* Stats */}
        <Stack direction="row" spacing={3}>
          {stats.map((s, i) => (
            <Box key={s.label} component={motion.div} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
              <Typography sx={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1 }}>
                <AnimatedNumber target={s.value} suffix={s.suffix} />
              </Typography>
              <Typography sx={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', fontWeight: 500, mt: 0.3 }}>{s.label}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Live activity mini-feed */}
      <Box component={motion.div} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} sx={{ position: 'relative', zIndex: 1, p: 2, borderRadius: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(10px)' }}>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 1.5 }}>
          <Box component={motion.div} animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#00B81C' }} />
          </Box>
          <Typography sx={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.05em' }}>LIVE ACTIVITY</Typography>
        </Stack>
        <Stack spacing={1.2}>
          {recentActivity.map((item, i) => (
            <Stack key={i} direction="row" alignItems="center" spacing={1.2}>
              <Avatar sx={{ width: 22, height: 22, fontSize: '0.55rem', fontWeight: 800, background: item.color + '30', color: item.color, border: `1px solid ${item.color}40`, flexShrink: 0 }}>
                {item.avatar}
              </Avatar>
              <Typography sx={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', flex: 1, minWidth: 0 }}>{item.text}</Typography>
              <Typography sx={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.25)', flexShrink: 0 }}>{item.time}</Typography>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}

export default function PublicLayout() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', overflow: 'hidden' }}>
      {/* Left Decorative Panel */}
      <AuthPanel />

      {/* Right Form Area */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: '#FAFBFC',
        position: 'relative',
        overflow: 'hidden',
        minWidth: 0,
      }}>
        {/* Subtle bg orb */}
        <Box sx={{
          position: 'absolute', top: '-20%', right: '-15%', width: '60%', height: '60%',
          background: 'radial-gradient(ellipse at center, rgba(255,90,95,0.05) 0%, transparent 65%)',
          filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
        }} />
        <Box sx={{
          position: 'absolute', bottom: '-10%', left: '-10%', width: '50%', height: '50%',
          background: 'radial-gradient(ellipse at center, rgba(247,184,1,0.04) 0%, transparent 65%)',
          filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Mobile-only header */}
        <Box sx={{ display: { md: 'none' }, px: 3, pt: 3, pb: 1, position: 'relative', zIndex: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1.2} onClick={() => navigate('/')} sx={{ cursor: 'pointer', display: 'inline-flex' }}>
            <Box sx={{ width: 26, height: 26, borderRadius: '8px', background: 'linear-gradient(135deg, #FF5A5F, #FF7B82)' }} />
            <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, color: '#111', letterSpacing: '-0.02em' }}>Hivelvy</Typography>
          </Stack>
        </Box>

        {/* Form content */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: { xs: 3, sm: 4, md: 5 }, position: 'relative', zIndex: 1 }}>
          <Box sx={{ width: '100%', maxWidth: 440 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </Box>
        </Box>

        {/* Footer */}
        <Box sx={{ px: 4, py: 2, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Typography sx={{ fontSize: '0.72rem', color: '#bbb', fontWeight: 400 }}>
            © {new Date().getFullYear()} Hivelvy Inc. · <Box component="span" sx={{ cursor: 'pointer', '&:hover': { color: '#999' }, transition: 'color 0.15s' }}>Privacy</Box> · <Box component="span" sx={{ cursor: 'pointer', '&:hover': { color: '#999' }, transition: 'color 0.15s' }}>Terms</Box>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
