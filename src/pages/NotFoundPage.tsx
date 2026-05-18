import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAFA', px: 3 }}>
      <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} sx={{ textAlign: 'center', maxWidth: 420 }}>
        {/* 404 number */}
        <Typography sx={{ fontSize: { xs: '5rem', md: '7rem' }, fontWeight: 900, letterSpacing: '-0.06em', color: 'rgba(0,0,0,0.05)', lineHeight: 1, mb: 2 }}>404</Typography>

        {/* Icon */}
        <Box component={motion.div} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.15, type: 'spring', stiffness: 280, damping: 20 }}
          sx={{ width: 60, height: 60, borderRadius: '18px', background: 'rgba(255,90,95,0.08)', border: '1px solid rgba(255,90,95,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
          <Home size={26} color="#FF5A5F" />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 800, color: '#111', letterSpacing: '-0.03em', mb: 1.5 }}>
          Page not found
        </Typography>
        <Typography sx={{ color: '#888', fontSize: '0.92rem', lineHeight: 1.6, mb: 4 }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </Typography>

        <Stack direction="row" spacing={1.5} justifyContent="center">
          <Button variant="outlined" startIcon={<ArrowLeft size={15} />} onClick={() => navigate(-1)}
            sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, color: '#555', borderColor: 'rgba(0,0,0,0.1)', '&:hover': { background: '#F5F5F5' } }}>
            Go Back
          </Button>
          <Button variant="contained" startIcon={<Home size={15} />} onClick={() => navigate('/')}
            sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 600, background: '#111', color: '#fff', '&:hover': { background: '#000' } }}>
            Back to Home
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
