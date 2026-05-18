import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import Chip from '@mui/material/Chip';
import { motion } from 'framer-motion';
import { CircleCheck as CheckCircle2, Circle, Sparkles, ChevronRight, Upload, Shield, CreditCard, FileText, Calendar, Lock, Star } from 'lucide-react';
import GlowCard from '@/components/GlowCard';
import AIBadge from '@/components/AIBadge';
import { tenantJourney } from '@/lib/mockData';

const documents = [
  { name: 'Aadhaar Card', status: 'verified', icon: Shield, color: '#00B81C' },
  { name: 'PAN Card', status: 'verified', icon: CreditCard, color: '#00B81C' },
  { name: 'Bank Statement', status: 'pending', icon: FileText, color: '#FF6B35' },
  { name: 'Employment Proof', status: 'missing', icon: Upload, color: '#E63946' },
];

const aiCards = [
  { text: 'Upload Aadhaar card to complete verification', type: 'action', icon: Upload },
  { text: 'Identity verification 80% complete', type: 'progress', icon: Shield },
  { text: 'Property manager reviewed your application', type: 'info', icon: CheckCircle2 },
  { text: 'Lease ready for signature — review now', type: 'action', icon: FileText },
];

export default function HomeTab() {
  const journey = tenantJourney;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Grid container spacing={3}>
        {/* Journey Progress */}
        <Grid  size={{ xs: 12, lg: 7 }}>
          <GlowCard sx={{ p: 3.5 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
              <Box>
                <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>Your Rental Journey</Typography>
                  <AIBadge label="Tracked" size="sm" />
                </Stack>
                <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>{journey.unit} · {journey.property}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography sx={{ fontSize: '2rem', fontWeight: 900, color: '#FF5A5F', lineHeight: 1 }}>
                  {journey.progress}%
                </Typography>
                <Typography sx={{ fontSize: '0.65rem', color: 'text.secondary' }}>Complete</Typography>
              </Box>
            </Stack>

            <Box sx={{ mb: 3 }}>
              <LinearProgress variant="determinate" value={journey.progress} sx={{ height: 8, borderRadius: 4 }} />
            </Box>

            {/* Steps Timeline */}
            <Stack spacing={0}>
              {journey.steps.map((step, i) => (
                <Box key={step.id} sx={{ display: 'flex', gap: 2 }}>
                  {/* Timeline line */}
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 24, flexShrink: 0 }}>
                    <Box
                      component={motion.div}
                      animate={step.status === 'active' ? { boxShadow: ['0 0 0 0 rgba(255,90,95,0)', '0 0 0 8px rgba(255,90,95,0.15)', '0 0 0 0 rgba(255,90,95,0)'] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                      sx={{
                        width: 24, height: 24, borderRadius: '50%', flexShrink: 0,
                        background: step.status === 'done' ? 'linear-gradient(135deg,#FF5A5F,#FF7B82)' : step.status === 'active' ? 'rgba(255,90,95,0.1)' : '#F5F5F5',
                        border: step.status === 'done' ? 'none' : step.status === 'active' ? '2px solid #FF5A5F' : '2px solid rgba(0,0,0,0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      {step.status === 'done' && <CheckCircle2 size={12} color="#fff" />}
                      {step.status === 'active' && <Box component={motion.div} animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1, repeat: Infinity }} sx={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5A5F' }} />}
                      {step.status === 'pending' && <Circle size={8} color="#BDBDBD" />}
                    </Box>
                    {i < journey.steps.length - 1 && (
                      <Box sx={{ width: 2, flex: 1, minHeight: 20, background: step.status === 'done' ? 'linear-gradient(180deg,rgba(255,90,95,0.4),rgba(255,90,95,0.05))' : 'rgba(0,0,0,0.06)', borderRadius: 1, my: 0.5 }} />
                    )}
                  </Box>
                  <Box sx={{ pb: i < journey.steps.length - 1 ? 2 : 0, pt: 0.2, flex: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.3 }}>
                      <Typography sx={{
                        fontSize: '0.85rem', fontWeight: step.status === 'active' ? 700 : 500,
                        color: step.status === 'done' ? 'text.primary' : step.status === 'active' ? '#FF5A5F' : 'text.secondary',
                      }}>
                        {step.label}
                      </Typography>
                      {step.status === 'active' && (
                        <Chip label="In Progress" size="small" sx={{ background: 'rgba(255,90,95,0.08)', color: '#FF5A5F', border: '1px solid rgba(255,90,95,0.2)', fontSize: '0.6rem', height: 18 }} />
                      )}
                      {step.status === 'done' && step.date && (
                        <Typography sx={{ fontSize: '0.65rem', color: '#BDBDBD' }}>{step.date}</Typography>
                      )}
                    </Stack>
                    <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', lineHeight: 1.5 }}>{step.description}</Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </GlowCard>
        </Grid>

        {/* Right column */}
        <Grid  size={{ xs: 12, lg: 5 }}>
          <Stack spacing={3}>
            {/* Quick stats */}
            <Grid container spacing={2}>
              {[
                { label: 'Monthly Rent', value: '₹45,000', color: '#FF5A5F', icon: CreditCard },
                { label: 'Days Left', value: '74', color: '#F7B801', icon: Calendar },
                { label: 'AI Score', value: '92/100', color: '#00B81C', icon: Star },
                { label: 'Deposit', value: '₹90K', color: '#0066CC', icon: Lock },
              ].map((item) => (
                <Grid key={item.label} size={{ xs: 6 }}>
                  <GlowCard glowColor={item.color} sx={{ p: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.5 }}>
                      <item.icon size={14} color={item.color} />
                      <Typography sx={{ fontSize: '0.62rem', color: 'text.secondary', fontWeight: 600 }}>{item.label.toUpperCase()}</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: '1.1rem', fontWeight: 800, color: item.color }}>{item.value}</Typography>
                  </GlowCard>
                </Grid>
              ))}
            </Grid>

            {/* AI Cards */}
            <GlowCard sx={{ p: 3 }}>
              <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 2 }}>
                <Box sx={{ width: 28, height: 28, borderRadius: '8px', background: 'linear-gradient(135deg,#FF5A5F,#F7B801)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={14} color="#fff" />
                </Box>
                <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>AI Reminders</Typography>
              </Stack>
              <Stack spacing={1.5}>
                {aiCards.map((card, i) => (
                  <Box key={i} sx={{
                    p: 1.5, borderRadius: '10px',
                    background: card.type === 'action' ? 'rgba(255,90,95,0.04)' : '#F5F5F5',
                    border: card.type === 'action' ? '1px solid rgba(255,90,95,0.12)' : '1px solid rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                  }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <card.icon size={14} color={card.type === 'action' ? '#FF5A5F' : card.type === 'progress' ? '#F7B801' : '#00B81C'} />
                      <Typography sx={{ fontSize: '0.78rem', color: 'text.primary', flex: 1, lineHeight: 1.4 }}>{card.text}</Typography>
                      {card.type === 'action' && <ChevronRight size={14} color="#9E9E9E" />}
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </GlowCard>

            {/* Documents */}
            <GlowCard sx={{ p: 3 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '0.9rem', mb: 2 }}>Documents</Typography>
              <Stack spacing={1}>
                {documents.map((doc) => (
                  <Stack key={doc.name} direction="row" alignItems="center" spacing={1.5} sx={{ py: 0.5 }}>
                    <doc.icon size={15} color={doc.color} />
                    <Typography sx={{ fontSize: '0.8rem', color: 'text.primary', flex: 1 }}>{doc.name}</Typography>
                    <Chip
                      label={doc.status === 'verified' ? 'Verified' : doc.status === 'pending' ? 'Pending' : 'Upload'}
                      size="small"
                      sx={{
                        background: doc.status === 'verified' ? 'rgba(0,184,28,0.08)' : doc.status === 'pending' ? 'rgba(255,107,53,0.08)' : 'rgba(230,57,70,0.08)',
                        color: doc.color,
                        border: `1px solid ${doc.color}25`,
                        fontSize: '0.65rem',
                        height: 20,
                      }}
                    />
                  </Stack>
                ))}
              </Stack>
            </GlowCard>
          </Stack>
        </Grid>
      </Grid>
    </motion.div>
  );
}
