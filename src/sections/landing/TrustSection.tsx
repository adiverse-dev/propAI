import { Box, Container, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { VIEWPORT_ONCE } from '@/lib/animations';

const BRANDS = [
  'Prestige Group', 'DLF Limited', 'Godrej Properties',
  'Hiranandani', 'Lodha Group', 'Embassy Group', 'Brigade Group',
];

export default function TrustSection() {
  // Duplicate for seamless infinite scroll
  const all = [...BRANDS, ...BRANDS];

  return (
    <Box sx={{ py: { xs: 5, md: 7 }, background: '#FAFAFA', borderTop: '1px solid rgba(0,0,0,0.05)', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.5 }}
        >
          <Typography sx={{ fontSize: '0.72rem', fontWeight: 600, color: '#bbb', letterSpacing: '0.09em', textTransform: 'uppercase', textAlign: 'center', mb: 4 }}>
            Trusted by forward-thinking property operations
          </Typography>
        </Box>
      </Container>

      {/* Marquee track */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        {/* Fade masks */}
        <Box sx={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(90deg, #FAFAFA 0%, transparent 100%)', zIndex: 2, pointerEvents: 'none' }} />
        <Box sx={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 120, background: 'linear-gradient(270deg, #FAFAFA 0%, transparent 100%)', zIndex: 2, pointerEvents: 'none' }} />

        <Box
          component={motion.div}
          animate={{ x: [0, -(BRANDS.length * 176)] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          sx={{ display: 'flex', gap: '0px', width: 'max-content' }}
        >
          {all.map((brand, i) => (
            <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.2, px: 4, py: 1.5, flexShrink: 0 }}>
              <Box sx={{ width: 22, height: 22, borderRadius: '6px', background: 'rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography sx={{ fontSize: '0.65rem', fontWeight: 800, color: '#555' }}>{brand[0]}</Typography>
              </Box>
              <Typography sx={{ fontSize: '0.9rem', fontWeight: 700, color: '#555', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>{brand}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
