import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface AIBadgeProps {
  label?: string;
  size?: 'sm' | 'md';
}

export default function AIBadge({ label = 'AI-Powered', size = 'md' }: AIBadgeProps) {
  return (
    <Box
      component={motion.div}
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ duration: 2, repeat: Infinity }}
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.5,
        px: size === 'sm' ? 1 : 1.5,
        py: size === 'sm' ? 0.3 : 0.5,
        borderRadius: '20px',
        background: 'linear-gradient(135deg, rgba(255,90,95,0.12), rgba(247,184,1,0.08))',
        border: '1px solid rgba(255,90,95,0.25)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Sparkles size={size === 'sm' ? 10 : 12} color="#FF5A5F" />
      <Typography
        sx={{
          fontSize: size === 'sm' ? '0.6rem' : '0.7rem',
          fontWeight: 700,
          background: 'linear-gradient(90deg, #FF5A5F, #F7B801)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '0.08em',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}
