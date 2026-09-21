import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#8b5cf6' },
    secondary: { main: '#22d3ee' },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h4: { fontWeight: 700 },
  },
});