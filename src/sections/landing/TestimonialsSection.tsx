import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { staggerContainer, staggerItem, VIEWPORT_ONCE } from '@/lib/animations';

const testimonials = [
  { name: 'Vikram Malhotra', role: 'Portfolio Manager, Bengaluru', text: 'Hivelvy transformed how we manage 200+ units. The AI insights have reduced vacancy periods by 40%.', avatar: 'VM', color: '#FF5A5F', rating: 5 },
  { name: 'Sunita Krishnaswamy', role: 'Property Developer, Mumbai', text: 'The lease drafting feature alone saves us 3 hours per tenant. The AI is genuinely intelligent.', avatar: 'SK', color: '#F7B801', rating: 5 },
  { name: 'Rajesh Agarwal', role: 'Real Estate Investor, Pune', text: 'Finally a platform that feels like it was built for 2024. The tenant portal experience is world-class.', avatar: 'RA', color: '#0066CC', rating: 5 },
];

export default function TestimonialsSection() {
  return (
    <Box sx={{ py: { xs: 10, md: 14 }, background: '#fff', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
      <Container maxWidth="lg">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.5 }}
          sx={{ textAlign: 'center', mb: 7 }}
        >
          <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.6rem' }, color: '#0A0A0A', letterSpacing: '-0.04em' }}>
            Trusted by property teams across India
          </Typography>
        </Box>

        <Box
          component={motion.div}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
        >
          <Grid container spacing={3}>
            {testimonials.map((t) => (
              <Grid key={t.name} size={{ xs: 12, md: 4 }}>
                <Box
                  component={motion.div}
                  variants={staggerItem}
                  whileHover={{ y: -6, boxShadow: `0 20px 56px rgba(0,0,0,0.08)` }}
                  sx={{
                    p: 3.5, borderRadius: '20px', height: '100%',
                    background: '#fff',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
                    transition: 'all 0.25s cubic-bezier(0.25,0.46,0.45,0.94)',
                    display: 'flex', flexDirection: 'column',
                  }}
                >
                  {/* Stars */}
                  <Stack direction="row" spacing={0.3} sx={{ mb: 2.5 }}>
                    {Array(t.rating).fill(0).map((_, j) => <Star key={j} size={14} color="#F7B801" fill="#F7B801" />)}
                  </Stack>

                  {/* Quote mark */}
                  <Typography sx={{ fontSize: '3rem', lineHeight: 0.8, color: 'rgba(0,0,0,0.06)', fontWeight: 900, mb: 1.5, fontFamily: 'Georgia, serif' }}>"</Typography>

                  <Typography sx={{ color: '#444', lineHeight: 1.75, mb: 3, fontSize: '0.95rem', flex: 1, fontStyle: 'italic' }}>
                    {t.text}
                  </Typography>

                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Avatar sx={{ width: 38, height: 38, background: t.color + '20', color: t.color, fontSize: '0.75rem', fontWeight: 800, border: `1.5px solid ${t.color}30` }}>{t.avatar}</Avatar>
                    <Box>
                      <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: '#111', lineHeight: 1.3 }}>{t.name}</Typography>
                      <Typography sx={{ fontSize: '0.75rem', color: '#999', mt: 0.2 }}>{t.role}</Typography>
                    </Box>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
