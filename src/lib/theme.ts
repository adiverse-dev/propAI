import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF5A5F',
      light: '#FF7B82',
      dark: '#E63946',
      contrastText: '#fff',
    },
    secondary: {
      main: '#F7B801',
      light: '#FFD60A',
      dark: '#E6A800',
      contrastText: '#fff',
    },
    success: { main: '#00B81C' },
    warning: { main: '#FF6B35' },
    info: { main: '#0066CC' },
    error: { main: '#E63946' },
    background: {
      default: '#FAFBFC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#222222',
      secondary: '#717171',
      disabled: '#BDBDBD',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
    grey: {
      50: '#FAFBFC',
      100: '#F5F5F5',
      200: '#EBEBEB',
      300: '#DDDDDD',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },
  typography: {
    fontFamily: '"Inter", "Outfit", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
      lineHeight: 1.1,
      fontSize: '3.5rem',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.015em',
      lineHeight: 1.2,
      fontSize: '2.75rem',
    },
    h3: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
      fontSize: '2rem',
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.005em',
      fontSize: '1.5rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
      fontWeight: 400,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.01em',
      textTransform: 'none' as const,
      fontSize: '0.9375rem',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 500,
      letterSpacing: '0.02em',
    },
    overline: {
      fontWeight: 600,
      letterSpacing: '0.1em',
      fontSize: '0.65rem',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': { boxSizing: 'border-box' },
        'html, body': { overflowX: 'hidden', maxWidth: '100vw' },
        html: { scrollBehavior: 'smooth' },
        body: {
          background: '#FAFBFC',
          minHeight: '100vh',
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(255, 90, 95, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(247, 184, 1, 0.02) 0%, transparent 50%)
          `,
        },
        '::-webkit-scrollbar': { width: '6px', height: '6px' },
        '::-webkit-scrollbar-track': { background: 'transparent' },
        '::-webkit-scrollbar-thumb': {
          background: 'rgba(0,0,0,0.12)',
          borderRadius: '10px',
        },
        '::-webkit-scrollbar-thumb:hover': { background: 'rgba(0,0,0,0.22)' },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '12px 24px',
          fontSize: '0.9375rem',
          fontWeight: 600,
          transition: 'all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          textTransform: 'none',
        },
        contained: {
          background: 'linear-gradient(135deg, #FF5A5F 0%, #FF7B82 100%)',
          color: '#fff',
          boxShadow: '0 4px 14px rgba(255, 90, 95, 0.25)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(255, 90, 95, 0.35)',
            transform: 'translateY(-2px)',
            background: 'linear-gradient(135deg, #FF5A5F 0%, #FF7B82 100%)',
          },
        },
        outlined: {
          borderColor: '#E63946',
          color: '#FF5A5F',
          '&:hover': {
            borderColor: '#FF5A5F',
            background: 'rgba(255, 90, 95, 0.08)',
          },
        },
        text: {
          color: '#717171',
          '&:hover': {
            color: '#222222',
            background: 'rgba(0, 0, 0, 0.04)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.06)',
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontWeight: 600,
          fontSize: '0.75rem',
          background: 'rgba(255, 90, 95, 0.08)',
          color: '#FF5A5F',
          border: '1px solid rgba(255, 90, 95, 0.2)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.12)',
              borderWidth: '1.5px',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.2)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF5A5F',
              borderWidth: '2px',
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: '#FFFFFF',
          borderRight: '1px solid rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          background: 'rgba(34, 34, 34, 0.95)',
          color: '#FFFFFF',
          fontSize: '0.75rem',
          borderRadius: 6,
          backdropFilter: 'blur(10px)',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 6,
          background: 'rgba(255, 90, 95, 0.12)',
        },
        bar: {
          borderRadius: 4,
          background: 'linear-gradient(90deg, #FF5A5F, #F7B801)',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          fontSize: '0.875rem',
          background: 'linear-gradient(135deg, #FF5A5F 0%, #FF7B82 100%)',
          color: '#FFFFFF',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(0, 0, 0, 0.06)',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          margin: '2px 8px',
          '&.Mui-selected': {
            background: 'rgba(255, 90, 95, 0.08)',
            borderLeft: '3px solid #FF5A5F',
            paddingLeft: 'calc(1rem - 3px)',
            '&:hover': { background: 'rgba(255, 90, 95, 0.12)' },
          },
          '&:hover': { background: 'rgba(0, 0, 0, 0.04)' },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          fontSize: '0.875rem',
          '&.Mui-selected': { color: '#FF5A5F' },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          background: 'linear-gradient(90deg, #FF5A5F, #F7B801)',
          height: 3,
          borderRadius: '3px 3px 0 0',
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          background: 'linear-gradient(135deg, #FF5A5F, #FF7B82)',
          color: '#FFFFFF',
          fontWeight: 700,
          fontSize: '0.65rem',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: '#FFFFFF',
          color: '#222222',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
});

export default theme;
