import { Box, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useMotionValue, useTransform, animate } from 'framer-motion';
import { VIEWPORT_ONCE, staggerContainer, staggerItem } from '@/lib/animations';

function CountUp({ target, prefix = '', suffix = '' }: { target: number; prefix?: string; suffix?: string }) {
  const val = useMotionValue(0);
  const rounded = useTransform(val, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(val, target, { duration: 1.8, ease: 'easeOut' });
    return controls.stop;
  }, [val, target]);

  return <motion.span>{prefix}<motion.span>{rounded}</motion.span>{suffix}</motion.span>;
}

const stats = [
  { display: '10,000', suffix: '+', label: 'Properties Managed', target: 10000, prefix: '' },
  { display: '94', suffix: '%', label: 'AI Accuracy Score', target: 94, prefix: '' },
  { display: '480', suffix: 'Cr+', label: 'Rent Processed', target: 480, prefix: '₹' },
  { display: '48', suffix: 'hr', label: 'Avg. Onboarding Time', target: 48, prefix: '' },
];

export default function StatsSection() {
  return (
    <Box sx={{ py: { xs: 8, md: 10 }, background: '#fff', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
      <Container maxWidth="lg">
        <Box
          component={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <Stack direction={{ xs: 'row', md: 'row' }} flexWrap="wrap" justifyContent="center" sx={{ gap: { xs: 0, md: 0 } }}>
            {stats.map((stat, i) => (
              <Box
                key={stat.label}
                component={motion.div}
                variants={staggerItem}
                sx={{
                  flex: { xs: '1 1 50%', md: '1 1 25%' },
                  textAlign: 'center',
                  py: { xs: 3, md: 2 },
                  px: 2,
                  borderRight: { md: i < stats.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' },
                  borderBottom: { xs: i < 2 ? '1px solid rgba(0,0,0,0.06)' : 'none', md: 'none' },
                }}
              >
                <Typography sx={{ fontSize: { xs: '2rem', md: '2.6rem' }, fontWeight: 900, color: '#FF5A5F', letterSpacing: '-0.04em', lineHeight: 1, mb: 0.8 }}>
                  <CountUp target={stat.target} prefix={stat.prefix} suffix={stat.suffix} />
                </Typography>
                <Typography sx={{ fontSize: '0.85rem', color: '#888', fontWeight: 500 }}>{stat.label}</Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
