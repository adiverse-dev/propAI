import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import GlowCard from '@/components/GlowCard';

export default function AITab() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Box sx={{ maxWidth: 720, mx: 'auto' }}>
        <GlowCard glowColor="#FF5A5F" sx={{ p: 3 }}>
          <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 3, pb: 2, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <Box sx={{ width: 40, height: 40, borderRadius: '12px', background: 'linear-gradient(135deg,#FF5A5F,#FF7B82)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={20} color="#fff" />
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>HiveAI Concierge</Typography>
              <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary' }}>Your intelligent rental assistant • Always available</Typography>
            </Box>
            <Box component={motion.div} animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', background: '#00B81C' }} />
              <Typography sx={{ fontSize: '0.65rem', color: '#00B81C', fontWeight: 600 }}>Online</Typography>
            </Box>
          </Stack>

          <Box sx={{ height: 360, overflow: 'auto', mb: 3 }}>
            {[
              { sender: 'ai', text: 'Hi Rahul! Welcome to HiveAI Concierge. Your rental verification is 80% complete. Upload your Aadhaar card to unlock the next step.' },
              { sender: 'user', text: 'What documents are still pending?' },
              { sender: 'ai', text: 'You need to upload: 1) Aadhaar Card (front & back) — this will complete your identity verification. 2) Last 3 months bank statement — for income verification. Everything else looks great!' },
              { sender: 'user', text: 'When does my lease expire?' },
              { sender: 'ai', text: 'Your lease for Unit B-402, Prestige Elysian expires on January 31, 2025. I\'ll automatically send you a renewal reminder on December 1, 2024 — 30 days before expiry.' },
              { sender: 'user', text: 'Generate a lease summary for me' },
              { sender: 'ai', text: 'Lease Summary for B-402:\n• Duration: Feb 2024 – Jan 2025 (11 months)\n• Monthly Rent: ₹45,000 (due by 5th)\n• Deposit: ₹90,000 (refundable)\n• Notice Period: 30 days\n• Renewal Increase: 5%\nNo unusual clauses detected.' },
            ].map((msg, i) => (
              <Box key={i} sx={{ mb: 2, display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                {msg.sender === 'ai' && (
                  <Box sx={{ width: 28, height: 28, borderRadius: '8px', background: 'linear-gradient(135deg,#FF5A5F,#FF7B82)', display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1, mt: 0.5, flexShrink: 0 }}>
                    <Sparkles size={13} color="#fff" />
                  </Box>
                )}
                <Box sx={{
                  maxWidth: '76%', px: 2, py: 1.5, borderRadius: msg.sender === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: msg.sender === 'user' ? 'rgba(255,90,95,0.06)' : '#F5F5F5',
                  border: msg.sender === 'user' ? '1px solid rgba(255,90,95,0.12)' : '1px solid rgba(0,0,0,0.06)',
                }}>
                  <Typography sx={{ fontSize: '0.82rem', color: msg.sender === 'user' ? '#FF5A5F' : 'text.primary', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{msg.text}</Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '0.7rem', color: 'text.secondary', mb: 1, fontWeight: 600 }}>SUGGESTED PROMPTS</Typography>
            <Stack direction="row" flexWrap="wrap" gap={1}>
              {['Show lease status', 'What documents are pending?', 'Generate lease summary', 'When does my agreement expire?', 'Raise a maintenance request'].map((prompt) => (
                <Chip key={prompt} label={prompt} size="small" sx={{ background: 'rgba(255,90,95,0.04)', color: '#FF5A5F', border: '1px solid rgba(255,90,95,0.12)', cursor: 'pointer', fontSize: '0.72rem', '&:hover': { background: 'rgba(255,90,95,0.08)' } }} />
              ))}
            </Stack>
          </Box>

          <Stack direction="row" spacing={1.5}>
            <Box sx={{ flex: 1, height: 44, borderRadius: '12px', background: '#F5F5F5', border: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', px: 2 }}>
              <Typography sx={{ fontSize: '0.82rem', color: '#BDBDBD' }}>Ask HiveAI anything about your rental...</Typography>
            </Box>
            <Box sx={{ width: 44, height: 44, borderRadius: '12px', background: 'linear-gradient(135deg,#FF5A5F,#FF7B82)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <ArrowRight size={18} color="#fff" />
            </Box>
          </Stack>
        </GlowCard>
      </Box>
    </motion.div>
  );
}
