import React from 'react';
import Box from '@mui/material/Box';
import AdminSidebar from '@/components/AdminSidebar';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange?: (tab: string) => void;
  disableScroll?: boolean;
}

export default function AdminLayout({ children, activeTab, onTabChange, disableScroll = false }: AdminLayoutProps) {
  return (
    <Box sx={{ display: 'flex', background: '#FAFBFC', minHeight: '100vh' }}>
      <AdminSidebar activeTab={activeTab} onTabChange={onTabChange || (() => {})} />
      <Box sx={{ 
        flex: 1, 
        ml: '240px', 
        display: 'flex', 
        flexDirection: 'column',
        ...(disableScroll ? { height: '100vh', overflow: 'hidden' } : { minHeight: '100vh' })
      }}>
        {children}
      </Box>
    </Box>
  );
}
