// src/pages/Login.tsx
import { Container, Typography, Stack, Button, Box } from '@mui/material'

export default function Login(){
  return (
    <>
      <Box component="header" sx={{ p:2 }} aria-label="Encabezado del sitio"></Box>

      <Box component="main" sx={{ py:4 }} aria-label="Contenido principal">
        <Container>
          <Typography variant="h1" color="primary" gutterBottom>
            Página de Login de Ancor Valentín Martín
          </Typography>

          <Typography variant="h2" color="secondary">Subtítulo h2</Typography>
          <Typography variant="h3" color="error">Subtítulo h3</Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Texto subtitle1
          </Typography>
          <Typography variant="body1">Texto body1 de ejemplo</Typography>
          <Typography variant="caption" display="block">Texto caption</Typography>

          <Stack direction="row" spacing={2} sx={{ mt:3, flexWrap:'wrap' }}>
            <Button variant="text"      color="primary">Text primary</Button>
            <Button variant="contained" color="secondary">Contained secondary</Button>
            <Button variant="outlined"  color="error">Outlined error</Button>
            <Button variant="contained" color="success">Contained success</Button>
            <Button variant="outlined"  color="info">Outlined info</Button>
            <Button variant="text"      color="warning">Text warning</Button>
          </Stack>
        </Container>
      </Box>

      <Box component="footer" sx={{ p:2 }} aria-label="Pie de página"></Box>
    </>
  )
}
