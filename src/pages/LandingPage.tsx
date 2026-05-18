import Box from '@mui/material/Box';
import { useScroll, useTransform } from 'framer-motion';

import Navbar from '@/sections/landing/Navbar';
import HeroSection from '@/sections/landing/HeroSection';
import TrustSection from '@/sections/landing/TrustSection';
import StatsSection from '@/sections/landing/StatsSection';
import WorkflowSection from '@/sections/landing/WorkflowSection';
import AISection from '@/sections/landing/AISection';
import SecuritySection from '@/sections/landing/SecuritySection';
import TestimonialsSection from '@/sections/landing/TestimonialsSection';
import CTASection from '@/sections/landing/CTASection';
import Footer from '@/sections/landing/Footer';

export default function LandingPage() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -80]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  return (
    <Box sx={{ minHeight: '100vh', background: '#FAFAFA', overflowX: 'hidden' }}>
      <Navbar />
      <HeroSection heroY={heroY} heroOpacity={heroOpacity} />
      <TrustSection />
      <StatsSection />
      <WorkflowSection />
      <AISection />
      <SecuritySection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </Box>
  );
}
