import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Minimize2, ArrowRight, ChevronDown } from 'lucide-react';

const initialMessages = [
  { sender: 'ai', text: 'Hi Rahul! I\'m HiveAI Concierge. Your rental verification is 80% complete. How can I help you today?', time: 'Just now' },
];

const suggestions = [
  'Show lease status',
  'What documents are pending?',
  'When does my agreement expire?',
  'Generate lease summary',
];

const botResponses: Record<string, string> = {
  'show lease status': 'Your lease for Unit B-402, Prestige Elysian is currently Under Review. The property manager is reviewing it. Expected sign-off within 24 hours.',
  'what documents are pending?': 'You need to upload: 1) Aadhaar Card (front & back) 2) Last 3 months bank statement. Your PAN and salary slip are already verified.',
  'when does my agreement expire?': 'Your lease expires on January 31, 2025. That\'s 74 days from now. I\'ll remind you 30 days before. Want me to initiate the renewal process now?',
  'generate lease summary': 'Lease Summary for B-402:\n• Duration: Feb 2024 – Jan 2025\n• Monthly Rent: ₹45,000 (due by 5th)\n• Security Deposit: ₹90,000 (refundable)\n• Notice Period: 30 days\n• Renewal Increase: 5%\nNo unusual clauses detected by AI.',
};

interface Message {
  sender: string;
  text: string;
  time: string;
}

