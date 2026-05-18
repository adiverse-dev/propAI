import React from 'react';
import { Box } from '@mui/material';
import EmptyState from '@/components/EmptyState';
import { Settings } from 'lucide-react';

export default function SettingsPlaceholder() {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <EmptyState 
        icon={Settings}
        title="Settings Module Coming Soon"
        description="We are currently building the organization and billing settings for Hivelvy 2.0."
      />
    </Box>
  );
}
