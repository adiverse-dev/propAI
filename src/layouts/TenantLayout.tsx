import React from 'react';
import Box from '@mui/material/Box';
import TenantSidebar from '@/components/TenantSidebar';

interface TenantLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  disableScroll?: boolean;
}

export default function TenantLayout({ children, activeTab, onTabChange, disableScroll = false }: TenantLayoutProps) {
  return (
    <Box sx={{ display: 'flex', background: '#F8F8F8', minHeight: '100vh' }}>
      <TenantSidebar activeTab={activeTab} onTabChange={onTabChange} />
      <Box sx={{
        flex: 1,
        ml: '240px',   // matches sidebar width
        display: 'flex',
        flexDirection: 'column',
        ...(disableScroll ? { height: '100vh', overflow: 'hidden' } : { minHeight: '100vh' })
      }}>
        {children}
      </Box>
    </Box>
  );
}
