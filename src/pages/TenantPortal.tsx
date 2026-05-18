import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Sparkles, Bell } from 'lucide-react';
import TenantLayout from '@/layouts/TenantLayout';
import HomeTab from '@/sections/tenant/HomeTab';
import NotificationsTab from '@/sections/tenant/NotificationsTab';
import LeaseTab from '@/sections/tenant/LeaseTab';
import AITab from '@/sections/tenant/AITab';
import MessagesTab from '@/sections/tenant/MessagesTab';

export default function TenantPortal() {
  const [activeTab, setActiveTab] = useState('home');
  const [showAI, setShowAI] = useState(false);

  return (
    <TenantLayout activeTab={activeTab} onTabChange={setActiveTab}>
      {/* Top bar */}
      <Box sx={{ px: 4, py: 2.5, borderBottom: '1px solid rgba(0,0,0,0.06)', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(20px)', position: 'sticky', top: 0, zIndex: 40 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#222222' }}>
              {activeTab === 'home' && 'My Dashboard'}
              {activeTab === 'lease' && 'My Lease'}
              {activeTab === 'messages' && 'Messages'}
              {activeTab === 'notifications' && 'Notifications'}
              {activeTab === 'ai' && 'HiveAI Help'}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Welcome back, Rahul • B-402, Prestige Elysian, Bengaluru</Typography>
          </Box>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Button
              variant="outlined"
              size="small"
              startIcon={<Sparkles size={14} />}
              onClick={() => setShowAI(!showAI)}
              sx={{ fontSize: '0.78rem' }}
            >
              Ask HiveAI
            </Button>
            <Box sx={{ position: 'relative', cursor: 'pointer', width: 32, height: 32, borderRadius: '10px', background: 'rgba(255,90,95,0.06)', border: '1px solid rgba(255,90,95,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell size={15} color="#FF5A5F" />
              <Box sx={{ position: 'absolute', top: -2, right: -2, width: 8, height: 8, borderRadius: '50%', background: '#E63946', border: '1.5px solid #FAFBFC' }} />
            </Box>
          </Stack>
        </Stack>
      </Box>

      <Box sx={{ p: 4 }}>
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'notifications' && <NotificationsTab />}
        {activeTab === 'lease' && <LeaseTab />}
        {activeTab === 'ai' && <AITab />}
        {activeTab === 'messages' && <MessagesTab />}
      </Box>
    </TenantLayout>
  );
}
