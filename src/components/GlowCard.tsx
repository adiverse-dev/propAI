import React from 'react';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';

interface GlowCardProps {
  children: React.ReactNode;
  glowColor?: string;
  sx?: object;
  hover?: boolean;
  onClick?: () => void;
}

export default function GlowCard({ children, glowColor = '#FF5A5F', sx = {}, hover = true, onClick }: GlowCardProps) {
  return (
    <Box
      component={motion.div}
      whileHover={hover ? {
        y: -3,
        boxShadow: `0 12px 40px ${glowColor}12, 0 4px 12px rgba(0,0,0,0.05)`,
        borderColor: `${glowColor}22`,
      } : {}}
      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      onClick={onClick}
      sx={{
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.05)',
        borderRadius: '14px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.03), 0 2px 12px rgba(0,0,0,0.03)',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