export default function HiveAIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { sender: 'user', text, time: 'Just now' };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const key = text.toLowerCase();
      const response = botResponses[key] || `I understand you're asking about "${text}". Let me check that for you... Based on your account, everything looks on track. Your verification is 80% complete.`;
      setMessages((prev) => [...prev, { sender: 'ai', text: response, time: 'Just now' }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {!isOpen && (
          <Box
            component={motion.div}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF5A5F, #FF7B82)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(255,90,95,0.35), 0 8px 32px rgba(0,0,0,0.1)',
              zIndex: 1000,
            }}
          >
            <Sparkles size={24} color="#fff" />
            <Box
              component={motion.div}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              sx={{
                position: 'absolute', inset: -4, borderRadius: '50%',
                background: 'rgba(255,90,95,0.15)',
                zIndex: -1,
              }}
            />
          </Box>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.8, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' as const }}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              width: 380,
              height: isMinimized ? 64 : 540,
              borderRadius: '20px',
              background: '#FFFFFF',
              border: '1px solid rgba(0,0,0,0.08)',
              boxShadow: '0 20px 80px rgba(0,0,0,0.15), 0 4px 20px rgba(0,0,0,0.08)',
              zIndex: 1000,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              transition: 'height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            {/* Header */}
            <Box sx={{
              px: 2.5, py: 2, borderBottom: isMinimized ? 'none' : '1px solid rgba(0,0,0,0.06)',
              background: '#FAFBFC',
              flexShrink: 0,
            }}>
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box sx={{ width: 34, height: 34, borderRadius: '10px', background: 'linear-gradient(135deg,#FF5A5F,#F7B801)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles size={16} color="#fff" />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '0.88rem', color: 'text.primary' }}>HiveAI Concierge</Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Box component={motion.div} animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} sx={{ width: 5, height: 5, borderRadius: '50%', background: '#00B81C' }} />
                      <Typography sx={{ fontSize: '0.62rem', color: '#00B81C', fontWeight: 600 }}>Online • AI Powered</Typography>
                    </Stack>
                  </Box>
                </Stack>
                <Stack direction="row" spacing={0.5}>
                  <Box sx={{ width: 28, height: 28, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', '&:hover': { background: 'rgba(0,0,0,0.04)' } }} onClick={() => setIsMinimized(!isMinimized)}>
                    {isMinimized ? <ChevronDown size={15} color="#9E9E9E" /> : <Minimize2 size={15} color="#9E9E9E" />}
                  </Box>
                  <Box sx={{ width: 28, height: 28, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', '&:hover': { background: 'rgba(0,0,0,0.04)' } }} onClick={() => setIsOpen(false)}>
                    <X size={15} color="#9E9E9E" />
                  </Box>
                </Stack>
              </Stack>
            </Box>

            {!isMinimized && (
              <>
                {/* Messages */}
                <Box sx={{ flex: 1, overflow: 'auto', p: 2 }}>
                  <Stack spacing={1.5}>
                    {messages.map((msg, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                        <Box sx={{ display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start', gap: 1, alignItems: 'flex-end' }}>
                          {msg.sender === 'ai' && (
                            <Box sx={{ width: 24, height: 24, borderRadius: '7px', background: 'linear-gradient(135deg,#FF5A5F,#F7B801)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, mb: 0.2 }}>
                              <Sparkles size={11} color="#fff" />
                            </Box>
                          )}
                          <Box sx={{
                            maxWidth: '82%', px: 1.75, py: 1.25,
                            borderRadius: msg.sender === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
                            background: msg.sender === 'user'
                              ? 'rgba(255,90,95,0.06)'
                              : '#F5F5F5',
                            border: msg.sender === 'user'
                              ? '1px solid rgba(255,90,95,0.12)'
                              : '1px solid rgba(0,0,0,0.06)',
                          }}>
                            <Typography sx={{ fontSize: '0.8rem', color: msg.sender === 'user' ? '#FF5A5F' : 'text.primary', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{msg.text}</Typography>
                          </Box>
                        </Box>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
                          <Box sx={{ width: 24, height: 24, borderRadius: '7px', background: 'linear-gradient(135deg,#FF5A5F,#F7B801)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Sparkles size={11} color="#fff" />
                          </Box>
                          <Box sx={{ px: 1.75, py: 1.25, borderRadius: '14px 14px 14px 4px', background: '#F5F5F5', border: '1px solid rgba(0,0,0,0.06)' }}>
                            <Stack direction="row" spacing={0.4} alignItems="center">
                              {[0, 0.2, 0.4].map((d, i) => (
                                <Box key={i} component={motion.div} animate={{ opacity: [0.4, 1, 0.4], y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: d }} sx={{ width: 4, height: 4, borderRadius: '50%', background: '#9E9E9E' }} />
                              ))}
                            </Stack>
                          </Box>
                        </Box>
                      </motion.div>
                    )}
                  </Stack>
                </Box>

                {/* Suggestions */}
                <Box sx={{ px: 2, pb: 1 }}>
                  <Stack direction="row" flexWrap="wrap" gap={0.75}>
                    {suggestions.map((s) => (
                      <Chip key={s} label={s} size="small" onClick={() => sendMessage(s)} sx={{ background: 'rgba(255,90,95,0.04)', color: '#FF5A5F', border: '1px solid rgba(255,90,95,0.12)', cursor: 'pointer', fontSize: '0.68rem', '&:hover': { background: 'rgba(255,90,95,0.08)' } }} />
                    ))}
                  </Stack>
                </Box>

                {/* Input */}
                <Box sx={{ px: 2, pb: 2 }}>
                  <Stack direction="row" spacing={1}>
                    <Box sx={{ flex: 1, height: 42, borderRadius: '12px', background: '#F5F5F5', border: '1px solid rgba(0,0,0,0.08)', display: 'flex', alignItems: 'center', px: 1.5 }}>
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
                        placeholder="Ask anything..."
                        style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#222222', fontSize: '0.82rem', fontFamily: 'inherit' }}
                      />
                    </Box>
                    <Box
                      component={motion.div}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => sendMessage(input)}
                      sx={{ width: 42, height: 42, borderRadius: '12px', background: 'linear-gradient(135deg,#FF5A5F,#FF7B82)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                    >
                      <ArrowRight size={16} color="#fff" />
                    </Box>
                  </Stack>
                </Box>
              </>
            )}
          </Box>
        )}
      </AnimatePresence>
    </>
  );
}
