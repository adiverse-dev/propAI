import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { motion } from 'framer-motion';
import { Phone, Mail, ArrowRight } from 'lucide-react';
import GlowCard from '@/components/GlowCard';

export default function MessagesTab() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Box sx={{ display: 'flex', gap: 3, height: 'calc(100vh - 180px)' }}>
        {/* Sidebar */}
        <GlowCard sx={{ width: 300, flexShrink: 0, overflow: 'auto', p: 0 }}>
          <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>Inbox</Typography>
          </Box>
          {[
            { name: 'Suresh Anand', role: 'Property Manager', msg: 'Please review your lease renewal...', time: '2m', unread: 1, avatar: 'SA' },
            { name: 'HiveAI', role: 'AI Assistant', msg: 'Your verification is 80% complete', time: '1h', unread: 0, avatar: 'AI' },
            { name: 'Maintenance', role: 'Support Team', msg: 'Your request MR-2847 is assigned', time: 'Mon', unread: 0, avatar: 'MT' },
          ].map((conv, i) => (
            <Box key={conv.name} sx={{ px: 2, py: 1.5, cursor: 'pointer', background: i === 0 ? 'rgba(255,90,95,0.04)' : 'transparent', borderBottom: '1px solid rgba(0,0,0,0.04)', '&:hover': { background: 'rgba(0,0,0,0.02)' } }}>
              <Stack direction="row" spacing={1.5} alignItems="center">
                <Avatar sx={{ width: 34, height: 34, background: 'linear-gradient(135deg,#FF5A5F,#FF7B82)', color: '#fff', fontSize: '0.7rem', fontWeight: 800 }}>{conv.avatar}</Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ fontSize: '0.82rem', fontWeight: conv.unread ? 700 : 500, color: 'text.primary' }}>{conv.name}</Typography>
                    <Typography sx={{ fontSize: '0.65rem', color: '#BDBDBD' }}>{conv.time}</Typography>
                  </Stack>
                  <Typography sx={{ fontSize: '0.72rem', color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{conv.msg}</Typography>
                </Box>
                {conv.unread > 0 && <Box sx={{ width: 8, height: 8, borderRadius: '50%', background: '#FF5A5F', flexShrink: 0 }} />}
              </Stack>
            </Box>
          ))}
        </GlowCard>

        {/* Chat */}
        <GlowCard sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 0, overflow: 'hidden' }}>
          <Box sx={{ p: 2, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <Stack direction="row" alignItems="center" spacing={1.5}>
              <Avatar sx={{ width: 32, height: 32, background: 'linear-gradient(135deg,#FF5A5F,#FF7B82)', color: '#fff', fontSize: '0.7rem', fontWeight: 800 }}>SA</Avatar>
              <Box>
                <Typography sx={{ fontSize: '0.85rem', fontWeight: 700 }}>Suresh Anand</Typography>
                <Typography sx={{ fontSize: '0.65rem', color: '#00B81C' }}>Online • Property Manager</Typography>
              </Box>
              <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Phone size={14} color="#9E9E9E" />
                <Mail size={14} color="#9E9E9E" />
              </Box>
            </Stack>
          </Box>
          <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
            {[
              { sender: 'admin', text: 'Hi Rahul! I have sent your lease renewal documents. Please review when you get a chance. The new rent will be ₹47,250/month (+5%).', time: 'Mon 3:00 PM' },
              { sender: 'tenant', text: 'Thank you! I will review and revert by end of day.', time: 'Mon 4:30 PM' },
              { sender: 'admin', text: 'Great! Let me know if you have any questions about the renewal terms.', time: 'Mon 4:35 PM' },
              { sender: 'tenant', text: 'Quick question — is there any flexibility on the notice period clause?', time: 'Today 10:00 AM' },
            ].map((msg, i) => (
              <Box key={i} sx={{ mb: 2, display: 'flex', justifyContent: msg.sender === 'tenant' ? 'flex-end' : 'flex-start' }}>
                <Box sx={{
                  maxWidth: '70%', px: 2, py: 1.5, borderRadius: msg.sender === 'tenant' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                  background: msg.sender === 'tenant' ? 'rgba(255,90,95,0.06)' : '#F5F5F5',
                  border: msg.sender === 'tenant' ? '1px solid rgba(255,90,95,0.12)' : '1px solid rgba(0,0,0,0.06)',
                }}>
                  <Typography sx={{ fontSize: '0.82rem', color: msg.sender === 'tenant' ? '#FF5A5F' : 'text.primary', lineHeight: 1.6 }}>{msg.text}</Typography>
                  <Typography sx={{ fontSize: '0.6rem', color: '#BDBDBD', mt: 0.5 }}>{msg.time}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.06)' }}>
            <Stack direction="row" spacing={1.5}>
              <Box sx={{ flex: 1, height: 44, borderRadius: '12px', background: '#F5F5F5', border: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', px: 2 }}>
                <Typography sx={{ fontSize: '0.82rem', color: '#BDBDBD' }}>Type a message...</Typography>
              </Box>
              <Box sx={{ width: 44, height: 44, borderRadius: '12px', background: 'linear-gradient(135deg,#FF5A5F,#FF7B82)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <ArrowRight size={18} color="#fff" />
              </Box>
            </Stack>
          </Box>
        </GlowCard>
      </Box>
    </motion.div>
  );
}
