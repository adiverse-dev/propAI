import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Search, Paperclip, Phone, Video, MoveHorizontal as MoreHorizontal, CheckCheck, AtSign, Hash, Plus, Bot } from 'lucide-react';
import { messages } from '@/lib/mockData';

const aiSuggestions = [
  'Your rent for May is due on 5th. Kindly process payment on time.',
  'I\'ve noted your maintenance request. A technician will visit within 24 hours.',
  'Your lease renewal documents have been sent. Please review by EOD.',
  'Thank you for submitting the documents. Verification in progress.',
];

export default function AdminMessages() {
  const [activeThread, setActiveThread] = useState(messages[0]);
  const [input, setInput] = useState('');
  const [showAISuggestion, setShowAISuggestion] = useState(true);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 64px)' }}>
      {/* Header */}
      <Box sx={{ px: 4, py: 2.5, borderBottom: '1px solid rgba(0,0,0,0.06)', background: '#FFFFFF', backdropFilter: 'blur(20px)' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>Shared Inbox</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>4 conversations • 5 unread</Typography>
          </Box>
          <Stack direction="row" spacing={1.5}>
            <Button variant="outlined" size="small" startIcon={<Plus size={14} />} sx={{ fontSize: '0.78rem' }}>New Message</Button>
            <Chip label="All" size="small" sx={{ background: 'rgba(255,90,95,0.08)', color: '#FF5A5F', border: '1px solid rgba(255,90,95,0.2)' }} />
            <Chip label="Unread (5)" size="small" sx={{ background: 'transparent', color: 'text.secondary', border: '1px solid rgba(0,0,0,0.08)' }} />
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Conversation List */}
        <Box sx={{
          width: 320, flexShrink: 0,
          borderRight: '1px solid rgba(0,0,0,0.06)',
          background: '#FFFFFF',
          overflow: 'auto',
        }}>
          <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1.5, py: 1, borderRadius: '10px', background: '#F5F5F5', border: '1px solid rgba(0,0,0,0.06)' }}>
              <Search size={14} color="#9E9E9E" />
              <Typography sx={{ fontSize: '0.78rem', color: '#BDBDBD' }}>Search conversations...</Typography>
            </Box>
          </Box>

          <Stack spacing={0}>
            {messages.map((conv) => (
              <Box
                key={conv.id}
                component={motion.div}
                whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                onClick={() => setActiveThread(conv)}
                sx={{
                  px: 2, py: 2, cursor: 'pointer',
                  background: activeThread.id === conv.id ? 'rgba(255,90,95,0.04)' : 'transparent',
                  borderLeft: activeThread.id === conv.id ? '2px solid #FF5A5F' : '2px solid transparent',
                  borderBottom: '1px solid rgba(0,0,0,0.04)',
                  transition: 'all 0.15s',
                }}
              >
                <Stack direction="row" spacing={1.5} alignItems="flex-start">
                  <Box sx={{ position: 'relative', flexShrink: 0 }}>
                    <Avatar sx={{ width: 38, height: 38, background: `${conv.color}15`, color: conv.color, fontSize: '0.78rem', fontWeight: 700, border: `1px solid ${conv.color}25` }}>{conv.avatar}</Avatar>
                    {conv.unread > 0 && (
                      <Box sx={{ position: 'absolute', top: -2, right: -2, width: 10, height: 10, borderRadius: '50%', background: '#FF5A5F', border: '2px solid #FFFFFF' }} />
                    )}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.3 }}>
                      <Typography sx={{ fontSize: '0.85rem', fontWeight: conv.unread ? 700 : 500, color: 'text.primary' }}>{conv.tenant}</Typography>
                      <Typography sx={{ fontSize: '0.62rem', color: '#BDBDBD' }}>{conv.time}</Typography>
                    </Stack>
                    <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{conv.lastMessage}</Typography>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Stack>

          {/* AI Channels */}
          <Box sx={{ p: 2, mt: 1 }}>
            <Typography sx={{ fontSize: '0.6rem', color: '#9E9E9E', fontWeight: 700, letterSpacing: '0.1em', mb: 1 }}>AI CHANNELS</Typography>
            {[
              { icon: Bot, name: 'HiveAI Suggestions', color: '#FF5A5F' },
              { icon: Hash, name: 'Lease Alerts', color: '#F7B801' },
              { icon: AtSign, name: 'Payment Reminders', color: '#00B81C' },
            ].map((ch) => (
              <Stack key={ch.name} direction="row" alignItems="center" spacing={1.5} sx={{ py: 1, cursor: 'pointer' }}>
                <Box sx={{ width: 28, height: 28, borderRadius: '8px', background: `${ch.color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ch.icon size={13} color={ch.color} />
                </Box>
                <Typography sx={{ fontSize: '0.78rem', color: 'text.secondary' }}>{ch.name}</Typography>
              </Stack>
            ))}
          </Box>
        </Box>

        {/* Chat Area */}
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {/* Chat Header */}
          <Box sx={{ px: 3, py: 2, borderBottom: '1px solid rgba(0,0,0,0.06)', background: '#FFFFFF' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Stack direction="row" alignItems="center" spacing={1.5}>
                <Avatar sx={{ width: 36, height: 36, background: `${activeThread.color}15`, color: activeThread.color, fontSize: '0.78rem', fontWeight: 700, border: `1px solid ${activeThread.color}25` }}>{activeThread.avatar}</Avatar>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{activeThread.tenant}</Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Box component={motion.div} animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} sx={{ width: 5, height: 5, borderRadius: '50%', background: '#00B81C' }} />
                    <Typography sx={{ fontSize: '0.65rem', color: '#00B81C', fontWeight: 600 }}>Online</Typography>
                  </Stack>
                </Box>
              </Stack>
              <Stack direction="row" spacing={1}>
                {[Phone, Video, MoreHorizontal].map((Icon, i) => (
                  <Box key={i} sx={{ width: 32, height: 32, borderRadius: '8px', background: '#F5F5F5', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', '&:hover': { background: 'rgba(0,0,0,0.06)' } }}>
                    <Icon size={14} color="#9E9E9E" />
                  </Box>
                ))}
              </Stack>
            </Stack>
          </Box>

          {/* Messages */}
          <Box sx={{ flex: 1, overflow: 'auto', p: 3 }}>
            {activeThread.thread.map((msg, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Box sx={{ mb: 2.5, display: 'flex', justifyContent: msg.sender === 'admin' ? 'flex-end' : 'flex-start', gap: 1.5, alignItems: 'flex-end' }}>
                  {msg.sender !== 'admin' && (
                    <Avatar sx={{ width: 30, height: 30, mb: 0.5, background: `${activeThread.color}15`, color: activeThread.color, fontSize: '0.65rem', fontWeight: 700 }}>{activeThread.avatar}</Avatar>
                  )}
                  {msg.sender === 'ai' && (
                    <Box sx={{ width: 28, height: 28, mb: 0.5, borderRadius: '8px', background: 'linear-gradient(135deg,#FF5A5F,#F7B801)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Sparkles size={13} color="#fff" />
                    </Box>
                  )}
                  <Box sx={{
                    maxWidth: '68%',
                    px: 2.5, py: 1.5,
                    borderRadius: msg.sender === 'admin' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: msg.sender === 'admin'
                      ? 'rgba(255,90,95,0.06)'
                      : msg.sender === 'ai'
                        ? 'rgba(247,184,1,0.06)'
                        : '#F5F5F5',
                    border: msg.sender === 'admin'
                      ? '1px solid rgba(255,90,95,0.12)'
                      : msg.sender === 'ai'
                        ? '1px solid rgba(247,184,1,0.12)'
                        : '1px solid rgba(0,0,0,0.06)',
                  }}>
                    {msg.sender === 'ai' && (
                      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
                        <Typography sx={{ fontSize: '0.6rem', color: '#F7B801', fontWeight: 700, letterSpacing: '0.08em' }}>HIVEAI AUTO-REPLY</Typography>
                      </Stack>
                    )}
                    <Typography sx={{ fontSize: '0.84rem', lineHeight: 1.6, color: msg.sender === 'admin' ? '#FF5A5F' : 'text.primary' }}>{msg.text}</Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5} justifyContent="flex-end" sx={{ mt: 0.5 }}>
                      <Typography sx={{ fontSize: '0.6rem', color: '#BDBDBD' }}>{msg.time}</Typography>
                      {msg.sender === 'admin' && <CheckCheck size={10} color="#FF5A5F" />}
                    </Stack>
                  </Box>
                  {msg.sender === 'admin' && (
                    <Avatar sx={{ width: 30, height: 30, mb: 0.5, background: 'linear-gradient(135deg,#FF5A5F,#FF7B82)', color: '#fff', fontSize: '0.65rem', fontWeight: 800 }}>SA</Avatar>
                  )}
                </Box>
              </motion.div>
            ))}

            {/* Typing indicator */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Avatar sx={{ width: 28, height: 28, background: `${activeThread.color}15`, color: activeThread.color, fontSize: '0.62rem', fontWeight: 700 }}>{activeThread.avatar}</Avatar>
              <Box sx={{ px: 2, py: 1, borderRadius: '12px 12px 12px 4px', background: '#F5F5F5', border: '1px solid rgba(0,0,0,0.06)' }}>
                <Stack direction="row" spacing={0.5} alignItems="center">
                  {[0, 0.2, 0.4].map((delay, i) => (
                    <Box key={i} component={motion.div} animate={{ opacity: [0.4, 1, 0.4], y: [0, -3, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay }} sx={{ width: 5, height: 5, borderRadius: '50%', background: '#9E9E9E' }} />
                  ))}
                </Stack>
              </Box>
            </Box>
          </Box>

          {/* AI Suggestion */}
          <AnimatePresence>
            {showAISuggestion && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                <Box sx={{ px: 3, py: 1.5, background: 'rgba(247,184,1,0.04)', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                  <Stack direction="row" alignItems="center" spacing={1.5}>
                    <Box sx={{ width: 24, height: 24, borderRadius: '6px', background: 'linear-gradient(135deg,#FF5A5F,#F7B801)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Sparkles size={12} color="#fff" />
                    </Box>
                    <Typography sx={{ fontSize: '0.78rem', color: 'text.primary', flex: 1, lineHeight: 1.4 }}>
                      <span style={{ fontWeight: 700, color: '#F7B801' }}>HiveAI suggests: </span>
                      "{aiSuggestions[0]}"
                    </Typography>
                    <Stack direction="row" spacing={1}>
                      <Button size="small" variant="outlined" sx={{ fontSize: '0.7rem', py: 0.3, minWidth: 0 }} onClick={() => { setInput(aiSuggestions[0]); setShowAISuggestion(false); }}>Use</Button>
                      <Button size="small" variant="text" sx={{ fontSize: '0.7rem', py: 0.3, minWidth: 0 }} onClick={() => setShowAISuggestion(false)}>Dismiss</Button>
                    </Stack>
                  </Stack>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input */}
          <Box sx={{ p: 2.5, borderTop: '1px solid rgba(0,0,0,0.06)', background: '#FFFFFF' }}>
            <Stack direction="row" spacing={1.5} alignItems="flex-end">
              <Box sx={{ flex: 1, borderRadius: '14px', background: '#F5F5F5', border: '1px solid rgba(0,0,0,0.08)', px: 2, py: 1.5, minHeight: 44, display: 'flex', alignItems: 'center', gap: 1 }}>
                <Paperclip size={15} color="#9E9E9E" style={{ cursor: 'pointer', flexShrink: 0 }} />
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Reply to tenant..."
                  style={{
                    flex: 1, background: 'transparent', border: 'none', outline: 'none',
                    color: '#222222', fontSize: '0.84rem', fontFamily: 'inherit',
                  }}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', px: 1, py: 0.3, borderRadius: '6px', background: 'rgba(255,90,95,0.06)', border: '1px solid rgba(255,90,95,0.1)' }} onClick={() => setShowAISuggestion(true)}>
                  <Sparkles size={11} color="#FF5A5F" />
                  <Typography sx={{ fontSize: '0.65rem', color: '#FF5A5F', fontWeight: 600 }}>AI</Typography>
                </Box>
              </Box>
              <Box sx={{ width: 44, height: 44, borderRadius: '12px', background: input ? 'linear-gradient(135deg,#FF5A5F,#FF7B82)' : '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', border: '1px solid rgba(0,0,0,0.08)' }}>
                <Send size={17} color={input ? '#fff' : '#9E9E9E'} />
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
