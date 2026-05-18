import Chip from '@mui/material/Chip';

const statusConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  active: { label: 'Active', color: '#00B81C', bg: 'rgba(0,184,28,0.1)', border: 'rgba(0,184,28,0.3)' },
  renewal_due: { label: 'Renewal Due', color: '#FF6B35', bg: 'rgba(255,107,53,0.1)', border: 'rgba(255,107,53,0.3)' },
  review: { label: 'Under Review', color: '#FF5A5F', bg: 'rgba(255,90,95,0.1)', border: 'rgba(255,90,95,0.3)' },
  onboarding: { label: 'Onboarding', color: '#0066CC', bg: 'rgba(0,102,204,0.1)', border: 'rgba(0,102,204,0.3)' },
  pending: { label: 'Pending', color: '#9E9E9E', bg: 'rgba(158,158,158,0.1)', border: 'rgba(158,158,158,0.3)' },
  done: { label: 'Completed', color: '#00B81C', bg: 'rgba(0,184,28,0.1)', border: 'rgba(0,184,28,0.3)' },
};

interface StatusChipProps {
  status: string;
  size?: 'small' | 'medium';
}

export default function StatusChip({ status, size = 'small' }: StatusChipProps) {
  const config = statusConfig[status] || statusConfig.pending;
  return (
    <Chip
      label={config.label}
      size={size}
      sx={{
        color: config.color,
        background: config.bg,
        border: `1px solid ${config.border}`,
        fontWeight: 700,
        fontSize: '0.7rem',
        height: size === 'small' ? 22 : 28,
      }}
    />
  );
}
