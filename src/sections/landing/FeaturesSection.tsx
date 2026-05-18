import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Brain, FileText, MessageSquare, Users, Globe, ChartBar as BarChart3 } from 'lucide-react';
import AIBadge from '@/components/AIBadge';
import GlowCard from '@/components/GlowCard';

const hex = (color: string, alpha: string) => color + alpha;

const features = [
  { icon: Brain, title: 'AI Tenant Screening', desc: 'HiveAI analyzes credit scores, rental history, and behavioral patterns to predict lease reliability with 94% accuracy.', color: '#FF5A5F', glow: 'rgba(255,90,95,0.12)' },
  { icon: FileText, title: 'AI Lease Drafting', desc: 'Generate legally compliant, customized lease agreements in seconds using intelligent templates powered by HiveAI.', color: '#F7B801', glow: 'rgba(247,184,1,0.12)' },
  { icon: MessageSquare, title: 'AI Communication Workflows', desc: 'Smart inbox with AI reply suggestions, automated follow-ups, and tenant communication orchestration.', color: '#FF6B35', glow: 'rgba(255,107,53,0.12)' },
  { icon: Users, title: 'Tenant Onboarding', desc: 'Guided digital onboarding journey from application to move-in with real-time status tracking for every stakeholder.', color: '#0066CC', glow: 'rgba(0,102,204,0.12)' },
  { icon: BarChart3, title: 'Smart Rental Operations', desc: 'Real-time analytics, occupancy trends, revenue forecasting, and operational insights all in one intelligent workspace.', color: '#00B81C', glow: 'rgba(0,184,28,0.12)' },
  { icon: Globe, title: 'Mobile-First Experience', desc: 'Tenants can track their rental journey, pay rent, raise requests, and communicate — all from their mobile device.', color: '#FF5A5F', glow: 'rgba(255,90,95,0.12)' },
];

export default function FeaturesSection() {
  return (
    <Box sx={{ py: { xs: 10, md: 14 } }}>
      <Container maxWidth="lg">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <Stack alignItems="center" textAlign="center" spacing={2} sx={{ mb: 8 }}>
            <AIBadge label="Platform Features" />
            <Typography variant="h2" sx={{ fontSize: { xs: '1.9rem', md: '2.8rem' }, maxWidth: 600, color: '#0A0A0A', fontWeight: 800, letterSpacing: '-0.04em' }}>Everything your rental operation needs</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 520 }}>From AI-powered screening to intelligent lease drafting — HiveIvy replaces a dozen tools with one intelligent platform.</Typography>
          </Stack>
        </motion.div>
        <Grid container spacing={3}>
          {features.map((feature, i) => (
            <Grid key={feature.title} size={{ xs: 12, sm: 6, lg: 4 }}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }}>
                <GlowCard glowColor={feature.color} sx={{ p: 3, height: '100%' }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: '12px', background: feature.glow, borderColor: hex(feature.color, '25'), border: '1px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <feature.icon size={22} color={feature.color} />
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: 'text.primary' }}>{feature.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>{feature.desc}</Typography>
                </GlowCard>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
