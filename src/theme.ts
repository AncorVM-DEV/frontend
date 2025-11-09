
import { createTheme } from '@mui/material/styles'

export const customTheme = createTheme({
  palette: {
    mode: 'light',
    primary:   { main: '#1565c0' },   
    secondary: { main: '#f57c00' },   
    error:     { main: '#d32f2f' },
    success:   { main: '#2e7d32' },
    warning:   { main: '#ed6c02' },
    info:      { main: '#0288d1' },
    background:{ default: '#fafafa' }
  },
  typography: {
    fontFamily: ['"Open Sans"', 'Roboto', 'Arial', 'sans-serif'].join(','),
  }
})
