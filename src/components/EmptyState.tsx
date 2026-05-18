import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { FileQuestion, Plus } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ 
  icon: Icon = FileQuestion, 
  title, 
  description, 
  actionLabel, 
  onAction 
}: EmptyStateProps) {
  return (
    <Box sx={{ 
      py: 8, px: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      background: '#fff', borderRadius: '16px', border: '1px dashed rgba(0,0,0,0.1)'
    }}>
      <Box sx={{ 
        width: 64, height: 64, borderRadius: '20px', background: 'rgba(0,0,0,0.02)', 
        display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 
      }}>
        <Icon size={32} color="#BDBDBD" />
      </Box>
      <Typography sx={{ fontSize: '1.1rem', fontWeight: 700, color: '#111', mb: 1 }}>{title}</Typography>
      <Typography sx={{ fontSize: '0.9rem', color: '#717171', maxWidth: 400, mb: 4 }}>{description}</Typography>
      
      {actionLabel && onAction && (
        <Button 
          variant="contained" 
          startIcon={<Plus size={16} />}
          onClick={onAction}
          sx={{ 
            borderRadius: '10px', background: '#111', color: '#fff', textTransform: 'none', fontWeight: 600,
            '&:hover': { background: '#000' }
          }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
}
