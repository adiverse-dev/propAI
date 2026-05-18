import React from 'react';
import { Box, Typography, Stack, Divider, Button, Switch, TextField } from '@mui/material';

export default function Profile() {
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" sx={{ fontWeight: 800, color: '#111', letterSpacing: '-0.02em', mb: 4 }}>
        Profile Settings
      </Typography>

      <Stack spacing={4}>
        {/* Personal Info */}
        <Box sx={{ p: 4, background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.06)' }}>
          <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#111', mb: 3 }}>Personal Information</Typography>
          <Stack spacing={3}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#111', mb: 0.8 }}>First Name</Typography>
                <TextField fullWidth size="small" defaultValue="Aditya" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#111', mb: 0.8 }}>Last Name</Typography>
                <TextField fullWidth size="small" defaultValue="Singh" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
              </Box>
            </Stack>
            <Box>
              <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#111', mb: 0.8 }}>Email Address</Typography>
              <TextField fullWidth size="small" defaultValue="aditya@hivelvy.com" sx={{ '& .MuiOutlinedInput-root': { borderRadius: '10px' } }} />
            </Box>
            <Box>
              <Button variant="contained" sx={{ borderRadius: '10px', background: '#111', textTransform: 'none', fontWeight: 600, '&:hover': { background: '#000' } }}>Save Changes</Button>
            </Box>
          </Stack>
        </Box>

        {/* Notifications */}
        <Box sx={{ p: 4, background: '#fff', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.06)' }}>
          <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: '#111', mb: 3 }}>Email Notifications</Typography>
          <Stack spacing={2} divider={<Divider sx={{ opacity: 0.5 }} />}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
              <Box>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>Rent Payments</Typography>
                <Typography sx={{ fontSize: '0.8rem', color: '#717171' }}>Get notified when a tenant pays rent.</Typography>
              </Box>
              <Switch defaultChecked sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#FF5A5F' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#FF5A5F' } }} />
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
              <Box>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>Maintenance Requests</Typography>
                <Typography sx={{ fontSize: '0.8rem', color: '#717171' }}>Alert me for high-priority maintenance issues.</Typography>
              </Box>
              <Switch defaultChecked sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#FF5A5F' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#FF5A5F' } }} />
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
              <Box>
                <Typography sx={{ fontSize: '0.9rem', fontWeight: 600, color: '#111' }}>HiveAI Alerts</Typography>
                <Typography sx={{ fontSize: '0.8rem', color: '#717171' }}>Receive AI-generated insights and risk reports.</Typography>
              </Box>
              <Switch defaultChecked sx={{ '& .MuiSwitch-switchBase.Mui-checked': { color: '#FF5A5F' }, '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: '#FF5A5F' } }} />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
