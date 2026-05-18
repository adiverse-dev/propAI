import React from 'react';
import { Box } from '@mui/material';
import EmptyState from '@/components/EmptyState';
import { FileQuestion } from 'lucide-react';

export default function GenericPlaceholder() {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <EmptyState 
        icon={FileQuestion}
        title="Module In Development"
        description="This section of the dashboard is currently under development for the MVP."
      />
    </Box>
  );
}
